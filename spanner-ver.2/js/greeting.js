const form1 = document.querySelector(".js-form"),
  input = form1.querySelector("input"),
  greeting = document.querySelector(".js-greetings"),
  flashMessage = document.querySelector(".flash-message__container");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
};


function handleSubmit(event) {
  event.preventDefault();

  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
};

function askForName() {
  form1.classList.add(SHOWING_CN);
  form1.addEventListener("submit", handleSubmit);
};

function getZoneInDay() {
  const date = new Date();
  const hours = date.getHours();

  if (hours < 12) {
    return "Good Morning";
  } else if (hours < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  };
};

function paintGreeting(text) {
  form1.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  const zoneInDay = getZoneInDay();
  greeting.innerText = `${zoneInDay}, ${text}`;
  welcomeMessage(text);
};

function loadName(){
  const currentUser = localStorage.getItem("currentUser");
  if(currentUser == null){
      askForName();
  }else{
      paintGreeting(currentUser);
  };
};

function welcomeMessage(currentUser) {
  const span = document.createElement("span");
  span.innerText = `Welcome ${currentUser}`;

  flashMessage.appendChild(span);
  flashMessage.classList.add("flash");
};

function init(){
  loadName();
};

init();
