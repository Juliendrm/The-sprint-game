const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const startBtn = document.querySelector(`.btn`);
canvas.width = document.body.clientWidth;
let animationId;
const oneKey = document.querySelector(".randomKey span"); // For random key
let highscoreElement = document.querySelector("#highscore span");
let highscore = 0;
let distanceElement = document.querySelector("#distance span");
let distance = 0;
let intervalId = null;

// Initialization of the runner
const runner1 = new Image();
runner1.src = "/images/Sprite.png";
const sprite = {
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

  sprite.draw(timestamp);

  distance = (sprite.x / 5).toFixed(2);
  distanceElement.textContent = distance;
  sprite.x; // Get the distance with the runner moving
  animationId = requestAnimationFrame(updateCanvas);
  //   console.log(animationId);
}

//Countdown of 30seconds when player clicked start button. It also display the character when button is pressed with updateCanvas()
let count = document.querySelector("#countdown");
let i = 30;
let changeLetterTiming = 0;
count.textContent = 30;

startBtn.addEventListener(
  "click",
  () => {
    updateCanvas();
    intervalId = setInterval(() => {
      if (i > 0) {
        i--;
      }
      count.textContent = `${i}`;
      changeLetterTiming++;
      if (changeLetterTiming === 1) {
        getRandomKey();
        changeLetterTiming = 0;
      }
      if (i === 0) {
        clearInterval(intervalId);
        cancelAnimationFrame(animationId);

        if (highscore < distance) {
          highscore = distance;
          highscoreElement.textContent = highscore;
        }
      }
    }, 1000);
  },
  { once: true }
);

// Get a random keyboard touch (lowercases and numbers rom 0 to 9);
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

function getRandomKey() {
  let randomKey = Math.floor(Math.random() * array.length);
  oneKey.textContent = array[randomKey];
}

// Effect of touching the right key
document.addEventListener("keydown", function event(event) {
  if (oneKey.textContent === event.key) {
    // console.log(oneKey.textContent, event.key);
    sprite.speed = 8;
    setTimeout(() => {
      sprite.speed = 2;
    }, 400);
  }
});

// Link the highscore with the distance
