const visibilityText = document.querySelector('.js-visibility-text');
const arrowUpButton = document.querySelector('.js-arrow-up-button');
const arrowDownButton = document.querySelector('.js-arrow-down-button');

export const optionValues = ['hidden', 'default', 'always'];
const optionTexts = ['Hidden', 'Default', 'Always Visible']

export let currentIndex = 1;

visibilityText.innerText = optionTexts[currentIndex];

function updateVisibilityText(newIndex) {
  setTimeout(() => {
    currentIndex = newIndex;
    visibilityText.innerText = optionTexts[currentIndex];
  }, 50);
}

arrowUpButton.addEventListener('click', () => {
  updateVisibilityText((currentIndex + 1) % optionTexts.length);
});

arrowDownButton.addEventListener('click', () => {
  updateVisibilityText((currentIndex - 1 + optionTexts.length) % optionTexts.length);
});
