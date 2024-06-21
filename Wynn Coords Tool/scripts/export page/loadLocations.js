export function saveLocationsToStorage() {
  const coordinates = document.querySelectorAll('.js-coordinate');
  const coordinatesData = [];

  coordinates.forEach(coordinate => {
    coordinatesData.push(coordinate.innerHTML);
  });

  localStorage.setItem('coordinates', JSON.stringify(coordinatesData));
}

function loadLocationsFromStorage() {
  const coordinatesGrid = document.querySelector('.js-coordinates-grid');
  const coordinatesData = JSON.parse(localStorage.getItem('coordinates'));

  if (!Array.isArray(coordinatesData)) return;
  coordinatesData.forEach(data => {
    const coordinate = document.createElement('div');
    coordinate.classList.add('coordinate');
    coordinate.classList.add('js-coordinate');
    coordinate.innerHTML = data;

    coordinatesGrid.appendChild(coordinate);
  });

  localStorage.removeItem('coordinates');
}

loadLocationsFromStorage();
