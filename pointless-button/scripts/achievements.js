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

export function achievementReached(unobtainedAchievements, clicks) {
  return unobtainedAchievements[0].clicksRequirement <= clicks;
}

export function playAchievementReachedAnimation(unobtainedAchievements) {
  const achievementElement = document.querySelector('.js-achievement');
  achievementElement.innerHTML = `
  <i class="fa-solid fa-star"></i>
  <p class="js-achievement-info"></p>
  `;

  const achievementInfoElement = document.querySelector('.js-achievement-info');
  const achievementReached = unobtainedAchievements[0];
  achievementInfoElement.innerHTML = `<span class="achievement-title">ACHIEVEMENT!</span><span class="achievement-name">${achievementReached.name}</span>${achievementReached.description}`;
  achievementElement.style.animationPlayState = 'running';
  achievementElement.style.display = 'flex';
  setTimeout(() => {
    achievementElement.style.animationPlayState = 'paused';
    achievementInfoElement.innerHTML = '';
    achievementElement.style.display = 'none';
  }, 5000);
}

export function updateAchievementLists(unobtainedAchievements, obtainedAchievements) {
  obtainedAchievements.push(unobtainedAchievements[0]);
  unobtainedAchievements.splice(0, 1);
  localStorage.setItem('unobtainedAchievements', JSON.stringify(unobtainedAchievements));
  localStorage.setItem('obtainedAchievements', JSON.stringify(obtainedAchievements));
}

export function loadObtainedAchievements(obtainedAchievements) {
  const menu = document.querySelector('.achievement-menu');

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
