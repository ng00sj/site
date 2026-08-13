const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let radius = 50;

let qTotal = [1,0,0,0];
const sq2 = Math.sqrt(2);
let vPoints = [];
let pointsColor = [];

fetch('data/under6-result_20260506_232500.csv').then((res)=>res.text()).then((csvText)=>{
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    complete: function(results){
      starData = results.data;
      for (let i=0; i<starData.length; i++) {
        const _ra = starData[i].ra/180*Math.PI;
        const _dec = starData[i].dec/180*Math.PI
        vPoints.push([Math.cos(_ra)*Math.cos(_dec), Math.sin(_ra)*Math.cos(_dec), Math.sin(_dec)]);
        const _r = starData[i].add_r*255;
        const _g = starData[i].add_g*255;
        const _b = starData[i].add_b*255;
        pointsColor.push('rgb('+_r+','+_g+','+_b+')');
      }
    }
  });
});

const qStepX = qMake(Math.PI/10,[1,0,0]);
const qStepY = qMake(Math.PI/10,[0,1,0]);
const qStepZ = qMake(Math.PI/10,[0,0,1]);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function draw(rX, rY, rgb) {
  ctx.beginPath();
  ctx.arc(canvas.width/2+rX, canvas.height/2+rY,5,0,2*Math.PI);
  ctx.fillStyle = rgb;
  ctx.fill();
}

function redraw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2,radius,0,2*Math.PI);
  ctx.fillStyle = "blue";
  ctx.fill();
  
  vPoints.forEach((vPoint,index)=>{
    const v = vRot(qTotal, vPoint);
    if (v[2]>0) {
      draw(v[0]*radius, v[1]*radius, pointsColor[index]);
    }
  });
}

function reRun() {
  resizeCanvas();
  radius = Math.min(canvas.width, canvas.height)*0.3;
  redraw();
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

reRun();

window.addEventListener('resize', reRun);
