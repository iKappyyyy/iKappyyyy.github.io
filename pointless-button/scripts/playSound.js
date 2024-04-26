const sound = new Audio('./scripts/data/click.mp3');
const button = document.querySelector('button');

button.addEventListener('click', () => {
  sound.currentTime = 0;
  sound.play();
});
