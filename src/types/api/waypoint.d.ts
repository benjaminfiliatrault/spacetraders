declare interface Waypoint {
  systemSymbol: string;
  symbol: string;
  type: WaypointTypes;
  x: number;
  y: number;
  orbitals: Orbital[];
  traits: Trait[];
  chart: Chart;
  faction: Faction;
}

interface Orbital {
  symbol: string;
}

interface Trait {
  symbol: TraitSymbol;
  name: string;
  description: string;
}

interface Chart {
  submittedBy: string;
  submittedOn: string;
}

interface Faction {
  symbol: string;
}

type WaypointTypes = "PLANET" | "MOON" | "ASTEROID_FIELD" | "GAS_GIANT" | "ORBITAL_STATION" | "JUMP_GATE";

type TraitSymbol = "SHIPYARD" | "MARKETPLACE"| "MILITARY_BASE" | "TRADING_HUB"
