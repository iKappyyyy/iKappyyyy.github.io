import { pasteButton, urlInput } from "./pasteUrl.js";
import { multiLinksButton, toggleMultiLinks } from "./multiLinks.js";
import { inputIsValid, getSeparateCoordinatesList, getCoordinatesHtml } from "./generateCoordinates.js";
import { createCopyCoordsElements } from "./copyCoordsButton.js";

// urlInput.value = 'https://map.wynncraft.com/?coords=-1706,97,-2724,0,-1771,104,-2669,0,-1736,95,-2659,0,-1720,96,-2600,0,-1842,68,-2560,0,-1795,86,-2537,0,-1728,97,-2509,0,-1686,89,-2523,0,-1700,91,-2475,0,-1798,98,-2455,0';


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
  const copyCordsContainer = document.querySelector('.js-copy-coords-container');
  
  if (multiLinksEnabled) {
    coordinatesGrid.innerHTML += html;
  } else {
    coordinatesGrid.innerHTML = html;
  }

  if (copyCordsContainer) {
    copyCordsContainer.remove();
  }
  document.body.appendChild(createCopyCoordsElements());
}

searchButton.addEventListener('click', generateCoordinatesHtml);
urlInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') generateCoordinatesHtml();
});
