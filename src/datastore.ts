import { SpaceError } from "./utils/error";
import { AccountData, ContractData } from "./data";
import { ShipData } from "./data/ships";

export class Datastore {
  ready: Promise<any>;
  account!: Account;
  contracts!: Contracts;
  ships!: Ship[];
  shipyards!: any;

  constructor() {
    const accountData = new AccountData().get()
    const contractData = new ContractData().list()
    const shipData = new ShipData().list()

    this.ready = Promise.all([accountData, contractData, shipData])
      .then((data) => {
        this.account = data[0];
        this.contracts = data[1];
        this.ships = data[2];
      })
      .catch((error) => {
        throw new SpaceError({
          message: "An error occurred in Datastore",
          data: error,
          type: "http",
        });
      });
  }
}
