const minBlur = 0;
const maxBlur = 20;

export function toggleSettingsMenu(settingsMenuToggled) {
  const menu = document.querySelector('.js-settings-menu');
  const icon = document.querySelector('.js-settings-icon');

  if (settingsMenuToggled) {
    menu.style.left = '-270px';
    icon.style.transform = 'rotate(0deg)';
    return false;
  } else {
    menu.style.left = '5px';
    icon.style.transform = 'rotate(75deg)';
    return true;
  }
}

export function changeBackgroundBlur(blurPx) {
  if (blurPx < minBlur || maxBlur < blurPx) return;

  document.body.style.backdropFilter = `blur(${blurPx}px)`;
  changeBackgroundBlurText(blurPx);
  saveBlurToLocalStorage(blurPx);
}

function saveBlurToLocalStorage(blurPx) {
  localStorage.setItem('backgroundBlur', String(blurPx));
}

function changeBackgroundBlurText(blurPx) {
  const backgroundBlurText = document.querySelector('.js-background-blur-amount');

  backgroundBlurText.innerHTML = String(blurPx);
}
