import { spaceGet } from "../api";
import { API } from "../api/endpoints";

export const getAccountInfo = () => spaceGet<Account>(API["ACCOUNT_INFO"]);