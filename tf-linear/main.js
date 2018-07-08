let x_vals =[];
let y_vals = [];

let m, b;

const lr = 0.5;
const optimizer = tf.train.sgd(lr);

function predict(xs) {
  const tfxs = tf.tensor1d(xs);
  const ys = tfxs.mul(m).add(b);
  return ys;
}

function loss(pred, labels) {
  return pred.sub(labels).square().mean();
}

function setup() {
  createCanvas(400, 400);
  m = tf.variable(tf.scalar(random(1)));
  b = tf.variable(tf.scalar(random(1)));
}

function mousePressed() {
  let x = map(mouseX, 0, width, 0, 1);
  let y = map(mouseY, 0, height, 0, 1);
  x_vals.push(x);
  y_vals.push(y);
}

function draw(){
  tf.tidy(() =>{
  if (x_vals.length > 0) {
  const ys = tf.tensor1d(y_vals);
  optimizer.minimize(() => loss(predict(x_vals), ys));
  }
});

  background(0);
  stroke(255);
  strokeWeight(4);
  for(let i=0;i < x_vals.length; i++) {
    let px = map(x_vals[i], 0 , 1, 0 ,width);
    let py = map(y_vals[i],0,1,0,height);
    point(px,py);
  }

  const lineX = [0, 1];
  const ys = tf.tidy(() => predict(lineX));
  let lineY = ys.dataSync();
  ys.dispose();
  let x1 = map(lineX[0], 0, 1, 0, width);
  let x2 = map(lineX[1], 0, 1, 0, width);


  let y1 = map(lineY[0], 0,1,0,height);
  let y2 = map(lineY[1], 0,1,0,height);
  strokeWeight(2);
  line(x1,y1,x2,y2);

}
