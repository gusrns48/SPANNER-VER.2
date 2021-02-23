const timeDiv = document.querySelector(".todo_header_time");

function paintTime(){
    const currentTime =  new Date;
    let currentTimeString = currentTime.toString().slice(15,25);
    timeDiv.innerHTML = currentTimeString;
}



function init(){
    setInterval(paintTime, 1000);
}

init();