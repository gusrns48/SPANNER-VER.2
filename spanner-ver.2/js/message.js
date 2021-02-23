const container = document.querySelector(".js-message");
const p = container.querySelector("p");
const message = document.querySelector(".message-value");
const messages = [
  "inspiration",
  "todo",
  "weather",
  "quotes",
  "photography",
  "focus",
  "positivity",
  "motivation",
];

let cnt = 0;

const changeMessage = () => {
  cnt += 1;
  if (cnt >= messages.length) {
    cnt = 0;
  }
  width = cnt * 70;
  const nextMessage = messages[cnt];
  message.style.width = `${getWidth(nextMessage)}px`;
  message.innerText = nextMessage;
};

const getWidth = (text) => {
  const newSpan = document.createElement("span");
  newSpan.innerText = text;
  newSpan.style.display = "inline-block";
  newSpan.style.opacity = 0;
  p.appendChild(newSpan);
  const newWidth = newSpan.scrollWidth;
  p.removeChild(newSpan);
  return newWidth;
};

function init() {
  changeMessage();
  setInterval(changeMessage, 4000);
}

init();
