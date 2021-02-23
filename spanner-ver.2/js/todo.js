const form = document.querySelector(".todo_footer_form");
const pending = document.querySelector(".todo_list_pending_ul");
const finished = document.querySelector(".todo_list_finished_ul");
const alert = document.querySelector(".todo_footer_alert");
const plusBtn = document.querySelector(".todo_footer_form_plus-icon");
const todoDate = document.querySelector(".todo_list_title");  
const todoTbody = document.querySelector("tbody");
const goTodayBtn = document.querySelector(".todo_list_pending_todayBtn");
const goTodayBtnText = goTodayBtn.querySelector(".todayBtn_text");
const monthOnCalender = document.querySelector(".calender_title_month");

let pendingArr = [];
let finishedArr = [];

function handleRewind(e) {
  const btn = e.target.parentNode.parentNode;
  finished.removeChild(btn);
  const id = btn.id;
  let value;
  finishedArr.map(each => each.id === id && (value = each.text));
  deleteDoneLS(id);
  makePendingList(value, id);
}
function setFinishedLS() {
  localStorage.setItem("finishedArr", JSON.stringify(finishedArr));
}
function makeDoneList(value, id, date) {
  const btnBox = document.createElement("span");
  const delBtn = document.createElement("button");
  delBtn.innerText = "✖️";
  const rewindBtn = document.createElement("button");
  rewindBtn.innerText = "➰";
  const newLi = document.createElement("li");
  const newId = id || Date.now().toString();
  newLi.id = newId;
  newLi.innerText = value;
  btnBox.appendChild(delBtn);
  btnBox.appendChild(rewindBtn);
  newLi.appendChild(btnBox);
  finished.appendChild(newLi);
  // need to fix
  const newDate = date; 
  const liObj = {
    id: newId,
    text: value,
    date : newDate
  };
    finishedArr.push(liObj);
    setFinishedLS();
  delBtn.addEventListener("click", handleDelete);
  rewindBtn.addEventListener("click", handleRewind);
}

function deleteLS(id) {
  const newToDos = pendingArr.filter(each => {
    return each.id !== id;
  });
  pendingArr = newToDos;
  setPendingLS();
}
function deleteDoneLS(id) {
  const newDones = finishedArr.filter(each => {
    return each.id !== id;
  });
  finishedArr = newDones;
  setFinishedLS();
}

function handleDelete(e) {
  const btn = e.target.parentNode.parentNode;
  let listName = btn.parentNode.className;
  const id = btn.id;
  if (listName === "todo_list_pending_ul") {
    pending.removeChild(btn);
    deleteLS(id);
  }
  if (listName === "todo_list_finished_ul") {
    finished.removeChild(btn);
    deleteDoneLS(id);
  }
}
function handleDone(e) {
  const btn = e.target.parentNode.parentNode;
  pending.removeChild(btn);
  const id = btn.id;
  console.log(btn)
  let value;
  let date;
  pendingArr.map(each => each.id === id && (value = each.text, date=each.date));
  deleteLS(id);
  makeDoneList(value, id, date);
}

function setPendingLS() {
  localStorage.setItem("pendingArr", JSON.stringify(pendingArr));
}
function makePendingList(value, id, date, refresh) {
  // create buttons.
  const btnBox = document.createElement("span");
  const delBtn = document.createElement("button");
  const doneBtn = document.createElement("button");
  delBtn.innerText = "✖️";
  doneBtn.innerText = "✔️";
  // create each list.
  const newLi = document.createElement("li");
  // get new id if it's new list
  const newId = id || Date.now().toString();
  newLi.id = newId;
  newLi.innerText = value;
  btnBox.appendChild(delBtn);
  btnBox.appendChild(doneBtn);
  newLi.appendChild(btnBox);
  pending.appendChild(newLi);
  form.task.value = "";

  const newDate = date || todoDate.innerText; 
 
  const liObj = {
    id: newId,
    text: value,
    date: newDate
  };
  pendingArr.push(liObj);
  setPendingLS();
  delBtn.addEventListener("click", handleDelete);
  doneBtn.addEventListener("click", handleDone);
}

function handleSubmit(e) {
  e.preventDefault();
  let value = form.task.value;
  if (value.length > 13) {
    alert.innerHTML = `⚠️ TEXTS MUST BE UNDER 12 LETTERS ⚠️ ( current input: ${
      value.length
    } )`;
  } else if(value.length === 0){
    return
  }
  else {
    alert.innerHTML = "";
    makePendingList(value);
  }
  paintDateWithPending();
}
function toFinishedArr(text,id,date){
  const otherDaysObj = {
    id,
    text,
    date
  }
  finishedArr.push(otherDaysObj);
}
function callFinishedLS() {
  const doneLS = localStorage.getItem("finishedArr");
  if (doneLS !== null) {
    finishedArr=[];
    const arr = JSON.parse(doneLS);
    arr.map(e => e.date === todoDate.innerText ? makeDoneList(e.text, e.id, e.date || null) 
                                               : toFinishedArr(e.text, e.id, e.date));
    setFinishedLS();
  }
}

function toPendingArr(text,id,date){
  const otherDaysObj = {
    id,
    text,
    date
  }
  pendingArr.push(otherDaysObj);
}

function callPendingLS() {
  const todosLS = localStorage.getItem("pendingArr");
  if (todosLS !== null) {
    pendingArr = [];
    const arr = JSON.parse(todosLS);
    arr.map( e => e.date === todoDate.innerText ?  makePendingList(e.text, e.id, e.date || null) 
                                               :  toPendingArr(e.text, e.id, e.date) );
    setPendingLS();
  }
}
function handlePlusBtn(){
    form.classList.add("display_block");
    plusBtn.removeEventListener("click", handlePlusBtn);
    plusBtn.addEventListener("click", hideInput);
}
function hideInput(){
    form.classList.remove("display_block");
    form.classList.add("display_none");
    plusBtn.removeEventListener("click", hideInput)
    plusBtn.addEventListener("click", handlePlusBtn);
}
function cleanUpTodo (){
  pending.innerHTML="";
  finished.innerHTML="";
}
function changeDate(){
  cleanUpTodo();
  callPendingLS();
  callFinishedLS();
}

// go today button function 
function handleGoToday(){
  // get today's data 
  const todayDate = new Date().getDate();
  // monthlist is in calender.js
  const thisMonth = monthList[new Date().getMonth()+1];
  const thisYear = new Date().getFullYear();

  const today = `${todayDate}, ${thisMonth}, ${thisYear}`;

  // if today's month is not equal to the month in the calender(calender title) -> click first sunday(okay to be any date)
  // because function works when date on todolist and today are different. 

  // when user is on other months.
  if(monthOnCalender.innerText !== thisMonth){
    tbody.querySelector("td.sunday").click();
  }

  const currentDate = todoDate.innerText;

  if(today === currentDate){
    return
  }else {
    // third argument is for clicking go today button
    paintThisMonth(null,null,true);
    document.getElementById("today").click();
  }
}

function init() {
  // from localstorage to DOM.
  callPendingLS();
  callFinishedLS();
  form.classList.add("display_none");
  // add task(input) submit event.
  form.addEventListener("submit", handleSubmit);
  plusBtn.addEventListener("click", handlePlusBtn);
  todoTbody.addEventListener("click", changeDate);
  // btn to go TODAY!
  goTodayBtn.addEventListener("click", handleGoToday);
}

init();