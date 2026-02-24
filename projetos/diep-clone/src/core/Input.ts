export class Input {
  keys: Record<string, boolean> = {};
  mouse = {
    x: 0,
    y: 0,
    down: false,
  };

  constructor(canvas: HTMLCanvasElement) {
    window.addEventListener("keydown", (e) => {
      this.keys[e.key.toLowerCase()] = true;
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    window.addEventListener("mousedown", (e) => {
      if (e.button === 0) this.mouse.down = true;
    });

    window.addEventListener("mouseup", (e) => {
      if (e.button === 0) this.mouse.down = false;
    });
  }
}
