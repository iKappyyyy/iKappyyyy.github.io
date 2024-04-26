export function toggleMenu(toggled) {
  const menu = document.querySelector('.achievement-menu');

  if (toggled) {
    menu.style.right = '-270px';
    return false;
  } else {
    menu.style.right = '5px';
    return true;
  }
}