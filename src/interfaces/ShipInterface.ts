import type { ICoordinate } from "./GameBoardInterface";

export interface IShip {
  hit: () => void;
  getHit: () => number;
  isSunk: () => boolean;
}

export interface IPredeterminedShip {
  name: string;
  ship: IShip;
  coordinate: {
    start: ICoordinate;
    end: ICoordinate;
  };
  length: number;
}
