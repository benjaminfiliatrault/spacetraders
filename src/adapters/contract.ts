import { spaceGet } from "../api";
import { API } from "../api/endpoints";



export const getContract = (contractId: string) => spaceGet<Contract>(API.CONTRACT(contractId));

export const listContracts = () => spaceGet<Contracts>(API['CONTRACTS']);