import { usedColors, maxLinks } from "./multiLinks.js";
const VALUE_NAME = 0;
const VALUE_VALUE = 1;

export function inputIsValid(urlInput) {
  let url = urlInput.value;
  const conditionOne = url.startsWith("https://map.wynncraft.com/?coords=");

  url = url.replace("https://map.wynncraft.com/?coords=", "");
  url = url.replace(/#.*$/, '');
  const conditionTwo = /^[0-9,-]+$/.test(url);
  return (conditionOne && conditionTwo);
}

export function getSeparateCoordinatesList(urlInput) {
  let url = urlInput.value.replace("https://map.wynncraft.com/?coords=", "");
  url = url.replace(/#.*$/, '');
  const seperateValuesCoordinatesList = url.split(",");
  const coordinatesList = [];
  let tempList = [];
  for (let i = 0; i < seperateValuesCoordinatesList.length; i++) {
    if (i !== 0 && !(i % 4)) {
      coordinatesList.push(tempList);
      tempList = [];
    }

    tempList.push(seperateValuesCoordinatesList[i]);
  }

  if (tempList.length) {
    coordinatesList.push(tempList);
  }

  return coordinatesList;
}

function* separateCoordinatesGenerator(values) {
  const nameOfValueList = ["X", "Y", "Z", "R"];
  for (let i = 0; i < values.length; i++) {
    yield [nameOfValueList[i], values[i]];
  }
}

export function getCoordinatesHtml(coordinatesList, multiLinksEnabled) {
  if (multiLinksEnabled && usedColors.length + 1 > maxLinks) {
    alert('Link Limit Reached!');
    return ''; // empty string because that's what's going to be added to the html
  }

  let changeHeaderColor = `style="background: rgb(95, 182, 95);"`
  let lastCoordinateNumber = 0;
  if (multiLinksEnabled) {
    usedColors.push(generateRandomColor());
    changeHeaderColor = `style="background: ${usedColors[usedColors.length - 1]};"`;
    lastCoordinateNumber = getLastCoordinateNumber();
  }

  let html = '';
  coordinatesList.forEach((coordinates, index) => {
    html += `
    <div class="coordinates-grid">
      <div class="coordinate js-coordinate">
        <p class="coordinate-header" contenteditable="true" ${multiLinksEnabled ? changeHeaderColor : ''}>
          Coordinate #${lastCoordinateNumber + index + 1}
        </p>
        <div class="coordinate-values">
    `
    for (let value of separateCoordinatesGenerator(coordinates)) {
      html += `          <p>${value[VALUE_NAME]}</p>`
      html += `          <p>${value[VALUE_VALUE]}</p>`
    }
    html += `
        </div>
      </div>
    </div>
    `
  });

  return html;
}

function generateRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red}, ${green}, ${blue})`;
}

function getLastCoordinateNumber() {
  const coordinates = document.querySelectorAll('.js-coordinate');
  return coordinates.length;
}
