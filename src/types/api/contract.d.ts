declare type Contracts = Contract[];

declare interface Contract {
  id: string;
  factionSymbol: string;
  type: string;
  terms: Terms;
  accepted: boolean;
  fulfilled: boolean;
  expiration: Date;
}

interface Terms {
  deadline: Date;
  payment: Payment;
  deliver: Deliver[];
}

interface Deliver {
  tradeSymbol: string;
  destinationSymbol: string;
  unitsRequired: number;
  unitsFulfilled: number;
}

interface Payment {
  onAccepted: number;
  onFulfilled: number;
}
