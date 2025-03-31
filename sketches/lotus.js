function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  orbitControl(); // マウスで視点操作可能
  rotateY(frameCount * 0.5);
  noFill();
  stroke(255);
  strokeWeight(2);

  let petals = 12;

  // 1周目: オリジナルの花びら
  for (let i = 0; i < petals; i++) {
    push();
    rotateZ((i * 360) / petals);
    rotateX(40); // 花びらをより立ち上げるため、角度を40度に変更
    drawPetal();
    pop();
  }

  // 2周目: より閉じた印象の花びら
  for (let i = 0; i < petals; i++) {
    push();
    rotateZ((i * 360) / petals);
    rotateX(40); // 同様に40度に変更
    scale(0.8); // 内側に配置するためスケールダウン
    drawPetalClosed();
    pop();
  }
}

function drawPetal() {
  beginShape();
  curveVertex(0, 0, 0); // 始点
  curveVertex(10, -20, 10); // 外側に向かう制御点
  curveVertex(25, -60, 5); // 最も外側
  curveVertex(0, -100, 0); // 花びらの先端
  curveVertex(-25, -60, -5); // 反対側の外側
  curveVertex(-10, -20, -10); // 内側に戻る制御点
  curveVertex(0, 0, 0); // 終点（始点に戻る）
  endShape(CLOSE);
}

function drawPetalClosed() {
  beginShape();
  curveVertex(0, 0, 0);
  curveVertex(8, -15, 8);
  curveVertex(18, -45, 4);
  curveVertex(0, -70, 0);
  curveVertex(-18, -45, -4);
  curveVertex(-8, -15, -8);
  curveVertex(0, 0, 0);
  endShape(CLOSE);
}
