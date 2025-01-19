function setup() {
  createCanvas(windowWidth, windowHeight); // ウィンドウサイズに合わせたキャンバス
  background(255); // 背景を白に設定
  stroke(0); // 線の色を黒に設定

  drawLineA();
  drawLineB();
  drawLineC(20, 300, width - 20, 10);
  drawLineD({
    xstep: 10, // x座標の間隔
    ystepRange: 10, // y座標の変動幅（-ystepRange ~ +ystepRange）
    startX: 20, // 開始のx座標
    startY: 400, // 開始のy座標
    endX: width - 20, // 終了のx座標
  });
  drawLineE({
    xstep: 10, // x座標の間隔
    xstepRange: 10, // x座標のランダム変動幅
    ystepRange: 10, // y座標の変動幅
    startX: 20, // 開始のx座標
    startY: 500, // 開始のy座標
    endX: width - 20, // 終了のx座標
  });

  drawLineF({
    xstepRange: [10, 20], // x座標の間隔を10~20の範囲でランダムに設定
    ystepRange: 10, // y座標の変動幅（-10 ~ +10）
    startX: 20, // 開始のx座標
    startY: 600, // 開始のy座標
    endX: width - 20, // 終了のx座標
  });

  drawLineG({
    startX: 20,
    startY: 700,
    endX: width - 20, // 終了のx座標
    noiseScale: 0.01, // これを大きくするとノイズの変化が早くなる
    amplitude: 100, // これを大きくすると上下の振幅が大きくなる
  });
}

// line関数による単純な直線を描く
function drawLineA() {
  const x1 = 20,
    y1 = 100;
  const x2 = width - 20,
    y2 = 100;
  line(x1, y1, x2, y2);
}

// line関数による単純な直線を描く 終点の位置をrandom関数で決める
function drawLineB() {
  const x1 = 20,
    y1 = 200;
  const randx = random(width); // 終点のx座標をランダムに決定
  const randy = random(height); // 終点のy座標をランダムに決定
  line(x1, y1, randx, randy);
}

/**
 * 短い線を繰り返しで線を構成する方法。線の終了位置のy座標をrandom関数で決める
 * @param {number} startX - 線の開始位置のx座標
 * @param {number} startY - 線の開始位置のy座標
 * @param {number} endX - 線の終了位置のx座標
 * @param {number} segmentLength - 各セグメント（短い線）の長さ
 */
function drawLineC(startX, startY, endX, segmentLength) {
  let lastX = startX; // 最初の線の開始x座標
  let lastY = startY; // 最初の線の開始y座標

  for (let x = startX + segmentLength; x <= endX; x += segmentLength) {
    let currentY = startY + random(10, 90); // 次の線の終了y座標をランダムに決定
    line(lastX, lastY, x, currentY); // 短い線を描画
    lastX = x; // 次の線の開始x座標を現在の終了x座標に更新
    lastY = currentY; // 次の線の開始y座標を現在の終了y座標に更新
  }
}

/**
 * 短い線をランダムに上下動させながら連続的に描画 y座標のランダムな変動を追加。
 * @param {Object} config - 設定値オブジェクト
 * @param {number} config.xstep - x座標の間隔
 * @param {number} config.ystepRange - y座標の変動幅（-ystepRange ~ +ystepRange）
 * @param {number} config.startX - 線の開始位置のx座標
 * @param {number} config.startY - 線の開始位置のy座標
 * @param {number} config.endX - 線の終了位置のx座標
 */
function drawLineD(config) {
  let { xstep, ystepRange, startX, startY, endX } = config;

  let lastX = startX; // 初期のx座標
  let lastY = startY; // 初期のy座標
  let y = startY; // 現在のy座標

  for (let x = startX + xstep; x <= endX; x += xstep) {
    let ystep = random(-ystepRange, ystepRange); // y座標のランダム変動
    y += ystep; // y座標を更新

    // 線を描画
    line(lastX, lastY, x, y);

    // 次の開始位置を更新
    lastX = x;
    lastY = y;
  }
}

/**
 * 短い線をランダムに上下動させながら連続的に描画
 * x座標にもランダムな変動を加える
 * @param {Object} config - 設定値オブジェクト
 * @param {number} config.xstep - x座標の間隔
 * @param {number} config.ystepRange - y座標の変動幅（-ystepRange ~ +ystepRange）
 * @param {number} config.startX - 線の開始位置のx座標
 * @param {number} config.startY - 線の開始位置のy座標
 * @param {number} config.endX - 線の終了位置のx座標
 * @param {number} config.xstepRange - x座標のランダム変動幅
 */
function drawLineE(config) {
  let { xstep, ystepRange, startX, startY, endX, xstepRange } = config;

  let currentPosition = { x: startX, y: startY }; // 初期の座標
  let y = startY; // 現在のy座標

  for (let x = startX + xstep; x <= endX; x += xstep) {
    let ystep = random(-ystepRange, ystepRange); // y座標のランダム変動
    let xVariation = random(-xstepRange, xstepRange); // x座標のランダム変動
    y += ystep; // y座標を更新

    // 線を描画
    line(currentPosition.x, currentPosition.y, x + xVariation, y);

    // 次の開始位置を更新
    currentPosition.x = x + xVariation;
    currentPosition.y = y;
  }
}

/**
 * 短い線をランダムに上下動させながら連続的に描画
 * x座標の間隔をランダムに設定
 * @param {Object} config - 設定値オブジェクト
 * @param {Array<number>} config.xstepRange - x座標の間隔の範囲[min, max]
 * @param {number} config.ystepRange - y座標の変動幅（-ystepRange ~ +ystepRange）
 * @param {number} config.startX - 線の開始位置のx座標
 * @param {number} config.startY - 線の開始位置のy座標
 * @param {number} config.endX - 線の終了位置のx座標
 */
function drawLineF(config) {
  let { xstepRange, ystepRange, startX, startY, endX } = config;

  let currentPosition = { x: startX, y: startY }; // 初期の座標
  let y = startY; // 現在のy座標

  while (currentPosition.x <= endX) {
    let xstep = random(xstepRange[0], xstepRange[1]); // x座標の間隔をランダムに決定
    let ystep = random(-ystepRange, ystepRange); // y座標のランダム変動

    y += ystep; // y座標を更新

    // 線を描画
    line(currentPosition.x, currentPosition.y, currentPosition.x + xstep, y);

    // 次の開始位置を更新
    currentPosition.x += xstep;
    currentPosition.y = y;
  }
}

/**
 * noise関数(パーリンノイズ)で線を描く
 *
 * @param {Object} config - 設定値オブジェクト
 * @param {number} config.startX - 線の開始位置のx座標
 * @param {number} config.startY - 線の開始位置のy座標
 * @param {number} config.endX - 線の終了位置のx座標
 * @param {number} config.noiseScale - noise()にかけるスケール(ゆらぎの速さ)
 * @param {number} config.amplitude - y座標の振幅
 */
function drawLineG(config) {
  const { startX, startY, endX, noiseScale, amplitude } = config;

  // 最初の点のy座標を計算
  let prevY = startY + noise(startX * noiseScale) * amplitude;

  // startX + 1 から endX まで、1ピクセル単位でラインを描画
  for (let x = startX; x + 1 <= endX; x += 1) {
    // ノイズを用いて y 座標を算出
    let n = noise(x * noiseScale);
    let y = startY + n * amplitude;

    // 1つ前の頂点(prevY)と現在の頂点(y)を結ぶ
    line(x - 1, prevY, x, y);

    // 次の線を引くために前の点を更新
    prevY = y;
  }
}
