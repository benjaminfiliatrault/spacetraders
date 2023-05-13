declare interface AvailableShips {
  symbol: string;
  shipTypes: ShipType[];
}

interface ShipType {
  type: ShipTypes;
}

type ShipTypes = "SHIP_MINING_DRONE" | "SHIP_ORE_HOUND" | "SHIP_REFINING_FREIGHTER" | "SHIP_PROBE";

declare interface Ship {
  symbol: string;
  nav: Nav;
  crew: Crew;
  fuel: Fuel;
  frame: Frame;
  reactor: Reactor;
  engine: Engine;
  modules: Module[];
  mounts: Mount[];
  registration: Registration;
  cargo: Cargo;
}

interface Nav {
  systemSymbol: string;
  waypointSymbol: string;
  route: Route;
  status: string;
  flightMode: string;
}

interface Route {
  departure: Departure;
  destination: Destination;
  arrival: string;
  departureTime: string;
}

interface Departure {
  symbol: string;
  type: string;
  systemSymbol: string;
  x: number;
  y: number;
}

interface Destination {
  symbol: string;
  type: string;
  systemSymbol: string;
  x: number;
  y: number;
}

interface Crew {
  current: number;
  capacity: number;
  required: number;
  rotation: string;
  morale: number;
  wages: number;
}

interface Fuel {
  current: number;
  capacity: number;
  consumed: Consumed;
}

interface Consumed {
  amount: number;
  timestamp: string;
}

interface Frame {
  symbol: string;
  name: string;
  description: string;
  moduleSlots: number;
  mountingPoints: number;
  fuelCapacity: number;
  condition: number;
  requirements: Requirements;
}

interface Requirements {
  power: number;
  crew: number;
}

interface Reactor {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  powerOutput: number;
  requirements: Requirements2;
}

interface Requirements2 {
  crew: number;
}

interface Engine {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  speed: number;
  requirements: Requirements3;
}

interface Requirements3 {
  power: number;
  crew: number;
}

interface Module {
  symbol: string;
  name: string;
  description: string;
  capacity?: number;
  requirements: Requirements4;
  range?: number;
}

interface Requirements4 {
  crew: number;
  power: number;
  slots: number;
}

interface Mount {
  symbol: string;
  name: string;
  description: string;
  strength: number;
  requirements: Requirements5;
  deposits?: string[];
}

interface Requirements5 {
  crew: number;
  power: number;
}

interface Registration {
  name: string;
  factionSymbol: string;
  role: RegistrationRoles;
}

type RegistrationRoles = "COMMAND" | "EXCAVATOR"

interface Cargo {
  capacity: number;
  units: number;
  inventory: Inventory[];
}

interface Inventory {
  symbol: string;
  name: string;
  description: string;
  units: number;
}
