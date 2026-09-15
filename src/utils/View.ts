import type { IBoard } from "../interfaces/GameBoardInterface";
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

  const main = () => {
    const player = Player();
    const computer = Player();

    renderBoard(player.getBoard(), playerContainer, "player");
    renderBoard(computer.getBoard(), computerContainer, "computer");
  };

  return { main };
};

export default View;
