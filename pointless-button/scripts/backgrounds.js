export function toggleBackgroundsMenu(backgroundsMenuToggled) {
  const menu = document.querySelector('.js-backgrounds-menu');

  if (backgroundsMenuToggled) {
    menu.style.right = '-270px';
    return false;
  } else {
    menu.style.right = '5px';
    return true;
  }
}
