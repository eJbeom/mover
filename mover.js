import Point from "./point.js";

const MASS_RATIO = 10;
const MIN_LIMIT = 5;
const MAX_LIMIT = 10;

export default class Mover {
  constructor() {
    this.pos = new Point();
    this.vel = new Point();
    this.acc = new Point();
    this.angle = 0;
    this.aVel = 0;
    this.aAcc = 0;
    this.mass = Math.floor(Math.random() * 3 + 1);
    this.color = `rgba(
    ${50},
    ${96 + Math.random() * 45},
    ${168},
    ${0.5})`;
  }

  resize(pos) {
    this.pos = pos;
  }

  update() {
    this.vel.add(this.acc);
    this.limit(MIN_LIMIT, MAX_LIMIT);
    this.pos.add(this.vel);
    // this.aVel += this.aAcc;
    this.aVel += this.acc.x / 2;
    this.angle += this.aVel;
    this.acc.mult(0);
  }

  applyForce(pos) {
    this.acc.add(pos).div(this.mass);
  }

  limit(minSpeed, maxSpeed) {
    const speed = this.vel.mag();

    if (speed > maxSpeed) {
      this.vel.mult(maxSpeed / speed / this.mass);
    } else if (speed < minSpeed) {
      this.vel.mult(minSpeed / speed / this.mass);
    }
  }

  animate(ctx) {
    this.update();

    ctx.save();

    ctx.fillStyle = this.color;

    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate((this.angle * Math.PI) / 180);
    ctx.fillRect(
      -(this.mass * MASS_RATIO) / 2,
      -(this.mass * MASS_RATIO) / 2,
      this.mass * MASS_RATIO,
      this.mass * MASS_RATIO
    );

    ctx.restore();
  }
}
