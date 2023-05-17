import { acceptContract, getContract, listContracts } from "../adapters/contract";

export class ContractData {
  /** Current contract */
  current?: Contract;
  /** List of contracts */
  contracts!: Contracts;

  constructor() {}

  async get(contractId: string) {
    const exists = this.contracts.find((c) => c.id == contractId);
    if (exists) return exists;
    return await getContract(contractId);
  }

  async list() {
    this.contracts = (await listContracts()).body;
    return this.contracts;
  }

  async accept(contractId: string) {
    await acceptContract(contractId);

    if (!this.contracts.length) this.list();

    this.current = this?.contracts?.find((c) => c.id === contractId);
  }
}
