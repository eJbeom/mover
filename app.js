import { Pane } from "https://cdn.jsdelivr.net/npm/tweakpane@4.0.3/dist/tweakpane.min.js";

import Point from "./point.js";
import Mover from "./mover.js";

const MOVER = 10;
const C = {
  mouse_c: 0.65,
  frict_c: 0.3,
};

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.pane = new Pane();

    this.pane.addBinding(C, "mouse_c", { min: 0, max: 1, step: 0.01 });
    this.pane.addBinding(C, "frict_c", { min: 0, max: 1, step: 0.01 });

    this.mousePos = new Point();
    this.moverPos = Array.from({ length: MOVER }, () => new Mover());

    window.addEventListener("resize", this.resize.bind(this));
    this.resize();

    this.animate();

    this.pane.on("change", this.onPaneChange.bind(this));
    window.addEventListener("mousemove", this.onMove.bind(this));
  }

  resize() {
    this.stageWidth = this.canvas.clientWidth;
    this.stageHeight = this.canvas.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    for (let i = 0; i < this.moverPos.length; i++) {
      this.moverPos[i].resize(
        new Point(
          this.stageWidth / 2 + (Math.random() * 50 - 25),
          this.stageHeight / 2 + (Math.random() * 50 - 25)
        )
      );
    }
  }

  animate() {
    // setTimeout(() => {
    //   window.requestAnimationFrame(this.animate.bind(this));
    // }, 1000 / 20);
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.moverPos.length; i++) {
      const mouseForce = this.mousePos
        .clone()
        .sub(this.moverPos[i].pos)
        .norm()
        .mult(C.mouse_c);
      const frictForce = this.moverPos[i].vel
        .clone()
        .norm()
        .mult(-1)
        .mult(C.frict_c);

      this.moverPos[i].applyForce(mouseForce);
      this.moverPos[i].applyForce(frictForce);

      this.moverPos[i].animate(this.ctx);
    }
  }

  onPaneChange() {
    this.resize();
  }

  onMove(e) {
    this.mousePos.x = e.clientX;
    this.mousePos.y = e.clientY;
  }
}

window.onload = () => {
  new App();
};
