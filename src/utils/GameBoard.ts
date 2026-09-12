import type { IBoard, ICoordinate } from "../interfaces/GameBoardInterface";
import type { IShip } from "../interfaces/ShipInterface";

const GameBoard = () => {
  const gameBoard = Array.from(new Array(10), () =>
    [...new Array(10)].map(() => ({ ship: undefined, isAttacked: false })),
  ) as IBoard;

  const getBoard = () => gameBoard;

  const getShip = (coordinate: ICoordinate) => {
    const [x, y] = coordinate;

    return gameBoard[x][y];
  };

  const isInRangeOfCoordinate = (
    currentRange: number,
    min: number,
    max: number,
  ) => currentRange >= min && currentRange <= max;

  const placeShip = (
    coordinateRange: { start: ICoordinate; end: ICoordinate },
    ship: IShip,
  ) => {
    gameBoard.forEach((row, rowIndex) => {
      row.forEach((_, columnIndex) => {
        const currentBoard = getShip([rowIndex, columnIndex] as ICoordinate);

        const isInRange =
          isInRangeOfCoordinate(
            rowIndex,
            coordinateRange.start[0],
            coordinateRange.end[0],
          ) &&
          isInRangeOfCoordinate(
            columnIndex,
            coordinateRange.start[1],
            coordinateRange.end[1],
          );

        if (isInRange) {
          currentBoard.ship = ship;
        }
      });
    });
  };

  const receiveAttack = (coordinate: ICoordinate) => {
    const currentBoard = getShip(coordinate);
    currentBoard.ship?.hit();
    currentBoard.isAttacked = true;
  };

  return { getBoard, getShip, placeShip, receiveAttack };
};

export default GameBoard;
