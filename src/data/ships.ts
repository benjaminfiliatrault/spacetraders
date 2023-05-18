import { sleep } from "../utils/utils";
import {
  dockShip,
  extractShip,
  getDetailsShip,
  listAvailableShips,
  listShips,
  navigateShip,
  orbitShip,
  purchaseShip,
  refuelShip,
  sellCargoShip,
} from "../adapters/ship";

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

  async navigate(waypoint: string) {
    if (!this.current) return;
    return await navigateShip(this.current.symbol, waypoint);
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

  async details() {
    if (!this.current) return;
    this.current = (await getDetailsShip<Ship>(this.current.symbol)).body;
    return this.current
  }

  async sellCargo(contract: Contract) {
    if (!this.current) return;
    for await (const item of this.current.cargo.inventory) {      
      if (contract.terms.deliver.some(term => term.tradeSymbol === item.symbol)) continue
      const res = await sellCargoShip(this.current.symbol, item)
      await sleep(2000);
      console.log('Selling Cargo stuff: \n',res?.body)
    }
  }
}
