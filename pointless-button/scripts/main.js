import { playAchievementSound, playBackgroundSound, playClickSound } from "./sounds.js";
import { unobtainedAchievements, obtainedAchievements } from "./data/achievementLists.js";
import { unobtainedBackgrounds, obtainedBackgrounds } from "./data/backgroundsLists.js";
import { changeCounterValue, updateLocalStorageClicks } from "./updateCounter.js";
import { toggleAchievementMenu, achievementReached, updateAchievementLists, createAchievementPopUpElement, loadObtainedAchievements } from "./achievements.js";
import { toggleBackgroundsMenu, loadObtainedBackgrounds, backgroundReached, updateBackgroundsLists, changeBackground, createBackgroundPopUpElement } from "./backgrounds.js";
import { changeMuteIcon, saveMutedToLocalStorage } from "./mute.js";
import { achievementPopUpDurationMs, backgroundPopUpDurationMs, playPopUpAnimation, popUpElementHeightPx } from "./animations.js";
import { toggleSettingsMenu, changeBackgroundBlur } from "./settings.js";

const button = document.querySelector('.js-pointless-button');
const achievementButton = document.querySelector('.js-achievement-button');
const backgroundButton = document.querySelector('.js-background-button');
const settingsButton = document.querySelector('.js-settings-button');
const muteButton = document.querySelector('.js-mute-button');
const backgroundBlurRange = document.querySelector('.js-background-blur-range');
const backgroundImage = localStorage.getItem('backgroundImage') || './images/background-1.gif';
let clicks = Number(localStorage.getItem('clicks')) || 0;
let audioMuted = Number(localStorage.getItem('muted')) || 0;
let backgroundBlur = localStorage.getItem('backgroundBlur') || 10;
backgroundBlur = Number(backgroundBlur); // incase backgroundBlur is 0
let achievementMenuToggled = false;
let backgroundsMenuToggled = false;
let settingsMenuToggled = false;
let groundLevel = 5;

changeCounterValue(clicks); // change counter value at the start of program
loadObtainedAchievements(obtainedAchievements); // load obtained achievements at the start of program
loadObtainedBackgrounds(obtainedBackgrounds); // load obtained backgrounds at the start of program
changeMuteIcon(muteButton, audioMuted); // load mute icon at the start of program
changeBackground(backgroundImage); // load background at the start of program
changeBackgroundBlur(backgroundBlur); // load background blur at the start of program
backgroundBlurRange.value = backgroundBlur;

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
  // close other menus if open
  if (backgroundsMenuToggled)
    backgroundsMenuToggled = toggleBackgroundsMenu(backgroundsMenuToggled);
  if (settingsMenuToggled)
    settingsMenuToggled = toggleSettingsMenu(settingsMenuToggled);
});

backgroundButton.addEventListener('click', () => {
  backgroundsMenuToggled = toggleBackgroundsMenu(backgroundsMenuToggled);
  // close other menus if open
  if (achievementMenuToggled)
    achievementMenuToggled = toggleAchievementMenu(achievementMenuToggled);
  if (settingsMenuToggled)
    settingsMenuToggled = toggleSettingsMenu(settingsMenuToggled);
});

settingsButton.addEventListener('click', () => {
  settingsMenuToggled = toggleSettingsMenu(settingsMenuToggled);
  // close other menus if open
  if (backgroundsMenuToggled)
    backgroundsMenuToggled = toggleBackgroundsMenu(backgroundsMenuToggled);
  if (achievementMenuToggled)
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

backgroundBlurRange.addEventListener('input', (event) => {
  const rangeValue = event.target.value;
  changeBackgroundBlur(rangeValue);
})
