const eventTextElement = document.querySelector('.js-event');
const eventText = 'I\'m gonna die LOL hehe haha';
eventTextElement.addEventListener('click', () => {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
});

function changeText() {
  eventTextElement.style.backgroundColor = 'transparent';
  eventTextElement.innerHTML = eventText;
}
