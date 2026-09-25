import {
    getGrid,
    endGame,
    moveLeftAll,
    moveRightAll,
    moveUpAll,
    moveDownAll,
    getScore,
    getBestScore,
} from "./game.js";

let backgroundSound = new Audio(
    "https://raw.githubusercontent.com/khaled1955/mouth-sound/main/mouth%20sound%2026min.mp3",
);

setTimeout(() => {
    backgroundSound.play();
}, 500);

let upBtn = document.getElementById("btn-up");
let rightBtn = document.getElementById("btn-right");
let leftBtn = document.getElementById("btn-left");
let downtBtn = document.getElementById("btn-down");
let restartBtn = document.getElementById("restart-btn");
let rulesBtn = document.getElementById("rules-btn");
let gotItBtn = document.getElementById("got-it-btn");
let closeRulesBtn = document.getElementById("close-rules-btn");
let soundBtn = document.getElementById("sound-btn");

let score = document.getElementById("score");
let bestScore = document.getElementById("best-score");
let rulesModal = document.getElementById("rules-modal");
let soundIcon = document.getElementById("sound-icon");

document.addEventListener("keydown", (event) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault();

        if (event.key === "ArrowUp") {
            moveUpAll();
        } else if (event.key === "ArrowRight") {
            moveRightAll();
        } else if (event.key === "ArrowLeft") {
            moveLeftAll();
        } else if (event.key === "ArrowDown") {
            moveDownAll();
        }
        render();
    }
});
upBtn.addEventListener("click", () => {
    moveUpAll();
    render();
});
rightBtn.addEventListener("click", () => {
    moveRightAll();
    render();
});
leftBtn.addEventListener("click", () => {
    moveLeftAll();
    render();
});
downtBtn.addEventListener("click", () => {
    moveDownAll();
    render();
});
restartBtn.addEventListener("click", () => {
    endGame();
    setup();
    render();
});
rulesBtn.addEventListener("click", () => {
    rulesModal.classList.remove("hidden");
});
gotItBtn.addEventListener("click", () => {
    rulesModal.classList.add("hidden");
});
closeRulesBtn.addEventListener("click", () => {
    rulesModal.classList.add("hidden");
});
soundBtn.addEventListener("click", () => {
    if (soundIcon.classList.contains("fa-volume-high")) {
        backgroundSound.muted = true;
        soundIcon.classList.remove("fa-volume-high");
        soundIcon.classList.add("fa-volume-xmark");
    } else if (soundIcon.classList.contains("fa-volume-xmark")) {
        setTimeout(() => {
            backgroundSound.muted = false;
        }, 100);
        soundIcon.classList.remove("fa-volume-xmark");
        soundIcon.classList.add("fa-volume-high");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    render();
});

function render() {
    let gridCells = document.querySelectorAll(".grid-cell");
    let gridFromApp = getGrid();
    let index = 0;

    for (let row = 0; row < gridFromApp.length; row++) {
        for (let column = 0; column < gridFromApp[row].length; column++) {
            tileStyle(gridCells[index], gridFromApp[row][column]);
            if (gridFromApp[row][column] === 0) {
                gridCells[index].innerText = "";
            } else {
                gridCells[index].innerText = gridFromApp[row][column];
            }
            index++;
        }
    }

    score.innerText = getScore();
    bestScore.innerText = getBestScore();
    animationTiles();
}

function tileStyle(element, cell) {
    element.style.display = "flex";
    element.style.justifyContent = "center";
    element.style.alignItems = "center";

    element.className =
        "grid-cell rounded-lg transition-all duration-100 ease-in-out";

    if (cell !== 0) {
        element.classList.add(
            "tile",
            `tile-${cell}`,
            "font-bold",
            "text-2xl",
            "sm:text-3xl",
        );
    }
}

function animationTiles() {
    let gridCells = document.querySelectorAll(".grid-cell");

    gridCells.forEach((cell) => {
        cell.classList.add("tile-animation");

        setTimeout(() => {
            cell.classList.remove("tile-animation");
        }, 150);
    });
}
