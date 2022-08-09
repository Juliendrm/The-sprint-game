const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const startBtn = document.querySelector(`.btn`);
canvas.width = document.body.clientWidth;
let animationId;

const runner1 = new Image();
runner1.src = "/images/Sprite.png";
const sprite1 = {
  width: 128,
  height: 165,
  frameRate: 30,
  speed: 2,
  x: 0,
  y: 165,
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
      runner1,
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

//
function updateCanvas(timestamp) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  sprite1.draw(timestamp);

  document.querySelector("#distance span").textContent = (
    sprite1.x / 4
  ).toFixed(2);
  sprite1.x; // Get the distance with the runner moving
  animationId = requestAnimationFrame(updateCanvas);
  //   console.log(animationId);
}

startBtn.addEventListener("click", () => {
  updateCanvas();
});

let count = document.querySelector("#countdown");
let i = 30;
count.textContent = 30;
startBtn.addEventListener("click", () => {
  setInterval(() => {
    if (i > 0) {
      i--;
    }
    count.textContent = `${i}`;
  }, 1000);
});
