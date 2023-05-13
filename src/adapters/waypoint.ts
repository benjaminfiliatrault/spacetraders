import { spaceGet } from "../api";
import { API } from "../api/endpoints";

export const getWaypoints = async (systemSymbol: string) => spaceGet<Waypoint[]>(API.WAYPOINTS(systemSymbol));
