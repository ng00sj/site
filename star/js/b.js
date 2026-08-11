const el_butRotX = document.getElementById('butRotX');
const el_butRotY = document.getElementById('butRotY');
const el_butRotZ = document.getElementById('butRotZ');

el_butRotX.addEventListener('click', () => {
  rotX();
});

el_butRotY.addEventListener('click', () => {
  rotY();
});

el_butRotZ.addEventListener('click', () => {
  rotZ();
});
