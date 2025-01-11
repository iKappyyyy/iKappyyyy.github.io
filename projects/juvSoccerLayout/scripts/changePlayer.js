import playerInfos from "./data/playerInfos.js";

const players = document.querySelectorAll('.js-player');
const changePlayerMenu = document.querySelector('.js-change-player-menu');

function getCurrentPlayersOnField() {
  const currentPlayers = [];
  players.forEach(player => {
    if (player.dataset.player !== '') currentPlayers.push(player.dataset.player);
  });

  return currentPlayers;
}

function createChangePlayerMenuContent() {
  const currentPlayers = getCurrentPlayersOnField();
  let changePlayerMenuHtml = `<button class="exit-button js-exit-button">X</button>`;
  for (let id = 1; id <= Object.keys(playerInfos).length; id++) {
    if (currentPlayers.includes(playerInfos[String(id)].playerImage)) continue;

    changePlayerMenuHtml += `
      <div class="player-option js-player-option" data-player-id="${id}">
        <img src="./images/players/${playerInfos[String(id)].playerImage}.webp" class="player-preview-image">
      </div>
    `;
  }
  changePlayerMenu.innerHTML = changePlayerMenuHtml;

  const exitButton = document.querySelector('.js-change-player-menu .js-exit-button');

  exitButton.addEventListener('click', () => {
    changePlayerMenu.classList.remove('active');
  });
}

createChangePlayerMenuContent();
let playerOptions = document.querySelectorAll('.js-player-option');

players.forEach(player => {
  player.addEventListener('click', () => {
    if (changePlayerMenu.classList.contains('active')) {
      return;
    }
    changePlayerMenu.classList.add('active');

    playerOptions.forEach(playerOption => {
      playerOption.addEventListener('click', () => {
        const playerId = playerOption.dataset.playerId;
        const playerInfo = playerInfos[String(playerId)];
        player.dataset.player = playerInfo.playerImage;
        player.innerHTML = `
          <img src="./images/players/${playerInfo.playerImage}.webp" class="head">
        `;
        changePlayerMenu.classList.remove('active');
        // remove event listeners
        createChangePlayerMenuContent();
        playerOptions = document.querySelectorAll('.js-player-option');
      });
    });
  });
});
