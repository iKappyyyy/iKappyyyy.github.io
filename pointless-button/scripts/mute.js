export function changeMuteIcon(muteButton, muted) {
  if (muted) {
    muteButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
  } else {
    muteButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  }
}

export function saveMutedToLocalStorage(muted) {
  localStorage.setItem('muted', String(muted));
}
