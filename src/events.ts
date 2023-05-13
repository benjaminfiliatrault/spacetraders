import * as fs from "fs";
import * as path from "path";
import { RequestOptions } from "http";
import { EventEmitter } from "stream";
import { registerAgent } from "./adapters/account";
const eventEmitter = new EventEmitter();

eventEmitter.on(SpaceEvents["INVALID_TOKEN"], async () => {
  // TODO: Implement a refresh access token logic
});

eventEmitter.on(SpaceEvents["RETRY_REQUEST"], (options: RequestOptions, retryAfter: number) => {
  // TODO: Implement the logic
  // sleep()
});

export default eventEmitter;
