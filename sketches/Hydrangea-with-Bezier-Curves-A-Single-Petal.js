let radius, controlOffset, maxRadius, numShapes;

function setup() {
  createCanvas(windowWidth, windowHeight, SVG);
  initializeVariables();
  drawShapes();
}

function initializeVariables() {
  radius = min(width, height) / 4.5;
  controlOffset = radius * 0.5;
  numShapes = 1;

  strokeWeight(2);
  textSize(12);
  textAlign(LEFT);
}

function drawShapes() {
  for (let j = 0; j < numShapes; j++) {
    drawCustomShape(width / 2, height / 2);
  }
}

function drawCustomShape(x, y) {
  push();
  translate(x, y);
  rotate(random(TWO_PI));

  for (let i = 0; i < 1; i++) {
    push();
    rotate(HALF_PI * i); // 90度ごとの回転
    drawBezierShape();
    pop();
  }
  pop();
}

function drawBezierShape() {
  beginShape();
  let startX = 0,
    startY = 0;
  vertex(startX, startY);

  let cx1 = controlOffset * 0.1 + random(-8, 8);
  let cy1 = controlOffset * 0.1 + random(-8, 8);
  let cx2 = radius * 1.5 + random(-8, 8);
  let cy2 = -controlOffset * 1.5 + random(-8, 8);
  let x2 = radius + random(-8, 8);
  let y2 = radius / 2 + random(-8, 8);

  bezierVertex(cx1, cy1, cx2, cy2, x2, y2);

  let cx3 = controlOffset + random(-8, 8);
  let cy3 = radius * 1.5 + random(-8, 8);
  let cx4 = controlOffset * 0.1 + random(-8, 8);
  let cy4 = controlOffset * 0.1 + random(-8, 8);

  bezierVertex(cx3, cy3, cx4, cy4, startX, startY);
  endShape(CLOSE);

  // 描画完了後、座標を表示
  displayPoints([
    startX,
    startY,
    cx1,
    cy1,
    cx2,
    cy2,
    x2,
    y2,
    cx3,
    cy3,
    cx4,
    cy4,
  ]);
}

// 座標表示用の関数を作成
function displayPoints(points) {
  for (let i = 0; i < points.length; i += 2) {
    drawPointAndText(points[i], points[i + 1]); // 2点ずつ座標を表示
  }
}

function drawPointAndText(x, y) {
  ellipse(x, y, 4, 4); // 点を描く
  textStyle(NORMAL);
  text(`(${round(x)}, ${round(y)})`, x + 5, y - 5); // 座標を表示
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // キャンバスサイズの変更
  initializeVariables(); // 再初期化
  drawShapes(); // 再描画
}
