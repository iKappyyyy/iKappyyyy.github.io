const ageElement = document.querySelector('.js-age');
const dateInput = document.querySelector('.js-date-input');
const calculateButton = document.querySelector('.js-calculate-button');

calculateButton.addEventListener('click', () => {
  ageElement.innerHTML = getAge(dateInput.value);
});

dateInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') ageElement.innerHTML = getAge(dateInput.value);
});

function getAge(dateOfBirthValue) {
  const dateOfBirth = new Date(dateOfBirthValue);
  const today = new Date();

  let age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) age--;

  return age;
}
