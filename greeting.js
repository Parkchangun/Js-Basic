const form = document.querySelector(".js-form"),
input = form.querySelector("input"),
greeting = document.querySelector(".js-greetings");
const USER_LS = "currentUser",
SHOWING_CN = "showing";




function paintGreeting(text){
  form.classList.remove("showing");
  greeting.classList.add("showing");
  greeting.innerText = `Hello ${text}`
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit)
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = input.value;
  saveName(currentValue);
  paintGreeting(currentValue);
}

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}



function loadName(){
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null) {//not user
    askForName();
  } else {//user
    paintGreeting(currentUser);
  }
}


function init() {
  loadName();
}

init();