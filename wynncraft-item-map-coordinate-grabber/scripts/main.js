import { pasteButton, urlInput } from "./pasteUrl.js";
import { multiLinksButton, toggleMultiLinks } from "./multiLinks.js";
import { inputIsValid, getSeparateCoordinatesList, getCoordinatesHtml } from "./generateCoordinates.js";
import { createExportButtonElements } from "./exportButton.js";

const searchButton = document.querySelector('.js-search');
const coordinatesGrid = document.querySelector('.js-coordinates-grid');
let previousUrl = '';
let multiLinksEnabled = false;

pasteButton.addEventListener('click', async () => {
  urlInput.value = await navigator.clipboard.readText();
  pasteButton.setAttribute('data-tooltip', 'Pasted!');
});

pasteButton.addEventListener('mouseout', () => {
  pasteButton.setAttribute('data-tooltip', 'Paste');
});

multiLinksButton.addEventListener('click', () => {
  multiLinksEnabled = toggleMultiLinks(multiLinksEnabled);
});

multiLinksButton.addEventListener('mouseout', () => {
  multiLinksButton.setAttribute('data-tooltip', 'Multi-Links');
});

function generateCoordinatesHtml() {
  if (!inputIsValid(urlInput)) {
    alert("URL isn't valid!");
    urlInput.value = previousUrl;
    return;
  }

  previousUrl = urlInput.value;
  const coordinatesList = getSeparateCoordinatesList(urlInput);
  const html = getCoordinatesHtml(coordinatesList, multiLinksEnabled);
  const exportButtonContainer = document.querySelector('.js-export-button-container');
  
  if (multiLinksEnabled) {
    coordinatesGrid.innerHTML += html;
  } else {
    coordinatesGrid.innerHTML = html;
  }

  if (exportButtonContainer) {
    exportButtonContainer.remove();
  }
  document.body.appendChild(createExportButtonElements());
}

searchButton.addEventListener('click', generateCoordinatesHtml);
urlInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') generateCoordinatesHtml();
});
