import { spaceGet } from "../api";
import { API } from "../api/endpoints";

export class ContractData {
    /** Current contract */
    current!: Contract;
    /** List of contracts */
    contracts!: Contracts;

    constructor() {}

    async get(contractId: string) {
        const exists = this.contracts.find(c => c.id == contractId);
        
        if (exists) {
            this.current = exists
            return this.current;
        }
        
        this.current = await spaceGet<Contract>(API.CONTRACT(contractId));
        return this.current
    }

    async list() {
        this.contracts = await spaceGet<Contracts>(API['CONTRACTS']);
        return this.contracts;
    }
}