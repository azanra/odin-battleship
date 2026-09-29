import Player from "./Player.ts";
import PlayerView from "./PlayerView.ts";

const Controller = (() => {
  const player = Player();
  const computer = Player();

  const playerView = PlayerView("player", player);
  const computerView = PlayerView("computer", computer);

  const startGameButton = document.querySelector("#game-action");

  const startGame = () => {
    if (!startGameButton) return;

    playerView.populate();
    playerView.randomAddListener();

    computerView.populate();
    computerView.randomAddListener();
    computerView.hideBoard();

    startGameButton.addEventListener("click", () => {
      playerView.disableRandomizerButton(true);
      computerView.disableRandomizerButton(true);

      computerView.addListener(
        "computer",
        () => setTimeout(() => computerTurn(), 2000),
        () => checkIsGameEnding(),
      );
    });
  };

  const computerTurn = () => {
    if (checkIsGameEnding()) return;

    const { x, y } = player.randomLegalAttack();
    playerView.updateBoardAfterAttack(
      x,
      y,
      () => {
        computerView.disableButton(false);
      },
      () => {
        setTimeout(() => computerTurn(), 2000);
      },
    );
  };

  const checkIsGameEnding = () => {
    const computerIsLose = computer.getPlayerBoard().isAllShipsSunk();
    const playerIsLose = player.getPlayerBoard().isAllShipsSunk();

    if (computerIsLose || playerIsLose) {
      alert(`${computerIsLose ? "player" : "computer"} is winning the game!`);

      playerView.resetGameBoard();
      computerView.resetGameBoard();
      playerView.disableRandomizerButton();
      computerView.disableRandomizerButton();

      startGame();

      return true;
    }

    return false;
  };

  return { startGame };
})();

export default Controller;
