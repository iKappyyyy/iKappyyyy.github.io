export const unobtainedAchievements = JSON.parse(localStorage.getItem('unobtainedAchievements')) || [
  {
    clicksRequirement: 1,
    name: 'Pointless',
    description: 'That was pointless; do it again.'
  },
  {
    clicksRequirement: 69,
    name: 'Funny Number',
    description: 'Reach 69 clicks lololol'
  },
  {
    clicksRequirement: 100,
    name: 'Clicky Button',
    description: 'Reach 100 clicks'
  },
  {
    clicksRequirement: 420,
    name: 'What is That Smell?',
    description: 'Reach 420 clicks'
  },
  {
    clicksRequirement: 1000,
    name: 'That\'s a Lot of Clicks',
    description: 'Reach 1,000 clicks'
  },
  {
    clicksRequirement: 7000,
    name: 'SGIL',
    description: 'Reach 7,000 clicks'
  },
  {
    clicksRequirement: 10000,
    name: 'Better Stop Here Lol',
    description: 'Reach 10,000 clicks'
  },
  {
    clicksRequirement: 50000,
    name: 'Halfway There',
    description: 'Reach 50,000 clicks'
  },
  {
    clicksRequirement: 69420,
    name: 'Ultimate Funny',
    description: 'Reach 69,420 clicks (nice)'
  },
  {
    clicksRequirement: 100000,
    name: 'why',
    description: 'Reach 100,000 clicks'
  }
];

export const obtainedAchievements = JSON.parse(localStorage.getItem('obtainedAchievements')) || [];
