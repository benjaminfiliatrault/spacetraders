export const parseWaypoint = (waypoint: string) => {
  const [sector, sys] = waypoint.split("-");
  const system = `${sector}-${sys}`;
  return { sector, system, waypoint };
};

export const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
