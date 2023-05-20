import * as https from "https";
import { ClientRequest, IncomingHttpHeaders } from "http";
import { sleep } from "../utils/utils";

const BASE_URL = "api.spacetraders.io";

interface RequestCreatorParams {
  data?: AnyObject;
  options: https.RequestOptions;
}

export interface Response<T> {
  headers: IncomingHttpHeaders;
  statusCode: number;
  failRequest: boolean;
  error?: AnyObject;
  body: T;
}

interface InspectorParams {
  headers: IncomingHttpHeaders;
  statusCode: number;
}

export class RequestCreator {
  private buffer: Buffer;
  private response: Response<any>;

  private request?: ClientRequest;
  options: https.RequestOptions;

  body?: AnyObject;

  constructor(params: RequestCreatorParams) {
    this.buffer = Buffer.alloc(0);
    this.response = { failRequest: false, headers: {}, body: {}, statusCode: 500 };
    this.options = this._getOptions(params.options);
  }

  private async _builder<T>(data?: AnyObject) {
    return new Promise<Response<T>>((resolve) => {
      this.request = this._request(() => resolve(this.response));
      this._handleRequestError(this.request);
      if (data) {
        const body = JSON.stringify(data);
        this.request.setHeader("content-length", body.length);
        this.request.write(body);
      }
      this.request.setTimeout(20000, this.request.destroy);
      this.request.end();
    });
  }

  private _request(done: () => void) {
    return https.request(this.options, (res) => {
      res.on("data", (chunk) => {
        this.buffer = Buffer.concat([this.buffer, chunk]);
      });
      res.on("close", async () => {
        try {
          const { data, error } = JSON.parse(this.buffer.toString());
          const failRequest = this._shouldFailRequest(error);

          this.response = {
            failRequest,
            statusCode: data?.code || error?.code || res.statusCode || 500,
            headers: res.headers,
            body: data,
            error,
          };
        } catch (error) {
          console.log(error);
        } finally {
          this.buffer = Buffer.alloc(0);
          done();
        }
      });
    });
  }

  private async _inspector({ headers, statusCode }: InspectorParams) {
    if (statusCode !== 429) return false;
    const delay = parseFloat(headers["retry-after"]);
    this.request.destroy();
    await sleep(delay * 1000, "Retrying request");
  }

  /** Returns TRUE if we need to fail the request */
  private _shouldFailRequest(error?: ResponseError): boolean {
    if (!error) return false;
    let failRequest = false;
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

  async get<T>(): Promise<Response<T>> {
    const response = await this._builder<T>();

    const shouldRetry = await this._inspector({
      headers: response.headers,
      statusCode: response.statusCode,
    });

    if (shouldRetry) return await this.get();

    return response;
  }

  async post<T>(data: AnyObject): Promise<Response<T>> {
    const response = await this._builder<T>(data);

    const shouldRetry = await this._inspector({
      headers: response.headers,
      statusCode: response.statusCode,
    });

    if (shouldRetry) return await this.post<T>(data);

    return response;
  }
}
