import { describe, expect, test } from "@jest/globals";
import GameBoard from "../utils/GameBoard";
import Player from "../utils/Player";

describe("Player", () => {
  const player = Player();

  test("return an empty game board", () => {
    const emptyGameBoard = GameBoard();
    expect(player.getPlayerBoard().getBoard()).toEqual(
      emptyGameBoard.getBoard(),
    );
  });

  test("return random coordinate within the board", () => {
    const { x, y } = player.getRandomCoordinate();
    const range = {
      min: 0,
      max: 9,
    };
    const isInRangeOfCoordinate = player.getPlayerBoard().isInRangeOfCoordinate;

    expect(
      isInRangeOfCoordinate(x, range.min, range.max) &&
        isInRangeOfCoordinate(y, range.min, range.max),
    ).toBe(true);
  });

  test("attack random board without ship in it", () => {
    const { x, y } = player.randomLegalAttack();
    expect(player.getPlayerBoard().getShip([x, y]).isAttacked).toBe(true);
  });

  test("reset game board", () => {
    const emptyGameBoard = GameBoard();
    expect(player.getPlayerBoard().resetBoard()).toEqual(
      emptyGameBoard.getBoard(),
    );
  });
});
