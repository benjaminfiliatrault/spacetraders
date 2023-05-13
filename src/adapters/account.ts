import { spaceGet, spacePost } from "../api";
import { API } from "../api/endpoints";

export const registerAgent = (symbol: string, faction: string = "COSMIC") =>
  spacePost(API["REGISTER_AGENT"], {
    symbol,
    faction,
  });

export const getAccountInfo = () => spaceGet<Account>(API["ACCOUNT_INFO"]);
