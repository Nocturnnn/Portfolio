export class Renderer {
  public ctx: CanvasRenderingContext2D;
  public canvas: HTMLCanvasElement;

  constructor() {
    this.canvas = document.getElementById("game") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    this.resize();
    window.addEventListener("resize", this.resize);
  }

  private resize = () => {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  };

  drawGrid(
    cameraX: number,
    cameraY: number,
    worldWidth: number,
    worldHeight: number,
  ) {
    const size = 50; // tamanho do grid
    const ctx = this.ctx;

    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 1;

    const startX = Math.floor(cameraX / size) * size;
    const startY = Math.floor(cameraY / size) * size;

    const endX = cameraX + this.canvas.width;
    const endY = cameraY + this.canvas.height;

    ctx.beginPath();

    // Linhas verticais
    for (let x = startX; x <= endX; x += size) {
      ctx.moveTo(x, cameraY);
      ctx.lineTo(x, endY);
    }

    // Linhas horizontais
    for (let y = startY; y <= endY; y += size) {
      ctx.moveTo(cameraX, y);
      ctx.lineTo(endX, y);
    }

    ctx.stroke();
  }

  clear() {
    this.ctx.fillStyle = "#111";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
