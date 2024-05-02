export function toggleAchievementMenu(achievementMenuToggled) {
  const menu = document.querySelector('.js-achievements-menu');

  if (achievementMenuToggled) {
    menu.style.right = '-270px';
    return false;
  } else {
    menu.style.right = '5px';
    return true;
  }
}

export function achievementReached(unobtainedAchievements, clicks) {
  if (!unobtainedAchievements.length) return false; // if unobtained achievements list is empty
  return unobtainedAchievements[0].clicksRequirement <= clicks;
}

export function createAchievementPopUpElement(unobtainedAchievements) {
  const achievementElement = createAchievementElement();
  const achievementInfoElement = createAchievementElementInnerHtml(achievementElement);

  const achievementReached = unobtainedAchievements[0];
  achievementInfoElement.innerHTML = `
  <span class="achievement-title">ACHIEVEMENT!</span>
  <span class="achievement-name">${achievementReached.name}</span>
  ${achievementReached.description}`;

  return achievementElement;
}

export function updateAchievementLists(unobtainedAchievements, obtainedAchievements) {
  obtainedAchievements.push(unobtainedAchievements[0]);
  unobtainedAchievements.splice(0, 1);
  localStorage.setItem('unobtainedAchievements', JSON.stringify(unobtainedAchievements));
  localStorage.setItem('obtainedAchievements', JSON.stringify(obtainedAchievements));
}

export function loadObtainedAchievements(obtainedAchievements) {
  const menu = document.querySelector('.js-achievements-menu');

  let html = '';
  obtainedAchievements.forEach(achievement => {
    html += `
    <div class="achievement-slot">
      <strong><span class="achievement-name">${achievement.name}</span></strong>${achievement.description}
    </div>
    `;
  });

  menu.innerHTML = html;
}

function createAchievementElement() {
  const achievementElement = document.createElement('div');
  achievementElement.classList.add('achievement');

  document.body.appendChild(achievementElement);
  return achievementElement;
}

function createAchievementElementInnerHtml(achievementElement) {
  const achievementInfoElement = document.createElement('p');

  achievementElement.innerHTML = `
  <i class="fa-solid fa-star"></i>
  `;

  achievementElement.appendChild(achievementInfoElement);
  return achievementInfoElement;
}
