import { Game } from "./core/Game";
import { Loop } from "./core/Loop";

const game = new Game();
const loop = new Loop(
  (delta) => game.update(delta),
  () => game.render()
);

loop.start();