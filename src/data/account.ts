import { DataBuilder } from ".";
import { getAccountInfo } from "../adapters/account";

export class AccountData {
  data?: Account;

  constructor() {}

  async get() {
    this.data = (await getAccountInfo()).body;
    return this.data;
  }
}
