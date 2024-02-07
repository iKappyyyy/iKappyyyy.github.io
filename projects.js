const projectsInfo = [
  { folder: 'rock-paper-scissors', file: 'rps.html', title: 'Rock Paper Scissors!' },
  { folder: 'todo-list', file: 'todo-list.html', title: 'Todo List' },
  { folder: 'youtube-recreation', file: 'youtube.html', title: 'YouTube!' },
  { folder: 'stopwatch', file: 'stopwatch.html', title: 'Stopwatch' },
  { folder: 'tic-tac-toe', file: 'tic-tac-toe.html', title: 'Tic Tac Toe!' },
  { folder: 'colour-generator', file: 'generator.html', title: 'Colour Generator!' },
  { folder: 'cutesy-ask-out', file: 'question.html', title: 'Will you go out with me?'},
  { folder: 'valentine', file: 'index.html', title: 'Will you be my valentine?' }
];
const projectsElement = document.querySelector('.js-projects');

let projectsHTML = '';
let currentRow = '';
let i = 0
for (i = 0; i < projectsInfo.length; i++) {
  if (i % 3 === 0) {
    currentRow += '</div>';
    projectsHTML += currentRow;
    currentRow = '<div class="row">';
  }
  currentRow += `
  <div class="js-project project">
    <div class="project-title">
      ${projectsInfo[i].title}
    </div>
    <img class="project-thumbnail" src="${projectsInfo[i].folder}/thumbnail.png">
  </div>
  `
}
while (i % 3 !== 0) {
  currentRow += `
  <div class="project">
    <div class="project-title">
      To Be Done.
    </div>
    <img class="project-thumbnail" src="thumbnail.png">
  </div>
  `
  i++;
}

currentRow += '</div>';
projectsHTML += currentRow;
currentRow = '';
projectsElement.innerHTML = projectsHTML;
const projects = document.querySelectorAll('.js-project');
projectsInfo.forEach((projectObject, i) => {
  projects[i].addEventListener('click', () => {
    document.location.href = `${projectObject.folder}/${projectObject.file}`;
  });
});
