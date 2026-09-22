import Player from "./Player.ts";
import PlayerView from "./PlayerView.ts";

const Controller = (() => {
  const player = Player();
  const computer = Player();

  const playerView = PlayerView("player", player);
  const computerView = PlayerView("computer", computer);

  const startGame = () => {
    playerView.populate();

    computerView.populate();
    computerView.hideBoard();
    computerView.addListener("computer");
  };

  return { startGame };
})();

export default Controller;
