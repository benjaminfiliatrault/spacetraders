export const API = {
  REGISTER_AGENT: "register",
  ACCOUNT_INFO: "my/agent",

  // 👇 Location stuff
  WAYPOINT: (systemSymbol: string, waypointSymbol: string) => `systems/${systemSymbol}/waypoints/${waypointSymbol}`,
  WAYPOINTS: (systemSymbol: string) => `systems/${systemSymbol}/waypoints`,

  // 👇 Contract Stuff
  CONTRACTS: "my/contracts",
  CONTRACT: (contractId: string) => `my/contracts/${contractId}`,
  ACCEPT_CONTRACT: (contractId: string) => `my/contracts/${contractId}/accept`,

  // 👇 Ship Stuff
  AVAILABLE_SHIPS: (systemSymbol: string, shipyardWaypointSymbol: string) =>
    `systems/${systemSymbol}/waypoints/${shipyardWaypointSymbol}/shipyard`,
  PURCHASE_SHIP: "my/ships",
  LIST_SHIPS: "my/ships",
};
