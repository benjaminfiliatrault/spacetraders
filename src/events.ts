import { RequestOptions } from "http";
import { EventEmitter } from "stream";
const eventEmitter = new EventEmitter();

eventEmitter.on(SpaceEvents["INVALID_TOKEN"], () => {
  // TODO: Implement a refresh access token logic
});

eventEmitter.on(SpaceEvents["RETRY_REQUEST"], (options: RequestOptions, retryAfter: number) => {
  // TODO: Implement the logic
  // sleep()
});

export default eventEmitter;
