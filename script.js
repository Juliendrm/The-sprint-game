const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const startBtn = document.querySelector(`.btn`);
const resetBtn = document.querySelector(".reset");
canvas.width = document.body.clientWidth;
let animationId;
const oneKey = document.querySelector(".keyDisplay span"); // For random key
let highscoreElement = document.querySelector("#highscore span");
let highscore = 0;
let distanceElement = document.querySelector("#distance span");
let distance = 0;
let intervalId = null;
let isGameStarted = false;
let intervalFrames = 0;

// Initialization of the runner
const runner1 = new Image();
runner1.src = "images/Sprite.png";
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
  move(timestamp) {
    // how long since last frame?
    if (this.lastTimestamp) {
      const elapsedTime = timestamp - this.lastTimestamp;
      // move sprite along by speed * time
      this.x += (this.speed * elapsedTime) / 100;
    }

    this.x %= canvas.width;

    this.lastTimestamp = timestamp;
  },
};

//
function updateCanvas(timestamp) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (isGameStarted) {
    sprite.move(timestamp);
  }
  sprite.draw(timestamp);

  distance = (sprite.x / 5).toFixed(2);
  distanceElement.textContent = distance;
  sprite.x; // Get the distance with the runner moving
  animationId = requestAnimationFrame(updateCanvas);
}

//Countdown of 30seconds when player clicked start button. It also display the character when button is pressed with updateCanvas() Also I linked distance with highscore.
let count = document.querySelector("#countdown");
let i = 30;
count.textContent = i;

startBtn.addEventListener("click", startTheGame);

function startTheGame() {
  if (isGameStarted || i === 0) {
    return;
  }

  isGameStarted = true;
  requestAnimationFrame(updateCanvas);
  intervalId = setInterval(() => {
    intervalFrames++;
    if (i > 0 && intervalFrames % 10 === 0) {
      i--;
    }
    count.textContent = `${i}`;

    if (intervalFrames % 7 === 0) {
      getRandomKey();
    }
    if (i === 0) {
      isGameStarted = false;
      clearInterval(intervalId);
      cancelAnimationFrame(animationId);

      if (highscore < distance) {
        highscore = distance;
        highscoreElement.textContent = highscore;
        alert("Well done, you beat your current highscore !");
      } else {
        alert("Looser, go back to loosertown");
      }
    }
  }, 100);
}
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
    }, 300);
  }
});

//reset game
resetBtn.addEventListener("click", () => {
  if (isGameStarted) {
    // can't reset while started
    return;
  }
  i = 30;
  distance = 0;
  intervalFrames = 0;
  sprite.x = 0;
  sprite.y = 165;
  sprite.lastTimestamp = null;
  highscoreElement.textContent = highscore;
  count.textContent = i;
  distanceElement.textContent = distance;
  context.clearRect(0, 0, canvas.width, canvas.height);
  sprite.draw(0);
});
