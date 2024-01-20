const board = [[], [], []];
const toggleBorderButtonElement = document.querySelector('.js-toggle-border-button');
const restartButtonElement = document.querySelector('.js-restart-button');
let playerTurn = 'X'
let borderIsOn = false;

for (let row = 0; row < board.length; row++) {
  for (let col = 0; col < board.length; col++) {
    board[row].push('');
  }
}

renderBoard();

toggleBorderButtonElement.addEventListener('click', () => {
  const boardElement = document.querySelector('.js-board');
  if (!borderIsOn) {
    boardElement.style.border = "10px solid gray";
    borderIsOn = true;
  } else {
    boardElement.style.border = "none";
    borderIsOn = false;
  }
});

restartButtonElement.addEventListener('click', () => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      board[row][col] = '';
    }
  }
  playerTurn = 'X';
  restartButtonElement.classList.add('hidden');
  document.querySelector('.js-game-result').innerText = '';
  renderBoard();
});

function renderBoard() {
  const boardElement = document.querySelector('.js-board');
  let boardHTML = '';
  let currentRow = '';
  board.forEach((row, i) => {
    currentRow = '<div class="row">';
    row.forEach((col, j) => {
      currentRow += `
      <div class="js-square square">
        <p>${col}</p>
      </div>`;
    });
    currentRow += '</div>';
    boardHTML += currentRow;
  });
  boardElement.innerHTML = boardHTML;

  const squares = document.querySelectorAll('.js-square');
  let squareIndex = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      squares[squareIndex].addEventListener('click', () => {
        if (board[i][j] !== '') return;
        board[i][j] = playerTurn;
        renderBoard();
        if (gameIsWon()) {
          endGame(playerTurn);
        } else if (boardIsFilled()) {
          endGame('Tie');
        } else {
          if (playerTurn === 'X') playerTurn = 'O';
          else playerTurn = 'X';
        }
      });
      squareIndex++;
    }; 
  };
}

function gameIsWon() {
  for (let i = 0; i < board.length; i++) {
    if (board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] !== '') return true;
    if (board[0][i] === board[1][i] && board[0][i] === board[2][i] && board[0][i] !== '') return true;
  }
  if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== '') return true;
  if (board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== '') return true;
  return false;
}

function boardIsFilled() {
  let boardIsFilled = true
  for (let i = 0; i < board.length && boardIsFilled; i++) {
    for (let j = 0; j < board.length && boardIsFilled; j++) {
      if (board[i][j] === '') boardIsFilled = false;
    }
  }
  return boardIsFilled;
}

function endGame(winner) {
  const gameResultElement = document.querySelector('.js-game-result');
  const restartButtonElement = document.querySelector('.js-restart-button');
  board.forEach((row, i) => {
    row.forEach((col, j) => {
      if (col === '') board[i][j] = ' ';
    });
  });

  if (winner === 'X' || winner === 'O') gameResultElement.innerText = `${winner} Wins!`;
  else gameResultElement.innerText = 'Tie!';
  restartButtonElement.classList.remove('hidden');
  renderBoard();
}
