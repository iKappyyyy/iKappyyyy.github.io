export const multiLinksButton = document.querySelector('.js-multi-link');
export const maxLinks = 20;
export let usedColors = [];

export function toggleMultiLinks(multiLinksEnabled) {
  if (multiLinksEnabled) {
    multiLinksEnabled = false;
    multiLinksButton.setAttribute('data-tooltip', 'Disabled!');
    usedColors = [];
  } else {
    multiLinksEnabled = true;
    multiLinksButton.setAttribute('data-tooltip', 'Enabled!');
  }

  return multiLinksEnabled;
}
