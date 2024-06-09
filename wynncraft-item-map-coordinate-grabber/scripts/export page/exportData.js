import { createPopUp } from "./createPopup.js";
import { currentIndex, optionValues } from "./changeVisibility.js";
const X_VALUE = 0;
const Y_VALUE = 1;
const Z_VALUE = 2;
const exportButton = document.querySelector('.js-export-button');

function getData() {
  const icon = getIcon();
  const visibility = getVisibility();
  const color = getColor();
  const locations = getLocations();

  const names = document.querySelectorAll('.js-coordinate-header');
  let data = `[{
  "name": "-------------[ ${getTitle()} ]------------",
  "color": "#666666",
  "icon": "${icon}",
  "visibility": "hidden",
  "location": {
    "x": 0,
    "y": 0,
    "z": 0
  }
}, `;
  names.forEach((name, i) => {
    data += `{
  "name": "${name.innerText}",
  "color": "${color}",
  "icon": "${icon}",
  "visibility": "${visibility}",
  "location": {
    "x": ${locations[i][X_VALUE]},
    "y": ${locations[i][Y_VALUE]},
    "z": ${locations[i][Z_VALUE]}
  }
}, `
  });

  data = data.slice(0, -2);
  data += ']';

  return data;
}

function getTitle() {
  const titleElement = document.querySelector('.js-waypoints-title');

  return titleElement.value;
}

function getIcon() {
  const iconElement = document.querySelector('.js-selected');
  const src = iconElement.getAttribute('src');
  const filename = src.substring(src.lastIndexOf('/') + 1);
  return filename.slice(0, -4);
}

function getColor() {
  const colorPicker = document.querySelector('.js-color-picker');

  return colorPicker.value;
}

function getVisibility() {
  return optionValues[currentIndex];
}

function getLocations() {
  const coordinatesValues = document.querySelectorAll('.js-coordinate-values');
  const FilteredValues = [];
  coordinatesValues.forEach(values => {
    const valuesArr = values.innerText.split('\n\n');
    const valuesWithoutRadius = [];
    valuesArr.forEach((value, i) => {
      if (i % 2 !== 0 && valuesWithoutRadius.length !== 3) {
        valuesWithoutRadius.push(value);
      }
    });
    FilteredValues.push(valuesWithoutRadius);
  });

  return FilteredValues;
}

exportButton.addEventListener('click', () => {
  const data = getData();

  navigator.clipboard.writeText(data);
  createPopUp();
});