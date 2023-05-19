import { SpaceError } from "./error";
import logger from "./logger";

export const parseWaypoint = (waypoint: string) => {
  const [sector, sys] = waypoint.split("-");

  if (!sys) throw new SpaceError({ message: "Waypoint invalid" });

  const system = `${sector}-${sys}`;
  return { sector, system, waypoint };
};

export const sleep = (ms: number, message: string) =>
  new Promise<void>((resolve) => {
    let seconds = ms / 1000;
    const ticker = setInterval(() => {
      logger.clear();
      logger.print(message);
      logger.print("Waiting for: %s", seconds);
      seconds -= 1;
    }, 1000);
    setTimeout(() => {
      clearInterval(ticker);
      logger.clear();
      resolve();
    }, ms);
  });

export const reverseObject = <In extends AnyObject>(object: In) => {
  const clone = <In>JSON.parse(JSON.stringify(object));
  const flipped = Object.entries(clone).map(([key, value]) => [value, key]);
  return Object.fromEntries(flipped);
};
