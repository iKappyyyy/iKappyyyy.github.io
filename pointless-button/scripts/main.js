import { playAchievementSound, playClickSound } from "./sounds.js";
import { unobtainedAchievements, obtainedAchievements } from "./data/achievementLists.js";
import { changeCounterValue, updateLocalStorageClicks } from "./updateCounter.js";
import { toggleAchievementMenu, achievementReached, updateAchievementLists, playAchievementReachedAnimation, loadObtainedAchievements } from "./achievements.js";
import { toggleBackgroundsMenu } from "./backgrounds.js";
import { changeMuteIcon, saveMutedToLocalStorage } from "./mute.js";

const button = document.querySelector('.js-pointless-button');
const achievementButton = document.querySelector('.js-achievement-button');
const backgroundButton = document.querySelector('.js-background-button');
const muteButton = document.querySelector('.js-mute-button');
let clicks = Number(localStorage.getItem('clicks')) || 0;
let audioMuted = Number(localStorage.getItem('muted')) || 0;
let achievementMenuToggled = false;
let backgroundsMenuToggled = false;

changeCounterValue(clicks); // change counter value at the start of program
loadObtainedAchievements(obtainedAchievements); // load obtained achievements at the start of program
changeMuteIcon(muteButton, audioMuted); // load mute icon at the start of program

button.addEventListener('click', () => {
  if (!audioMuted) playClickSound();
  clicks++;
  changeCounterValue(clicks);
  updateLocalStorageClicks(clicks);

  // achievement stuff
  if (achievementReached(unobtainedAchievements, clicks)) {
    if (!audioMuted) playAchievementSound();
    playAchievementReachedAnimation(unobtainedAchievements);
    updateAchievementLists(unobtainedAchievements, obtainedAchievements);
    loadObtainedAchievements(obtainedAchievements);
  } 
});

achievementButton.addEventListener('click', () => {
  achievementMenuToggled = toggleAchievementMenu(achievementMenuToggled);
  if (backgroundsMenuToggled) // close other menu if open
    backgroundsMenuToggled = toggleBackgroundsMenu(backgroundsMenuToggled);
});

backgroundButton.addEventListener('click', () => {
  backgroundsMenuToggled = toggleBackgroundsMenu(backgroundsMenuToggled);
  if (achievementMenuToggled) // close other menu if open
    achievementMenuToggled = toggleAchievementMenu(achievementMenuToggled);
});

muteButton.addEventListener('click', () => {
  if (audioMuted) {
    audioMuted = 0; // change muted to false (not muted)
  } else {
    audioMuted = 1; // change muted to true (muted)
  }

  changeMuteIcon(muteButton, audioMuted);
  saveMutedToLocalStorage(audioMuted);
});
