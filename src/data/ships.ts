import { listAvailableShips, listShips, purchaseShip } from "../adapters/ship";
import { getWaypoints } from "../adapters/waypoint";

export class ShipData {
  ships: Ship[];
  shipyards!: any;

  constructor() {
    this.ships = [];
  }

  /** List the ships in my inventory */
  async listShips() {
    const myShips = await listShips();
    this.ships = myShips;
    return myShips;
  }

  async getMiningShip(updated?: boolean): Promise<Ship | undefined> {
    const miningShip = this.ships?.find((ship) => {
      return ship.registration.role === "EXCAVATOR";
    });

    if (!miningShip && !updated) {
      await this.listShips();
      return await this.getMiningShip(true);
    }

    return miningShip;
  }

  async findShipyard(systemSymbol: string) {
    const waypoints = await getWaypoints(systemSymbol);
    const orbitalStation = waypoints.find((location) => {
      const hisOrbitalStation = location.type === "ORBITAL_STATION";
      const hasShipyards = location?.traits.some((t) => t.symbol === "SHIPYARD");
      return hisOrbitalStation && hasShipyards;
    });
    return orbitalStation;
  }

  async getAvailableShips(systemSymbol: string, shipyardWaypointSymbol: string) {
    const availableShips = await listAvailableShips(systemSymbol, shipyardWaypointSymbol);
    return availableShips;
  }

  async purchaseShip(shipType: ShipTypes, shipyardWaypointSymbol: string) {
    await purchaseShip(shipType, shipyardWaypointSymbol);
  }
}
