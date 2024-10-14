const doneButton = document.querySelector('.js-done-button');
const layoutOption = document.querySelector('.js-cycle-option');

doneButton.addEventListener('click', () => {
  const optionChosen = String(layoutOption.innerText);
  const photoPageUrl = `./photo.html?layout=${optionChosen}`;
  
  window.location.href = photoPageUrl;
});