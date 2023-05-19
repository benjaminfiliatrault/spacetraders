export const API = {
  REGISTER_AGENT: "register",
  ACCOUNT_INFO: "my/agent",

  // 👇 Location stuff
  WAYPOINT: (systemSymbol: string, waypointSymbol: string) => `systems/${systemSymbol}/waypoints/${waypointSymbol}`,
  WAYPOINTS: (systemSymbol: string) => `systems/${systemSymbol}/waypoints`,
  MARKET_WAYPOINTS: (systemSymbol: string, asteroidFieldWaypointSymbol: string) => `systems/${systemSymbol}/waypoints/${asteroidFieldWaypointSymbol}/market`,

  // 👇 Contract Stuff
  CONTRACTS: "my/contracts",
  CONTRACT: (contractId: string) => `my/contracts/${contractId}`,
  ACCEPT_CONTRACT: (contractId: string) => `my/contracts/${contractId}/accept`,
  DELIVER_CONTRACT: (contractId: string) => `my/contracts/${contractId}/deliver`,

  // 👇 Ship Stuff
  AVAILABLE_SHIPS: (systemSymbol: string, shipyardWaypointSymbol: string) =>
    `systems/${systemSymbol}/waypoints/${shipyardWaypointSymbol}/shipyard`,
  PURCHASE_SHIP: "my/ships",
  LIST_SHIPS: "my/ships",
  NAVIGATE_SHIP: (shipSymbol: string) => `my/ships/${shipSymbol}/navigate`,
  DOCK_SHIP: (shipSymbol: string) => `my/ships/${shipSymbol}/dock`,
  REFUEL_SHIP: (shipSymbol: string) => `my/ships/${shipSymbol}/refuel`,
  ORBIT_SHIP: (shipSymbol: string) => `my/ships/${shipSymbol}/orbit`,
  EXTRACT_SHIP: (shipSymbol: string) => `my/ships/${shipSymbol}/extract`,
  /** Details about the given ship */
  DETAILS_SHIP: (shipSymbol: string) => `my/ships/${shipSymbol}`,
  SELL_CARGO_SHIP: (shipSymbol: string) => `my/ships/${shipSymbol}/sell`,
};
