import { Bullet } from "./Bullet";

export class Player {
  x = 400;
  y = 300;

  xp = 0;
  level = 1;
  xpToNextLevel = 100;

  radius = 25;
  speed = 200;
  mass = 4;
  angle = 0;

  recoilX = 0;
  recoilY = 0;
  private recoil = 0;
  private recoilMax = 8; // quanto encurta
  private recoilSpeed = 20; // velocidade que volta

  fireRate = 0.2; // segundos entre tiros
  fireCooldown = 0;

  upgrades = {
    damage: 0,
    fireRate: 0,
    speed: 0,
  };

  update(delta: number, input: any, bullets: Bullet[]) {
    // 💥 aplicar recoil
    this.x += this.recoilX;
    this.y += this.recoilY;

    // Atualizar recoil visual
    if (this.recoil > 0) {
      this.recoil -= this.recoilSpeed * delta;
      if (this.recoil < 0) this.recoil = 0;
    }

    // desacelerar suavemente
    this.recoilX *= 0.85;
    this.recoilY *= 0.85;

    if (Math.abs(this.recoilX) < 0.01) this.recoilX = 0;
    if (Math.abs(this.recoilY) < 0.01) this.recoilY = 0;

    // ===== Movimento normal =====
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

    if (input.mouse.down && this.fireCooldown <= 0) {
      this.shoot(bullets);
      this.fireCooldown = this.fireRate;
    }
  }

  applyUpgrade(type: string) {
    switch (type) {
      case "damage":
        this.upgrades.damage++;
        break;

      case "fireRate":
        this.upgrades.fireRate++;
        this.fireRate *= 0.9; // atira mais rápido
        break;

      case "speed":
        this.upgrades.speed++;
        this.speed += 20;
        break;
    }
  }

  addXP(amount: number): boolean {
    this.xp += amount;

    let leveledUp = false;

    while (this.xp >= this.xpToNextLevel) {
      this.xp -= this.xpToNextLevel;
      this.level++;
      this.xpToNextLevel = Math.floor(this.xpToNextLevel * 1.2);
      leveledUp = true;
    }

    return leveledUp;
  }

  shoot(bullets: Bullet[]) {
    const offset = this.radius + 10;

    const spawnX = this.x + Math.cos(this.angle) * offset;
    const spawnY = this.y + Math.sin(this.angle) * offset;

    const damage = 8 + this.upgrades.damage * 2;
    bullets.push(new Bullet(spawnX, spawnY, this.angle, damage));

    // 💥 RECOIL VISUAL DO CANO
    this.recoil = this.recoilMax;

    // 💥 RECOIL Tank
    const force = 3; // ajuste aqui se quiser
    this.recoilX = -Math.cos(this.angle) * force;
    this.recoilY = -Math.sin(this.angle) * force;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // ====== CORPO ======
    ctx.save();

    // Sombra externa
    ctx.shadowColor = "rgba(189,147,249,0.4)"; // roxo glow
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 4;

    ctx.fillStyle = "#BD93F9"; // Purple (Dracula)
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Borda
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#bd93f9bd"; // Cyan
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();

    // ====== CANO ======
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    // Base do cano
    ctx.fillStyle = "#FF79C6"; // Pink
    ctx.beginPath();
    ctx.arc(0, 0, 11, 0, Math.PI * 2);
    ctx.fill();

    // Corpo do cano
    ctx.fillStyle = "#FF79C6"; // Cyan
    const baseBarrelLength = 50;
    const barrelLength = baseBarrelLength - this.recoil;
    ctx.fillRect(-this.recoil * 0.3, -8, barrelLength, 16);

    ctx.restore();

    // ====== CENTRO ======
    ctx.fillStyle = "#FF79C6"; // Pink
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 0.45, 0, Math.PI * 2);
    ctx.fill();
  }
}
