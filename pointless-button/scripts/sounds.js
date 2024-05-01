const clickSound = new Audio('./scripts/data/sounds/click.mp3');
const achievementSound = new Audio('./scripts/data/sounds/achievement.mp3');
const backgroundSound = new Audio('./scripts/data/sounds/background.mp3');
backgroundSound.volume = 0.075;

export function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

export function playAchievementSound() {
  achievementSound.currentTime = 0;
  achievementSound.play();
}

export function playBackgroundSound() {
  backgroundSound.currentTime = 0;
  backgroundSound.play();
}
