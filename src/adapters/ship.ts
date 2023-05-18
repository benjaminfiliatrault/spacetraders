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

/**
 *
 * @param shipSymbol The ship symbol
 * @param waypointSymbol Where to navigate symbol
 */
export const navigateShip = (shipSymbol: string, waypointSymbol: string) => {
  return spacePost(API.NAVIGATE_SHIP(shipSymbol), {
    waypointSymbol,
  });
};

export const dockShip = (shipSymbol: string) => {
  return spacePost(API.DOCK_SHIP(shipSymbol));
};

export const refuelShip = (shipSymbol: string) => {
  return spacePost(API.REFUEL_SHIP(shipSymbol));
};

export const orbitShip = (shipSymbol: string) => {
  return spacePost(API.ORBIT_SHIP(shipSymbol));
};

export const extractShip = (shipSymbol: string) => {
  return spacePost(API.EXTRACT_SHIP(shipSymbol));
};

export const getDetailsShip = <T>(shipSymbol: string) => {
  return spaceGet<T>(API.DETAILS_SHIP(shipSymbol));
};

export const sellCargoShip = (shipSymbol: string, content: Pick<Inventory, "symbol" | "units">) => {
  return spacePost(API.SELL_CARGO_SHIP(shipSymbol), content);
};
