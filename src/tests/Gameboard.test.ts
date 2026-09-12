import { describe, expect, test } from "@jest/globals";
import Ship from "../utils/Ship";
import GameBoard from "../utils/GameBoard";
import type { IRangeOfCoordinate } from "../interfaces/GameBoardInterface";

describe("GameBoard", () => {
  const gameBoard = GameBoard();
  const destroyer = Ship(2);

  test("get an empty game board", () => {
    const emptyGameBoard = Array.from(new Array(10), () =>
      [...new Array(10)].map(() => ({ ship: undefined, isAttacked: false })),
    );
    expect(gameBoard.getBoard()).toStrictEqual(emptyGameBoard);
  });

  test("place ships at specific coordinate", () => {
    gameBoard.placeShip({ start: [3, 2], end: [3, 4] }, destroyer);

    const rangeOfCoordinate: IRangeOfCoordinate[] = [
      { range: [3, 1], expected: "undefined" },
      { range: [3, 2], expected: "exist" },
      { range: [3, 3], expected: "exist" },
      { range: [3, 4], expected: "exist" },
      { range: [3, 5], expected: "undefined" },
    ];

    rangeOfCoordinate.forEach((coordinate) => {
      if (coordinate.expected === "undefined")
        return expect(gameBoard.getShip(coordinate.range).ship).toBeUndefined();

      expect(gameBoard.getShip(coordinate.range).ship).toEqual(destroyer);
    });
  });

  test("return ships at specific coordinate", () => {
    expect(gameBoard.getShip([3, 2]).ship).toEqual(destroyer);
  });

  test("attack existing ship and increase it hit amount", () => {
    gameBoard.receiveAttack([3, 2]);
    expect(gameBoard.getShip([3, 2]).ship?.getHit()).toBe(1);
  });

  test("track missed shots", () => {
    gameBoard.receiveAttack([0, 0]);
    expect(gameBoard.getShip([0, 0]).isAttacked).toBe(true);
  });

  test("check if all ships have been sunk", () => {
    expect(gameBoard.isAllShipsSunk()).toBe(true);
  });
});
