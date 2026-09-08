import { describe, expect, test } from "@jest/globals";
import Ship from "../utils/Ship";
import GameBoard from "../utils/GameBoard";

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
    gameBoard.placeShip({ start: [3, 2], end: [3, 3] }, destroyer);
    expect(gameBoard.getShip([3, 2]).ship).toEqual(destroyer);
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
