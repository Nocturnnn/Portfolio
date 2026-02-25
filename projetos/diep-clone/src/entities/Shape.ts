export type ShapeType = "square" | "triangle" | "pentagon";

export class Shape {
  x: number;
  y: number;
  radius: number;
  hp: number;
  maxHp: number;
  type: ShapeType;
  angle = 0;
  private vx: number;
  private vy: number;
  private moveSpeed: number;

  private targetAngle: number;
  private rotationSpeed: number = 2;

  private directionChangeTimer: number = 0;
  private rotationChangeTimer: number = 0;

  private knockbackX = 0;
  private knockbackY = 0;

  constructor(x: number, y: number, type: ShapeType) {
    this.x = x;
    this.y = y;
    this.type = type;

    if (type === "square") {
      this.radius = 20;
      this.hp = this.maxHp = 10;
    }

    if (type === "triangle") {
      this.radius = 25;
      this.hp = this.maxHp = 20;
    }

    if (type === "pentagon") {
      this.radius = 35;
      this.hp = this.maxHp = 60;
    }

    // 🎲 Movimento aleatório inicial
    this.moveSpeed = Math.random() * 15;

    const dir = Math.random() * Math.PI * 2;
    this.vx = Math.cos(dir) * this.moveSpeed;
    this.vy = Math.sin(dir) * this.moveSpeed;

    // 🎲 Rotação alvo aleatória
    this.angle = Math.random() * Math.PI * 2;
    this.targetAngle = Math.random() * Math.PI * 2;
  }

  update(delta: number) {
    // 💥 aplicar knockback acumulado
    this.x += this.knockbackX * delta;
    this.y += this.knockbackY * delta;

    // desacelerar knockback suavemente
    this.knockbackX *= 0.9;
    this.knockbackY *= 0.9;

    if (Math.abs(this.knockbackX) < 0.1) this.knockbackX = 0;
    if (Math.abs(this.knockbackY) < 0.1) this.knockbackY = 0;
    
    // ===== MOVIMENTO =====
    this.x += this.vx * delta;
    this.y += this.vy * delta;

    this.directionChangeTimer -= delta;

    if (this.directionChangeTimer <= 0) {
      const dir = Math.random() * Math.PI * 2;
      this.vx = Math.cos(dir) * this.moveSpeed;
      this.vy = Math.sin(dir) * this.moveSpeed;

      this.directionChangeTimer = 2 + Math.random() * 3;
    }

    // ===== ROTAÇÃO SUAVE =====
    const diff = this.targetAngle - this.angle;

    this.angle += diff * this.rotationSpeed * delta;

    this.rotationChangeTimer -= delta;

    if (this.rotationChangeTimer <= 0) {
      this.targetAngle = Math.random() * Math.PI * 2;
      this.rotationChangeTimer = 2 + Math.random() * 3;
    }
  }

  applyKnockback(forceX: number, forceY: number) {
    this.knockbackX += forceX;
    this.knockbackY += forceY;
  }

  takeDamage(amount: number) {
    this.hp -= amount;
  }

  isDead() {
    return this.hp <= 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    const sides = this.getSides();
    const fill = this.getFillColor();
    const stroke = this.getStrokeColor();

    // 🌟 Glow externo
    ctx.shadowColor = fill;
    ctx.shadowBlur = 20;

    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2;
      const px = Math.cos(angle) * this.radius;
      const py = Math.sin(angle) * this.radius;

      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();

    ctx.fillStyle = fill;
    ctx.fill();

    // Remove glow para não afetar stroke
    ctx.shadowBlur = 0;

    ctx.lineWidth = 4;
    ctx.strokeStyle = stroke;
    ctx.stroke();

    // ✨ Centro highlight
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(0, 0, this.radius * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.restore();
  }

  private getSides() {
    if (this.type === "square") return 4;
    if (this.type === "triangle") return 3;
    return 5;
  }

  private getFillColor() {
    if (this.type === "square") return "#F1FA8C"; // amarelo dracula
    if (this.type === "triangle") return "#FF79C6"; // pink
    return "#BD93F9"; // purple
  }

  private getStrokeColor() {
    if (this.type === "square") return "#E6DB74";
    if (this.type === "triangle") return "#FF92D0";
    return "#CFA9FF";
  }
}
