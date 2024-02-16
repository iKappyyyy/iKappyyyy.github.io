const inputs = document.querySelectorAll('.js-card-number');

inputs.forEach((input, index) => {
  input.addEventListener('input', (event) => {
    const value = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    event.target.value = value;
    
    if (event.inputType === 'deleteContentBackward' && input.value === '') {
      if (index !== 0) {
        inputs[index - 1].focus();
      }
    } else if (value.length === 4) {
      if (index !== inputs.length - 1) {
        inputs[index + 1].focus();
      }
    }
  });
  
  input.addEventListener('keydown', (event) => {
    if (!/^\d+$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      event.preventDefault();
    }
  });
});

const textInputs = [document.querySelector('.js-card-name'), document.querySelector('.js-card-owner')];

textInputs.forEach(input => {
  input.addEventListener('input', (event) => {
    const value = event.target.value.replace(/[^A-Za-z\s]/g, ''); // Remove non-alphabetic characters
    event.target.value = value;
  });
});
