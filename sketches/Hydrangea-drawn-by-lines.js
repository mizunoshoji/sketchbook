let a = 760; // 点Aのx座標
let b = 100; // 点Aのy座標
let c = 200; // x方向のオフセット
let offsetDecrement = 1; // オフセットの減少量
let yOffset = 0; // 初期のyオフセット
let noiseOffset = 0; // パーリンノイズ用のオフセット
let curveStep = 0; // 曲線の進行度

function setup() {
  createCanvas(windowWidth, windowHeight, SVG);
  background(255); // 背景を白に設定
  stroke(0); // 線の色を黒に設定
  strokeWeight(2); // 線の太さを設定
  frameRate(30);
}

function draw() {
  if (c > 0) {
    // オフセットが0より大きい間だけ描画
    // 点A
    let Ax = a;
    let Ay = b + yOffset;

    // 点B
    let Bx = a + c;
    let By = b + yOffset;

    // 点C
    let Cx = a - c;
    let Cy = b + yOffset;

    // 点Aから点Bへの線を描画
    line(Ax, Ay, Bx, By);

    // 点Aから点Cへの線を描画
    line(Ax, Ay, Cx, Cy);

    // x方向のオフセットを減少させる
    c = max(0, c - offsetDecrement); // オフセットが負にならないようにする

    // x方向オフセットの減らし方=曲線の決まり方

    // 減少量をなめらかな山形の曲線で変化させる
    // offsetDecrement = 1 + sin(curveStep) * 2; // サインカーブを使用して変化
    // curveStep += 0.05; // カーブの進行速度

    // offsetDecrement += 0.05; // 増加率を設定

    // 減少量をループごとに大きくする
    offsetDecrement *= 1.02; // 増加率を設定

    // 減少量を「多い->少ない->多い」となめらかに変化させる
    // offsetDecrement = 1 + abs(sin(curveStep)) * 2; // 絶対値を取ることで周期的に増減
    // curveStep += 0.03; // カーブの進行速度

    // // 減少量をなめらかに変化させる
    // offsetDecrement = 1 + noise(noiseOffset) * 2; // パーリンノイズで動的変化
    // noiseOffset += 0.1; // ノイズのオフセットを増加

    // 次のyオフセットに進む
    yOffset++;
  } else {
    noLoop(); // アニメーション終了
  }
}
