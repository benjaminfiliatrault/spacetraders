import { spaceGet, spacePost } from "../api";
import { API } from "../api/endpoints";

export const getContract = (contractId: string) => spaceGet<Contract>(API.CONTRACT(contractId));

export const listContracts = () => spaceGet<Contracts>(API["CONTRACTS"]);

export const acceptContract = (contractId: string) => spacePost(API.ACCEPT_CONTRACT(contractId));

export const deliverContract = (contractId: string, body: { shipSymbol: string, tradeSymbol: string; units: number }) =>
  spacePost(API.DELIVER_CONTRACT(contractId), body);
