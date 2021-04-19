let scoreBoard = document.querySelector(".score")
let KeyTops = document.querySelectorAll(".top")
let KeyBots = [...document.querySelectorAll(".bot")]

let timeUp = true
let score = 0

let status = KeyBots.reduce((prev,current,index)=>{
    prev[index]=false
    return prev
},{})
KeyBotsProxy = new Proxy(status,{
    get(target,key){
        return target[key]
    },
    set(target,key,value){
        target[key] = value
        if(value){
            KeyBots[key].classList.add("playing")
        }else{
            KeyBots[key].classList.remove("playing")
        }
    }
})

function startGame(){//開始遊戲
    if(!timeUp) return
    showRandom()
    timeUp = false
    this.style.display = "none"
    setTimeout(()=>{
        timeUp = true
        this.style.display = "block"
        alert('TimeOut')
    },10000)
}
function setScore(s){//計算分數
    score = s;
    scoreBoard.textContent = score
}
function showRandom(){ //動畫亂數索引和時間
    const KeyBot = Math.floor(Math.random() * KeyBots.length)
    const time = Math.random() * (1500 - 1000) + 1000
    if(KeyBotsProxy[KeyBot]) return showRandom()
    setKetBots(KeyBot,time)
}
function setKetBots(KeyBot,time){ //哪幾個動畫啟動
    KeyBotsProxy[KeyBot] = true
    setTimeout(()=>{
        if(!timeUp) showRandom()
    },500)
    setTimeout(()=>{
        KeyBotsProxy[KeyBot] = false
    },time)
}

function playHandler(){
}
document.querySelector('.start').addEventListener('click',startGame)
window.addEventListener('keydown',playHandler)