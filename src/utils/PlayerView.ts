import PREDETERMINED_SHIP from "../constants/predeterminedShip.ts";
import REVEALED_COORDINATE from "../constants/revealedCoordinate.ts";
import type { ICoordinate } from "../interfaces/GameBoardInterface.ts";
import type { IPredeterminedShip } from "../interfaces/ShipInterface.ts";
import Player from "./Player.ts";

const PlayerView = (identifier: "player" | "computer") => {
  const player = Player();

  const container = document.querySelector(`#${identifier}-container`);
  const rowIndexContainer = document.querySelector(
    `.${identifier}-row-index-container`,
  );
  const columnIndexContainer = document.querySelector(
    `.${identifier}-column-index-container`,
  );

  const renderBoard = (element: Element | null, identifier: string) => {
    const gameBoard = player.getPlayerBoard().getBoard();

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

  const populateBoard = (predeterminedShip: IPredeterminedShip[]) => {
    const placeShip = player.getPlayerBoard().placeShip;

    predeterminedShip.forEach((currentShip) => {
      placeShip(currentShip.coordinate, currentShip.ship);
    });
  };

  const markPlacedShipInBoard = (
    identifier: "player" | "computer",
    isShow?: boolean,
  ) => {
    const gameBoard = player.getPlayerBoard().getBoard();
    const getShip = player.getPlayerBoard().getShip;

    gameBoard.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        const currentBoard = getShip([rowIndex, colIndex] as ICoordinate);

        const currentCell = getCurrentCell(rowIndex, colIndex, identifier);
        if (!currentBoard.ship || !currentCell) return;

        currentCell.style.border = isShow
          ? "1px solid blue"
          : "1px solid black";
        currentCell.style.opacity = isShow ? "0.75" : "0.15";
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
    renderBoard(container, identifier);
    populateBoard(PREDETERMINED_SHIP);
    markPlacedShipInBoard(identifier, true);
    addIndexToBoard();
  };

  const hideBoard = () => {
    markPlacedShipInBoard(identifier);
  };

  const getCurrentCell = (
    row: number,
    col: number,
    identifier: "player" | "computer",
  ) => {
    return document.querySelector<HTMLElement>(
      `#${identifier}-row-${row}-col-${col}`,
    );
  };

  const addListener = (identifier: "player" | "computer") => {
    const gameBoard = player.getPlayerBoard().getBoard();
    const getShip = player.getPlayerBoard().getShip;

    gameBoard.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        const currentBoard = getShip([rowIndex, colIndex] as ICoordinate);

        const currentCell = getCurrentCell(rowIndex, colIndex, identifier);

        if (!currentCell) return;

        currentCell.addEventListener("click", () => {
          if (currentBoard.isAttacked) return;

          currentBoard.isAttacked = true;

          if (!currentBoard.ship) {
            currentCell.classList.add("missed");
            currentCell.style.opacity = "0.5";
            return;
          }

          currentBoard.ship.hit();
          currentCell.classList.add("attacked");
          currentCell.style.opacity = "0.75";
          currentCell.style.border = "1px solid red";

          revealAdjacentCell(rowIndex, colIndex, identifier);
        });
      });
    });
  };

  const revealAdjacentCell = (
    row: number,
    col: number,
    identifier: "player" | "computer",
  ) => {
    const isInRangeOfCoordinate = player.getPlayerBoard().isInRangeOfCoordinate;
    const getShip = player.getPlayerBoard().getShip;

    const validRange = {
      min: 0,
      max: 9,
    };

    REVEALED_COORDINATE.map((coordinate) => {
      return { x: row + coordinate.x, y: col + coordinate.y };
    })
      .filter((coordinate) => {
        return (
          isInRangeOfCoordinate(coordinate.x, validRange.min, validRange.max) &&
          isInRangeOfCoordinate(coordinate.y, validRange.min, validRange.max)
        );
      })
      .forEach((cell) => {
        const currentBoard = getShip([cell.x, cell.y] as ICoordinate);
        const currentCell = getCurrentCell(cell.x, cell.y, identifier);

        if (!currentCell || currentBoard.ship || currentBoard.isAttacked)
          return;

        currentBoard.isAttacked = true;
        currentCell.style.opacity = "0.5";
        currentCell.classList.add("missed");
      });
  };

  return { populate, hideBoard, addListener };
};

export default PlayerView;
