/*
====================
MUST READ!!!
====================

- make sure the html page is called index.html
*/

export const projectsArray = [
  /*
  { 
    folder: '',
    title: '',
    description: ''
  },
  */

  { 
    folder: 'juvSoccerLayout',
    title: 'Juventus Image Maker', 
    description: 'Create your own Juventus Formation Image, using the Juventus Formations Image Maker! (Hebrew Only)'
  },
  {
    folder: 'WynnCoordsTool',
    title: 'Wynncraft Coordinates Tool',
    description: 'Get the coordinates of where you can obtain wynncraft items and turn them into usable wynntils waypoints!'
  },
  { 
    folder: 'pointless-button',
    title: 'Pointless Button',
    description: '! WARNING: POINTLESS !'
  },
  { 
    folder: 'colour-generator',
    title: 'Random Colour Generator',
    description: 'Generate a random colour with the click of a button!'
  },
  { 
    folder: 'cutesy-ask-out',
    title: 'Ask Out Proposal',
    description: 'A fun idea I decided to recreate! | PC ONLY | (might be a bit broken at the moment)'
  },
  { 
    folder: 'valentine',
    title: 'Valentines Day Ask Out',
    description: 'Will you be my valentine?'
  },
  { 
    folder: 'youtube-recreation',
    title: 'Youtube Recreation',
    description: 'I made this as part of my "Learning HTML & CSS" course! Everything in here is made using HTML and CSS only, and was completely done by me :)'
  }
]

const projectsTable = document.getElementById('projects-table');
const projectDescription = document.getElementById('project-description');

projectsArray.forEach(projectInfo => {
  const projectButton = document.createElement('button');
  projectButton.innerText = projectInfo.title;

  projectButton.addEventListener('click', () => {
    document.location.href = `projects/${projectInfo.folder}/index.html`;
  });

  projectButton.addEventListener('mouseover', () => {
    projectDescription.innerText = projectInfo.description;
  });

  projectsTable.append(projectButton);
});