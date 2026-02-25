export class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  radius: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;

    const angle = Math.random() * Math.PI * 2;
    const speed = 50 + Math.random() * 150;

    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;

    this.life = 0.6 + Math.random() * 0.4;
    this.radius = 2 + Math.random() * 3;
  }

  update(delta: number) {
    this.x += this.vx * delta;
    this.y += this.vy * delta;
    this.life -= delta;

    this.vx *= 0.95;
    this.vy *= 0.95;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = Math.max(this.life, 0);

    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 1;
  }

  isDead() {
    return this.life <= 0;
  }
}