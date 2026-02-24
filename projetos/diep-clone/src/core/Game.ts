import { Player } from "../entities/Player";
import { Renderer } from "../render/Renderer";
import { Input } from "./Input";
import { Bullet } from "../entities/Bullet";
import { Camera } from "./Camera";

export class Game {
  private renderer = new Renderer();
  input = new Input(this.renderer.canvas);
  private player = new Player();
  private worldWidth = 3000;
  private worldHeight = 3000;
  private camera = new Camera(window.innerWidth, window.innerHeight);

  private bullets: Bullet[] = [];

  update(delta: number) {
    const worldMouseX = this.input.mouse.x + this.camera.x;
    const worldMouseY = this.input.mouse.y + this.camera.y;

    const adjustedInput = {
      keys: this.input.keys,
      mouse: {
        x: worldMouseX,
        y: worldMouseY,
        down: this.input.mouse.down,
      },
    };

    this.player.update(delta, adjustedInput, this.bullets);

    // 🔒 Limites do mundo
    this.player.x = Math.max(
      this.player.radius,
      Math.min(this.worldWidth - this.player.radius, this.player.x),
    );

    this.player.y = Math.max(
      this.player.radius,
      Math.min(this.worldHeight - this.player.radius, this.player.y),
    );

    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      bullet.update(delta);

      if (bullet.isDead()) {
        this.bullets.splice(i, 1);
      }
    }

    this.camera.follow(this.player.x, this.player.y);
  }

  render() {
    this.renderer.clear();

    const ctx = this.renderer.ctx;

    ctx.save();
    ctx.translate(-this.camera.x, -this.camera.y);

    // 🟦 Fundo quadriculado
    this.renderer.drawGrid(
      this.camera.x,
      this.camera.y,
      this.worldWidth,
      this.worldHeight,
    );

    this.player.draw(ctx);

    for (const bullet of this.bullets) {
      bullet.draw(ctx);
    }

    ctx.restore();
  }
}
