let KeyTop = document.querySelectorAll(".top")
let KeyBot = document.querySelectorAll(".bot")
let time = 0
let animateLoop = setInterval(()=>{
    TimeOut(time)
    animatePlay()
    time++
    console.log(time)
},1000)
function TimeOut(t){ //時間到
    if(t>10){
        clearInterval(animateLoop)
    }
}
function randomIndex(max){ //亂數
    return Math.floor(Math.random() * max)
}
function animatePlay(){ //開始動畫
    KeyBot[randomIndex(KeyBot.length)].classList.add("playing")
}

function playHandler(e){
    clearInterval(animateLoop)
}

window.addEventListener('keyup',playHandler)