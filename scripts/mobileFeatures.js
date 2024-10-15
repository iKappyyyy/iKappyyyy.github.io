import { projectsArray } from "./load-projects.js";
const arrow = document.getElementById('scroll-arrow');
const projectDescription = document.getElementById('project-description');

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobileDevice()) {
  arrow.classList.remove('hidden');
  
  projectDescription.innerText = `${projectsArray[0].title}: ${projectsArray[0].description}`; // set initial description
  let i = 1;
  setInterval(() => {
    projectDescription.innerText = `${projectsArray[i].title}: ${projectsArray[i].description}`;
    i++;
    if (projectsArray.length <= i) i = 0; 
  }, 5000);
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    arrow.classList.add('hidden');
  } else if (isMobileDevice()) {
    arrow.classList.remove('hidden');
  }
});

arrow.addEventListener('click', () => {
  window.scrollTo({ top: 700, behavior: 'smooth' });
});