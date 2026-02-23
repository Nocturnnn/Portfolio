import { Player } from "../entities/Player";
import { Renderer } from "../render/Renderer";
import { Input } from "./Input";
import { Bullet } from "../entities/Bullet";

export class Game {
  private renderer = new Renderer();
  private input = new Input(this.renderer.canvas);
  private player = new Player();

  private bullets: Bullet[] = [];

  update(delta: number) {
    this.player.update(delta, this.input, this.bullets);

    // Atualizar bullets
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      bullet.update(delta);

      if (bullet.isDead()) {
        this.bullets.splice(i, 1);
      }
    }
  }

  render() {
    this.renderer.clear();

    this.player.draw(this.renderer.ctx);

    for (const bullet of this.bullets) {
      bullet.draw(this.renderer.ctx);
    }
  }
}
