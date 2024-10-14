let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0};
let isAutoPlaying = false;
let intervalID = null;

updateScoreElement();

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});
document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});
document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
  autoPlayGame(document.querySelector('.js-auto-play-button'));
});
document.querySelector('.js-reset-score-button').addEventListener('click', resetScore);
document.body.addEventListener('keydown', event => {
  if (event.key.toLowerCase() === 'a') autoPlayGame(document.querySelector('.js-auto-play-button'));
  if (event.key === 'Backspace') {
    resetScore();
  };
});



function playGame(playerMove) {
  const computerPick = pickComputerMove();
  let result = '';
  
  if (playerMove === 'rock') {
    if (computerPick === 'rock') {
      result = 'tied';
    } else if (computerPick === 'paper') {
      result = 'lose';
    } else {
      result = 'win';
    }
  } else if (playerMove === 'paper') {
    if (computerPick === 'rock') {
      result = 'win';
    } else if (computerPick === 'paper') {
      result = 'tied';
    } else {
      result = 'lose';
    }
  } else if (playerMove === 'scissors') {
    if (computerPick === 'rock') {
      result = 'lose';
    } else if (computerPick === 'paper') {
      result = 'win';
    } else {
      result = 'tied';
    }
  }

  if (result === 'win') {
    score.wins++;
  } else if (result === 'lose') {
    score.losses++;
  } else {
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-result').innerHTML = `You ${result}.`;
  document.querySelector('.js-moves').innerHTML = `
    <div class="move">
      You
      <img src="images/${playerMove}-emoji.png" class="move-icon">
    </div>
    <div class="move">
      Computer
      <img src="images/${computerPick}-emoji.png" class="move-icon">
    </div>`;
  updateScoreElement();
}

function updateScoreElement() {
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerPick = ''; 

  if (randomNumber < 1 / 3) {
    computerPick = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerPick = 'paper';
  } else {
    computerPick = 'scissors';
  }

  return computerPick;
}

function autoPlayGame(buttonElement) {
  if (!isAutoPlaying) {
    intervalID = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    buttonElement.innerText = 'Stop Playing';
  } else {
    clearInterval(intervalID);
    isAutoPlaying = false;
    buttonElement.innerHTML = 'Auto Play';
  }
}

function resetScore() {
  const confirmationContainerElement = document.querySelector('.js-reset-confirmation-container');

  confirmationContainerElement.innerHTML = `
    <div class="js-confirmation-text">
      Are you sure you want to reset the score?
    </div>
    <button class="js-yes-button yes-button">
      Yes
    </button>
    <button class="js-no-button no-button">
      No
    </button>
  `;

  document.querySelector('.js-yes-button').addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    confirmationContainerElement.innerHTML = '';
    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.js-moves').innerHTML = '';
  });

  document.querySelector('.js-no-button').addEventListener('click', () => {
    confirmationContainerElement.innerHTML = '';
  })
}
