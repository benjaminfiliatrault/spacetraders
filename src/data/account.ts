import { getAccountInfo } from "../adapters/account";

export class AccountData {
    data?: Account;
    
    constructor(){}

    async get() {
        this.data = await getAccountInfo();
        return this.data;
    }
}