const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let total = [1,0,0,0];

const qStepX = qMake(Math.PI/10,[1,0,0]);
const qStepY = qMake(Math.PI/10,[0,1,0]);

function rotX() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
}
