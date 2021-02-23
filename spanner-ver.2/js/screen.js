//  calender button 

const calBtn = document.querySelector(".todo_header_navs_calBtn");
const calender = document.getElementById("calender-container");
const appContainer = document.getElementById("app-container");

function showCalender(){
    calender.classList.remove("display_none");
    appContainer.style.width = "850px";
    calBtn.removeEventListener("click", showCalender);
    calBtn.addEventListener("click", hideCalender);
}

function hideCalender(){
    calender.classList.add("display_none");
    appContainer.style.width = "fit-content";
    calBtn.removeEventListener("click", hideCalender);
    calBtn.addEventListener("click", showCalender);

}

calBtn.addEventListener("click", hideCalender)