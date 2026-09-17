import PREDETERMINED_SHIP from "../constants/predeterminedShip.ts";
import type {
  BoardItem,
  IBoard,
  ICoordinate,
} from "../interfaces/GameBoardInterface.ts";
import type { IPredeterminedShip, IShip } from "../interfaces/ShipInterface.ts";
import Player from "./Player.ts";

const View = (identifier: "player" | "computer") => {
  const container = document.querySelector(`#${identifier}-container`);

  const rowIndexContainer = document.querySelector(
    `.${identifier}-row-index-container`,
  );
  const columnIndexContainer = document.querySelector(
    `.${identifier}-column-index-container`,
  );

  const renderBoard = (
    gameBoard: IBoard,
    element: Element | null,
    identifier: string,
  ) => {
    if (!element) return;

    gameBoard.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        const currentBoard = document.createElement("div");
        currentBoard.id = `${identifier}-row-${rowIndex}-col-${colIndex}`;
        currentBoard.className = "cell";

        element.appendChild(currentBoard);
      });
    });
  };

  const populateBoard = (
    placeShip: (
      coordinateRange: { start: ICoordinate; end: ICoordinate },
      ship: IShip,
    ) => void,
    predeterminedShip: IPredeterminedShip[],
  ) => {
    predeterminedShip.forEach((currentShip) => {
      placeShip(currentShip.coordinate, currentShip.ship);
    });
  };

  const markPlacedShipInBoard = (
    gameBoard: IBoard,
    identifier: "player" | "computer",
    getShip: (coordinate: ICoordinate) => BoardItem,
  ) => {
    gameBoard.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        const currentBoard = getShip([rowIndex, colIndex] as ICoordinate);

        const currentCell = document.querySelector<HTMLElement>(
          `#${identifier}-row-${rowIndex}-col-${colIndex}`,
        );

        if (!currentBoard.ship || !currentCell) return;

        currentCell.style.border = "1px solid blue";
        currentCell.style.opacity = "1";
      });
    });
  };

  const addIndexToBoard = () => {
    const listOfAlphabet = [...Array(10).keys()].map((utf) =>
      String.fromCharCode(utf + 65),
    );

    if (!rowIndexContainer || !columnIndexContainer) return;

    listOfAlphabet.map((alphabet, index) => {
      const alphabetIndex = document.createElement("span");
      const numberIndex = document.createElement("span");

      alphabetIndex.textContent = `${alphabet}`;
      numberIndex.textContent = `${index}`;

      rowIndexContainer.appendChild(alphabetIndex);
      columnIndexContainer.appendChild(numberIndex);
    });
  };

  const populate = () => {
    const player = Player();

    renderBoard(player.getPlayerBoard().getBoard(), container, identifier);

    populateBoard(player.getPlayerBoard().placeShip, PREDETERMINED_SHIP);

    markPlacedShipInBoard(
      player.getPlayerBoard().getBoard(),
      identifier,
      player.getPlayerBoard().getShip,
    );

    addIndexToBoard();
  };

  return { populate };
};

export default View;
