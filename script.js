/* 'use strict'; */

const settings = {
    blockNumbers: 20,
    rowNumbers: 5,
    gameBoard: null,
    gameScore: null,
    blocks: [],
    checkedBloks: [],
    moves: 0,
    blockImages: [
        'img_01.png',
        'img_02.png',
        'img_03.png',
        'img_04.png',
        'img_05.png',
        'img_06.png',
        'img_07.png',
        'img_08.png',
        'img_09.png',
        'img_10.png',
        'img_11.png',
        'img_12.png',
        'img_13.png',
        'img_14.png',
        'img_15.png',
        'img_16.png',
        'img_17.png',
        'img_18.png',
        'img_19.png',
        'img_20.png',
        'img_21.png',
        'img_22.png',
        'img_23.png'
    ],
    canGet: true, //czy można klikać na kafelki
    tilePairs: 0,
}
let { blockNumbers, rowNumbers, gameBoard, gameScore, blocks, checkedBloks, moves, blockImages, canGet, tilePairs } = settings;


/* randomizuje elementy w tablicy blockImages */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function startGame() {
    //console.log(blocks, blockNumbers, checkedBloks, moves, blockImages);
    gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = '';

    scoreBoard = document.querySelector('.game-score');
    scoreBoard.innerHTML = '';

    blocks = [];
    checkedBloks = [];
    moves = 0;
    canGet = true;
    tilePairs = 0;

    shuffle(blockImages);

    //generujemy tablicę numerów kocków (parami)
    for (let i = 0; i < blockNumbers; i++) {
        blocks.push(Math.floor(i / 2));
    }

    //i ją mieszamy
    for (let i = blockNumbers - 1; i > 0; i--) {
        const swap = Math.floor(Math.random() * i);
        const tmp = blocks[i];
        blocks[i] = blocks[swap];
        blocks[swap] = tmp;
    }

    for (let i = 0; i < blockNumbers; i++) {
        const tile = document.createElement("div");
        tile.classList.add("game-tile");
        gameBoard.appendChild(tile);

        tile.dataset.cardType = blocks[i];
        tile.dataset.index = i;
        tile.style.left = 10 + (tile.offsetWidth + 10) * (i % rowNumbers) + "px";
        tile.style.top = 10 + (tile.offsetHeight + 10) * (Math.floor(i / rowNumbers)) + "px";

        tile.addEventListener("click", this.tileClick.bind(this));
    }

}

function tileClick(e) {
    //console.log(blockImages)
    if (canGet) {
        //jeżeli jeszcze nie pobraliśmy 1 elementu
        //lub jeżeli index tego elementu nie istnieje w pobranych...
        if (!checkedBloks[0] || (checkedBloks[0].dataset.index !== e.target.dataset.index)) {
            checkedBloks.push(e.target);
            e.target.style.backgroundImage = "url(./imgs/" + blockImages[e.target.dataset.cardType] + ")";
        }

        if (checkedBloks.length === 2) {
            canGet = false;

            if (checkedBloks[0].dataset.cardType === checkedBloks[1].dataset.cardType) {
                setTimeout(deleteTiles.bind(this), 1000);
            } else {
                setTimeout(resetTiles.bind(this), 1000);
            }

            moves++;
            scoreBoard.innerText = moves;
        }
    }
}

function deleteTiles() {
    checkedBloks[0].remove();
    checkedBloks[1].remove();

    canGet = true;
    checkedBloks = [];

    tilePairs++;
    if (tilePairs >= blockNumbers / 2) {
        alert("Udało ci się odgadnąć wszystkie obrazki");
    }
}

function resetTiles() {
    checkedBloks[0].style.backgroundImage = "url(./imgs/ppn.png)";
    checkedBloks[1].style.backgroundImage = "url(./imgs/ppn.png)";

    checkedBloks = [];
    canGet = true;
}




document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('start-game');
    startBtn.addEventListener('click', () => startGame());
});