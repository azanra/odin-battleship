import PlayerView from "./PlayerView.ts";

const Controller = () => {
  const playerView = PlayerView("player");
  const computerView = PlayerView("computer");

  const startGame = () => {
    playerView.populate();

    computerView.populate();
    computerView.hideBoard();
    computerView.addListener("computer");
  };

  return { startGame };
};

export default Controller;
