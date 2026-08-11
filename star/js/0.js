const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let qTotal = [1,0,0,0];
let vPoint = [20,0,0,0];

const qStepX = qMake(Math.PI/10,[1,0,0]);
const qStepY = qMake(Math.PI/10,[0,1,0]);

function redraw(rX, rY) {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.arc(canvas.width/2+rX, canvas.height/2+rY,0,2*Math.PI);
}

function rotX() {
  qTotal = qMult(qStepX, qTotal);
  const v = vRot(qTotal, vPoint);
  const rX = v[0];
  const rY = v[1];
  
  redraw(rX, rY);
}
