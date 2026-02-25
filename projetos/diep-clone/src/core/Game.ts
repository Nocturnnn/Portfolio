import { Player } from "../entities/Player";
import { Renderer } from "../render/Renderer";
import { Input } from "./Input";
import { Bullet } from "../entities/Bullet";
import { Camera } from "./Camera";
import { Shape } from "../entities/Shape";
import { Particle } from "../entities/Particle";

export class Game {
  private renderer = new Renderer();
  input = new Input(this.renderer.canvas);
  private player = new Player();
  private worldWidth = 3000;
  private worldHeight = 3000;
  private camera = new Camera(window.innerWidth, window.innerHeight);
  private bullets: Bullet[] = [];
  private shapes: Shape[] = [];
  private particles: Particle[] = [];

  constructor() {
    this.spawnShapes(100);
  }

  private spawnShapes(amount: number) {
    for (let i = 0; i < amount; i++) {
      const types: ("square" | "triangle" | "pentagon")[] = [
        "square",
        "triangle",
        "pentagon",
      ];

      const type = types[Math.floor(Math.random() * types.length)];

      const x = Math.random() * this.worldWidth;
      const y = Math.random() * this.worldHeight;

      this.shapes.push(new Shape(x, y, type));
    }
  }

  private handleCollisions() {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];

      for (let j = this.shapes.length - 1; j >= 0; j--) {
        const shape = this.shapes[j];

        const dx = bullet.x - shape.x;
        const dy = bullet.y - shape.y;

        const distanceSq = dx * dx + dy * dy;
        const radiusSum = bullet.radius + shape.radius;

        if (distanceSq <= radiusSum * radiusSum) {
          // 💥 aplicar dano
          shape.takeDamage(bullet.damage);

          // 💨 pequeno knockback no shape
          const dist = Math.sqrt(distanceSq) || 1;

          const nx = dx / dist;
          const ny = dy / dist;

          // força proporcional ao dano
          const impactForce = -200;

          shape.applyKnockback(nx * impactForce, ny * impactForce);

          // remover bala
          this.bullets.splice(i, 1);
          break;
        }
      }
    }
  }

  private spawnParticles(x: number, y: number) {
    for (let i = 0; i < 20; i++) {
      this.particles.push(new Particle(x, y));
    }
  }

  update(delta: number) {
    const worldMouseX = this.input.mouse.x + this.camera.x;
    const worldMouseY = this.input.mouse.y + this.camera.y;

    this.camera.updateSize(
      this.renderer.canvas.width,
      this.renderer.canvas.height,
    );

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

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.update(delta);

      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }

    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      bullet.update(delta);

      if (bullet.isDead()) {
        this.bullets.splice(i, 1);
      }
    }

    this.camera.follow(this.player.x, this.player.y);

    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i];
      shape.update(delta);

      if (shape.isDead()) {
        this.spawnParticles(shape.x, shape.y);
        this.shapes.splice(i, 1);
      }
    }

    this.handleCollisions();
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

    for (const shape of this.shapes) {
      shape.draw(ctx);
    }

    this.player.draw(ctx);

    for (const bullet of this.bullets) {
      bullet.draw(ctx);
    }

    for (const p of this.particles) {
      p.draw(ctx);
    }

    ctx.restore();
  }
}
