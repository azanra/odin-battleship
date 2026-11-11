import Player from "./Player.ts";
import PlayerView from "./PlayerView.ts";

const Controller = (() => {
  const player = Player();
  const computer = Player();

  const playerView = PlayerView("player", player);
  const computerView = PlayerView("computer", computer);

  const startGameButton = document.querySelector("#game-action");
  const twoPlayerButton = document.querySelector("#two-player-action");

  let isSinglePlayer = true;

  const startGame = () => {
    if (!startGameButton || !twoPlayerButton) return;

    playerView.populate();
    playerView.randomAddListener();
    playerView.positionListener();
    playerView.axisListener();

    computerView.populate();
    computerView.randomAddListener();
    computerView.positionListener();
    computerView.axisListener();

    if (isSinglePlayer) {
      computerView.hideBoard();
    }

    computerView.disableRandomizerButton(isSinglePlayer);
    computerView.disableActionButton(isSinglePlayer);

    startGameButton.addEventListener("click", () => {
      playerView.disableRandomizerButton(true);
      playerView.disableActionButton(true);

      computerView.disableRandomizerButton(true);
      computerView.disableActionButton(true);

      if (isSinglePlayer) {
        computerView.addListener(
          "computer",
          () => setTimeout(() => computerTurn(), 2000),
          () => checkIsGameEnding(),
        );

        return;
      }

      computerView.addListener(
        "computer",
        () => {
          playerView.disableButton(false);
        },
        () => {
          checkIsGameEnding();
        },
      );

      playerView.addListener(
        "player",
        () => {
          computerView.disableButton(false);
        },
        () => {
          checkIsGameEnding();
        },
      );

      computerView.hideBoard();

      playerView.hideBoard();
      playerView.disableButton();
    });

    twoPlayerButton.addEventListener("click", () => {
      isSinglePlayer = !isSinglePlayer;
      twoPlayerButton.textContent = isSinglePlayer
        ? "Two Player"
        : "One Player";

      if (isSinglePlayer) {
        computerView.resetGameBoard();
        computerView.populate();
        computerView.hideBoard();
      }

      computerView.disableRandomizerButton(isSinglePlayer);
      computerView.disableActionButton(isSinglePlayer);
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
