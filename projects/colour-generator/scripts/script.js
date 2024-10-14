const fontSizes = [
  { rgb: 0, hex: 0 },
  { rgb: 20, hex: 20 }
]
let theme = localStorage.getItem('theme') || 'light';
let savedColours = JSON.parse(localStorage.getItem('savedColours')) || [];

const themeToggleElement = document.querySelector('#theme-toggle');
const typeToggleElement = document.querySelector('#type-toggle');
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
  generateHTML(copyType, colourAmount, colours);
  loadSavedColours(savedColours, copyType)
});

document.querySelector('.js-save-button').addEventListener('click', () => {
  const coloursObject = JSON.parse(document.querySelector('.js-save-colour-menu').getAttribute('data-div-colours'));

  savedColours.push(coloursObject);
  localStorage.setItem('savedColours', JSON.stringify(savedColours));
  loadSavedColours(savedColours, copyType);
});

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
