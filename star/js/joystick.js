//after 0.js

const el_base = document.getElementById('stick-base');
const el_stick = document.getElementById('stick');
let baseR = (el_base.clientWidth-el_stick.clientWidth) / 2;

let stickDrag = false;
let stickDragStartX = 0
let stickDragStartY = 0;

let outputX=0;
let outputY=0;
let outputR=0;

function resetStick(){
  el_stick.style.left = '50%';
  el_stick.style.top = '50%';
  outputX=0;
  outputY=0;
  outputR=0;
}

el_stick.addEventListener('mousedown', (e)=>{
  stickDrag = true;
  stickDragStartX = e.clientX;
  stickDragStartY = e.clientY;
});

window.addEventListener('mouseup', (e)=>{
  if (stickDrag){
    stickDrag = false;
    resetStick();
  }
});

window.addEventListener('mousemove', (e)=>{
  if (stickDrag){
    baseR = (el_base.clientWidth-el_stick.clientWidth) / 2;
    let stickDragX = e.clientX-stickDragStartX;
    let stickDragY = e.clientY-stickDragStartY;
    const stickDragR = Math.sqrt(stickDragX**2+stickDragY**2);
    outputX = stickDragX / stickDragR;
    outputY = stickDragY / stickDragR;
    outputR = Math.min(stickDragR / baseR, 1);
    if (stickDragR>baseR){
      stickDragX=stickDragX/stickDragR*baseR;
      stickDragY=stickDragY/stickDragR*baseR;
    }
    el_stick.style.left = `calc(50% + ${stickDragX}px)`;
    el_stick.style.top = `calc(50% + ${stickDragY}px)`;
  }
});

el_stick.addEventListener('touchstart', (e)=>{
  stickDrag = true;
  stickDragStartX = e.touches[0].clientX;
  stickDragStartY = e.touches[0].clientY;
});

window.addEventListener('touchend', (e)=>{
  if (stickDrag){
    stickDrag = false;
    resetStick();
  }
});

window.addEventListener('touchmove', (e)=>{
  if (stickDrag){
    baseR = (el_base.clientWidth-el_stick.clientWidth) / 2;
    let stickDragX = e.touches[0].clientX-stickDragStartX;
    let stickDragY = e.touches[0].clientY-stickDragStartY;
    const stickDragR = Math.sqrt(stickDragX**2+stickDragY**2);
    outputX = stickDragX / stickDragR;
    outputY = stickDragY / stickDragR;
    outputR = Math.min(stickDragR / baseR, 1);
    if (stickDragR>baseR){
      stickDragX=stickDragX/stickDragR*baseR;
      stickDragY=stickDragY/stickDragR*baseR;
    }
    el_stick.style.left = `calc(50% + ${stickDragX}px)`;
    el_stick.style.top = `calc(50% + ${stickDragY}px)`;
  }
}, { passive: false });

let lastTime = performance.now();

function gameLoop(currentTime){
  let dt= (currentTime-lastTime)/1000;
  lastTime=currentTime;
  
  if (dt>0.1){dt=0.1;}
  const qStep = qMake(Math.PI/10*dt*outputR,[outputY,-outputX,0]);
  qTotal = qMult(qStep, qTotal);
  redraw();
  
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);