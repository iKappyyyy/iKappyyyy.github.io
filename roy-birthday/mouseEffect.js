const mouseEffectCircle = document.getElementById('mouse-effect');

document.body.addEventListener('mousemove', e => {
  const left = e.clientX;
  const top = e.clientY;

  mouseEffectCircle.style.left = `${left}px`;
  mouseEffectCircle.style.top = `${top}px`;
});