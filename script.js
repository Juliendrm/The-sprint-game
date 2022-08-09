const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const runner = new Image();
runner.src = "/images/Sprite.png";

const sprite = {
  width: 128,
  height: 163,
  frameRate: 60,
  speed: 2,
  x: 0,
  y: 150,
  lastTimestamp: null,

  draw(timestamp) {
    const frame = Math.floor(timestamp / this.frameRate);
    const frameIndex = frame % 8;
    // how long since last frame?
    if (this.lastTimestamp) {
      const elapsedTime = timestamp - this.lastTimestamp;
      // move sprite along by speed * time
      this.x += (this.speed * elapsedTime) / 100;
    }

    this.x %= canvas.width;

    this.lastTimestamp = timestamp;

    // load image on canvas
    context.drawImage(
      runner,
      frameIndex * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width / 2,
      this.height / 2
    );
  },
};

requestAnimationFrame(updateCanvas);

function updateCanvas(timestamp) {
  requestAnimationFrame(updateCanvas);

  context.clearRect(0, 0, canvas.width, canvas.height);

  sprite.draw(timestamp);
}
