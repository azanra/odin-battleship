import PREDETERMINED_SHIP from "../constants/predeterminedShip.ts";
import type {
  BoardItem,
  IBoard,
  ICoordinate,
} from "../interfaces/GameBoardInterface.ts";
import type { IPredeterminedShip, IShip } from "../interfaces/ShipInterface.ts";
import Player from "./Player.ts";

const View = () => {
  const playerContainer = document.querySelector(`#player-container`);
  const computerContainer = document.querySelector("#computer-container");

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

  const main = () => {
    const player = Player();
    const computer = Player();

    renderBoard(player.getPlayerBoard().getBoard(), playerContainer, "player");
    renderBoard(
      computer.getPlayerBoard().getBoard(),
      computerContainer,
      "computer",
    );

    populateBoard(player.getPlayerBoard().placeShip, PREDETERMINED_SHIP);
    populateBoard(computer.getPlayerBoard().placeShip, PREDETERMINED_SHIP);

    markPlacedShipInBoard(
      player.getPlayerBoard().getBoard(),
      "player",
      player.getPlayerBoard().getShip,
    );
    markPlacedShipInBoard(
      computer.getPlayerBoard().getBoard(),
      "computer",
      computer.getPlayerBoard().getShip,
    );
  };

  return { main };
};

export default View;
