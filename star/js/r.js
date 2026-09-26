//after 0.js

let drag = false;
let dragStartX = 0;
let dragStartY = 0;

canvas.addEventListener('mousedown', (e)=>{
  drag = true;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  dragStartQTotal = qTotal;
});

canvas.addEventListener('mouseup', (e)=>{
  drag = false;
});

canvas.addEventListener('mousemove', (e)=>{
  if (drag) {
    const dragX = e.clientX-dragStartX;
    const dragY = e.clientY-dragStartY;
    const dragR = Math.sqrt(dragX**2+dragY**2);
    if (dragR>0){
      const dragQ = qMake(dragR/radius, [-dragY/dragR, dragX/dragR, 0]);
      qTotal = qMult(dragQ, dragStartQTotal);
      redraw();
    }
  }
});

canvas.addEventListener('touchstart', (e)=>{
  drag = true;
  dragStartX = e.touches[0].clientX;
  dragStartY = e.touches[0].clientY;
  dragStartQTotal = qTotal;
});

canvas.addEventListener('touchend', (e)=>{
  drag = false;
});

canvas.addEventListener('touchmove', (e)=>{
  e.preventDefault();
  if (drag) {
    const dragX = e.touches[0].clientX-dragStartX;
    const dragY = e.touches[0].clientY-dragStartY;
    const dragR = Math.sqrt(dragX**2+dragY**2);
    if (dragR>0){
      const dragQ = qMake(dragR/radius, [-dragY/dragR, dragX/dragR, 0]);
      qTotal = qMult(dragQ, dragStartQTotal);
      redraw();
    }
  }
}, { passive: false });
