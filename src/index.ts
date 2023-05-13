require('dotenv').config();
import { ShipData } from "./data/ships";
import { Datastore } from "./datastore";
import { parseWaypoint } from "./utils/utils";


async function main() {
    try {
        const data = new Datastore();
        await data.ready;

        const { system } = parseWaypoint(data.account.headquarters);

        const shipData = new ShipData();


        const res = await shipData.getMiningShip();
    

        // const shipyard = await shipData.findShipyard(system)

        // if (!shipyard) return;

        // const availableShips = await shipData.getAvailableShips(shipyard.systemSymbol, shipyard?.symbol)



        // const res = await shipData.purchaseShips("SHIP_MINING_DRONE", availableShips.symbol)
        

    } catch (error) {
        console.log(error);
    }
};


main();