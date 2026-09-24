import {getGrid , endGame , moveLeftAll , moveRightAll , moveUpAll , moveDownAll , getScore , getBestScore, setup} from "./game.js";
let upBtn = document.getElementById("btn-up");
let rightBtn = document.getElementById("btn-right");
let leftBtn = document.getElementById("btn-left");
let downtBtn = document.getElementById("btn-down");
let restartBtn = document.getElementById("restart-btn");
let rulesBtn = document.getElementById("rules-btn");
let gotItBtn = document.getElementById("got-it-btn");
let closeRulesBtn = document.getElementById("close-rules-btn");

let score = document.getElementById("score");
let bestScore = document.getElementById("best-score");
let rulesModal = document.getElementById("rules-modal");

document.addEventListener("keydown" , (event) =>{
    event.preventDefault();
    if(event.key === "ArrowUp"){
        moveUpAll();
    }
    else if(event.key === "ArrowRight"){
        moveRightAll();
    }
    else if(event.key === "ArrowLeft"){
        moveLeftAll();
    }
    else if(event.key === "ArrowDown"){
        moveDownAll();
    }
    render();
});
upBtn.addEventListener("click" , () =>{
    moveUpAll();
    render();
});
rightBtn.addEventListener("click" , () =>{
    moveRightAll();
    render();
});
leftBtn.addEventListener("click" , () =>{
    moveLeftAll();
    render();
});
downtBtn.addEventListener("click" , () =>{
    moveDownAll();
    render();
});
restartBtn.addEventListener("click" , () =>{
    endGame();
    setup();
    render();
});
rulesBtn.addEventListener("click" , () =>{
    rulesModal.classList.remove("hidden");
});
gotItBtn.addEventListener("click" , () =>{
    rulesModal.classList.add("hidden");
});
closeRulesBtn.addEventListener("click" , () =>{
    rulesModal.classList.add("hidden");
});
document.addEventListener("DOMContentLoaded" , () =>{
    render();
});
function render(){  
    let gridCells = document.querySelectorAll(".grid-cell");
        let gridFromApp = getGrid();
        let index = 0;
        for(let row = 0 ; row < gridFromApp.length; row++){
            for(let column = 0 ; column < gridFromApp[row].length; column++){
                tileStyle(gridCells[index] , gridFromApp[row][column]);
                if(gridFromApp[row][column] === 0){
                    gridCells[index].innerText = "";
                }
                else{
                    gridCells[index].innerText = gridFromApp[row][column];
                }
                index++;
            }
        }
    score.innerText = getScore();
    bestScore.innerText = getBestScore();
    animationTiles();
}
function tileStyle(element , cell){
        element.style.display = "flex";
        element.style.justifyContent  = "center";
        element.style.alignItems  = "center";
    element.classList.forEach(className => {
        if(className.startsWith("tile-")){
            element.classList.remove(className)
        }
    });
    if(cell !== 0){
        element.classList.add(`tile-${cell}`);
    }
}
function animationTiles(){
    let gridCells = document.querySelectorAll(".grid-cell");

    gridCells.forEach(cell => {
        cell.classList.add("tile-animation");

        setTimeout(() =>{
            cell.classList.remove("tile-animation");
        }, 150);
    });
}
