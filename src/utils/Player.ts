import type { ICoordinate } from "../interfaces/GameBoardInterface.ts";
import type { ILegalCoordinate } from "../interfaces/PlayerInterface.ts";
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

  const randomLegalAttack = () => {
    let isLegal = false;
    let legalCoordinate;

    while (!isLegal) {
      const coordinate = getRandomCoordinate();
      const randomCoordinate = playerBoard.getShip([
        coordinate.x,
        coordinate.y,
      ] as ICoordinate);

      if (!randomCoordinate.isAttacked) {
        playerBoard.receiveAttack([coordinate.x, coordinate.y] as ICoordinate);
        legalCoordinate = coordinate;
        isLegal = true;
      }
    }

    return legalCoordinate as unknown as ILegalCoordinate;
  };

  return { getPlayerBoard, getRandomCoordinate, randomLegalAttack };
};

export default Player;
