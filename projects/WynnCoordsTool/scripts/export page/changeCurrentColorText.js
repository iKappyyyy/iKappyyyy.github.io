const colorPicker = document.querySelector('.js-color-picker');
const currentColorText = document.querySelector('.js-current-color');

colorPicker.addEventListener('input', () => {
  currentColorText.innerText = colorPicker.value;
});

