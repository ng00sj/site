const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const urlParams = new URLSearchParams(window.location.search);
const par_zoom = parseFloat(urlParams.get('z')) || 0.3;
const par_q = [parseFloat(urlParams.get('q0')),parseFloat(urlParams.get('q1')),parseFloat(urlParams.get('q2')),parseFloat(urlParams.get('q3'))] || [1,0,0,0];

let rotNum = 0;

let radius = 50;
let qTotal = (qNorm(par_q) ? qUnit(par_q) : [1,0,0,0]);
let vPoints = [];
let pointsColor = [];
let pointsSize = [];

const zoom_max = 10;
const zoom_min = 0.1;
let zoom = 0.3;
if ((par_zoom<=zoom_max) && (par_zoom>=zoom_min)) {
  zoom = par_zoom;
}

const qStepX = qMake(Math.PI/40,[1,0,0]);
const qStepY = qMake(Math.PI/40,[0,1,0]);
const qStepZ = qMake(Math.PI/40,[0,0,1]);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function draw(rX, rY, rgb, size) {
  ctx.beginPath();
  ctx.arc(canvas.width/2+rX, canvas.height/2+rY,size,0,2*Math.PI);
  ctx.fillStyle = rgb;
  ctx.fill();
}

function redraw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2,radius,0,2*Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
  
  vPoints.forEach((vPoint,index)=>{
    const v = vRot(qTotal, vPoint);
    if (v[2]>0) {
      draw(v[0]*radius, v[1]*radius, pointsColor[index], radius*pointsSize[index]);
    }
  });
}

function reRun() {
  resizeCanvas();
  radius = Math.min(canvas.width, canvas.height)*zoom;
  redraw();
}

function rotX() {
  qTotal = qMult(qStepX, qTotal);
  rotNormalize();
  setQTotalPar();
  renewUrlPar();
  redraw();
}

function rotY() {
  qTotal = qMult(qStepY, qTotal);
  rotNormalize();
  setQTotalPar();
  renewUrlPar();
  redraw();
}

function rotZ() {
  qTotal = qMult(qStepZ, qTotal);
  rotNormalize();
  setQTotalPar();
  renewUrlPar();
  redraw();
}

function zoomBig() {
  zoom*=1.1;
  if (zoom>zoom_max) {zoom=zoom_max;}
  urlParams.set('z', String(zoom));
  renewUrlPar();
  reRun();
}

function zoomSmall() {
  zoom*=0.9;
  if (zoom<zoom_min) {zoom=zoom_min;}
  urlParams.set('z', String(zoom));
  renewUrlPar();
  reRun();
}

function zoomReset() {
  zoom=0.3;
  urlParams.set('z', String(zoom));
  renewUrlPar();
  reRun();
}

function renewUrlPar() {
  const newQueryString = urlParams.toString() ? `?${urlParams.toString()}` : '';
  const newUrl = `${window.location.pathname}${newQueryString}`;
  window.history.pushState({ path: newUrl }, '', newUrl);
}

function fullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen().catch((err) => {
      console.log(`無法退出全螢幕: ${err.message}`);
    }); 
  }else{
    document.documentElement.requestFullscreen().catch((err) => {
      console.log(`無法進入全螢幕: ${err.message}`);
    });
  }
  reRun();
}

function rotNormalize() {
  rotNum+=1;
  if (rotNum>99) {
    rotNum=0;
    qTotal = qUnit(qTotal);
  }
}

function setQTotalPar() {
  urlParams.set('q0', String(qTotal[0]));
  urlParams.set('q1', String(qTotal[1]));
  urlParams.set('q2', String(qTotal[2]));
  urlParams.set('q3', String(qTotal[3]));
}

fetch('data/under6-result_20260506_232500.csv').then((res)=>res.text()).then((csvText)=>{
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    complete: function(results){
      const starData = results.data;
      for (let i=0; i<starData.length; i++) {
        const _ra = starData[i].ra/180*Math.PI;
        const _dec = starData[i].dec/180*Math.PI
        vPoints.push([Math.cos(_ra)*Math.cos(_dec), Math.sin(_ra)*Math.cos(_dec), Math.sin(_dec)]);
        const _r = starData[i].add_r*255;
        const _g = starData[i].add_g*255;
        const _b = starData[i].add_b*255;
        pointsColor.push('rgb('+_r+','+_g+','+_b+')');
        pointsSize.push(0.04*Math.exp(-0.4*starData[i].phot_g_mean_mag));
      }
      document.getElementById('text1').style.display = 'none';
      reRun();
      window.addEventListener('resize', reRun);
    }
  });
});