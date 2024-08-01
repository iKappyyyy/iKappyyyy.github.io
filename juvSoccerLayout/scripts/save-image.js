const screenshotButton = document.querySelector('.js-screenshot-button');
const image = document.querySelector('.js-image-content');

screenshotButton.addEventListener('click', () => {
  const photo = image.cloneNode(true);
  photo.classList.remove('image-content');
  photo.classList.remove('js-image-content');
  photo.classList.add('photo');
  document.body.append(photo);

  html2canvas(photo, {scale: 2}).then(canvas => {
    const imageUrl = canvas.toDataURL('image/png');

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `juvLayout-${timestamp}.png`;

    const photoFile = document.createElement('a');
    photoFile.href = imageUrl;
    photoFile.download = filename;

    document.body.appendChild(photoFile);
    photoFile.click();
    document.body.removeChild(photoFile);
  });

  photo.remove();
});