import PREDETERMINED_SHIP from "../constants/predeterminedShip.ts";
import REVEALED_COORDINATE from "../constants/revealedCoordinate.ts";
import type {
  ICoordinate,
  ShipCoordinateRange,
} from "../interfaces/GameBoardInterface.ts";
import type { IPlayerInterface } from "../interfaces/PlayerInterface.ts";
import type { IPredeterminedShip } from "../interfaces/ShipInterface.ts";

const PlayerView = (
  identifier: "player" | "computer",
  player: IPlayerInterface,
) => {
  const container = document.querySelector(`#${identifier}-container`);
  const rowIndexContainer = document.querySelector(
    `.${identifier}-row-index-container`,
  );
  const columnIndexContainer = document.querySelector(
    `.${identifier}-column-index-container`,
  );
  const randomButton = document.querySelector<HTMLButtonElement>(
    `#${identifier}-action-randomize`,
  );
  const positionButton = document.querySelector(
    `#${identifier}-action-position`,
  );
  const shipArea = document.querySelector("#ship-position-area");

  const renderBoard = (element: Element | null, identifier: string) => {
    const gameBoard = player.getPlayerBoard().getBoard();

    if (!element) return;

    gameBoard.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        const currentBoard = document.createElement("button");
        currentBoard.id = `${identifier}-row-${rowIndex}-col-${colIndex}`;
        currentBoard.className = `cell-${identifier} cell`;

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
    isShow = false,
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

  const populate = (isEmpty = false) => {
    renderBoard(container, identifier);
    if (!isEmpty) {
      populateBoard(PREDETERMINED_SHIP().randomizeShipCoordinate());
      markPlacedShipInBoard(identifier, true);
    }
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

  const addListener = (
    identifier: "player" | "computer",
    missCallback: () => void,
    hitCallback: () => void,
  ) => {
    const gameBoard = player.getPlayerBoard().getBoard();
    const getShip = player.getPlayerBoard().getShip;

    gameBoard.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        const currentBoard = getShip([rowIndex, colIndex] as ICoordinate);
        const currentCell = getCurrentCell(rowIndex, colIndex, identifier);

        if (!currentCell) return;

        currentCell.addEventListener("click", () => {
          if (currentBoard.isAttacked) return;

          player
            .getPlayerBoard()
            .receiveAttack([rowIndex, colIndex] as ICoordinate);

          updateBoardAfterAttack(
            rowIndex as ShipCoordinateRange,
            colIndex as ShipCoordinateRange,
            () => {
              disableButton();
              missCallback();
            },
            () => {
              hitCallback();
            },
          );
        });
      });
    });
  };

  const updateBoardAfterAttack = (
    rowIndex: ShipCoordinateRange,
    colIndex: ShipCoordinateRange,
    missCallback: () => void,
    hitCallback: () => void,
  ) => {
    const getShip = player.getPlayerBoard().getShip;

    const currentBoard = getShip([rowIndex, colIndex]);
    const currentCell = getCurrentCell(rowIndex, colIndex, identifier);

    if (!currentCell) return;

    if (!currentBoard.ship) {
      currentCell.classList.add("missed");
      currentCell.style.opacity = "0.5";

      missCallback();

      return;
    }

    currentCell.classList.add("attacked");
    currentCell.style.opacity = "0.75";
    currentCell.style.border = "1px solid red";

    revealAdjacentCell(rowIndex, colIndex, identifier);

    hitCallback();
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

  const disableButton = (isDisabled = true) => {
    const gameBoard = player.getPlayerBoard().getBoard();

    gameBoard.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        const currentCell = document.querySelector<HTMLButtonElement>(
          `#${identifier}-row-${rowIndex}-col-${colIndex}`,
        );

        if (!currentCell) return;

        currentCell.disabled = isDisabled;

        if (isDisabled) {
          currentCell.style.border = "1px solid";
          return;
        }
      });
    });
  };

  const resetGameBoard = () => {
    container?.replaceChildren();
    rowIndexContainer?.replaceChildren();
    columnIndexContainer?.replaceChildren();
    player.getPlayerBoard().resetBoard();
  };

  const randomAddListener = () => {
    if (!randomButton) return;

    randomButton.addEventListener("click", () => {
      resetGameBoard();
      populate();
    });
  };

  const disableRandomizerButton = (isDisabled = false) => {
    if (!randomButton) return;

    randomButton.disabled = isDisabled;
  };

  const positionListener = () => {
    const enemyIdentifier = identifier === "player" ? "computer" : "player";
    const enemyArea = document.querySelector<HTMLElement>(
      `#${enemyIdentifier}-area`,
    );

    if (!positionButton || !enemyArea || !shipArea) return;

    positionButton.addEventListener("click", () => {
      populateDraggableShip(enemyArea, shipArea);
      resetGameBoard();
      populate(true);
      dropListener();
    });
  };

  const populateDraggableShip = (enemyArea: HTMLElement, shipArea: Element) => {
    enemyArea.style.display = "none";

    PREDETERMINED_SHIP().ship.forEach((item) => {
      const { length, name } = item;
      const shipContainer = document.createElement("div");
      shipContainer.textContent = `${name}-${length}`;
      shipContainer.classList.add("ship-predetermined");
      shipContainer.draggable = true;

      shipContainer.addEventListener("dragstart", (event: Event) => {
        if (isDragEvent(event, "dragstart") && event.dataTransfer) {
          event.dataTransfer.effectAllowed = "move";
          event.dataTransfer.setData("ship", JSON.stringify(length));
          shipContainer.id = "dragged-ship";
        }
      });

      shipContainer.addEventListener("dragend", (event: Event) => {
        if (isDragEvent(event, "dragend")) {
          shipContainer.removeAttribute("id");
        }
      });

      shipArea.appendChild(shipContainer);
    });
  };

  const isDragEvent = (e: Event, type: string): e is DragEvent =>
    e.type === type;

  const dropListener = () => {
    const cellTarget = document.querySelectorAll(`.cell-${identifier}`);

    cellTarget.forEach((item) => {
      item.addEventListener("dragover", (event: Event) => {
        if (
          isDragEvent(event, "dragover") &&
          event.dataTransfer?.types.includes("ship")
        ) {
          event.preventDefault();
        }
      });

      item.addEventListener("dragenter", (event: Event) => {
        const draggedShip = document.querySelector("#dragged-ship");
        const length = Number(draggedShip?.textContent.split("-")[1]);

        const validLocation = document.querySelectorAll(".valid-location");

        validLocation.forEach((item) => {
          item.classList.remove("valid-location");
        });

        const notValidLocation = document.querySelectorAll(
          ".not-valid-location",
        );

        notValidLocation.forEach((item) => {
          item.classList.remove("not-valid-location");
        });

        if (!draggedShip) return;

        const currentId = item.id;
        const row = Number(currentId.split("-")[2]);
        const column = Number(currentId.split("-")[4]);

        for (let i = column; i < column + length; i++) {
          const nextItem = document.querySelector(
            `#${identifier}-row-${row}-col-${i}`,
          );

          if (!nextItem) {
            const validLocation = document.querySelectorAll(".valid-location");

            validLocation.forEach((item) => {
              item.classList.remove("valid-location");
              item.classList.add("not-valid-location");
            });

            return;
          }

          nextItem?.classList.add("valid-location");
        }
      });

      item.addEventListener("drop", (event: Event) => {
        const notValidLocation = document.querySelectorAll(
          ".not-valid-location",
        );

        const validLocation = document.querySelectorAll(".valid-location");

        if (notValidLocation.length !== 0) {
          validLocation.forEach((item) => {
            item.classList.remove("valid-location");
          });

          notValidLocation.forEach((item) => {
            item.classList.remove("not-valid-location");
          });

          return;
        }

        if (isDragEvent(event, "drop") && event.target) {
          event.preventDefault();
          const data = event.dataTransfer?.getData("ship");
          const draggedShip = document.querySelector("#dragged-ship");

          if (!data || !draggedShip) return;

          draggedShip.remove();
        }
      });
    });
  };

  return {
    populate,
    hideBoard,
    addListener,
    disableButton,
    markPlacedShipInBoard,
    getCurrentCell,
    updateBoardAfterAttack,
    resetGameBoard,
    randomAddListener,
    disableRandomizerButton,
    positionListener,
  };
};

export default PlayerView;
