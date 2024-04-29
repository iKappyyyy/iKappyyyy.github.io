export function changeCounterValue(clicks) {
  const counter = document.querySelector('.js-clicks');

  if (clicks === 1) counter.innerHTML = `${clicks} Time`;
  else counter.innerHTML = `${clicks} Times`;
}

export function updateClicks(clicks) {
  localStorage.setItem('clicks', String(clicks));
}
