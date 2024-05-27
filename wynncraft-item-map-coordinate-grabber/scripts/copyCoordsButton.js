let toggled = false;

export function createCopyCoordsElements(coordinatesList) {
  const copyButton = createCopyButton(coordinatesList);
  const toggleRadiusButton = createToggleRadiusButton();
  const container = createContainer(copyButton, toggleRadiusButton);

  return container;
}

function createContainer(copyButton, toggleRadiusButton) {
  const div = document.createElement('div');
  div.classList.add('copy-coords-container');
  div.classList.add('js-copy-coords-container');
  div.append(copyButton, toggleRadiusButton);

  return div;
}

function createCopyButton(coordinatesList) {
  const button = document.createElement('button');
  button.classList.add('copy-coords-button');
  button.innerHTML = '<i class="fa-solid fa-copy"></i> Copy Coordinates';

  button.addEventListener('click', () => {
    if (toggled) {
      coordinatesList.forEach(coordinate => {
        coordinate.splice(-1, 1);
      });
    }

    let text = '';
    coordinatesList.forEach((coordinate, index) => {
      text += `Coordinate #${zfill(index + 1, String(coordinatesList.length).length)} | ${coordinate.join(', ')}\n`;
    })
    text = text.slice(0, -1);

    navigator.clipboard.writeText(text);
    createPopUp();
  });

  return button;
}

function createToggleRadiusButton() {
  const button = document.createElement('button');
  button.classList.add('toggle-radius-button');
  button.classList.add('js-toggle-radius-button');
  button.innerHTML = 'Exclude Radius <i class="fa-brands fa-codepen"></i>';

  toggled = false;
  button.addEventListener('click', () => {
    if (toggled) {
      toggled = false;
      button.innerHTML = 'Exclude Radius <i class="fa-brands fa-codepen"></i>';
    } else {
      toggled = true;
      button.innerHTML = 'Include Radius <i class="fa-brands fa-codepen"></i>';
    }
  });
  return button;
}

function zfill(number, length) {
  return number.toString().padStart(length, '0');
}

function createPopUp() {
  const div = document.createElement('div');
  div.classList.add('copied-popup');
  div.innerText = 'Text Copied to Clipboard!';

  document.body.appendChild(div);
}
