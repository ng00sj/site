const el_butRotX = document.getElementById('butRotX');
const el_butRotY = document.getElementById('butRotY');
const el_butRotZ = document.getElementById('butRotZ');
const el_butZoomBig = document.getElementById('butZoomBig');
const el_butZoomSmall = document.getElementById('butZoomSmall');

el_butRotX.addEventListener('click', () => {
  rotX();
});

el_butRotY.addEventListener('click', () => {
  rotY();
});

el_butRotZ.addEventListener('click', () => {
  rotZ();
});

el_butZoomBig.addEventListener('click', () => {
  zoomBig();
});

el_butZoomSmall.addEventListener('click', () => {
  zoomSmall();
});
