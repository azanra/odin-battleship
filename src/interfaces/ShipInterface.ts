export interface IShip {
  hit: () => void;
  getHit: () => number;
  isSunk: () => boolean;
}
