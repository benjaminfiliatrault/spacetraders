import { RequestOptions } from "https";
import { RequestCreator } from "./requestor";
import { SpaceError } from "../utils/error";

export const spaceGet = async <T>(path: string, options?: RequestOptions): Promise<T> => {
  const reqOptions = { ...options, method: "GET", path };
  const request = new RequestCreator({ options: reqOptions });
  const response = await request.get<T>();

  if (response?.error) {
    throw new SpaceError({
      message: `Error on space post request ${response.error}`,
      data: response.error,
      type: "http",
    });
  }

  return response.body;
};

export const spacePost = async <T>(path: string, data: AnyObject = {}, options?: RequestOptions): Promise<T> => {
  const reqOptions = { ...options, method: "POST", path };
  const request = new RequestCreator({ options: reqOptions });
  const response = await request.post(data);

  if (response.error) {
    throw new SpaceError({
      message: `Error on space post request ${JSON.stringify(response.error)}`,
      data: response.error,
      type: "http",
    });
  }

  return response.body;
};
