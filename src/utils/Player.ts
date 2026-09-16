import GameBoard from "./GameBoard.ts";

const Player = () => {
  const playerBoard = GameBoard();

  const getPlayerBoard = () => playerBoard;

  return { getPlayerBoard };
};

export default Player;
