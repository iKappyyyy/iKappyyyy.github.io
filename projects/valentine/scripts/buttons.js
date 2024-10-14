const yesButton = document.querySelector('.js-yes-button');
const noButton = document.querySelector('.js-no-button');
let buttonFontSize = 30;

let phraseIndex = -1;

function cycleBetweenPhrases(textContents) {
  phraseIndex = (phraseIndex + 1) % textContents.length;

  return textContents[phraseIndex];
}

function makeYesButtonBigger() {
  buttonFontSize += 20;
  yesButton.style.fontSize = `${buttonFontSize}px`;
}

noButton.addEventListener('click', () => {
  noButton.innerText = cycleBetweenPhrases(textContents);
  makeYesButtonBigger();
});

yesButton.addEventListener('click', () => {
  window.location.href = 'yes.html';
});
