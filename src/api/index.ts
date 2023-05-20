import { RequestOptions } from "https";
import { RequestCreator } from "./requestor";
import { SpaceError } from "../utils/error";

export const spaceGet = async <T extends any>(path: string, options?: RequestOptions) => {
  const reqOptions = { ...options, method: "GET", path };
  const request = new RequestCreator({ options: reqOptions });
  const response = await request.get<T | any>();

  if (response?.error && response.failRequest) {
    throw new SpaceError({
      message: `Error on space post request ${response.error}`,
      data: response.error,
      type: "http",
    });
  }

  return response;
};

export const spacePost = async <T>(path: string, data: AnyObject = {}, options?: RequestOptions) => {
  const reqOptions = { ...options, method: "POST", path };
  const request = new RequestCreator({ options: reqOptions });
  const response = await request.post<T | any>(data);

  if (response.error && response.failRequest) {
    throw new SpaceError({
      message: `Error on space post request ${JSON.stringify(response.error)}`,
      data: response.error,
      type: "http",
    });
  }

  return response;
};
