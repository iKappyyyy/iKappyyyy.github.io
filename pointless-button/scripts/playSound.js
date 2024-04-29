const sound = new Audio('./scripts/data/click.mp3');

export default function playSound() {
  sound.currentTime = 0;
  sound.play();
}
