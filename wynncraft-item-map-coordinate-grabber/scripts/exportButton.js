import { saveLocationsToStorage } from "./export page/loadLocations.js";

export function createExportButtonElements() {
  const copyButton = createExportButton();
  const container = createContainer(copyButton);

  return container;
}

function createContainer(copyButton) {
  const div = document.createElement('div');
  div.classList.add('export-button-container');
  div.classList.add('js-export-button-container')
  div.append(copyButton);

  return div;
}

function createExportButton() {
  const button = document.createElement('button');
  button.classList.add('export-button');
  button.innerHTML = 'Export Waypoints<i class="fa-solid fa-external-link"></i>';

  button.addEventListener('click', () => {
    saveLocationsToStorage();
    window.location.href = 'export-waypoints.html';
  });

  return button;
}