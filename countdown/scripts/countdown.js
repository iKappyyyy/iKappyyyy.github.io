import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
const eventEnds = dayjs('2024-02-18');
const countdown = document.querySelector('.js-countdown');
let intervalID = null;

function amountOfTimeLeft() {
  const now = dayjs();
  const diff = eventEnds.diff(now);

  if (diff <= 1000) changeText();
  if (diff <= 0) {
    clearInterval(intervalID);
    return;
  }

  const time = getTime(diff);
  const newTime = formatTime(time);

  countdown.innerHTML = newTime;
}

function getTime(diff) {
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds]; 
}

function formatTime(time) {
  let timeFormatted = '';
  time.forEach(value => {
    timeFormatted += String(value).padStart(2, '0');
    timeFormatted += ':'
  });

  timeFormatted = timeFormatted.slice(0, -1);
  return timeFormatted;
}

amountOfTimeLeft();
intervalID = setInterval(() => {
  amountOfTimeLeft();
}, 1000);
