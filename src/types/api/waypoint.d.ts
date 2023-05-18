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


declare interface Market {
  symbol: string
  imports: any[]
  exports: any[]
  exchange: Exchange[]
  transactions: Transaction[]
  tradeGoods: TradeGood[]
}

interface Exchange {
  symbol: string
  name: string
  description: string
}

interface Transaction {
  waypointSymbol: string
  shipSymbol: string
  tradeSymbol: string
  type: string
  units: number
  pricePerUnit: number
  totalPrice: number
  timestamp: string
}

interface TradeGood {
  symbol: string
  tradeVolume: number
  supply: string
  purchasePrice: number
  sellPrice: number
}