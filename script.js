// Select elements and define variables
const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const restartButton = document.getElementById("restartBtn");
const winningMessage = document.getElementById("winMessage");
const winningMessageText = document.getElementById("winMessageText");
const roundsInput = document.getElementById("rounds");
const player_0_Class = "player_0";
const player_x_Class = "player_x";
const playerXScoreElement = document.getElementById("playerXScore");
const playerOScoreElement = document.getElementById("playerOScore");
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialize the game board
let isPlayer_0_Turn = false;
let playerXScore = 0;
let playerOScore = 0;
let totalRounds = 0;
let currentRound = 0;

// Add event listeners
restartButton.addEventListener("click", resetGame);

document.getElementById("startButton").addEventListener("click", function () {
  totalRounds = parseInt(roundsInput.value);
  if (isNaN(totalRounds) || totalRounds < 1) {
    alert("Please enter a valid number of rounds");
  } else {
    document.getElementById("startButton").disabled = true;
    currentRound = 0;
    playerXScore = 0;
    playerOScore = 0;
    playerXScoreElement.innerText = `Player X: ${playerXScore}`;
    playerOScoreElement.innerText = `Player O: ${playerOScore}`;
    startGame();
  }
});

function resetGame() {
  // Reset the scores and round count
  playerXScore = 0;
  playerOScore = 0;
  currentRound = 0;
  totalRounds = 0;

  // Clear the rounds input field and update score display
  roundsInput.value = "";
  playerXScoreElement.innerText = `Player X: ${playerXScore}`;
  playerOScoreElement.innerText = `Player O: ${playerOScore}`;

  // Enable the start button again
  document.getElementById("startButton").disabled = false;

  // Reset the game board
  startGame();

  // Refresh the page
  location.reload();
}

// Start game function
function startGame() {
  isPlayer_0_Turn = false;
  cells.forEach((cell) => {
    cell.classList.remove(player_x_Class);
    cell.classList.remove(player_0_Class);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessage.classList.remove("show");
}

// Handle click function
function handleClick(e) {
  const cell = e.target;
  const currentClass = isPlayer_0_Turn ? player_0_Class : player_x_Class;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    win(isPlayer_0_Turn ? "0" : "X");
  } else if (isDraw()) {
    draw();
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

// function to place a mark on the cell
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

// function to swap turns
function swapTurns() {
  isPlayer_0_Turn = !isPlayer_0_Turn;
}

// function to set board hover class
function setBoardHoverClass() {
  board.classList.remove(player_x_Class);
  board.classList.remove(player_0_Class);
  if (isPlayer_0_Turn) {
    board.classList.add(player_0_Class);
  } else {
    board.classList.add(player_x_Class);
  }
}

// checkWin function
function checkWin(currentClass) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

// win function
function win(player) {
  if (player === "0") {
    playerOScore++;
    playerOScoreElement.innerText = `Player O: ${playerOScore}`;
  } else {
    playerXScore++;
    playerXScoreElement.innerText = `Player X: ${playerXScore}`;
  }
  currentRound++;
  if (currentRound < totalRounds) {
    winningMessageText.innerText = `Player ${player} Wins! \n They now have ${
      player === "0" ? playerOScore : playerXScore
    } point(s).\n  Next round starting...`;
    winningMessage.classList.add("show");
    restartButton.disabled = true;
    setTimeout(startGame, 3000);
  } else {
    let gameWinner = "";
    if (playerXScore > playerOScore) {
      gameWinner = `Player X Wins the Game with ${playerXScore} points!`;
    } else if (playerOScore > playerXScore) {
      gameWinner = `Player O Wins the Game with ${playerOScore} points!`;
    } else {
      gameWinner = `The Game is a Draw! \n  Both players have ${playerXScore} points!`;
    }
    winningMessageText.innerText = `${gameWinner} \n Game Over.`;
    winningMessage.classList.add("show");
    restartButton.disabled = false;
  }
}

// isDraw function
function isDraw() {
  return [...cells].every((cell) => {
    return (
      cell.classList.contains(player_0_Class) ||
      cell.classList.contains(player_x_Class)
    );
  });
}

// draw function
function draw() {
  currentRound++;
  if (currentRound < rounds) {
    winningMessageText.innerText = `It's a Draw!\n  Next round starting...`;
    winningMessage.classList.add("show");
    setTimeout(startGame, 3000);
  } else {
    winningMessageText.innerText = `It's a Draw!\n  Game Over.`;
    winningMessage.classList.add("show");
    restartButton.disabled = false;
  }
}

// Dark Mode functionality

document
  .getElementById("darkmodeToggle")
  .addEventListener("change", function () {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".container").classList.toggle("dark-mode");
    document.querySelector(".game__title").classList.toggle("dark-mode");
    document.querySelector(".game__instructions").classList.toggle("dark-mode");
    document.querySelector("#playerXScore").classList.toggle("dark-mode");
    document.querySelector("#playerOScore").classList.toggle("dark-mode");
    document
      .querySelector(".game__status__message")
      .classList.toggle("dark-mode");
    document
      .querySelector(".game__status__restart")
      .classList.toggle("dark-mode");
    document.querySelector(".game__board").classList.toggle("dark-mode");
    const cells = document.querySelectorAll(".game__board__cell");
    cells.forEach((cell) => cell.classList.toggle("dark-mode"));
    document.querySelector("#startButton").classList.toggle("dark-mode");
    document.querySelector(".score-board").classList.toggle("dark-mode");
  });
