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
import logger from "../utils/logger";

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

  async navigate({ waypoint, needRefuel, where }: { waypoint: string; needRefuel?: boolean, where: string }) {
    if (!this.current) return;
    await navigateShip(this.current.symbol, waypoint);
    await this.details();

    const arrivalTimeInMili = new Date(this.current?.nav.route.arrival).getTime() - new Date().getTime();

    await sleep(arrivalTimeInMili, `Navigating to: ${where} - ${waypoint}`);

    await this.dock();

    if (needRefuel) await this.refuel();
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
    const { body } = await getDetailsShip<Ship>(this.current.symbol);
    this.current = body;
    return this.current;
  }

  async sellCargo({ excludeSymbols }: { excludeSymbols: string[] }) {
    if (!this.current) return;
    for await (const item of this.current.cargo.inventory) {
      if (excludeSymbols.some((symbol) => symbol === item.symbol)) continue;
      const res = await sellCargoShip(this.current.symbol, item);
      await sleep(2000, "Selling cargo");
      logger.print("Selling Cargo stuff: \n", res?.body);
    }
  }
}
