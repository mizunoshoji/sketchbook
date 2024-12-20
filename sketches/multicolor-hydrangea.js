let shapeRadius, shapeCount;
let layoutCircleRadius; // 配置範囲の円の半径
let layoutCenters = []; // 配置範囲の円の中心座標
let placementCircleRadius; // 正方形を配置するための円の半径
let palette; // カラーパレット

function setup() {
  // キャンバスサイズをウィンドウの短い方の90%に設定
  let canvasSize = min(windowWidth, windowHeight) * 0.9;

  // SVGキャンバスを作成し、キャンバスサイズを正方形にする
  const canvas = createCanvas(canvasSize, canvasSize, SVG);
  noLoop(); // 描画を1回のみ実行

  // キャンバスを画面中央に配置
  canvas.position(
    (windowWidth - canvasSize) / 2,
    (windowHeight - canvasSize) / 2
  );

  initializeSettings(); // 初期設定
  drawOverlayLines(); // フィルターとして線を描画
  drawShapes(); // 図形描画
  // 現在のUTCタイムスタンプを生成
  let now = new Date();
  let utcTimestamp = now.toISOString(); // UTCのISO 8601形式
  console.log("UTC Timestamp:", utcTimestamp);

  // タイムスタンプ描画関数を呼び出し
  drawTimestamp(utcTimestamp);
}

function initializeSettings() {
  const canvasMinSize = min(width, height);
  layoutCircleRadius = canvasMinSize / 3; // 各円の配置範囲の半径（初期値）
  placementCircleRadius = canvasMinSize / 3; // 正方形を配置するための円の半径
  shapeRadius = layoutCircleRadius / 10; // 図形のサイズ
  layoutCenters = []; // 配置円の中心リセット

  const angleOffset = random(TWO_PI); // ランダムな回転
  const numCenters = 4; // 正方形の4頂点を配置

  for (let i = 0; i < numCenters; i++) {
    const angle = angleOffset + i * HALF_PI; // 90度ごとに配置
    const x = width / 2 + placementCircleRadius * cos(angle); // 円周上のX座標
    const y = height / 2 + placementCircleRadius * sin(angle); // 円周上のY座標
    layoutCenters.push({ x, y });
  }

  palette = [
    color(255, 0, 191, 200), // ピンク
    color(0, 153, 255, 200), // 青1
    color(255, 255, 51, 200), // 蛍光イエロー
    color(153, 102, 255, 200), // 紫
  ];

  strokeWeight(1); // 線の太さ
}

function drawShapes() {
  const usedFillColors = [];

  layoutCenters.forEach((center) => {
    const radiusFactor = random(0.7, 1.3);
    const currentLayoutCircleRadius = layoutCircleRadius * radiusFactor;

    const availableFillColors = palette.filter(
      (color) => !usedFillColors.includes(color)
    );
    const fillColor = random(availableFillColors);
    usedFillColors.push(fillColor);

    const strokeColor = random(palette.filter((color) => color !== fillColor));

    const currentShapeCount = floor(random(60, 101));
    const positions = [];

    for (let i = 0; i < currentShapeCount; i++) {
      const newPosition = findValidPosition(
        center.x,
        center.y,
        currentLayoutCircleRadius,
        positions
      );
      if (newPosition) {
        positions.push(newPosition);

        // カスタム図形を描画（塗りのみ、中心を少しずらす）
        const offsetX = random(-shapeRadius / 4, shapeRadius / 4);
        const offsetY = random(-shapeRadius / 4, shapeRadius / 4);
        fill(fillColor);
        noStroke();
        drawCustomShape(newPosition.x + offsetX, newPosition.y + offsetY);

        // 小円を描画（塗りのみ、中心を少しずらす）
        drawSmallCircle(
          newPosition.x + offsetX,
          newPosition.y + offsetY,
          shapeRadius / 6,
          palette[1],
          null
        );
        // カスタム図形を描画（線のみ）
        noFill();
        stroke(strokeColor);
        drawCustomShape(newPosition.x, newPosition.y);

        // 小円を描画（線のみ）
        drawSmallCircle(
          newPosition.x,
          newPosition.y,
          shapeRadius / 6,
          null,
          strokeColor
        );
      }
    }
  });
}

function drawSmallCircle(x, y, radius, fillColor, strokeColor) {
  push();
  translate(x, y);

  // 塗り設定
  if (fillColor) fill(fillColor);
  else noFill();

  // 線設定
  if (strokeColor) stroke(strokeColor);
  else noStroke();

  ellipse(0, 0, radius);

  pop();
}

function drawOverlayLines() {
  push(); // 描画状態を保存
  const overlayColor = random(palette);
  stroke(overlayColor); // オーバーレイの線の色を設定
  strokeWeight(4); // 線の太さ
  noFill(); // 塗りなし

  const lineSpacing = 5; // 線の間隔
  for (let y = 0; y < height; y += lineSpacing) {
    line(0, y, width, y); // 横線を描画
  }
  pop(); // 描画状態を元に戻す
}

function drawCustomShape(x, y) {
  push();
  translate(x, y);
  rotate(random(TWO_PI));

  for (let i = 0; i < 4; i++) {
    push();
    rotate(HALF_PI * i);
    drawBezierSegment();
    pop();
  }
  pop();
}

function drawBezierSegment() {
  const offsetRange = shapeRadius * 0.2;

  beginShape();
  vertex(0, 0);

  const cx1 = shapeRadius * 0.5 + random(-offsetRange, offsetRange);
  const cy1 = random(-offsetRange, offsetRange);
  const cx2 = shapeRadius + random(-offsetRange, offsetRange);
  const cy2 = -shapeRadius * 0.5 + random(-offsetRange, offsetRange);
  const x2 = shapeRadius + random(-offsetRange, offsetRange);
  const y2 = shapeRadius * 0.5 + random(-offsetRange, offsetRange);

  bezierVertex(cx1, cy1, cx2, cy2, x2, y2);

  const cx3 = shapeRadius * 0.3 + random(-offsetRange, offsetRange);
  const cy3 = shapeRadius * 1.2 + random(-offsetRange, offsetRange);
  const cx4 = shapeRadius * 0.3 + random(-offsetRange, offsetRange);
  const cy4 = shapeRadius * 0.4 + random(-offsetRange, offsetRange);

  bezierVertex(cx3, cy3, cx4, cy4, 0, 0);
  endShape(CLOSE);
}

function findValidPosition(centerX, centerY, maxRadius, positions) {
  const maxAttempts = 100;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const angle = random(TWO_PI);
    const distance = random(maxRadius);
    const x = centerX + distance * cos(angle);
    const y = centerY + distance * sin(angle);

    if (isPositionValid(x, y, centerX, centerY, maxRadius, positions)) {
      return { x, y };
    }
  }
  return null;
}

function isPositionValid(x, y, centerX, centerY, maxRadius, positions) {
  if (dist(centerX, centerY, x, y) > maxRadius) return false;

  for (const pos of positions) {
    if (dist(x, y, pos.x, pos.y) < shapeRadius * 1.5) {
      return false;
    }
  }
  return true;
}

function drawTimestamp(utcTimestamp) {
  // タイムスタンプの色を動的に設定
  let textColor;
  if (overlayColor === palette[1] || overlayColor === palette[2]) {
    textColor = color(255, 51, 0); // 赤
  } else {
    textColor = color(0, 0, 255); // 青
  }

  textFont("OCR-A"); // OCR-A を使用
  noStroke();
  fill(textColor); // 設定した色を使用
  textSize(28);
  textAlign(RIGHT, BOTTOM);
  text(utcTimestamp, width - 10, height - 10);
}
