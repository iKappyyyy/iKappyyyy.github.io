const helpButton = document.querySelector('.js-help-button');
const helpText = document.querySelector('.js-help-text');
let isHidden = true;

helpText.innerHTML = `
<span class="help-title">How To Use:</span>
<br>
bro IMAGINE needing help for a website as<br>
SIMPLE as this like even a fucking MONKEY<br>
with 3 fingers could figure this out in SECONDS
<br>
<br>
<br>
<br>
<span class="help-title">Shortcuts:</span>
<br>
<b>Ctrl &#43; Left Arrow</b> - Decrease colour amount
<br>
<b>Ctrl &#43; Right Arrow</b> - Increase colour amount
<br>
<b>Left Arrow</b> - Go back
<br>
<b>Right Arrow</b> - Go next
<br>
<b>Space Bar</b> - Generate colours
<br>
<b>Right Click</b> - Save colour
`

helpButton.addEventListener('click', () => {
  if (isHidden) {
    helpText.style.display = 'block';
    isHidden = false;
  } else {
    helpText.style.display = 'none';
    isHidden = true;
  }
});
