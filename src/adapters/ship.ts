import { spaceGet, spacePost } from "../api";
import { API } from "../api/endpoints";

/** List ships available to purchase in a Shipyard */
export const listAvailableShips = (systemSymbol: string, shipyardWaypointSymbol: string) =>
  spaceGet<AvailableShips>(API.AVAILABLE_SHIPS(systemSymbol, shipyardWaypointSymbol));

export const purchaseShip = (shipType: ShipTypes, shipyardWaypointSymbol: string) =>
  spacePost<void>(API["PURCHASE_SHIP"], {
    shipType,
    waypointSymbol: shipyardWaypointSymbol,
  });

export const listShips = () => spaceGet<Ship[]>(API["LIST_SHIPS"]);

export const navigateShip = (shipSymbol: string, waypointSymbol: string) => {
  return spacePost(API.NAVIGATE_SHIP(shipSymbol), {
    waypointSymbol,
  });
};
