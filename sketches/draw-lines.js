function setup() {
  createCanvas(windowWidth, 4000);
  background(255);

  // テキスト用スタイル
  textSize(16);
  noStroke(); // テキストは枠線なし
  fill(0); // テキストは黒

  noLoop();

  // 各線の開始Y座標を管理する変数
  let yOffset = 100;

  // -- A: 単純な直線 --
  text(
    "A：単純な直線\n(startX, startY)から(endX, startY)まで\n水平に線を描く。",
    20,
    yOffset - 80,
    600
  ); // 折り返し幅600
  setLineStyle(); // 線描画の前に線用スタイルを設定
  drawLineA({
    startX: 20,
    startY: yOffset,
    endX: width - 20,
  });
  resetTextStyle(); // 線描画が終わったら再びテキストスタイルに戻す
  yOffset += 300;

  // -- B: 終点がランダムに決定される線 --
  text(
    "B：終点がランダムに決定される線\n(startX, startY)からキャンバス内の\nランダムな点へ線を描く。",
    20,
    yOffset - 80,
    600
  );
  setLineStyle();
  drawLineB({
    startX: 20,
    startY: yOffset,
  });
  resetTextStyle();
  yOffset += 300;

  // -- C: 短い線を繰り返して1本の線にする --
  text(
    "C：短い線を繰り返して1本の線にする。\nsegmentLengthごとに\nyをランダムに変動させて連結。",
    20,
    yOffset - 80,
    600
  );
  setLineStyle();
  drawLineC({
    startX: 20,
    startY: yOffset,
    endX: width - 20,
    segmentLength: 10,
  });
  resetTextStyle();
  yOffset += 300;

  // -- D: x座標の等間隔 & y座標ランダム変動 --
  text(
    "D：x座標を一定刻みで増やし、yをランダムに\n上下させてジグザグの線を描く。",
    20,
    yOffset - 80,
    600
  );
  setLineStyle();
  drawLineD({
    xstep: 10,
    ystepRange: 10,
    startX: 20,
    startY: yOffset,
    endX: width - 20,
  });
  resetTextStyle();
  yOffset += 300;

  // -- E: x座標にもランダム変動を加える --
  text(
    "E：Dに加えてxもランダムに変動させ、\n左右にもぶれる線を描く。",
    20,
    yOffset - 80,
    600
  );
  setLineStyle();
  drawLineE({
    xstep: 10,
    xstepRange: 10,
    ystepRange: 10,
    startX: 20,
    startY: yOffset,
    endX: width - 20,
  });
  resetTextStyle();
  yOffset += 300;

  // -- F: x座標のステップ間隔自体をランダムに --
  text(
    "F：xステップ幅を範囲内でランダムに決定し、\nyをランダムに変動させて\nよりランダムな線を描く。",
    20,
    yOffset - 80,
    600
  );
  setLineStyle();
  drawLineF({
    xstepRange: [10, 20],
    ystepRange: 10,
    startX: 20,
    startY: yOffset,
    endX: width - 20,
  });
  resetTextStyle();
  yOffset += 300;

  // -- G: パーリンノイズを使った線 --
  text(
    "G：パーリンノイズを使用して滑らかに\n上下する線を描く。",
    20,
    yOffset - 80,
    600
  );
  setLineStyle();
  drawLineG({
    startX: 20,
    startY: yOffset,
    endX: width - 20,
    noiseScale: 0.01,
    amplitude: 100,
  });
  resetTextStyle();
  yOffset += 300;

  // -- H: サイン波 --
  text(
    "H：sin関数を用いて規則的に\n上下する波状の線を描く。",
    20,
    yOffset - 80,
    600
  );
  setLineStyle();
  drawLineH(yOffset);
  resetTextStyle();
  yOffset += 300;

  // -- I: コサイン波 --
  text(
    "I：cos関数を用いて位相がずれた\n波状の線を描く。",
    20,
    yOffset - 80,
    600
  );
  setLineStyle();
  drawLineI(yOffset);
  resetTextStyle();
  yOffset += 300;

  // -- J: サイン^3 (sin^3) --
  text(
    "J：sin(angle)の3乗を用いて、\n中心で振幅が小さく端で大きい波を描く。",
    20,
    yOffset - 80,
    600
  );
  setLineStyle();
  drawLineJ(yOffset);
  resetTextStyle();
  yOffset += 300;

  // -- K: サイン^3 × パーリンノイズ --
  text(
    "K：Jのsin^3にパーリンノイズを掛け合わせ、\n複雑な波形を生成する。",
    20,
    yOffset - 80,
    600
  );
  setLineStyle();
  drawLineK(yOffset);
  resetTextStyle();
  yOffset += 300;

  text("線のプログラムのアイデアあれば追加...", 20, yOffset - 80, 600);
}

/* =========================
   テキスト用スタイル／線用スタイルの切り替え
   ========================= */
function setLineStyle() {
  stroke(0);
  strokeWeight(2);
  noFill();
}
function resetTextStyle() {
  noStroke();
  fill(0);
  textSize(16);
}

