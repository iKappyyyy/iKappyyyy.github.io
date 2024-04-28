import playSound from "./playSound.js";
import { unobtainedAchievements, obtainedAchievements } from "./data/achievementLists.js";
import { changeCounterValue, updateClicks } from "./updateCounter.js";
import { toggleMenu, achievementReached, updateAchievementLists, playAchievementReachedAnimation, loadObtainedAchievements } from "./achievements.js";

const button = document.querySelector('.js-pointless-button');
const achievementButton = document.querySelector('.js-achievement-button');
let clicks = Number(localStorage.getItem('clicks')) || 0;
let toggled = false;
let animationRunning = false;

changeCounterValue(clicks); // change counter value at the start of program
loadObtainedAchievements(obtainedAchievements); // load obtained achievements at the start of program

button.addEventListener('click', () => {
  playSound();
  clicks++;
  changeCounterValue(clicks);
  updateClicks(clicks);
  if (unobtainedAchievements.length > 0 && achievementReached(unobtainedAchievements, clicks)) {
    if (!animationRunning) {
      animationRunning = true;
      playAchievementReachedAnimation(unobtainedAchievements);
      setTimeout(() => {
        animationRunning = false;
      }, 5000);
    }
    updateAchievementLists(unobtainedAchievements, obtainedAchievements);
    loadObtainedAchievements(obtainedAchievements);
  } 
});

achievementButton.addEventListener('click', () => {
  toggled = toggleMenu(toggled);
});
