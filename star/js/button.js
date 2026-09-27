const el_butRotX = document.getElementById('butRotX');
const el_butRotY = document.getElementById('butRotY');
const el_butRotZ = document.getElementById('butRotZ');
const el_butZoomBig = document.getElementById('butZoomBig');
const el_butZoomSmall = document.getElementById('butZoomSmall');
const el_butZoomReset = document.getElementById('butZoomReset');
const el_butFull = document.getElementById('butFull');

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

el_butZoomReset.addEventListener('click', () => {
  zoomReset();
});

el_butFull.addEventListener('click', () => {
  if (document.fullscreenElement) {
    document.exitFullscreen().catch((err) => {
      console.log(`無法退出全螢幕: ${err.message}`);
    }); 
  }else{
    document.documentElement.requestFullscreen().catch((err) => {
      console.log(`無法進入全螢幕: ${err.message}`);
    });
  }
});