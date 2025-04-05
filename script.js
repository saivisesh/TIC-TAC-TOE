const board = Array(9).fill("");
let currentPlayer = "X";
let isGameOver = false;

const gameBoard = document.getElementById("gameBoard");
const statusText = document.getElementById("status");

function renderBoard() {
  gameBoard.innerHTML = "";
  board.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.dataset.index = index;
    div.innerText = cell;
    div.addEventListener("click", handleClick);
    gameBoard.appendChild(div);
  });
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] || isGameOver) return;

  board[index] = currentPlayer;
  renderBoard();

  if (checkWin(currentPlayer)) {
    statusText.innerText = `🎉 Player ${currentPlayer} wins!`;
    isGameOver = true;
    return;
  }

  if (board.every(cell => cell)) {
    statusText.innerText = "🤝 It's a draw!";
    isGameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.innerText = `Player ${currentPlayer}'s turn`;
}

function checkWin(player) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let i = 0; i < winPatterns.length; i++) {
    const [a, b, c] = winPatterns[i];
    if (board[a] === player && board[b] === player && board[c] === player) {
      const allCells = document.querySelectorAll(".cell");
      [a, b, c].forEach(index => {
        allCells[index].classList.add("win");
      });
      return true;
    }
  }

  return false;
}

function restartGame() {
  board.fill("");
  currentPlayer = "X";
  isGameOver = false;
  statusText.innerText = `Player X's turn`;
  renderBoard();
}

renderBoard();
