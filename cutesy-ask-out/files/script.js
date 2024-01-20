// Function to get a random position within the flex container
function getRandomPosition() {
  const container = document.querySelector('.buttons-container');
  const containerRect = container.getBoundingClientRect();
  const button = document.querySelector('.js-no-button');
  const buttonRect = button.getBoundingClientRect();

  const randomX = Math.random() * (800 + 965) - 965;
  const randomY = Math.random() * (220 + 665) - 665;

  return { x: randomX, y: randomY };
}

// Function to handle the button hover event
function handleHover() {
  const randomPosition = getRandomPosition();
  const noButton = document.querySelector('.js-no-button');

  noButton.style.transform = `translate(${randomPosition.x}px, ${randomPosition.y}px)`;
}

// Add event listener to the 'js-no-button' element
const noButton = document.querySelector('.js-no-button');
noButton.addEventListener('mouseover', handleHover);
noButton.addEventListener('click', () => {
  window.location.href = 'files/no.html';
});

const yesButton = document.querySelector('.js-yes-button');
yesButton.addEventListener('click', () => {
  window.location.href = 'files/yes.html';
});
