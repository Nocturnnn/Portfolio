export class Bullet {
  x: number;
  y: number;
  radius = 6;
  speed = 500;
  vx: number;
  vy: number;
  life = 2; // segundos

  constructor(x: number, y: number, angle: number) {
    this.x = x;
    this.y = y;

    this.vx = Math.cos(angle) * this.speed;
    this.vy = Math.sin(angle) * this.speed;
  }

  update(delta: number) {
    this.x += this.vx * delta;
    this.y += this.vy * delta;

    this.life -= delta;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();

    // Glow externo
    ctx.shadowColor = "#FF79C6";
    ctx.shadowBlur = 12;

    // Corpo principal
    ctx.fillStyle = "#FF79C6";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Núcleo interno (contraste)
    ctx.fillStyle = "#BD93F9";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }

  isDead() {
    return this.life <= 0;
  }
}
