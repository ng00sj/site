function qConj(q) {
  const [w,x,y,z] = q;
  return [w,-x,-y,-z];
}

function qMult(q1,q2) {
  const [w1,x1,y1,z1] = q1;
  const [w2,x2,y2,z2] = q2;
  return [
    w1*w2-x1*x2-y1*y2-z1*z2,
    w1*x2+x1*w2+y1*z2-z1*y2,
    w1*y2-x1*z2+y1*w2+z1*x2,
    w1*z2+x1*y2-y1*x2+z1*w2,
  ]
}

function rotVec(q,v) {
  const qv = [0,...v];
  return qMult(q,qMult(qv,qConj(q))).slice(1);
}
