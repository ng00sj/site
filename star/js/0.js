const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const radius = 50;

let qTotal = [1,0,0,0];
const sq2 = Math.sqrt(2);
let vPoints = [
  [radius,0,0],
  [-radius,0,0],
  [radius/sq2,radius/sq2,0],
  [-radius/sq2,-radius/sq2,0],
  [radius/sq2,-radius/sq2,0],
  [-radius/sq2,radius/sq2,0],
  [0,radius,0],
  [0,-radius,0],
  [0,0,radius],
  [0,0,-radius],
];

const qStepX = qMake(Math.PI/10,[1,0,0]);
const qStepY = qMake(Math.PI/10,[0,1,0]);
const qStepZ = qMake(Math.PI/10,[0,0,1]);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function draw(rX, rY) {
  ctx.beginPath();
  ctx.arc(canvas.width/2+rX, canvas.height/2+rY,5,0,2*Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
}

function redraw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2,radius,0,2*Math.PI);
  ctx.fillStyle = "blue";
  ctx.fill();
  
  vPoints.forEach(vPoint=>{
    const v = vRot(qTotal, vPoint);
    if (v[2]>0) {
      draw(v[0], v[1]);
    }
  });
}

function rotX() {
  qTotal = qMult(qStepX, qTotal);
  redraw();
}

function rotY() {
  qTotal = qMult(qStepY, qTotal);
  redraw();
}

function rotZ() {
  qTotal = qMult(qStepZ, qTotal);
  redraw();
}

resizeCanvas();
redraw();
