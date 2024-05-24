const images = document.querySelectorAll('img');
const main = document.querySelector('main');

images.forEach(image => {
  image.addEventListener('click', () => {
    const dimBackgroundElement = document.createElement('div');
    dimBackgroundElement.classList.add('dim-background');
    main.appendChild(dimBackgroundElement);

    dimBackgroundElement.addEventListener('click', () => {
      dimBackgroundElement.remove();
    });

    dimBackgroundElement.appendChild(image.cloneNode(true));
  });
});
