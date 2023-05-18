import { navigateShip } from "./adapters/ship";
import { ContractData } from "./data";
import { ShipData } from "./data/ships";
import { WaypointData } from "./data/waypoint";
import { Datastore } from "./datastore";
import { parseWaypoint, sleep } from "./utils/utils";

export async function main() {
  try {
    while (true) {
      const data = new Datastore();
      await data.ready;

      const waypointData = new WaypointData();
      const ship = new ShipData();

      await ship.useMining();

      if (!ship?.current) return;

      const { system } = parseWaypoint(ship?.current?.nav.systemSymbol);

      const asteroid = await waypointData.findAsteroids(system);

      if (!asteroid) return;

      if (ship.current.nav.waypointSymbol !== asteroid.symbol) {
        await ship.navigate(asteroid.symbol);

        const details = await ship.details();

        if (!details) return;

        const arrivalTimeInMili = new Date(details?.nav.route.arrival).getTime() - new Date().getTime();

        await sleep(arrivalTimeInMili);

        await ship.dock();

        await ship.refuel();

        await ship.orbit();
      }

      let shipCargoFull = ship.current.cargo.capacity === ship.current.cargo.units;

      while (!shipCargoFull) {
        console.log("Extracting Ores")
        const extraction = await ship.extract();

        if (extraction?.error || extraction?.body.cooldown) {
          const cooldownInMilli =
            extraction?.error?.data.cooldown.remainingSeconds || extraction?.body?.cooldown?.remainingSeconds;
          await sleep(cooldownInMilli * 1000);
        }

        console.log(JSON.stringify(extraction?.body?.extraction, null, 2));

        shipCargoFull = extraction?.body?.cargo?.capacity === extraction?.body?.cargo?.units;
      }

      // Refresh current ship information
      await ship.details();

      const marketData = await waypointData.marketData(ship.current.nav.systemSymbol, ship.current.nav.waypointSymbol);

      await ship.navigate(marketData.symbol);

      const details = await ship.details();

      if (!details) return;

      const arrivalTimeInMili = new Date(details?.nav?.route?.arrival).getTime() - new Date().getTime();

      await sleep(arrivalTimeInMili);

      await ship.dock();

      await ship.sellCargo(data?.contracts[0]);
    }
  } catch (error) {
    console.log(error);
  }
}
