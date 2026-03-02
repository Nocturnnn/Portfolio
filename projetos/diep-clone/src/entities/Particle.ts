export class Particle {
  x: number;
  y: number;
  radius = 3;

  vx: number;
  vy: number;
  life = 0.5;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;

    const angle = Math.random() * Math.PI * 2;
    const speed = 100 + Math.random() * 200;

    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
  }

  update(delta: number) {
    this.x += this.vx * delta;
    this.y += this.vy * delta;

    this.vx *= 0.9;
    this.vy *= 0.9;

    this.life -= delta;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = Math.max(this.life * 2, 0);
    ctx.fillStyle = "#ffffff";

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 1;
  }

  isDead() {
    return this.life <= 0;
  }
}
