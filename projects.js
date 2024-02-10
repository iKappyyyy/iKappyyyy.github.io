const projectsInfo = [
  { folder: 'cutesy-ask-out', file: 'question.html', title: 'Will you go out with me?'},
  { folder: 'rock-paper-scissors', file: 'rps.html', title: 'Rock Paper Scissors!' },
  { folder: 'todo-list', file: 'todo-list.html', title: 'Todo List' },
  { folder: 'youtube-recreation', file: 'youtube.html', title: 'YouTube!' },
  { folder: 'stopwatch', file: 'stopwatch.html', title: 'Stopwatch' },
  { folder: 'tic-tac-toe', file: 'tic-tac-toe.html', title: 'Tic Tac Toe!' },
  { folder: 'colour-generator', file: 'generator.html', title: 'Colour Generator!' },
  { folder: 'valentine', file: 'index.html', title: 'Will you be my valentine?' },
  { folder: 'countdown', file: 'index.html', title: 'Countdown!' }
];
const projectsElement = document.querySelector('.js-projects');

let projectsHTML = '';
let i = 0
for (i = 0; i < projectsInfo.length; i++) {
  projectsHTML += `
  <div class="js-project project">
    <div class="project-title">
      ${projectsInfo[i].title}
    </div>
    <img class="project-thumbnail" src="${projectsInfo[i].folder}/thumbnail.png">
  </div>
  `
}

projectsElement.innerHTML = projectsHTML;
const projects = document.querySelectorAll('.js-project');
projectsInfo.forEach((projectObject, i) => {
  projects[i].addEventListener('click', () => {
    document.location.href = `${projectObject.folder}/${projectObject.file}`;
  });
});
