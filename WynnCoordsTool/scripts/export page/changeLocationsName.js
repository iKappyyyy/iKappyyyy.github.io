const nameInput = document.querySelector('.js-locations-name');

function changeNames(newName) {
  const coordinateHeaders = document.querySelectorAll('.js-coordinate-header');

  if (!coordinateHeaders) return;
  coordinateHeaders.forEach(header => {
    header.innerText = newName;
  });
}

nameInput.addEventListener('input', () => {
  changeNames(nameInput.value);
});
