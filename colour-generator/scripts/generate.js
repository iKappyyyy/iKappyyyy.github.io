let colourAmount = Number(localStorage.getItem('amount')) || 5;
let copyType = localStorage.getItem('type') || 'hex';
let colours = JSON.parse(localStorage.getItem('colours')) || generateColours();
let pressedKeys = [];
if (colours.length !== 10 || !(Array.isArray(colours[0]))) {
  colours = generateColours();
}

generateHTML(copyType, colourAmount, colours);

document.body.addEventListener('keydown', event => {
  if (!pressedKeys.includes(event.key.toLowerCase())) pressedKeys.push(event.key.toLowerCase());

  if (event.key === ' ') handleGenerateButton();
  else if (pressedKeys.includes('control') && pressedKeys.includes('arrowright') && pressedKeys.length === 2) handleRangeChange('right');
  else if (pressedKeys.includes('control') && pressedKeys.includes('arrowleft') && pressedKeys.length === 2) handleRangeChange('left');
  else if (event.key === 'ArrowRight') handleAfterButton();
  else if (event.key === 'ArrowLeft') handleBackButton();
});
document.body.addEventListener('keyup', event => {
  const i = pressedKeys.indexOf(event.key.toLowerCase());
  pressedKeys.splice(i, 1);
});
document.querySelector('.js-generate-button').addEventListener('click', () => {
  handleGenerateButton();
});

const colourAmountSliderElement = document.querySelector('.js-range');
const rangeTitleElement = document.querySelector('.js-range-title');
colourAmountSliderElement.value = colourAmount;
rangeTitleElement.innerHTML = `Colours: ${colourAmount}`;
colourAmountSliderElement.addEventListener('input', () => {
  if (colourAmountSliderElement.value > 10 || colourAmountSliderElement.value < 0) return; 

  colourAmount = colourAmountSliderElement.value;
  localStorage.setItem('amount', String(colourAmount));
  rangeTitleElement.innerHTML = `Colours: ${colourAmount}`;
  document.querySelector('.js-colour-grid').style.gridTemplateColumns = `repeat(${colourAmount}, 1fr)`;
  generateHTML(copyType, colourAmount, colours);
});

function generateHTML(copyType, colourAmount, colours) {
  let gridHTML = '';
  for (let i = 0; i < colourAmount * colourAmount; i++) {
    gridHTML += `
    <div class="colour js-colour">
      <div class="tooltip js-tooltip copy-tooltip">Copied!</div>
      <div class="tooltip js-tooltip colour-tooltip js-colour-tooltip"></div>
    </div>
    `
  }

  document.querySelector('.js-colour-grid').innerHTML = gridHTML;
  handleColoursAndTooltips(colours, copyType, colourAmount);
}

function getRandomColour() {
  const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);
  const b = randomBetween(0, 255);

  return { 
    hex: ("#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)).toUpperCase(),
    rgb: `(${r}, ${g}, ${b})`
  };
}

function generateColours() {
  const newColours = [];
  for (let i = 0; i < 10; i++) {
    row = [];
    for (let j = 0; j < 10; j++) {
      row.push(getRandomColour());
    }
    newColours.push(row);
  }

  const backButton = document.querySelector('.js-back-button');
  const afterButton = document.querySelector('.js-after-button');
  if (backButton.classList.contains('back-button-done')) {
    backButton.classList.remove('back-button-done');
  }
  if (!afterButton.classList.contains('after-button-done')) {
    afterButton.classList.add('after-button-done');
  }
  localStorage.setItem('colours', JSON.stringify(newColours));
  return newColours;
}

function handleColoursAndTooltips(colours, copyType, colourAmount) {
  const colourTooltips = document.querySelectorAll('.js-colour-tooltip');
  const gridItems = document.querySelectorAll('.js-colour');
  let itemNumber = 0;
  for (let row = 0; row < colourAmount; row++) {
    for (let col = 0; col < colourAmount; col++) {
      const item = gridItems[itemNumber];

      item.style.backgroundColor = colours[row][col].hex;

      item.addEventListener('contextmenu', event => {
        showSaveMenu(event, JSON.stringify(colours[row][col]));
      });

      if (copyType === 'hex') {
        colourTooltips[itemNumber].innerHTML = colours[row][col].hex;
        item.addEventListener('click', () => {
          navigator.clipboard.writeText(colours[row][col].hex);
        });
      } else {
        colourTooltips[itemNumber].innerHTML = colours[row][col].rgb;
        item.addEventListener('click', () => {
          navigator.clipboard.writeText(colours[row][col].rgb);
        });
      }

      itemNumber++;
    }
  }
}

function handleGenerateButton() {
  colours = generateColours();
  addColoursToSavedGrids(colours);
  generateHTML(copyType, colourAmount, colours);
}

function handleRangeChange(side) {
  if (side === 'left') {
    if (colourAmount <= 0) return;
    colourAmount--;
  } else {
    if (colourAmount >= 10) return;
    colourAmount++;
  }

  localStorage.setItem('amount', String(colourAmount));
  colourAmountSliderElement.value = colourAmount;
  rangeTitleElement.innerHTML = `Colours: ${colourAmount}`;
  document.querySelector('.js-colour-grid').style.gridTemplateColumns = `repeat(${colourAmount}, 1fr)`;
  generateHTML(copyType, colourAmount, colours);
}
