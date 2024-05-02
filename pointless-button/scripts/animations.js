const hiddenValue = '-120px';
const movePopUpMs = 500;
export const popUpElementHeightPx = 105;
export const achievementPopUpDurationMs = 5000;
export const backgroundPopUpDurationMs = 10000;

export function playPopUpAnimation(floorLevel, animationDurationMs, popUpElement) {
  if (animationDurationMs === 0) {
    console.log('animationDurationMs Can\'t be 0!!');
    return;
  }

  setTimeout(() => {
    popUpElement.style.bottom = `${floorLevel}px`;
  }, 0);

  setTimeout(() => {
    popUpElement.style.bottom = hiddenValue;
    setTimeout(() => {
      popUpElement.remove();
    }, movePopUpMs);
  }, animationDurationMs - movePopUpMs);
}
