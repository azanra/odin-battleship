import GameBoard from "./GameBoard";

const Player = () => {
  const playerBoard = GameBoard();

  const getBoard = () => playerBoard.getBoard();

  return { getBoard };
};

export default Player;
