import type { IPredeterminedShip } from "../interfaces/ShipInterface.ts";
import Ship from "../utils/Ship.ts";

const PREDETERMINED_SHIP: IPredeterminedShip[] = [
  {
    name: "Carrier",
    ship: Ship(5),
    coordinate: { start: [3, 3], end: [3, 7] },
  },
  {
    name: "Battleship",
    ship: Ship(4),
    coordinate: { start: [6, 9], end: [9, 9] },
  },
  {
    name: "Cruiser",
    ship: Ship(3),
    coordinate: { start: [8, 4], end: [8, 6] },
  },
  {
    name: "Submarine",
    ship: Ship(3),
    coordinate: { start: [5, 2], end: [7, 2] },
  },
  {
    name: "Destroyer",
    ship: Ship(2),
    coordinate: { start: [2, 7], end: [2, 8] },
  },
];

export default PREDETERMINED_SHIP;
