const clickSound = new Audio('./scripts/data/sounds/click.mp3');
const achievementSound = new Audio('./scripts/data/sounds/achievement.mp3');

export function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

export function playAchievementSound() {
  achievementSound.currentTime = 0;
  achievementSound.play();
}
