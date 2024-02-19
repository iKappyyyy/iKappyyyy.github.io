const eventTextElement = document.querySelector('.js-event');
const eventText = 'my birthday!';
eventTextElement.addEventListener('click', () => {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
});

function changeText() {
  eventTextElement.style.backgroundColor = 'transparent';
  eventTextElement.innerHTML = eventText;
}
