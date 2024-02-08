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
  handleBackButton();
});

afterButton.addEventListener('click', () => {
  handleAfterButton();
});

function handleBackButton() {
  if (coloursIndex <= 0) {
    updateButtons();
    return;
  }
  coloursIndex--;
  updateButtons();
  colours = savedGrids[coloursIndex];
  generateHTML(copyType, colourAmount, colours);
}

function handleAfterButton() {
  if (coloursIndex === savedGrids.length - 1) {
    updateButtons();
    return;
  }
  coloursIndex++;
  updateButtons();
  colours = savedGrids[coloursIndex];
  generateHTML(copyType, colourAmount, colours);
}

function updateButtons() {
  if (coloursIndex <= 0) {
    if (!backButton.classList.contains('back-button-done')) {
      backButton.classList.add('back-button-done');
    }
    if (afterButton.classList.contains('after-button-done') && savedGrids.length != 1) {
      afterButton.classList.remove('after-button-done');
    }
  } else if (coloursIndex >= savedGrids.length - 1) {
    if (!afterButton.classList.contains('after-button-done')) {
      afterButton.classList.add('after-button-done');
    }
    if (backButton.classList.contains('back-button-done')) {
      backButton.classList.remove('back-button-done');
    }
  } else {
    if (backButton.classList.contains('back-button-done')) {
      backButton.classList.remove('back-button-done');
    }
    if (afterButton.classList.contains('after-button-done')) {
      afterButton.classList.remove('after-button-done');
    }
  }
}
