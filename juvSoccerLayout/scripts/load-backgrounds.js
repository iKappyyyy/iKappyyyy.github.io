import backgroundNames, { backgroundsInfo } from "./data/backgrounds.js";

const backgroundChoices = document.querySelector('.js-background-choices');

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

  const imageLoad = document.createElement('img');
  imageLoad.setAttribute('src', `../images/backgrounds/${background}.webp`);
  document.body.appendChild(imageLoad);
  imageLoad.classList.add('background-loader');
});
backgroundChoices.innerHTML = html;

const backgrounds = document.querySelectorAll('.js-background');
const imageBackground = document.querySelector('.js-background-image');
backgrounds.forEach(background => {
  background.addEventListener('click', () => {
    imageBackground.src = `../images/backgrounds/${background.dataset.image}.webp`;
  });
});

setTimeout(() => {
  document.querySelectorAll('.background-loader').forEach(loader => {
    loader.remove();
  });
}, 10000);