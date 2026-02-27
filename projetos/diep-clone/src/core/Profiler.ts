export class Profiler {
  private fps = 0;
  private frameCount = 0;
  private timeAccumulator = 0;

  update(delta: number) {
    this.frameCount++;
    this.timeAccumulator += delta;

    if (this.timeAccumulator >= 0.5) {
      this.fps = Math.round(this.frameCount / this.timeAccumulator);
      this.frameCount = 0;
      this.timeAccumulator = 0;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();

    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(10, 10, 100, 40);

    ctx.fillStyle = "#50FA7B"; // verde dracula
    ctx.font = "bold 18px monospace";
    ctx.fillText(`FPS: ${this.fps}`, 20, 35);

    ctx.restore();
  }
}