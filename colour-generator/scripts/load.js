changeTheme(theme);
loadSavedColours(savedColours, copyType);

document.querySelector('.js-colour-grid').style.gridTemplateColumns = `repeat(${colourAmount}, 1fr)`;

savedGrids.push(colours);
console.log(savedGrids)

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

function loadSavedColours(savedColours, copyType) {
  const dropdownContentElement = document.querySelector('.js-dropdown-content');

  let dropdownContentHTML = '';
  savedColours.forEach(value => {
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
