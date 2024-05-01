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

export function backgroundReached(unobtainedBackgrounds, clicks) {
  if (!unobtainedBackgrounds.length) return false; // if unobtained backgrounds list is empty
  return unobtainedBackgrounds[0].clicksRequirement <= clicks;
}

export function playBackgroundReachedAnimation(obtainedBackgrounds) {
  const backgroundElement = createBackgroundElement();
  const backgroundInfoElement = createBackgroundElementInnerHtml(backgroundElement);

  const backgroundReached = obtainedBackgrounds[obtainedBackgrounds.length - 1];
  console.log(backgroundReached);
  backgroundInfoElement.innerHTML = `
  <span class="background-title">BACKGROUND!</span>
  <span class="background-name">Background ${obtainedBackgrounds.length + 1}</span>
  ${backgroundReached.description}`;

  setTimeout(() => {
    achievementElement.remove();
  }, 10000);
}

export function loadObtainedBackgrounds(obtainedBackgrounds) {
  const menu = document.querySelector('.js-backgrounds-menu');
  menu.innerHTML = '';

  obtainedBackgrounds.forEach((background, index) => {
    const backgroundSlot = document.createElement('div');
    backgroundSlot.classList.add('background-slot');
    backgroundSlot.innerHTML = `
      <strong><span class="background-name">Background ${index + 1}</span></strong>
      ${background.description}
    `;

    backgroundSlot.style.backgroundImage = `url(${background.imageLink})`;
    backgroundSlot.addEventListener('click', () => {
      changeBackground(background.imageLink);
    });
    menu.appendChild(backgroundSlot);
  });
}

export function updateBackgroundsLists(unobtainedBackgrounds, obtainedBackgrounds) {
  obtainedBackgrounds.push(unobtainedBackgrounds[0]);
  unobtainedBackgrounds.splice(0, 1);
  localStorage.setItem('unobtainedBackgrounds', JSON.stringify(unobtainedBackgrounds));
  localStorage.setItem('obtainedBackgrounds', JSON.stringify(obtainedBackgrounds));
}

export function changeBackground(imageLink) {
  document.body.style.backgroundImage = `url(${imageLink})`;
  localStorage.setItem('backgroundImage', imageLink);
}

function createBackgroundElement() {
  const backgroundElement = document.createElement('div');
  backgroundElement.classList.add('background');

  document.body.appendChild(backgroundElement);
  return backgroundElement;
}

function createBackgroundElementInnerHtml(backgroundElement) {
  const backgroundInfoElement = document.createElement('p');

  backgroundElement.innerHTML = `
  <i class="fa-solid fa-star"></i>
  `;

  backgroundElement.appendChild(backgroundInfoElement);
  return backgroundInfoElement;
}

