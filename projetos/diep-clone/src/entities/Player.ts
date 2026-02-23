import { Bullet } from "./Bullet";

export class Player {
  x = 400;
  y = 300;
  radius = 25;
  speed = 200;
  angle = 0;

  fireRate = 0.2; // segundos entre tiros
  fireCooldown = 0;

  update(delta: number, input: any, bullets: Bullet[]) {
    // Movimento
    if (input.keys["w"]) this.y -= this.speed * delta;
    if (input.keys["s"]) this.y += this.speed * delta;
    if (input.keys["a"]) this.x -= this.speed * delta;
    if (input.keys["d"]) this.x += this.speed * delta;

    // Rotação
    const dx = input.mouse.x - this.x;
    const dy = input.mouse.y - this.y;
    this.angle = Math.atan2(dy, dx);

    // Cooldown
    this.fireCooldown -= delta;

    if (this.fireCooldown <= 0) {
      this.shoot(bullets);
      this.fireCooldown = this.fireRate;
    }
  }

  shoot(bullets: Bullet[]) {
    const offset = this.radius + 10;

    const spawnX = this.x + Math.cos(this.angle) * offset;
    const spawnY = this.y + Math.sin(this.angle) * offset;

    bullets.push(new Bullet(spawnX, spawnY, this.angle));
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Corpo
    ctx.fillStyle = "#4cc9f0";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    // Cano
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    ctx.fillStyle = "#3a86ff";
    ctx.fillRect(0, -6, 40, 12);

    ctx.restore();
  }
}
