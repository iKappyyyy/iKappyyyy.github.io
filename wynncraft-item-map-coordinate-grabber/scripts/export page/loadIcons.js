const iconsContainer = document.querySelector('.js-icons-container');
const iconNames = [
  'flag',
  'diamond',
  'fireball',
  'sign',
  'star',
  'wall',
  'chestT1',
  'chestT2',
  'chestT3',
  'chestT4',
  'farming',
  'fishing',
  'mining',
  'woodcutting'
]

function loadIcons() {
  iconNames.forEach(iconName => {
    iconsContainer.innerHTML += `
    <img src="./images/icons/${iconName}.png" class="icon js-icon">
    `
  });

  addEventListeners();
  selectFirstIcon();
}

function addEventListeners() {
  const icons = document.querySelectorAll('.js-icon');

  icons.forEach(icon => {
    icon.addEventListener('click', () => {
      removeSelectedFromOthers(icons);
      icon.classList.add('selected');
      icon.classList.add('js-selected');
    });
  });
}

function removeSelectedFromOthers(icons) {
  icons.forEach(icon => {
    icon.classList.remove('selected');
    icon.classList.remove('js-selected');
  })
}

function selectFirstIcon() {
  const firstIcon = document.querySelector('.js-icon');

  firstIcon.classList.add('selected');
  firstIcon.classList.add('js-selected');
}

loadIcons();
