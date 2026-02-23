export class Loop {
  private lastTime = 0;
  private update: (delta: number) => void;
  private render: () => void;

  constructor(update: (delta: number) => void, render: () => void) {
    this.update = update;
    this.render = render;
  }

  start() {
    requestAnimationFrame(this.frame);
  }

  private frame = (time: number) => {
    const delta = (time - this.lastTime) / 1000;
    this.lastTime = time;

    this.update(delta);
    this.render();

    requestAnimationFrame(this.frame);
  };
}
