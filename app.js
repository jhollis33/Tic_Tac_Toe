let boxes = document.querySelectorAll(".boxes");
let winner = document.querySelector("#winner");
let startBtn = document.querySelector("#startBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let choices = ["", "", "", "", "", "", "", "", ""];
let player = "X";
let playing = false;

function startGame(){
    boxes.forEach(cell => cell.addEventListener("click", cellClicked));
    startBtn.addEventListener("click", restartGame);
    winner.textContent = `It is your turn player ${player}`;
    playing = true;
}

function restartGame(){
    playerlayer = "X";
    choices = ["", "", "", "", "", "", "", "", ""];
    winner.textContent = `It is your turn player ${player}`;
    boxes.forEach(cell => cell.textContent = "");
    playing = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(choices[cellIndex] != "" || !playing){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index){
    choices[index] = player;
    cell.textContent = player;
}
function changePlayer(){
    player = (player == "X") ? "O" : "X";
    winner.textContent = `It is your turn player ${player}`;
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = choices[condition[0]];
        const cellB = choices[condition[1]];
        const cellC = choices[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        winner.textContent = `Player ${player} wins!`;
        playing = false;
    }
    else if(!choices.includes("")){
        winner.textContent = `It's a tie!`;
        playing = false;
    }
    else{
        changePlayer();
    }
}

startGame();