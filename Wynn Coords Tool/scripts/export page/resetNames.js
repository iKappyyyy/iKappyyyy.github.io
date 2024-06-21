const resetButton = document.querySelector('.js-reset-button');

function resetNames() {
  const coordinateHeaders = document.querySelectorAll('.js-coordinate-header');

  if (!coordinateHeaders) return;
  coordinateHeaders.forEach((header, index) => {
    header.innerText = `Coordinate #${index + 1}`;
  });
}

resetButton.addEventListener('click', () => {
  resetNames();
});

