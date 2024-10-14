import { updateField } from "./soccerField.js";

const arrowLeft = document.querySelector('.js-arrow-left');
const arrowRight = document.querySelector('.js-arrow-right');
const layoutOption = document.querySelector('.js-cycle-option');

const layoutOptions = [
  '4-4-2',
  '4-2-3-1',
  '4-3-3',
  '4-3-2-1',
  '4-1-4-1',
  '3-5-2'
]

let layoutIndex = 0;

updateLayoutOption(layoutIndex);
updateField(layoutOptions[layoutIndex]);

arrowLeft.addEventListener('click', () => {
  layoutIndex--;
  if (layoutIndex < 0) layoutIndex = layoutOptions.length - 1;
  updateLayoutOption(layoutIndex);
  updateField(layoutOptions[layoutIndex]);
});

arrowRight.addEventListener('click', () => {
  layoutIndex++;
  if (layoutOptions.length <= layoutIndex) layoutIndex = 0;
  updateLayoutOption(layoutIndex);
  updateField(layoutOptions[layoutIndex]);
});

function updateLayoutOption(layoutIndex) {
  layoutOption.innerText = layoutOptions[layoutIndex];
}
