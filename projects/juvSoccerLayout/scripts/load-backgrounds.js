import backgroundNames, { backgroundsInfo } from "./data/backgrounds.js";

const backgroundChoices = document.querySelector('.js-background-choices');
const changeBackgroundButton = document.querySelector('.js-change-background');

// open and close menu
let activeBackgroundChoices = false;
changeBackgroundButton.addEventListener('click', () => {
  if (activeBackgroundChoices) {
    activeBackgroundChoices = false;
    backgroundChoices.classList.remove('active');
  } else {
    activeBackgroundChoices = true;
    backgroundChoices.classList.add('active');
  }
});

let html = '';
backgroundNames.forEach(background => {
  html += `
    <div class="background js-background" data-image="${background}">
      <img src="images/backgrounds/${background}.webp" alt="${backgroundsInfo[background].alt}" class="background-display">
      <p class="background-name">
        ${backgroundsInfo[background].name}
      </p>
    </div>
  `;
});
backgroundChoices.innerHTML = html;

const backgrounds = document.querySelectorAll('.js-background');
const imageBackground = document.querySelector('.js-background-image');
backgrounds.forEach(background => {
  background.addEventListener('click', () => {
    imageBackground.src = `./images/backgrounds/${background.dataset.image}.webp`;
  });
});

setTimeout(() => {
  document.querySelectorAll('.background-loader').forEach(loader => {
    loader.remove();
  });
}, 10000);