import playerInfos from "./data/playerInfos.js";
import loadLayout from "./loadPhotoLayout.js";

const players = document.querySelectorAll('.js-player');
const changePlayerMenu = document.querySelector('.js-change-player-menu');

function createChangePlayerMenuContent() {
  let changePlayerMenuHtml = `<button class="exit-button js-exit-button">X</button>`;
  for (let id = 1; id <= Object.keys(playerInfos).length; id++) {
    changePlayerMenuHtml += `
      <div class="player-option js-player-option" data-player-id="${id}">
        <img src="images/${playerInfos[String(id)].playerImage}.png" class="player-preview-image">
        <p class="player-option-name">${playerInfos[String(id)].playerName}</p>
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
    changePlayerMenu.classList.add('active');
    playerOptions.forEach(playerOption => {
      playerOption.addEventListener('click', () => {
        const playerId = playerOption.dataset.playerId;
        const playerInfo = playerInfos[String(playerId)];
        player.innerHTML = `
          <img src="./images/${playerInfo.playerImage}.png" class="head">
          <p class="player-name">${playerInfo.playerName}</p>
        `;
        changePlayerMenu.classList.remove('active');
        // remove event listeners
        createChangePlayerMenuContent();
        playerOptions = document.querySelectorAll('.js-player-option');
      });
    });
  });
});
