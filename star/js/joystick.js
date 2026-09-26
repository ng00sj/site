//after 0.js

const el_base = document.getElementById('stick-base');
const el_stick = document.getElementById('stick');
const baseR = el_base.clientWidth / 2;

let stickDrag = false;
let stickDragStartX = 0
let stickDragStartY = 0;

let outputX=0;
let outputY=0;

function resetStick(){
  el_stick.style.left = '50%';
  el_stick.style.top = '50%';
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
    let stickDragX = e.clientX-stickDragStartX;
    let stickDragY = e.clientY-stickDragStartY;
    const stickDragR = Math.sqrt(stickDragX**2+stickDragY**2);
    outputX = stickDragX / stickDragR;
    outputY = stickDragY / stickDragR;
    outoutR = Math.min(stickDragR / baseR, 1);
    if (stickDragR>baseR){
      stickDragX=stickDragX/stickDragR*baseR;
      stickDragY=stickDragY/stickDragR*baseR;
    }
    el_stick.style.left = `calc(50% + ${stickDragX}px)`;
    el_stick.style.top = `calc(50% + ${stickDragY}px)`;
  }
});

let lastTime = performance.now();

function gameLoop(currentTime){
  let dt= (currentTime-LastTime)/1000;
  lastTime=currentTime;
  
  if (dt>0.1){dt=0.1;}
  const qStep = qMake(Math.PI/20*dt*outoutR,[outputY,-outputX,0]);
  qTotal = qMult(qStep, qTotal);
  redraw();
  
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);