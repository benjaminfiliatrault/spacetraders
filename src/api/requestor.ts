import * as https from "https";
import { ClientRequest, IncomingHttpHeaders } from "http";
import eventEmitter from "../events";

const BASE_URL = "api.spacetraders.io";

interface RequestCreatorParams {
  data?: AnyObject;
  options: https.RequestOptions;
}

interface Response<T> {
  statusCode: number;
  headers: IncomingHttpHeaders;
  body: T;
  error?: AnyObject;
}

export class RequestCreator {
  private buffer: string;
  private response: Response<any>;

  options: https.RequestOptions;

  body?: AnyObject;

  constructor(params: RequestCreatorParams) {
    this.buffer = "";
    this.response = { headers: {}, body: {}, statusCode: 500 };
    this.options = this._getOptions(params.options);
  }

  private async _builder(done: () => void, data?: AnyObject) {
    const request = https.request(this.options, (res) => {
      res.on("data", (chunk) => {
        this.buffer += chunk;
      });
      res.on("close", async () => {
        const { data, error } = JSON.parse(this.buffer);
        await this._inspector(error);
        this.response = {
          statusCode: data?.code || error?.code || 500,
          headers: res.headers,
          body: data,
          error,
        };
        done();
      });
    });
    this._handleRequestError(request);

    if (data) {
      const body = JSON.stringify(data);
      request.setHeader("content-length", body.length);
      request.write(body);
    }

    request.end();
    return request;
  }

  private async _inspector(error?: AnyObject) {
    if (!error) return;

    if (error.code === 4104) {
      eventEmitter.emit(SpaceEvents["INVALID_TOKEN"]);
    }

    if (error.code == 429) {
      const retryAfter = Number.parseInt(this.response.headers["retry-after"] || "0", 10);
      eventEmitter.emit(SpaceEvents["RETRY_REQUEST"], this.options, retryAfter);
    }
  }

  private _handleRequestError(req: ClientRequest) {
    req.on("error", (error) => {
      this.body = {
        code: 500,
        message: `Request failed with ${error}`,
      };
    });
  }

  private _getPath(path: string) {
    return `/v2/${path}`;
  }

  private _getOptions(overwrite: https.RequestOptions): https.RequestOptions {
    return {
      hostname: BASE_URL,
      ...overwrite,
      path: this._getPath(overwrite.path!),
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        "Content-Type": "application/json",
        ...overwrite?.headers,
      },
    };
  }

  async get<T>() {
    return new Promise<Response<T | any>>((resolve) => {
      this._builder(() => resolve(this.response));
    });
  }

  async post<T>(data: AnyObject) {
    return new Promise<Response<T | any>>((resolve) => {
      this._builder(() => resolve(this.response), data);
    });
  }
}
