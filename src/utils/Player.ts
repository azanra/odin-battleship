import ADJACENT_COORDINATE from "../constants/adjacentCoordinate.ts";
import type {
  ICoordinate,
  ShipCoordinateRange,
} from "../interfaces/GameBoardInterface.ts";
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
      x: randomNumberOnRange(
        range.min,
        range.max,
      ) as unknown as ShipCoordinateRange,
      y: randomNumberOnRange(
        range.min,
        range.max,
      ) as unknown as ShipCoordinateRange,
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
      ]);

      if (!randomCoordinate.isAttacked) {
        playerBoard.receiveAttack([coordinate.x, coordinate.y] as ICoordinate);
        legalCoordinate = coordinate;
        isLegal = true;
      }
    }

    return legalCoordinate as unknown as ILegalCoordinate;
  };

  const getRandomAdjacentBoard = (coordinate: ICoordinate) => {
    const randomAdjacentCoordinate = ADJACENT_COORDINATE.map((item) => {
      const [x, y] = coordinate;

      return [x + item.x, y + item.y] as ICoordinate;
    }).filter((item) => {
      const [x, y] = item;
      const isInRangeOfCoordinate = GameBoard().isInRangeOfCoordinate;

      return isInRangeOfCoordinate(x, 0, 9) && isInRangeOfCoordinate(y, 0, 9);
    });

    const randomIntervalNumber = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const randomIndex = randomIntervalNumber(
      0,
      randomAdjacentCoordinate.length - 1,
    );

    return randomAdjacentCoordinate[randomIndex];
  };

  return {
    getPlayerBoard,
    getRandomCoordinate,
    randomLegalAttack,
    getRandomAdjacentBoard,
  };
};

export default Player;
