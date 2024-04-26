import playSound from "./playSound.js";
import { changeCounterValue, updateClicks } from "./updateCounter.js";
import { toggleMenu } from "./achievements.js";

const button = document.querySelector('.js-pointless-button');
const achievementButton = document.querySelector('.js-achievement-button');
let clicks = Number(localStorage.getItem('clicks')) || 0;
let toggled = false;

changeCounterValue(clicks); // change counter value at the start of program 

button.addEventListener('click', () => {
  playSound();
  clicks++;
  changeCounterValue(clicks);
  updateClicks(clicks);
});

achievementButton.addEventListener('click', () => {
  toggled = toggleMenu(toggled);
});
