const canvas = document.querySelector('canvas');

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
const context = canvas.getContext("2d");

const runner = new Image();
runner.src ="./images/kisspng-sprite-2d-computer-graphics-video-games-character-index-of-ozcan-ders-rsprite-diger-5b7b65f47d2936.6027378215348136845127.png";

context.drawImage(runner, 40, 40, 150, 200);