let radius, controlOffset, maxRadius, numShapes;

function setup() {
  createCanvas(windowWidth, windowHeight, SVG); // SVGコンテキストで描画
  initializeVariables(); // 変数の初期化
  drawShapes(); // シェイプを描画
}

function initializeVariables() {
  background(255); // 背景をリセット
  radius = windowWidth <= 600 ? 30 : 40; // 円の半径
  controlOffset = radius * 0.5; // 制御点のオフセット
  maxRadius = max(width, height) / 3; // 描画領域の最大半径
  numShapes = windowWidth <= 600 ? 60 : 200; // シェイプの数

  stroke(0, 0, 0);
  strokeWeight(1);

  textSize(8); // テキストサイズ
  textAlign(LEFT); // テキスト左揃え
}

function drawShapes() {
  for (let j = 0; j < numShapes; j++) {
    let angle = random(TWO_PI); // ランダムな角度
    let r = random(maxRadius); // ランダムな半径
    let x = r * cos(angle); // x座標
    let y = r * sin(angle); // y座標

    drawCustomShape(width / 2 + x, height / 2 + y); // カスタムシェイプを描画
  }
}

function drawCustomShape(x, y) {
  push();
  translate(x, y);
  rotate(random(TWO_PI)); // ランダムな回転

  for (let i = 0; i < 4; i++) {
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
    drawPointAndText(points[i], points[i + 1], 0, 0, 0); // 2点ずつ座標を表示
  }
}

function drawPointAndText(x, y, r, g, b) {
  noFill();
  stroke(r, g, b);
  ellipse(x, y, 6, 6); // 点を描く
  fill(180, 180, 180); // テキストも同じ色で表示
  noStroke();
  textStyle(NORMAL);
  text(`(${round(x)}, ${round(y)})`, x + 5, y - 5); // 座標を表示
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // キャンバスサイズの変更
  initializeVariables(); // 再初期化
  drawShapes(); // 再描画
}
