import { SpaceError } from "./utils/error";
import { AccountData, ContractData } from "./data";
import { ShipData } from "./data/ships";

export class Datastore {
  ready: Promise<any>;
  account!: Account;
  contracts!: Contracts;
  shipyards!: any;

  constructor() {
    const accountData = new AccountData().get();
    const contractData = new ContractData().list();

    this.ready = Promise.all([accountData, contractData])
      .then((data) => {
        this.account = data[0];
        this.contracts = data[1];
      })
      .catch((error) => {
        console.log("[ERROR] DATASTORE", error);
        throw new SpaceError({
          message: "An error occurred in Datastore",
          type: "http",
        });
      });
  }
}
