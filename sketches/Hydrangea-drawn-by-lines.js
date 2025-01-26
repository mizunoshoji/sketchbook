let a = 760; // 点Aのx座標
let b = 500; // 点Aのy座標
let c = 200; // x方向のオフセット
let offsetDecrement = 1; // オフセットの減少量
let yOffset = 0; // 初期のyオフセット
let noiseOffset = 0; // パーリンノイズ用のオフセット
let curveStep = 0; // 曲線の進行度
let switchPoint = 100; // 変化の切り替え点（ループの途中）
let incrementBase = 0.5; // 基本の増加量
let incrementMax = 2; // 最大の増加量
let phase = 1; // 描画のフェーズ（1: 上向き、-1: 下向き）

function setup() {
  createCanvas(windowWidth, windowHeight, SVG);
  background(255); // 背景を白に設定
  stroke(0); // 線の色を黒に設定
  strokeWeight(1); // 線の太さを設定
  frameRate(30);
}

function draw() {
  if (c > 0 || (phase === -1 && yOffset <= switchPoint)) {
    // オフセットが0より大きい場合のみ描画
    // 点A
    let Ax = a;
    let Ay = b + yOffset * phase; // フェーズに応じて方向を変える

    // 点B
    let Bx = a + c * 0.9;
    let By = b + yOffset * phase;

    // 点C
    let Cx = a - c * 1.3;
    let Cy = b + yOffset * phase;

    // 点Aから点Bへの線を描画
    line(Ax, Ay, Bx, By);

    // 点Aから点Cへの線を描画
    line(Ax, Ay, Cx, Cy);

    // x方向のオフセットを減少させる
    c = max(0, c - offsetDecrement); // オフセットが負にならないようにする

    // 増加量がyOffsetに応じて大きくなるように設定
    let dynamicIncrement = incrementBase + abs(yOffset) / 200; // yOffsetの絶対値に基づいて増加

    // 最大増加量もyOffsetに応じて大きくなるように設定
    incrementMax = 2 + abs(yOffset) / 100; // 最大値を動的に変化させる

    // 減少量の切り替えをなめらかに
    let transitionFactor = constrain((abs(yOffset) - switchPoint) / 50, 0, 1); // 0から1への変化
    offsetDecrement = lerp(dynamicIncrement, incrementMax, transitionFactor); // 初期はdynamicIncrement、徐々にincrementMaxへ変化

    // 次のyオフセットに進む
    yOffset++;

    // 上向き描画が終了したら下向きに切り替え
    if (c === 0 && phase === 1) {
      phase = -1; // 下向きに切り替え
      c = 200; // オフセットをリセット
      yOffset = 1; // yOffsetをリセット
      offsetDecrement = 1; // 減少量をリセット
      stroke(255, 0, 0);
    }
  } else {
    noLoop(); // アニメーション終了
  }
}
