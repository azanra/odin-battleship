import "./styles.css";
import View from "./utils/View.ts";

const playerView = View("player");
playerView.populate();

const computerView = View("computer");
computerView.populate();
