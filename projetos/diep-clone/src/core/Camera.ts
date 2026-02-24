export class Camera {
  x = 0;
  y = 0;
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  follow(targetX: number, targetY: number) {
    this.x = targetX - this.width / 2;
    this.y = targetY - this.height / 2;

    // 🔒 Limitar câmera
    this.x = Math.max(0, Math.min(this.x, 3000 - this.width));
    this.y = Math.max(0, Math.min(this.y, 3000 - this.height));
  }
}
