import { describe, expect, test } from "@jest/globals";
import GameBoard from "../utils/GameBoard";

describe("Player", () => {
  const player = Player();

  test("return an empty game board", () => {
    const board = GameBoard();
    expect(player.getBoard()).toEqual(board);
  });
});
