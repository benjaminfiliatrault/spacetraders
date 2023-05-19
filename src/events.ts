import { RequestOptions } from "http";
import { EventEmitter } from "stream";
import { ReverseSpaceEventsMap, SpaceEventsMap } from "./utils/events.map";
const eventEmitter = new EventEmitter();

eventEmitter.on(ReverseSpaceEventsMap["INVALID_TOKEN"], async () => {
  // TODO: Implement a refresh access token logic
});

eventEmitter.on(ReverseSpaceEventsMap["RETRY_REQUEST"], (options: RequestOptions, retryAfter: number) => {
  // TODO: Implement the logic
  // sleep()
});

eventEmitter.on(ReverseSpaceEventsMap["SPACESHIP_IN_TRANSIT"], (data) => {
  logger.print(data);
  

})

export default eventEmitter;
