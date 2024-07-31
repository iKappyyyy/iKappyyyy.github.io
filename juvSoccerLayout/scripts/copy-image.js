const screenshotButton = document.querySelector('.js-screenshot-button');
const image = document.querySelector('.js-image-content');

screenshotButton.addEventListener('click', () => {
  const photo = image.cloneNode(true);
  photo.classList.remove('image-content');
  photo.classList.remove('js-image-content');
  photo.classList.add('photo');
  document.body.append(photo);

  html2canvas(photo, {scale: 2}).then(canvas => {
    canvas.toBlob(blob => {
      try {
        navigator.clipboard.write([
        new ClipboardItem({'image/png': blob})
        ]);

        console.log('image copied lol');
      } catch (error) {
        console.log('shitos lo avad');
      }
    });
  });

  photo.remove();
});