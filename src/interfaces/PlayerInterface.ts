import type {
  IGameBoardInterface,
  ShipCoordinateRange,
} from "./GameBoardInterface";

export interface ILegalCoordinate {
  x: ShipCoordinateRange;
  y: ShipCoordinateRange;
}

export interface IPlayerInterface {
  getPlayerBoard: () => IGameBoardInterface;
  getRandomCoordinate: () => ILegalCoordinate;
  randomLegalAttack: () => ILegalCoordinate;
}
