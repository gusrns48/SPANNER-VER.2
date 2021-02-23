const body = document.querySelector("body");

const IMG_NUMBER = 3;

function getZoneInDay() {
  const date = new Date();
  const hours = date.getHours();

  if (hours < 12) {
    return "morning";
  } else if (hours < 18) {
    return "afternoon";
  } else {
    return "evening";
  }
}

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/${getZoneInDay()}/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
