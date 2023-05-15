require("dotenv").config();
import { navigateShip } from "./adapters/ship";
import { ContractData } from "./data";
import { ShipData } from "./data/ships";
import { Datastore } from "./datastore";
import { parseWaypoint } from "./utils/utils";

async function main() {
  try {
    const data = new Datastore();
    await data.ready;

    const shipData = new ShipData();

    const myShips = await shipData.getMiningShip()
    
    // await navigateShip(myShips?.symbol, )

  } catch (error) {
    console.log(error);
  }
}

main();
