import playSound from "./playSound.js";
import { unobtainedAchievements, obtainedAchievements } from "./data/achievementLists.js";
import { changeCounterValue, updateClicks } from "./updateCounter.js";
import { toggleMenu, achievementReached, updateAchievementLists, playAchievementReachedAnimation, loadObtainedAchievements } from "./achievements.js";
import { changeMuteIcon, saveMutedToLocalStorage } from "./mute.js";

const button = document.querySelector('.js-pointless-button');
const achievementButton = document.querySelector('.js-achievement-button');
const muteButton = document.querySelector('.js-mute-button');
let clicks = Number(localStorage.getItem('clicks')) || 0;
let muted = Number(localStorage.getItem('muted')) || 0;
let toggled = false;
let animationRunning = false;

changeCounterValue(clicks); // change counter value at the start of program
loadObtainedAchievements(obtainedAchievements); // load obtained achievements at the start of program
changeMuteIcon(muteButton, muted); // load mute icon at the start of program

button.addEventListener('click', () => {
  if (!muted) {
    playSound();
  }
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

muteButton.addEventListener('click', () => {
  if (muted) {
    muted = 0; // change muted to false (not muted)
  } else {
    muted = 1; // change muted to true (muted)
  }

  changeMuteIcon(muteButton, muted);
  saveMutedToLocalStorage(muted);
});
