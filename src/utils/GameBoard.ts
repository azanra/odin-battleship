import type { IBoard, ICoordinate } from "../interfaces/GameBoardInterface";

const GameBoard = () => {
  const board = Array.from(new Array(10), () =>
    [...new Array(10)].map(() => ({ ship: undefined, isAttacked: false })),
  ) as IBoard;

  const getBoard = () => board;

  const getShip = (coordinate: ICoordinate) => {
    const [x, y] = coordinate;

    return board[x][y];
  };

  return { getBoard, getShip };
};

export default GameBoard;
