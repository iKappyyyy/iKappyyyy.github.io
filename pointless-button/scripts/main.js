import { playAchievementSound, playBackgroundSound, playClickSound } from "./sounds.js";
import { unobtainedAchievements, obtainedAchievements } from "./data/achievementLists.js";
import { unobtainedBackgrounds, obtainedBackgrounds } from "./data/backgroundsLists.js";
import { changeCounterValue, updateLocalStorageClicks } from "./updateCounter.js";
import { toggleAchievementMenu, achievementReached, updateAchievementLists, createAchievementPopUpElement, loadObtainedAchievements } from "./achievements.js";
import { toggleBackgroundsMenu, loadObtainedBackgrounds, backgroundReached, updateBackgroundsLists, changeBackground, createBackgroundPopUpElement } from "./backgrounds.js";
import { changeMuteIcon, saveMutedToLocalStorage } from "./mute.js";
import { achievementPopUpDurationMs, backgroundPopUpDurationMs, playPopUpAnimation, popUpElementHeightPx } from "./animations.js";

const button = document.querySelector('.js-pointless-button');
const achievementButton = document.querySelector('.js-achievement-button');
const backgroundButton = document.querySelector('.js-background-button');
const muteButton = document.querySelector('.js-mute-button');
const backgroundImage = localStorage.getItem('backgroundImage') || './images/background-1.gif';
let clicks = Number(localStorage.getItem('clicks')) || 0;
let audioMuted = Number(localStorage.getItem('muted')) || 0;
let achievementMenuToggled = false;
let backgroundsMenuToggled = false;
let groundLevel = 5;

changeCounterValue(clicks); // change counter value at the start of program
loadObtainedAchievements(obtainedAchievements); // load obtained achievements at the start of program
loadObtainedBackgrounds(obtainedBackgrounds); // load obtained backgrounds at the start of program
changeMuteIcon(muteButton, audioMuted); // load mute icon at the start of program
changeBackground(backgroundImage); // load background at the start of program

button.addEventListener('click', () => {
  if (!audioMuted) playClickSound();
  clicks++;
  changeCounterValue(clicks);
  updateLocalStorageClicks(clicks);

  // background stuff
  if (backgroundReached(unobtainedBackgrounds, clicks)) {
    if (!audioMuted) playBackgroundSound();
    playPopUpAnimation(groundLevel, backgroundPopUpDurationMs, createBackgroundPopUpElement(unobtainedBackgrounds, obtainedBackgrounds.length));
    groundLevel += popUpElementHeightPx;
    setTimeout(() => {
      groundLevel -= popUpElementHeightPx;
    }, backgroundPopUpDurationMs);
    updateBackgroundsLists(unobtainedBackgrounds, obtainedBackgrounds);
    loadObtainedBackgrounds(obtainedBackgrounds);
  }

  // achievement stuff
  if (achievementReached(unobtainedAchievements, clicks)) {
    if (!audioMuted) playAchievementSound();
    playPopUpAnimation(groundLevel, achievementPopUpDurationMs, createAchievementPopUpElement(unobtainedAchievements));
    groundLevel += popUpElementHeightPx;
    setTimeout(() => {
      groundLevel -= popUpElementHeightPx;
    }, achievementPopUpDurationMs);
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
