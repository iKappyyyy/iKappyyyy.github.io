const calculateButton = document.querySelector('.js-calculate-button');
const billInput = document.querySelector('.js-bill-input');
const tipInput = document.querySelector('.js-tip-input');

const billText = document.querySelector('.js-bill-text');
const tipText = document.querySelector('.js-tip-text');
const totalText = document.querySelector('.js-total-text');

[billInput, tipInput].forEach(input => {
  input.addEventListener('blur', () => {
    changeTexts(Number(billInput.value), Number(tipInput.value));
  });
});

billInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') tipInput.focus();
});

tipInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    tipInput.blur();
    changeTexts(Number(billInput.value), Number(tipInput.value));
  }
});

calculateButton.addEventListener('click', () => {
  changeTexts(Number(billInput.value), Number(tipInput.value));
});

function calculateTip(bill, tipPercentage) {
  return (bill * tipPercentage) / 100;
}

function changeTexts(bill, tipPercentage) {
  const tip = calculateTip(bill, tipPercentage);
  billText.innerHTML = String(bill.toFixed(2));
  tipText.innerHTML = String(tip.toFixed(2));
  totalText.innerHTML = String((bill + tip).toFixed(2));
}
