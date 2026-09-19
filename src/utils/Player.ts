import GameBoard from "./GameBoard.ts";

const Player = () => {
  const playerBoard = GameBoard();

  const getPlayerBoard = () => playerBoard;

  const randomNumberOnRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const getRandomCoordinate = () => {
    const range = {
      min: 0,
      max: 9,
    };

    return {
      x: randomNumberOnRange(range.min, range.max),
      y: randomNumberOnRange(range.min, range.max),
    };
  };

  return { getPlayerBoard, getRandomCoordinate };
};

export default Player;