/* ---------------------------------
  以下、線を描画するための関数群
 ---------------------------------- */

/**
 * A：単純な直線
 */
function drawLineA(config) {
  const { startX, startY, endX } = config;
  line(startX, startY, endX, startY);
}

/**
 * B：終点がランダムに決定される線
 */
function drawLineB(config) {
  const { startX, startY } = config;
  const randx = random(width);
  const randy = random(height);
  line(startX, startY, randx, randy);
}

/**
 * C：短い線を繰り返して1本の線にする
 */
function drawLineC(config) {
  const { startX, startY, endX, segmentLength } = config;
  let lastX = startX;
  let lastY = startY;

  for (let x = startX + segmentLength; x <= endX; x += segmentLength) {
    let currentY = startY + random(10, 90);
    line(lastX, lastY, x, currentY);
    lastX = x;
    lastY = currentY;
  }
}

/**
 * D：x座標の等間隔ステップ & y座標ランダム変動
 */
function drawLineD(config) {
  let { xstep, ystepRange, startX, startY, endX } = config;
  let lastX = startX;
  let lastY = startY;
  let y = startY;

  for (let x = startX + xstep; x <= endX; x += xstep) {
    let ystep = random(-ystepRange, ystepRange);
    y += ystep;
    line(lastX, lastY, x, y);
    lastX = x;
    lastY = y;
  }
}

/**
 * E：x 座標にもランダム変動を加える線
 */
function drawLineE(config) {
  let { xstep, ystepRange, startX, startY, endX, xstepRange } = config;
  let currentPosition = { x: startX, y: startY };
  let y = startY;

  for (let x = startX + xstep; x <= endX; x += xstep) {
    let ystep = random(-ystepRange, ystepRange);
    let xVariation = random(-xstepRange, xstepRange);
    y += ystep;
    line(currentPosition.x, currentPosition.y, x + xVariation, y);

    // 次の開始位置を更新
    currentPosition.x = x + xVariation;
    currentPosition.y = y;
  }
}

/**
 * F：x座標のステップ間隔自体をランダムにした線
 */
function drawLineF(config) {
  let { xstepRange, ystepRange, startX, startY, endX } = config;
  let currentPosition = { x: startX, y: startY };
  let y = startY;

  while (currentPosition.x <= endX) {
    let xstep = random(xstepRange[0], xstepRange[1]);
    let ystep = random(-ystepRange, ystepRange);
    y += ystep;
    line(currentPosition.x, currentPosition.y, currentPosition.x + xstep, y);

    // 次の開始位置を更新
    currentPosition.x += xstep;
    currentPosition.y = y;
  }
}

/**
 * G：パーリンノイズを使った線
 */
function drawLineG(config) {
  const { startX, startY, endX, noiseScale, amplitude } = config;
  let prevY = startY + noise(startX * noiseScale) * amplitude;

  for (let x = startX; x + 1 <= endX; x++) {
    let n = noise(x * noiseScale);
    let y = startY + n * amplitude;
    line(x - 1, prevY, x, y);
    prevY = y;
  }
}

/**
 * H：サイン波を描く
 */
function drawLineH(baseY) {
  let xstep = 1;
  let lastx = -999;
  let lasty = -999;
  let angle = 0;

  for (let x = 20; x <= width - 20; x += xstep) {
    let rad = radians(angle);
    let yVal = baseY + sin(rad) * 40;

    if (lastx > -999) {
      line(lastx, lasty, x, yVal);
    }
    lastx = x;
    lasty = yVal;
    angle++;
  }
}

/**
 * I：コサイン波を描く
 */
function drawLineI(baseY) {
  let xstep = 1;
  let lastx = -999;
  let lasty = -999;
  let angle = 0;

  for (let x = 20; x <= width - 20; x += xstep) {
    let rad = radians(angle);
    let yVal = baseY + cos(rad) * 40;

    if (lastx > -999) {
      line(lastx, lasty, x, yVal);
    }
    lastx = x;
    lasty = yVal;
    angle++;
  }
}

/**
 * J：サイン波^3 を描く (sin^3)
 */
function drawLineJ(baseY) {
  let xstep = 1;
  let lastx = -999;
  let lasty = -999;
  let angle = 0;

  for (let x = 20; x <= width - 20; x += xstep) {
    let rad = radians(angle);
    let yVal = baseY + pow(sin(rad), 3) * 40;

    if (lastx > -999) {
      line(lastx, lasty, x, yVal);
    }
    lastx = x;
    lasty = yVal;
    angle++;
  }
}

/**
 * K：サイン波^3 × パーリンノイズ
 */
function drawLineK(baseY) {
  let xstep = 1;
  let lastx = -999;
  let lasty = -999;
  let angle = 0;

  for (let x = 20; x <= width - 20; x += xstep) {
    let rad = radians(angle);
    let yVal = baseY + pow(sin(rad), 3) * noise(rad * 3) * 40;

    if (lastx > -999) {
      line(lastx, lasty, x, yVal);
    }
    lastx = x;
    lasty = yVal;
    angle++;
  }
}
