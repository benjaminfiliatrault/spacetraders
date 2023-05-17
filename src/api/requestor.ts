import * as https from "https";
import { ClientRequest, IncomingHttpHeaders } from "http";
import eventEmitter from "../events";
import { SpaceEventsMap } from "../utils/events.map";

const BASE_URL = "api.spacetraders.io";

interface RequestCreatorParams {
  data?: AnyObject;
  options: https.RequestOptions;
}

export interface Response<T> {
  headers: IncomingHttpHeaders;
  statusCode: number;
  failRequest: boolean
  error?: AnyObject;
  body: T;
}

export class RequestCreator {
  private buffer: string;
  private response: Response<any>;

  options: https.RequestOptions;

  body?: AnyObject;

  constructor(params: RequestCreatorParams) {
    this.buffer = "";
    this.response = { failRequest: false, headers: {}, body: {}, statusCode: 500 };
    this.options = this._getOptions(params.options);
  }

  private async _builder(done: () => void, data?: AnyObject) {
    const request = https.request(this.options, (res) => {
      res.on("data", (chunk) => {
        this.buffer += chunk;
      });
      res.on("close", async () => {
        const { data, error } = JSON.parse(this.buffer);
        const failRequest = await this._inspector(error);

        this.response = {
          failRequest,
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

  /** Returns TRUE if we need to fail the request */
  private async _inspector(error?: ResponseError): Promise<boolean> {
    if (!error) return false;

    let failRequest = false;

    const data = error.code == 429 ? this.response.headers["retry-after"] || "0" : error?.data 

    eventEmitter.emit(SpaceEventsMap[error.code as keyof typeof SpaceEventsMap], data);

    if (error.code >= 500 && error.code < 4000) failRequest = true;

    return failRequest;
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
    return new Promise<Response<T>>((resolve) => {
      this._builder(() => resolve(this.response));
    });
  }

  async post<T>(data: AnyObject) {
    return new Promise<Response<T | any>>((resolve) => {
      this._builder(() => resolve(this.response), data);
    });
  }
}
