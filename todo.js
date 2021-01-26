const toDoForm = document.querySelector(".js-toDoForm"),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector(".js-toDoList");
      
      
const TODOS_LS = 'toDos';
let toDosArray = [];
let idNumber = 1;
      
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if(loadedToDos !== null) {
    //string형식의 data들을 JSON.parse를 통해 object로 변환
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo){
      paintToDo(toDo.text);
    });
  }
}
//local storage안에 js의 data 저장 불가 >> string으로 변환해야하므로
//local storage는 모든 데이터를 string으로 저장하려 함!! >> JSON.stringify사용!
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDosArray));
}

function paintToDo(text) {
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const li = document.createElement("li");
  // newId = toDosArray.length + 1;
  const newId = idNumber;
  idNumber++;
  
  span.innerText = text;
  delBtn.innerHTML = "✖";
  delBtn.addEventListener("click", deleteToDo);
  
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;

  toDoList.appendChild(li);

  // array안에 2개 이상의 데이터 값을 넣어야하므로 object를 생성하여 처리
  const toDoObj = {
    text: text,
    id: newId
  };
  toDosArray.push(toDoObj);
  saveToDos();
}

function deleteToDo(event) {
  // HTML DELETE
  const btn = event.target;
  const li = btn.parentNode;
  
  while(toDoList.firstChild) {
    toDoList.removeChild(toDoList.firstChild);
  }
  idNumber = 1;

  //LOCALSTORAGE DELETE
  const cleanToDos = toDosArray.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  
  
  cleanToDos.forEach(function(toDo) {
    toDo.id = idNumber;
    paintToDo(toDo.text);
  });

  toDosArray = cleanToDos;
  saveToDos();
  


  
  
}

function handleSubmit(event) {
  event.preventDefault();
  const  currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}



function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit)
}
init();