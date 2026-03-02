import { Player } from "../entities/Player";
import { Renderer } from "../render/Renderer";
import { Input } from "./Input";
import { Bullet } from "../entities/Bullet";
import { Camera } from "./Camera";
import { Profiler } from "./Profiler";
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
  private profiler = new Profiler();

  private isChoosingUpgrade = false;
  private availableUpgrades: string[] = [];

  constructor() {
    this.spawnShapes(1000);
  }

  private isInView(x: number, y: number, radius: number) {
    // desenha somente dentro da tela + uma margem para evitar pop-in
    const margin = 100;

    return (
      x + radius > this.camera.x - margin &&
      x - radius < this.camera.x + this.camera.width + margin &&
      y + radius > this.camera.y - margin &&
      y - radius < this.camera.y + this.camera.height + margin
    );
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

  private handleShapeCollisions() {
    for (let i = 0; i < this.shapes.length; i++) {
      for (let j = i + 1; j < this.shapes.length; j++) {
        const a = this.shapes[i];
        const b = this.shapes[j];

        const dx = b.x - a.x;
        const dy = b.y - a.y;

        const distanceSq = dx * dx + dy * dy;
        const minDist = a.radius + b.radius;

        if (distanceSq < minDist * minDist) {
          const distance = Math.sqrt(distanceSq) || 1;

          const nx = dx / distance;
          const ny = dy / distance;

          const overlap = minDist - distance;

          // 🧠 distribuição proporcional à massa
          const totalMass = a.mass + b.mass;

          const aRatio = b.mass / totalMass;
          const bRatio = a.mass / totalMass;

          // separar proporcionalmente
          a.x -= nx * overlap * aRatio;
          a.y -= ny * overlap * aRatio;

          b.x += nx * overlap * bRatio;
          b.y += ny * overlap * bRatio;

          // impacto proporcional
          const impact = 80;

          a.applyKnockback(-nx * impact * aRatio, -ny * impact * aRatio);
          b.applyKnockback(nx * impact * bRatio, ny * impact * bRatio);
        }
      }
    }
  }

  private handlePlayerCollisions() {
    for (const shape of this.shapes) {
      const dx = shape.x - this.player.x;
      const dy = shape.y - this.player.y;

      const distanceSq = dx * dx + dy * dy;
      const minDist = shape.radius + this.player.radius;

      if (distanceSq < minDist * minDist) {
        const distance = Math.sqrt(distanceSq) || 1;

        const nx = dx / distance;
        const ny = dy / distance;

        const overlap = minDist - distance;

        const totalMass = shape.mass + this.player.mass;

        const playerRatio = shape.mass / totalMass;
        const shapeRatio = this.player.mass / totalMass;

        // separar proporcionalmente
        this.player.x -= nx * overlap * playerRatio;
        this.player.y -= ny * overlap * playerRatio;

        shape.x += nx * overlap * shapeRatio;
        shape.y += ny * overlap * shapeRatio;

        const impact = 120;

        shape.applyKnockback(
          nx * impact * shapeRatio,
          ny * impact * shapeRatio,
        );

        this.player.recoilX -= nx * impact * playerRatio * 0.05;
        this.player.recoilY -= ny * impact * playerRatio * 0.05;
      }
    }
  }

  private drawUI() {
    const ctx = this.renderer.ctx;

    const barWidth = 280;
    const barHeight = 10;

    const x = this.renderer.canvas.width / 2 - barWidth / 2;
    const y = this.renderer.canvas.height - 35;

    const progress = this.player.xp / this.player.xpToNextLevel;

    ctx.save();

    // ===== FUNDO SUTIL =====
    ctx.fillStyle = "rgba(68, 71, 90, 0.35)"; // selection dracula transparente
    ctx.fillRect(x, y, barWidth, barHeight);

    // ===== XP =====
    ctx.fillStyle = "rgba(80, 250, 123, 0.7)"; // verde suave
    ctx.fillRect(x, y, barWidth * progress, barHeight);

    // ===== HIGHLIGHT VIDRO =====
    const highlight = ctx.createLinearGradient(x, y, x, y + barHeight);
    highlight.addColorStop(0, "rgba(255,255,255,0.12)");
    highlight.addColorStop(1, "rgba(255,255,255,0.02)");

    ctx.fillStyle = highlight;
    ctx.fillRect(x, y, barWidth, barHeight);

    // ====== TEXTO ======
    ctx.fillStyle = "rgba(248, 248, 242, 0.8)";
    ctx.font = "12px monospace";
    ctx.textAlign = "center";

    ctx.fillText(
      `Level ${this.player.level}  •  ${this.player.xp}/${this.player.xpToNextLevel}`,
      this.renderer.canvas.width / 2,
      y - 6,
    );

    ctx.restore();
  }

  private openUpgradeMenu() {
    this.isChoosingUpgrade = true;

    const all = ["damage", "fireRate", "speed"];

    // embaralhar e pegar 3
    this.availableUpgrades = all.sort(() => Math.random() - 0.5).slice(0, 3);
  }

  private handleUpgradeInput() {
    if (this.input.keys["1"]) {
      this.selectUpgrade(0);
    }
    if (this.input.keys["2"]) {
      this.selectUpgrade(1);
    }
    if (this.input.keys["3"]) {
      this.selectUpgrade(2);
    }
  }

  private selectUpgrade(index: number) {
    const upgrade = this.availableUpgrades[index];
    if (!upgrade) return;

    this.player.applyUpgrade(upgrade);

    this.isChoosingUpgrade = false;
  }

  private drawUpgradeMenu() {
    const ctx = this.renderer.ctx;

    ctx.save();

    // fundo escuro transparente
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(0, 0, this.renderer.canvas.width, this.renderer.canvas.height);

    ctx.fillStyle = "#F8F8F2";
    ctx.font = "20px monospace";
    ctx.textAlign = "center";

    ctx.fillText("Choose an Upgrade", this.renderer.canvas.width / 2, 150);

    this.availableUpgrades.forEach((up, i) => {
      ctx.fillStyle = "#BD93F9";
      ctx.fillText(
        `${i + 1} - ${up.toUpperCase()}`,
        this.renderer.canvas.width / 2,
        220 + i * 40,
      );
    });

    ctx.restore();
  }

  private spawnParticles(x: number, y: number) {
    for (let i = 0; i < 20; i++) {
      this.particles.push(new Particle(x, y));
    }
  }

  update(delta: number) {
    if (this.isChoosingUpgrade) {
      this.handleUpgradeInput();
      return;
    }

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
        this.spawnParticles(shape.x, shape.y); // efeito de partículas
        const leveledUp = this.player.addXP(shape.xpValue); // 🎯 dar XP
        if (leveledUp) {
          this.openUpgradeMenu();
        }

        this.shapes.splice(i, 1);
      }
    }

    this.handleCollisions(); // 💥 primeiro as balas, depois os shapes
    this.handleShapeCollisions(); // 🟢 depois as colisões entre shapes
    this.handlePlayerCollisions(); // 🟡 por último, colisões player-shape

    this.profiler.update(delta); // 📊 atualizar profiler ==> FPS
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
      if (this.isInView(shape.x, shape.y, shape.radius)) {
        // se estiver na tela
        shape.draw(ctx);
      }
    }

    this.player.draw(ctx);

    for (const bullet of this.bullets) {
      if (this.isInView(bullet.x, bullet.y, bullet.radius)) {
        bullet.draw(ctx);
      }
    }

    for (const p of this.particles) {
      if (this.isInView(p.x, p.y, p.radius)) {
        p.draw(ctx);
      }
    }

    ctx.restore();

    this.profiler.draw(this.renderer.ctx); // 📊 desenhar profiler ==> FPS
    this.drawUI(); // 🎮 desenhar UI (barra de XP)

    if (this.isChoosingUpgrade) {
      this.drawUpgradeMenu();
    }
  }
}
