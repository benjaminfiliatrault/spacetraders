import { getContract, listContracts } from "../adapters/contract";

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
        
        this.current = await getContract(contractId);
        return this.current
    }

    async list() {
        this.contracts = await listContracts();
        return this.contracts;
    }
}