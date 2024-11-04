let radius, numShapes;
let positions = []; // 図形の配置座標を保持
let circleRadius; // 配置範囲の円の半径

function setup() {
  createCanvas(windowWidth, windowHeight, SVG);
  initializeVariables();
  drawShapes();
}

function initializeVariables() {
  // ウィンドウサイズに基づいて半径を設定
  let minSize = min(width, height);
  circleRadius = minSize / 2.5; // 配置範囲の円の半径
  radius = circleRadius / 10; // 図形のサイズ
  numShapes = floor(random(50, 101)); // ランダムに10～100の図形
  positions = []; // 配置済み座標をリセット
  strokeWeight(0.6);
  noFill();
}

function drawShapes() {
  let centerX = width / 2;
  let centerY = height / 2;

  for (let j = 0; j < numShapes; j++) {
    let pos = getRandomPositionInCircle(centerX, centerY, circleRadius);
    if (pos) {
      positions.push(pos);
      drawCustomShape(pos.x, pos.y);
    }
  }
}

function getRandomPositionInCircle(centerX, centerY, maxRadius) {
  const maxAttempts = 100;
  for (let i = 0; i < maxAttempts; i++) {
    let angle = random(TWO_PI);
    let r = random(maxRadius);
    let x = centerX + r * cos(angle);
    let y = centerY + r * sin(angle);

    // 座標が配置範囲内かチェック
    if (dist(centerX, centerY, x, y) <= maxRadius) {
      let valid = true;

      // 他の配置済み図形との距離をチェック
      for (let pos of positions) {
        if (dist(x, y, pos.x, pos.y) < radius * 1.5) {
          valid = false;
          break;
        }
      }

      if (valid) {
        return { x, y };
      }
    }
  }
  return null; // 適切な位置が見つからない場合は null を返す
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
