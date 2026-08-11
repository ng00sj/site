const el_butRotX = document.getElementById('butRotX');
const el_butRotY = document.getElementById('butRotX');
const el_butRotZ = document.getElementById('butRotX');

el_butRotX.addEventListener('click', () => {
  rotX();
});

el_butRotY.addEventListener('click', () => {
  rotY();
});

el_butRotZ.addEventListener('click', () => {
  rotZ();
});
