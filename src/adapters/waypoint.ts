import { spaceGet } from "../api";
import { API } from "../api/endpoints";

export const getWaypoints = async (systemSymbol: string) => spaceGet<Waypoint[]>(API.WAYPOINTS(systemSymbol));

export const getMarketWaypoints = async(systemSymbol: string, asteroidFieldWaypointSymbol: string) => {
    return spaceGet<Market>(API.MARKET_WAYPOINTS(systemSymbol, asteroidFieldWaypointSymbol));
}