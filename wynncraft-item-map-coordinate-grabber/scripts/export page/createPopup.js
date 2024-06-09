export function createPopUp() {
  const div = document.createElement('div');
  div.classList.add('copied-popup');
  div.innerText = 'Text Copied to Clipboard!';

  document.body.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 5000);
}
