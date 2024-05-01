export const unobtainedBackgrounds = JSON.parse(localStorage.getItem('unobtainedBackgrounds')) || [
  {
    clicksRequirement: 100,
    imageLink: './images/background-2.gif',
    description: 'Obtained at 100 Clicks'
  },
  {
    clicksRequirement: 1000,
    imageLink: './images/background-3.gif',
    description: 'Obtained at 1,000 Clicks'
  },
  {
    clicksRequirement: 10000,
    imageLink: './images/background-4.gif',
    description: 'Obtained at 10,000 Clicks'
  },
  {
    clicksRequirement: 100000,
    imageLink: './images/background-5.gif',
    description: 'Obtained at 100,000 Clicks'
  }
];

export const obtainedBackgrounds = JSON.parse(localStorage.getItem('obtainedBackgrounds')) || [
  {
    clicksRequirement: 0,
    imageLink: './images/background-1.gif',
    description: 'Default Background'
  }
];
