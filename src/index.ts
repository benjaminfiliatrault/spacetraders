require("dotenv").config();
import { navigateShip } from "./adapters/ship";
import { ContractData } from "./data";
import { ShipData } from "./data/ships";
import { WaypointData } from "./data/waypoint";
import { Datastore } from "./datastore";
import { parseWaypoint } from "./utils/utils";

async function main() {
  try {
    const data = new Datastore();
    await data.ready;

    const waypointData = new WaypointData();
    const ship = new ShipData();

    const myShips = await ship.useMining();

    if (!myShips) return;

    const res = await ship.extract();

    console.log(res);
    
  } catch (error) {
    console.log(error);
  }
}

main();
