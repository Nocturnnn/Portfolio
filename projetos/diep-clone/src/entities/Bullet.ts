export class Bullet {
  x: number;
  y: number;
  radius = 6;
  speed = 500;
  damage = 8; // 💥 DANO DA BALA
  vx: number;
  vy: number;
  life = 2;

  constructor(x: number, y: number, angle: number, damage: number) {
    this.x = x;
    this.y = y;

    this.damage = damage;

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

    ctx.shadowColor = "#FF79C6";
    ctx.shadowBlur = 12;

    ctx.fillStyle = "#FF79C6";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    ctx.fillStyle = "#BD93F9";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }

  isDead() {
    return this.life <= 0;
  }
}
