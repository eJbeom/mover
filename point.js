export default class Point {
  constructor(x, y) {
    this.x = x ?? 0;
    this.y = y ?? 0;
  }

  add(point) {
    this.x += point.x;
    this.y += point.y;

    return this;
  }

  sub(point) {
    this.x -= point.x;
    this.y -= point.y;

    return this;
  }

  mult(scala) {
    this.x *= scala;
    this.y *= scala;

    return this;
  }

  div(scala) {
    this.x /= scala;
    this.y /= scala;

    return this;
  }

  norm() {
    const mag = this.mag();

    if (mag > 0) {
      this.x /= mag;
      this.y /= mag;
    }

    return this;
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  clone() {
    return new Point(this.x, this.y);
  }
}
