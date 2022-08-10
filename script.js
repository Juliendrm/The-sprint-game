const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const startBtn = document.querySelector(`.btn`);
canvas.width = document.body.clientWidth;
let animationId;

// Initialization of the runner
const runner1 = new Image();
runner1.src = "/images/Sprite.png";
const sprite1 = {
  width: 128,
  height: 165,
  frameRate: 50,
  speed: 1,
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
    sprite1.x / 5
  ).toFixed(2);
  sprite1.x; // Get the distance with the runner moving
  animationId = requestAnimationFrame(updateCanvas);
  //   console.log(animationId);
}

//Display character running when start button is clicked
startBtn.addEventListener("click", () => {
  updateCanvas();
});

//Countdown of 30seconds when player clicked start button
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

// Get a random keyboard touch (uppercasesm lowercases and numbers rom 0 to 9);
let array = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
];

const key = document.querySelector(".randomKey span");
let randomKey = Math.floor(Math.random() * array.length);
key.textContent = array[randomKey];
