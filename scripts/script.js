const fontSizes = [
  { rgb: 0, hex: 0 },
  { rgb: 20, hex: 20 }
]
let theme = localStorage.getItem('theme') || 'light';
let copyType = localStorage.getItem('type') || 'hex';
let colourAmount = Number(localStorage.getItem('amount')) || 5;
changeTheme(theme);
let colours = generateHTML(copyType, colourAmount, JSON.parse(localStorage.getItem('colours'))) || generateHTML(copyType, colourAmount);
let savedColours = JSON.parse(localStorage.getItem('savedColours')) || [];

loadSavedColours(savedColours, copyType);
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
  loadSavedColours(savedColours, copyType)
});

document.querySelector('.js-save-button').addEventListener('click', () => {
  const coloursObject = JSON.parse(document.querySelector('.js-save-colour-menu').getAttribute('data-div-colours'));

  savedColours.push(coloursObject);
  localStorage.setItem('savedColours', JSON.stringify(savedColours));
  loadSavedColours(savedColours, copyType);
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
      <div class="tooltip js-tooltip colour-tooltip js-colour-tooltip"></div>
    </div>
    `
  }
  document.querySelector('.js-colour-grid').innerHTML = gridHTML;

  const colourTooltips = document.querySelectorAll('.js-colour-tooltip');
  const gridItems = document.querySelectorAll('.js-colour');
  gridItems.forEach((item, index) => {
    item.style.backgroundColor = colours[index].hex;
    item.addEventListener('contextmenu', event => {
      showSaveMenu(event, JSON.stringify(colours[index]));
    });
    if (copyMode === 'hex') {
      colourTooltips[index].innerHTML = colours[index].hex;
      item.addEventListener('click', () => {
        navigator.clipboard.writeText(colours[index].hex);
      });
    } else {
      colourTooltips[index].innerHTML = colours[index].rgb;
      item.addEventListener('click', () => {
        navigator.clipboard.writeText(colours[index].rgb);
      });
    }
  });

  localStorage.setItem('colours', JSON.stringify(colours));
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
  const generateButtonElement = document.querySelector('.js-generate-button');

  if (theme === 'dark') {
    document.body.style.backgroundColor = 'rgb(27, 27, 27)';
    checkboxTitleElements.forEach(item => {
      item.style.color = 'white';
    })
    document.querySelector('.js-theme-toggle-title').innerHTML = 'Dark Theme';
    document.querySelector('.js-range-title').style.color = 'white';
    generateButtonElement.classList.add('dark-theme-generate-button');
  }
  else {
    document.body.style.backgroundColor = 'white';
    checkboxTitleElements.forEach(item => {
      item.style.color = 'black';
    })
    document.querySelector('.js-theme-toggle-title').innerHTML = 'Light Theme';
    document.querySelector('.js-range-title').style.color = 'rgb(27, 27, 27)';
    if (generateButtonElement.classList.contains('dark-theme-generate-button')) {
      generateButtonElement.classList.remove('dark-theme-generate-button');
    }
  }
}

function showSaveMenu(event, colours) {
  event.preventDefault();
  const saveMenu = document.querySelector('.js-save-colour-menu');
  saveMenu.style.left = `${event.pageX}px`;
  saveMenu.style.top = `${event.pageY}px`;
  saveMenu.style.display = 'block';

  saveMenu.setAttribute('data-div-colours', colours);

  document.addEventListener('click', hideSaveMenu);
}

function hideSaveMenu() {
  const saveMenu = document.querySelector('.js-save-colour-menu');
  saveMenu.style.display = 'none';

  document.removeEventListener('click', hideSaveMenu);
}

function loadSavedColours(savedColours, copyType) {
  const dropdownContentElement = document.querySelector('.js-dropdown-content');

  let dropdownContentHTML = '';
  savedColours.forEach(value => {
    console.log(value[copyType]);
    dropdownContentHTML += `
    <div class="saved-colour js-saved-colour">
      <div class="saved-colour-display js-saved-colour-display"></div>
      <div class="saved-colour-text js-saved-colour-text">${value[copyType]}</div>
      <button class="delete-button js-delete-button">X</button>
      <div class="saved-colour-tooltip js-saved-colour-tooltip">Copied!</div>
    </div>
    `
  });
  dropdownContentElement.innerHTML = dropdownContentHTML;

  document.querySelectorAll('.js-saved-colour-display').forEach((display, index) => {
    display.style.backgroundColor = `${savedColours[index].hex}`;
  });
  document.querySelectorAll('.js-delete-button').forEach((button, index) => {
    button.addEventListener('click', () => {
      savedColours.splice(index, 1);
      loadSavedColours(savedColours, copyType);
      localStorage.setItem('savedColours', JSON.stringify(savedColours));
    });
  });
  document.querySelectorAll('.js-saved-colour').forEach((value, index) => {
    value.addEventListener('click', () => {
      if (copyType === 'hex') {
        navigator.clipboard.writeText(savedColours[index].hex);
      } else {
        navigator.clipboard.writeText(savedColours[index].rgb);
      }
    });
  });
}
