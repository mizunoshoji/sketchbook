let radius, numShapes;
let positions = []; // 図形の配置座標を保持
let margin = 50; // 余白の幅

function setup() {
  createCanvas(windowWidth, windowHeight, SVG);
  initializeVariables();
  drawShapes();
}

function initializeVariables() {
  // ウィンドウサイズに基づいて半径を設定
  let minSize = min(width, height);
  radius = minSize / 20; // 図形のサイズを適宜調整
  numShapes = 50; // 図形の数（グリッドの大きさに応じて変わる）
  positions = []; // 配置済み座標をリセット
  strokeWeight(0.6);
  noFill();
}

function drawShapes() {
  // 余白を考慮したグリッド配置
  let cols = floor((width - 2 * margin) / (radius * 2)); // 列の数を計算
  let rows = floor((height - 2 * margin) / (radius * 2)); // 行の数を計算

  // グリッド全体の幅と高さを計算して中央に配置
  let gridWidth = cols * (radius * 2);
  let gridHeight = rows * (radius * 2);
  let startX = (width - gridWidth) / 2; // キャンバスの中央に寄せるためのx座標
  let startY = (height - gridHeight) / 2; // キャンバスの中央に寄せるためのy座標

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = startX + i * (radius * 2) + radius; // 各グリッドのx座標
      let y = startY + j * (radius * 2) + radius; // 各グリッドのy座標

      // キャンバス内に収まるかチェック
      if (x < width - margin && y < height - margin) {
        drawCustomShape(x, y);
      }
    }
  }
}

function drawCustomShape(x, y) {
  push();
  translate(x, y);
  rotate(random(TWO_PI));

  for (let i = 0; i < 4; i++) {
    push();
    rotate(HALF_PI * i);
    drawBezierShape();
    pop();
  }

  noFill();
  stroke(0);
  ellipse(0, 0, radius / 4);
  pop();
}

function drawBezierShape() {
  const offsetRange = radius * 0.2;

  beginShape();
  let startX = 0;
  let startY = 0;
  vertex(startX, startY);

  const cx1 = radius * 0.5 + random(-offsetRange, offsetRange);
  const cy1 = random(-offsetRange, offsetRange);
  const cx2 = radius + random(-offsetRange, offsetRange);
  const cy2 = -radius * 0.5 + random(-offsetRange, offsetRange);
  const x2 = radius + random(-offsetRange, offsetRange);
  const y2 = radius * 0.5 + random(-offsetRange, offsetRange);

  bezierVertex(cx1, cy1, cx2, cy2, x2, y2);

  const cx3 = radius * 0.3 + random(-offsetRange, offsetRange);
  const cy3 = radius * 1.2 + random(-offsetRange, offsetRange);
  const cx4 = radius * 0.3 + random(-offsetRange, offsetRange);
  const cy4 = radius * 0.4 + random(-offsetRange, offsetRange);

  bezierVertex(cx3, cy3, cx4, cy4, startX, startY);
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initializeVariables();
  drawShapes();
}
