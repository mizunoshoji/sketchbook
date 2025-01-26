// グローバル変数
let a = 760;
let b = 500;
let c = 200;
let offsetDecrement = 1;
let yOffset = 0;
let phase = 1;
let switchPoint;
let incrementBase = 0.5;
let incrementMax = 2;

function setup() {
  createCanvas(windowWidth, windowHeight, SVG);
  background(255);
  stroke(0);
  strokeWeight(1);
  frameRate(60);

  // ランダムなスイッチポイントを初期化
  switchPoint = 100 + random(-40, 40);
}

function draw() {
  drawPatel();
}

function drawPatel() {
  // フェーズによって別の描画関数を呼び出す
  if (phase === 1) {
    drawPetalPhase1();
  } else if (phase === -1) {
    drawPetalPhase2();
  } else {
    noLoop(); // 全工程終了
  }
}

function drawPetalPhase1() {
  if (c > 0) {
    let Ax = a;
    let Ay = b + yOffset;
    let Bx = a + c;
    let By = b + yOffset;
    let Cx = a - c;
    let Cy = b + yOffset;

    line(Ax, Ay, Bx, By);
    line(Ax, Ay, Cx, Cy);

    // フェーズ1の減少量に倍掛け
    offsetDecrement *= 2;

    c = max(0, c - offsetDecrement);

    let dynamicIncrement = incrementBase + abs(yOffset) / 250;
    incrementMax = 2 + abs(yOffset) / 200;
    let transitionFactor = constrain((abs(yOffset) - switchPoint) / 50, 0, 1);

    // 下限を0.2にして0にならないようにする
    offsetDecrement = lerp(dynamicIncrement, incrementMax, transitionFactor);
    offsetDecrement *= random(0.2, 1);

    yOffset++;

    if (c === 0) {
      phase = -1;
      c = 200;
      yOffset = 1;
      offsetDecrement = 1;
      switchPoint = 100 + random(-40, 40);
      offsetDecrement *= 2;
      stroke(0, 0, 0);
    }
  } else {
    phase = -1;
  }
}

function drawPetalPhase2() {
  // フェーズ2用一時変数（最後の座標取得用）
  let Ax, Ay, Bx, By, Cx, Cy;
  // yOffset <= switchPoint を外し、cが0になるまで描画する
  if (c > 0) {
    let Ax = a;
    let Ay = b + yOffset * phase;
    let Bx = a + c;
    let By = b + yOffset * phase;
    let Cx = a - c;
    let Cy = b + yOffset * phase;

    line(Ax, Ay, Bx, By);
    line(Ax, Ay, Cx, Cy);

    // x方向のオフセットを減少
    c = max(0, c - offsetDecrement);

    let dynamicIncrement = incrementBase + abs(yOffset) / 250;
    incrementMax = 2 + abs(yOffset) / 200;
    let transitionFactor = constrain((abs(yOffset) - switchPoint) / 50, 0, 1);

    offsetDecrement = lerp(dynamicIncrement, incrementMax, transitionFactor);
    offsetDecrement *= random(0.2, 1); // 下向きも0にならないように

    yOffset++;
  } else {
    // フェーズ2終了 → 直前の座標を最終として扱う
    // ここで最終座標を計算してログを出力
    Ax = a;
    Ay = b + yOffset * phase;
    Bx = a + c;
    By = b + yOffset * phase;
    Cx = a - c;
    Cy = b + yOffset * phase;

    console.log("フェーズ2最終座標:", { Ax, Ay, Bx, By, Cx, Cy });
    // フェーズ2終了
    phase = 0;
  }
}
