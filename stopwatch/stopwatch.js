let time = localStorage.getItem('time') || '0.0';
let isCounting = false;
let intervalID = null;
const toggleButton = document.querySelector('.js-toggle-button');
const resetButton = document.querySelector('.js-reset-button');
const timeElement = document.querySelector('.js-time');
timeElement.innerText = time;
toggleButton.addEventListener('click', () => {
  if (!isCounting) {
    intervalID = setInterval(() => {
      time = String(Math.round((Number(time) * 100 + 10)) / 100);
      if (time % 1 === 0) time += '.0';
      timeElement.innerText = time;
    }, 100);
    isCounting = true;
    toggleButton.innerText = 'Stop';
  } else {
    clearInterval(intervalID);
    isCounting = false;
    localStorage.setItem('time', time);
    toggleButton.innerText = 'Start';
  }
});
resetButton.addEventListener('click', () => {
  time = '0.0';
  timeElement.innerText = time;
  localStorage.setItem('time', time);
});
