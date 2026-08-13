#after 0.js

let drag = false;
let dragStartX = 0;
let dragStartY = 0;

canvas.addEventListener('mousedown', (e)=>{
  drag = true;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  dragStartQTotal = qTotal;
})

canvas.addEventListener('mouseup', (e)=>{
  drag = false;
})

canvas.addEventListener('mousemove', (e)=>{
  if (drag) {
    const dragX = e.clientX-dragStartX;
    const dragY = e.clientY-dragStartY;
    const dragC = Math.sqrt(dragX**2+dragY**2);
    const dragQ = qMake(dragC/radius, [-dragY/dragC, dragX/dragC, 0]);
    qTotal = qMult(dragQ, dragStartQTotal);
    reDraw();
  }
})
