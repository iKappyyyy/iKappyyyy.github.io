const HEADER_INDEX = 0;
let includeRadius = false;

export function createCopyCoordsElements() {
  const copyButton = createCopyButton();
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

function createCopyButton() {
  const button = document.createElement('button');
  button.classList.add('copy-coords-button');
  button.innerHTML = '<i class="fa-solid fa-copy"></i> Copy Coordinates';

  button.addEventListener('click', () => {
    const coordinatesDataArray = getDataFromCoordinatesGrid();
    const longestHeaderLength = getLongestHeaderLength(coordinatesDataArray);

    let text = '';
    coordinatesDataArray.forEach(coordinateData => {
      const coordinateValuesArray = [...coordinateData].slice(1);
      text += `| ${coordinateData[HEADER_INDEX].padEnd(longestHeaderLength, ' ')} | ${coordinateValuesArray.join(', ')}`;
      
      if (!includeRadius && coordinateValuesArray.length === 4) {
        text = text.slice(0, text.lastIndexOf(','));
      }

      text += '\n';
    });

    text = text.slice(0, -1);
    text = addBordersToText(text);
    navigator.clipboard.writeText(text);
    createPopUp();
  });

  return button;
}

function createToggleRadiusButton() {
  const button = document.createElement('button');
  button.classList.add('toggle-radius-button');
  button.classList.add('js-toggle-radius-button');
  button.innerHTML = 'Include Radius <i class="fa-brands fa-codepen"></i>';

  includeRadius = false;
  button.addEventListener('click', () => {
    if (includeRadius) {
      includeRadius = false;
      button.innerHTML = 'Include Radius <i class="fa-brands fa-codepen"></i>';
    } else {
      includeRadius = true;
      button.innerHTML = 'Exclude Radius <i class="fa-brands fa-codepen"></i>';
    }
  });
  return button;
}

function createPopUp() {
  const div = document.createElement('div');
  div.classList.add('copied-popup');
  div.innerText = 'Text Copied to Clipboard!';

  document.body.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 5000);
}

function addBordersToText(text) {
  let maxLineCharLength = 0;
  text.split('\n').forEach(line => {
    if (maxLineCharLength < line.length) maxLineCharLength = line.length;
  });

  let styledText = `${'-'.repeat(maxLineCharLength + 2)}\n`;
  text.split('\n').forEach(line => {
    styledText += `${line.padEnd(maxLineCharLength, ' ')} |\n`;
  });
  styledText += `${'-'.repeat(maxLineCharLength + 2)}`;

  return styledText;
}

function getDataFromCoordinatesGrid() {
  const coordinates = document.querySelectorAll('.js-coordinate');
  const coordinatesDataArray = [];
  coordinates.forEach(coordinate => {
    const dataArray = coordinate.innerText.split('\n\n');
    const filteredArray = dataArray.filter((_, index) => index % 2 === 0);
    filteredArray[HEADER_INDEX] = filteredArray[HEADER_INDEX].replace(/\n/g, ' ');
    coordinatesDataArray.push(filteredArray);
  });
  return coordinatesDataArray;
}

function getLongestHeaderLength(coordinatesDataArray) {
  let longestLength = 0;
  coordinatesDataArray.forEach(coordinateData => {
    if (longestLength < coordinateData[HEADER_INDEX].length) longestLength = coordinateData[HEADER_INDEX].length;
  });
  return longestLength;
}