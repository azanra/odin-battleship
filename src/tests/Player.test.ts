import { describe, expect, test } from "@jest/globals";
import GameBoard from "../utils/GameBoard";
import Player from "../utils/Player";

describe("Player", () => {
  const player = Player();

  test("return an empty game board", () => {
    const emptyGameBoard = GameBoard();
    expect(player.getBoard()).toEqual(emptyGameBoard.getBoard());
  });
});
