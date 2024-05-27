import { pasteButton, urlInput } from "./pasteUrl.js";
import { inputIsValid, getSeparateCoordinatesList, getCoordinatesHtml } from "./generateCoordinates.js";
import { createCopyCoordsElements } from "./copyCoordsButton.js";

const searchButton = document.querySelector('.js-search');
const coordinatesGrid = document.querySelector('.js-coordinates-grid');

pasteButton.addEventListener('click', async () => {
  urlInput.value = await navigator.clipboard.readText();
  pasteButton.style.display = 'block';
  pasteButton.setAttribute('data-tooltip', 'Pasted!');
});

pasteButton.addEventListener('mouseout', () => {
  pasteButton.setAttribute('data-tooltip', 'Paste');
});

function generateCoordinatesHtml() {
  if (!inputIsValid(urlInput)) {
    alert("URL isn't valid!");
    return;
  }

  const coordinatesList = getSeparateCoordinatesList(urlInput);
  const html = getCoordinatesHtml(coordinatesList);
  const copyCordsContainer = document.querySelector('.js-copy-coords-container');
  coordinatesGrid.innerHTML = html;

  if (copyCordsContainer) {
    copyCordsContainer.remove();
  }
  document.body.appendChild(createCopyCoordsElements(coordinatesList));
}

searchButton.addEventListener('click', generateCoordinatesHtml);
urlInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') generateCoordinatesHtml();
});
