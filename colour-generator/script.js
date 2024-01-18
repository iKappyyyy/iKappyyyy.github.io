/*
To Do:
add so tooltip size and font size is dynamic - changes according to the width of the colour square.
*/

const fontSizes = [
  { rgb: 0, hex: 0 },
  { rgb: 20, hex: 20 }
]
let theme = localStorage.getItem('theme') || 'light';
let copyType = localStorage.getItem('type') || 'hex';
let colourAmount = Number(localStorage.getItem('amount')) || 5;
changeTheme(theme);
let colours = generateHTML(copyType, colourAmount);

document.querySelector('.js-generate-button').addEventListener('click', () => {
  colours = generateHTML(copyType, colourAmount);
});
document.querySelector('.js-colour-grid').style.gridTemplateColumns = `repeat(${colourAmount}, 1fr)`;

const themeToggleElement = document.querySelector('#theme-toggle');
const typeToggleElement = document.querySelector('#type-toggle');
const colourAmountSliderElement = document.querySelector('.js-range');
if (theme === 'dark') {
  themeToggleElement.checked = true;
  document.querySelector('.js-theme-toggle-title').innerHTML = 'Dark Theme';
} else {
  themeToggleElement.checked = false;
  document.querySelector('.js-theme-toggle-title').innerHTML = 'Light Theme';
}
if (copyType === 'rgb') {
  typeToggleElement.checked = true;
  document.querySelector('.js-type-toggle-title').innerHTML = 'Copy RGB';
} else {
  typeToggleElement.checked = false;
  document.querySelector('.js-type-toggle-title').innerHTML = 'Copy Hex';
}

const rangeTitleElement = document.querySelector('.js-range-title');
colourAmountSliderElement.value = colourAmount;
rangeTitleElement.innerHTML = `Colours: ${colourAmount}`;
colourAmountSliderElement.addEventListener('input', () => {
  colourAmount = colourAmountSliderElement.value;
  localStorage.setItem('amount', String(colourAmount));
  rangeTitleElement.innerHTML = `Colours: ${colourAmount}`;
  document.querySelector('.js-colour-grid').style.gridTemplateColumns = `repeat(${colourAmount}, 1fr)`;
  colours = generateHTML(copyType, colourAmount);
});

themeToggleElement.addEventListener('click', () => {
  if (theme === 'light') {
    theme = 'dark';
  } else {
    theme = 'light';
  }
  localStorage.setItem('theme', theme);

  changeTheme(theme);
});
typeToggleElement.addEventListener('click', () => {
  if (copyType === 'rgb') {
    copyType = 'hex';
    document.querySelector('.js-type-toggle-title').innerHTML = 'Copy Hex';
  } else {
    copyType = 'rgb';
    document.querySelector('.js-type-toggle-title').innerHTML = 'Copy RGB';
  }
  localStorage.setItem('type', copyType);

  colours = generateHTML(copyType, colourAmount, colours);
});

function generateHTML(copyMode, colourAmount, colours=null) {
  if (!colours) {
    colours = [];
    for (let i = 0; i < colourAmount * colourAmount; i++) {
      colours.push(generateColour());
    }
  }

  let gridHTML = '';
  for (let i = 0; i < colourAmount * colourAmount; i++) {
    gridHTML += `
    <div class="colour js-colour">
      <div class="tooltip js-tooltip copy-tooltip">Copied!</div>
      <div class="tooltip js-tooltip colour-tooltip js-colour-tooltip">a</div>
    </div>
    `
  }
  document.querySelector('.js-colour-grid').innerHTML = gridHTML;

  const colourTooltips = document.querySelectorAll('.js-colour-tooltip');
  const gridItems = document.querySelectorAll('.js-colour');
  gridItems.forEach((item, index) => {
    item.style.backgroundColor = colours[index].hex;
    if (copyMode === 'hex') {
      colourTooltips[index].innerHTML = colours[index].hex;
      item.addEventListener('click', () => {
        navigator.clipboard.writeText(colours[index].hex);
      })
    } else {
      colourTooltips[index].innerHTML = colours[index].rgb;
      item.addEventListener('click', () => {
        navigator.clipboard.writeText(colours[index].rgb);
      })
    }
  });

  return colours;
}

function generateColour() {
  const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);
  const b = randomBetween(0, 255);
  return { 
    hex: ("#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)).toUpperCase(),
    rgb: `(${r}, ${g}, ${b})`
  };
}

function changeTheme(theme) {
  const checkboxTitleElements = document.querySelectorAll('.js-checkbox-title');
  if (theme === 'dark') {
    document.body.style.backgroundColor = 'rgb(27, 27, 27)';
    checkboxTitleElements.forEach(item => {
      item.style.color = 'white';
    })
    document.querySelector('.js-theme-toggle-title').innerHTML = 'Dark Theme';
    document.querySelector('.js-range-title').style.color = 'white';
  }
  else {
    document.body.style.backgroundColor = 'white';
    checkboxTitleElements.forEach(item => {
      item.style.color = 'black';
    })
    document.querySelector('.js-theme-toggle-title').innerHTML = 'Light Theme';
    document.querySelector('.js-range-title').style.color = 'rgb(27, 27, 27)';
  }
}

function changeType(type) {
  if (type === 'hex') {
    document.body.style.backgroundColor = 'rgb(27, 27, 27)';
    checkboxTitleElements.forEach(item => {
      item.style.color = 'white';
    })
  }
  else {
    document.body.style.backgroundColor = 'white';
    checkboxTitleElements.forEach(item => {
      item.style.color = 'black';
    })
  }
}
