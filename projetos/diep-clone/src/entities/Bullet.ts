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
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  isDead() {
    return this.life <= 0;
  }
}
