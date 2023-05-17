import { getWaypoints } from "../adapters/waypoint";

export class WaypointData {
  /** Where we are */
  current!: Waypoint;

  waypoints!: Waypoint[];

  constructor() {}

  async list(symbol: string) {
    this.waypoints = (await getWaypoints(symbol)).body;
    return this.waypoints;
  }

  async findShipyard(symbol: string) {
    const waypoints = await this.list(symbol);
    const orbitalStation = waypoints.find((location) => {
      const hisOrbitalStation = location.type === "ORBITAL_STATION";
      const hasShipyards = location?.traits.some((t) => t.symbol === "SHIPYARD");
      return hisOrbitalStation && hasShipyards;
    });
    return orbitalStation;
  }

  async findAsteroids(symbol: string) {
    const waypoints = await this.list(symbol);
    const asteroid = waypoints.find((location) => {
      const hisOrbitalStation = location.type === "ASTEROID_FIELD";
      return hisOrbitalStation;
    });
    return asteroid;
  }
}
