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
