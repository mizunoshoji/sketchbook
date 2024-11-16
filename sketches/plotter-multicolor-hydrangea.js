let shapeRadius, shapeCount;
let layoutCircleRadius; // 配置範囲の円の半径
let layoutCenters = []; // 配置範囲の円の中心座標
let palette; // カラーパレット

function setup() {
  createCanvas(windowWidth, windowHeight, SVG); // SVGコンテキストのキャンバス
  initializeSettings(); // 初期設定
  drawShapes(); // 図形描画
}

function initializeSettings() {
  // 描画設定を初期化
  const canvasMinSize = min(width, height);
  layoutCircleRadius = canvasMinSize / 2.5; // 各円の配置範囲の半径
  shapeRadius = layoutCircleRadius / 8; // 図形のサイズ
  shapeCount = floor(random(50, 101)); // ランダムな図形数
  layoutCenters = []; // 配置円の中心リセット

  // 配置円を固定値で設定（例：3つの円）
  const numCircles = 4;

  for (let i = 0; i < numCircles; i++) {
    layoutCenters.push({
      x: random(layoutCircleRadius, width - layoutCircleRadius),
      y: random(layoutCircleRadius, height - layoutCircleRadius),
    });
  }

  // カラーパレットの定義（20%透明度を下げる）
  palette = [
    color(255, 0, 255, 150), // ピンク
    color(0, 153, 255, 150), // 青
    color(255, 255, 51, 150), // 蛍光イエロー
    color(153, 102, 255, 150), // 紫
  ];

  strokeWeight(1); // 線の太さ
}

function drawShapes() {
  // 使用済みの色を追跡
  const usedFillColors = [];

  layoutCenters.forEach((center) => {
    // 未使用の色を選択
    const availableFillColors = palette.filter(
      (color) => !usedFillColors.includes(color)
    );
    const fillColor = random(availableFillColors);

    // 塗りの色を使用済みに追加
    usedFillColors.push(fillColor);

    // 線の色を塗りの色以外から選択
    const strokeColor = random(palette.filter((color) => color !== fillColor));

    // 塗りと線の色を設定
    fill(fillColor);
    stroke(strokeColor);

    const positions = []; // 各円で配置された図形の座標リスト
    for (let i = 0; i < shapeCount; i++) {
      const newPosition = findValidPosition(
        center.x,
        center.y,
        layoutCircleRadius,
        positions
      );
      if (newPosition) {
        positions.push(newPosition); // 配置済みリストに追加
        drawCustomShape(newPosition.x, newPosition.y); // 図形を描画
      }
    }
  });
}

function findValidPosition(centerX, centerY, maxRadius, positions) {
  // 有効な座標を探す
  const maxAttempts = 100;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // ランダムに円内の座標を生成
    const angle = random(TWO_PI);
    const distance = random(maxRadius);
    const x = centerX + distance * cos(angle);
    const y = centerY + distance * sin(angle);

    // 配置可能かチェック
    if (isPositionValid(x, y, centerX, centerY, maxRadius, positions)) {
      return { x, y };
    }
  }
  return null; // 配置不可能な場合
}

function isPositionValid(x, y, centerX, centerY, maxRadius, positions) {
  // 円内かつ他の図形と適切な距離があるか確認
  if (dist(centerX, centerY, x, y) > maxRadius) return false;

  for (const pos of positions) {
    if (dist(x, y, pos.x, pos.y) < shapeRadius * 1.5) {
      return false;
    }
  }
  return true;
}

function drawCustomShape(x, y) {
  // カスタム図形を描画
  push();
  translate(x, y); // 中心位置に移動
  rotate(random(TWO_PI)); // ランダムな回転

  for (let i = 0; i < 4; i++) {
    push();
    rotate(HALF_PI * i); // 90度回転して4つのセグメントを描画
    drawBezierSegment();
    pop();
  }

  // 中心の小円を描画
  fill(palette[1]);
  stroke(palette[3]);
  ellipse(0, 0, shapeRadius / 6); // 小円を描画
  pop();
}

function drawBezierSegment() {
  // ベジェ曲線のセグメントを描画
  const offsetRange = shapeRadius * 0.2;

  beginShape();
  vertex(0, 0); // 開始点

  // 制御点と終点を設定
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

function windowResized() {
  // ウィンドウサイズ変更時の処理
  resizeCanvas(windowWidth, windowHeight);
  initializeSettings(); // 再初期化
  drawShapes(); // 再描画
}
