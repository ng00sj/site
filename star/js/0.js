const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let qTotal = [1,0,0,0];
let vPoint = [20,0,0,0];

const qStepX = qMake(Math.PI/10,[1,0,0]);
const qStepY = qMake(Math.PI/10,[0,1,0]);
const qStepZ = qMake(Math.PI/10,[0,0,1]);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function draw(rX, rY) {
  ctx.beginPath();
  ctx.arc(canvas.width/2+rX, canvas.height/2+rY,1,0,2*Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
}

function redraw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const v = vRot(qTotal, vPoint);
  const rX = v[0];
  const rY = v[1];
  draw(rX, rY);
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
redraw(rX, rY);
