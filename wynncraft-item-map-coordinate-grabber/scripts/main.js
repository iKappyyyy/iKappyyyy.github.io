import { pasteButton, urlInput } from "./pasteUrl.js";
import { inputIsValid, getSeparateCoordinatesList, getCoordinatesHtml } from "./generateCoordinates.js";
import { createCopyCoordsElements } from "./copyCoordsButton.js";

urlInput.value = 'https://map.wynncraft.com/?coords=-1706,97,-2724,0,-1771,104,-2669,0,-1736,95,-2659,0,-1720,96,-2600,0,-1842,68,-2560,0,-1795,86,-2537,0,-1728,97,-2509,0,-1686,89,-2523,0,-1700,91,-2475,0,-1798,98,-2455,0,-1755,86,-2392,0,-1645,123,-2241,0,-1552,101,-2242,0,-1499,95,-2229,0,-1436,118,-2353,0,-1430,89,-2400,0,-1465,91,-2497,0,-1520,96,-2568,0,-1530,112,-2486,0,-1480,114,-2673,0,-1584,87,-2738,0,-1641,96,-2746,0,-1485,101,-2742,0,-1392,109,-2761,0,-1497,118,-2189,0,-1232,118,-3280,0,-1312,164,-2993,0,-1348,93,-3087,0,-1289,104,-3174,0,-1347,81,-3201,0,-1271,93,-3271,0,-1303,81,-3323,0,-1336,135,-3290,0,-1431,166,-3288,0,-1364,131,-3245,0,-1444,72,-3182,0,-1613,93,-3176,0,-1675,93,-3199,0,-1738,95,-2191,0#/-1674/64/-2757/-4/wynn-main/Wynncraft';
const searchButton = document.querySelector('.js-search');
const coordinatesGrid = document.querySelector('.js-coordinates-grid');
let previousUrl = '';

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
    urlInput.value = previousUrl;
    return;
  }

  previousUrl = urlInput.value;
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
