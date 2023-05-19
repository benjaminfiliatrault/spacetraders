export type ErrorType = "http" | "other";

export interface SpaceErrorParams {
  message: string;
  data?: AnyObject;
  type?: ErrorType;
}

export class SpaceError extends Error {
  type: ErrorType;
  data?: AnyObject;

  constructor(params: SpaceErrorParams) {
    super(params.message);
    this.type = params.type;
    this.data = params.data;
  }
}
