import { dockShip, extractShip, listAvailableShips, listShips, orbitShip, purchaseShip, refuelShip } from "../adapters/ship";

export class ShipData {
  current?: Ship;
  ships: Ship[];
  shipyards!: any;

  constructor() {
    this.ships = [];
  }

  /** List the ships in my inventory */
  async list() {
    const { body } = await listShips();
    this.ships = body;
    return this.ships;
  }

  async useMining(updated?: boolean): Promise<Ship | undefined> {
    const miningShip = this.ships?.find((ship) => {
      return ship.registration.role === "EXCAVATOR";
    });

    if (!miningShip && !updated) {
      await this.list();
      return await this.useMining(true);
    }

    this.current = miningShip;

    return this.current;
  }

  async listAvailable(systemSymbol: string, shipyardWaypointSymbol: string) {
    const { body } = await listAvailableShips(systemSymbol, shipyardWaypointSymbol);
    return body;
  }

  async purchase(shipType: ShipTypes, shipyardWaypointSymbol: string) {
    await purchaseShip(shipType, shipyardWaypointSymbol);
  }

  async dock() {
    if (!this.current) return;
    await dockShip(this.current.symbol);
  }

  async refuel() {
    if (!this.current) return;
    await refuelShip(this.current?.symbol);
  }

  async orbit() {
    if (!this.current) return;
    await orbitShip(this.current?.symbol);
  }

  async extract() {
    if (!this.current) return;
    return await extractShip(this.current?.symbol);
  }
}
