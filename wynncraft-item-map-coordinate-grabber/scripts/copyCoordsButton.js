import { saveLocationsToStorage } from "./export page/loadLocations.js";
const HEADER_INDEX = 0;
let includeRadius = false;

export function createCopyCoordsElements() {
  const copyButton = createCopyButton();
  const container = createContainer(copyButton);

  return container;
}

function createContainer(copyButton) {
  const div = document.createElement('div');
  div.classList.add('copy-coords-container');
  div.classList.add('js-copy-coords-container');
  div.append(copyButton);

  return div;
}

function createCopyButton() {
  const button = document.createElement('button');
  button.classList.add('copy-coords-button');
  button.innerHTML = 'Export Waypoints<i class="fa-solid fa-external-link"></i>';

  button.addEventListener('click', () => {
    saveLocationsToStorage();
    window.location.href = 'export-waypoints.html';
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

// function getLongestHeaderLength(coordinatesDataArray) {
//   let longestLength = 0;
//   coordinatesDataArray.forEach(coordinateData => {
//     if (longestLength < coordinateData[HEADER_INDEX].length) longestLength = coordinateData[HEADER_INDEX].length;
//   });
//   return longestLength;
// }