export const parseWaypoint = (waypoint: string) => {
  const [sector, sys] = waypoint.split("-");
  const system = `${sector}-${sys}`;
  return { sector, system, waypoint };
};

export const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const reverseObject = <In extends AnyObject>(object: In) => {
  const clone = <In>JSON.parse(JSON.stringify(object));
  const flipped = Object.entries(clone).map(([key, value]) => [value, key]);
  return Object.fromEntries(flipped);
};
