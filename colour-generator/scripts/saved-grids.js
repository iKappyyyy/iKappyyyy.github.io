const savedGrids = [];
let coloursIndex = 0;
const backButton = document.querySelector('.js-back-button');
const afterButton = document.querySelector('.js-after-button');

function addColoursToSavedGrids(colours) {
  coloursIndex++;
  savedGrids.splice(coloursIndex, savedGrids.length);
  savedGrids.push(colours);
}

backButton.addEventListener('click', () => {
  if (coloursIndex <= 0) return;
  coloursIndex--;
  colours = savedGrids[coloursIndex];
  generateHTML(copyType, colourAmount, colours);
});

afterButton.addEventListener('click', () => {
  if (coloursIndex === savedGrids.length - 1) return;
  coloursIndex++;
  colours = savedGrids[coloursIndex];
  generateHTML(copyType, colourAmount, colours);
});
