require('dotenv').config();
import { ShipData } from "./data/ships";
import { Datastore } from "./datastore";
import { parseWaypoint } from "./utils/utils";


async function main() {
    try {
        const data = new Datastore();
        await data.ready;

        return data


    } catch (error) {
        console.log(error);
    }
};


main();