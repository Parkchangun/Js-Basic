const body = document.querySelector("body");

const IMG_NUMBER = 4;

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function paintImage(imageNumber) {
  const image = new Image();
  image.src = `./images/${imageNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();