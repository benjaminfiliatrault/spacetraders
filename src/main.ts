import { ContractData } from "./data";
import { ShipData } from "./data/ships";
import { WaypointData } from "./data/waypoint";
import { Datastore } from "./datastore";
import { SpaceError } from "./utils/error";
import logger from "./utils/logger";
import { parseWaypoint, sleep } from "./utils/utils";

export async function main() {
  try {
    const data = new Datastore();
    await data.ready;

    const waypointData = new WaypointData();
    const contractData = new ContractData();
    const ship = new ShipData();

    await ship.useMining();

    if (!ship?.current) {
      throw new SpaceError({ message: "No ship set" });
    }

    const currentShipWaypoint = ship?.current?.nav?.waypointSymbol;
    const { system } = parseWaypoint(ship?.current?.nav.systemSymbol);
    const currentShipSystem = system;

    const marketData = await waypointData.marketData(ship.current.nav.systemSymbol, currentShipWaypoint);

    const asteroid = await waypointData.findAsteroids(currentShipSystem);

    if (!asteroid) {
      throw new SpaceError({ message: "No asteroid found to be mined." });
    }

    for await (const contract of data.contracts) {
      const toDeliverSymbols: string[] = contract.terms.deliver.map((term) => term.tradeSymbol);
      let contractFulfilled = contract?.fulfilled;
      // TODO: Change this not good 👇
      while (!contractFulfilled) {
        let shipCargoFull = ship.current.cargo.capacity === ship.current.cargo.units;

        if (currentShipWaypoint !== asteroid.symbol && !shipCargoFull) {
          await ship.navigate({ waypoint: asteroid.symbol, needRefuel: false, where: asteroid.type });
          await ship.orbit();
        }

        while (!shipCargoFull) {
          logger.print("Extracting Ores");
          const extraction = await ship.extract();

          if (extraction?.error || extraction?.body.cooldown) {
            const cooldownInMilli =
              extraction?.error?.data?.cooldown?.remainingSeconds || extraction?.body?.cooldown?.remainingSeconds;
            await sleep(cooldownInMilli * 1000, "Mining Ores");
          }

          logger.print(JSON.stringify(extraction?.body?.extraction, null, 2));

          shipCargoFull = extraction?.body?.cargo?.capacity === extraction?.body?.cargo?.units;
        }

        // Refresh current ship information
        await ship.details();

        const skipGoToMarket = ship?.current?.cargo?.inventory?.some((item) => {
          // TODO: Won't work when a contract requires many different Items 
          return toDeliverSymbols.includes(item.symbol) && item.units > 30
        });

        if (!skipGoToMarket) {
          await ship.navigate({
            waypoint: marketData.symbol,
            needRefuel: true,
            where: "Market",
          });

          await ship.sellCargo({ excludeSymbols: toDeliverSymbols });
        }

        // Ship is still full so we can deliver the goods
        // for the contract and restart the process again
        if (skipGoToMarket) {
          for await (const delivery of contract.terms.deliver) {
            await ship.details();

            await ship.navigate({
              waypoint: delivery.destinationSymbol,
              needRefuel: true,
              where: `Delivering ${delivery.tradeSymbol}`,
            });

            const itemToDeliver = ship?.current?.cargo?.inventory?.find((item) => item.symbol === delivery.tradeSymbol);

            await contractData.deliver({
              contractId: contract.id,
              tradeSymbol: delivery.tradeSymbol,
              units: itemToDeliver?.units,
              shipSymbol: ship.current.symbol,
            });
          }
        }

        await sleep(2000, "Waiting")

        const contractDetails = await contractData.get(contract.id);
        contractFulfilled = contractDetails.fulfilled;
      }
    }
  } catch (error) {
    logger.print(error);
  }
}
