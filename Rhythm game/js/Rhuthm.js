let scoreBoard = document.querySelector(".score")
let KeyTops = document.querySelectorAll(".top")
let KeyBots = [...document.querySelectorAll(".bot")]
let GoTop
let TopLogo
let TopIndex
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
    setInterval(checkDep,10)
    this.style.display = "none"
    setTimeout(()=>{
        timeUp = true
        this.style.display = "block"
        clearInterval(checkDep)
        alert('TimeOut')
    },20000)
}

function setScore(s){//計算分數
    score = s;
    scoreBoard.textContent = score
}

function showRandom(){ //動畫亂數索引和時間
    const KeyBot = Math.floor(Math.random() * KeyBots.length)
    const time = Math.random() * (1000 - 500) + 1500
    if(KeyBotsProxy[KeyBot]) return showRandom()
    setKetBots(KeyBot,time)
}

function setKetBots(KeyBot,time){ //哪幾個動畫啟動
    KeyBotsProxy[KeyBot] = true
    setTimeout(()=>{
        if(!timeUp) showRandom()
    },1000)
    setTimeout(()=>{
        KeyBotsProxy[KeyBot] = false
    },time)
}

function playHandler(e){ //
    KeyTops.forEach((top,index)=>{
        if(top.dataset.key == e.keyCode){
            TopIndex = index
            GoTop = parseInt(window.getComputedStyle(KeyBots[index]).getPropertyValue("top"))
            TopLogo = parseInt(window.getComputedStyle(top).getPropertyValue("top"))
        }
    })
}

function checkDep (){
    // console.log(GoTop)
    if(GoTop > 25 && GoTop < 90){
        KeyBots[TopIndex].classList.remove('playing')
    }
}
//案鍵問題，還是有問題
document.querySelector('.start').addEventListener('click',startGame)
window.addEventListener('keydown',playHandler)