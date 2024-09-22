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

  stroke(71, 73, 148);
  strokeWeight(2);
  fill(189, 180, 205, 100);

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
  let x3 = random(-8, 8);
  let y3 = random(-8, 8);

  bezierVertex(cx3, cy3, cx4, cy4, x3, y3);
  endShape(CLOSE);

  // 各点の色分けと座標表示
  drawPointAndText(startX, startY, 68, 0, 204); // 始点
  drawPointAndText(cx1, cy1, 169, 0, 255); // 制御点1
  drawPointAndText(cx2, cy2, 79, 112, 32); // 制御点2
  drawPointAndText(x2, y2, 108, 0, 204); // 終点
  drawPointAndText(cx3, cy3, 171, 0, 137); // 2つ目の制御点1
  drawPointAndText(cx4, cy4, 0, 255, 0); // 2つ目の制御点2
  drawPointAndText(x3, y3, 3, 77, 204); // 2つ目の終点
}

function drawPointAndText(x, y, r, g, b) {
  noStroke(); //輪郭線なし
  fill(r, g, b);
  ellipse(x, y, 6, 6); // 点を描く
  fill(r, g, b); // テキストも同じ色で表示
  text(`(${round(x)}, ${round(y)})`, x + 5, y - 5); // 座標を表示
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // キャンバスサイズの変更
  initializeVariables(); // 再初期化
  drawShapes(); // 再描画
}
