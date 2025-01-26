// 花クラス
class Flower {
  constructor(cx, cy) {
    // 引数で受け取った座標に配置
    this.cx = cx;
    this.cy = cy;

    // ランダムな角度
    this.angle = random(TWO_PI);

    // ランダムな大きさやノイズパラメータ
    this.aMax = 30;
    this.patelHeight = 40;
    this.noiseScale = random(0.01, 0.05);

    // 総ライン数（4方向 × patelHeight）
    this.totalLines = this.patelHeight * 4;

    circle(this.cx, this.cy, floor(random(4, 6)));
  }

  // 一度にすべて描画（アニメーションなし）
  drawAllLines() {
    for (let i = 0; i < this.totalLines; i++) {
      let phaseIndex = floor(i / this.patelHeight);
      let lineIndex = i % this.patelHeight;

      // 進捗 0~1
      let progress = lineIndex / this.patelHeight;

      // ケース：A
      // 幅をsinで滑らかに変化 (0→最大→0)
      // let aCurrent = aMax * sin(Math.PI * progress) ** 2;

      // ケース：B
      // let base = aMax * sin(Math.PI * progress) ** 2;
      // let randOffset = random(-10, 10); // -10~10の範囲でランダム
      // let aCurrent = base + randOffset;

      // ケース：C
      // let randFactor = random(0.8, 1.2);
      // let aCurrent = aMax * sin(Math.PI * progress) ** 2 * randFactor;

      // ケース：D
      let noiseVal = noise(lineIndex * 0.01);
      let aCurrent = this.aMax * sin(Math.PI * progress) ** 2 * noiseVal;

      // ケース：E
      // let base1 = sin(Math.PI * progress);
      // let base2 = sin(Math.PI * (progress * 2 + 0.3));
      // // 周期違い or 位相ずれ
      // let aCurrent = aMax * (base1 + 0.5 * base2);

      //ケース：F
      // let base = sin(Math.PI * progress);
      // let nVal = noise(lineIndex * 0.03);
      // let aCurrent = aMax * (base * nVal);

      // 幅(例：sin² + ノイズ)
      // let base = sin(Math.PI * progress) ** 2;
      // let nVal = noise(lineIndex * this.noiseScale);
      // let aCurrent = this.aMax * (base + 0.5 * nVal);

      // 各フェーズ(上/右/下/左)ごとの軸
      let Ax, Ay, Bx, By, Cx, Cy;
      if (phaseIndex === 0) {
        // y軸マイナス (上)
        Ax = 0;
        Ay = -lineIndex;
        Bx = aCurrent;
        By = Ay;
        Cx = -aCurrent;
        Cy = Ay;
      } else if (phaseIndex === 1) {
        // x軸プラス (右)
        Ax = lineIndex;
        Ay = 0;
        Bx = Ax;
        By = aCurrent;
        Cx = Ax;
        Cy = -aCurrent;
      } else if (phaseIndex === 2) {
        // y軸プラス (下)
        Ax = 0;
        Ay = lineIndex;
        Bx = aCurrent;
        By = Ay;
        Cx = -aCurrent;
        Cy = Ay;
      } else {
        // x軸マイナス (左)
        Ax = -lineIndex;
        Ay = 0;
        Bx = Ax;
        By = aCurrent;
        Cx = Ax;
        Cy = -aCurrent;
      }

      push();
      translate(this.cx, this.cy); // 花の中心
      rotate(this.angle); // ランダムな角度

      // 線を2本描く
      line(Ax, Ay, Bx, By);
      line(Ax, Ay, Cx, Cy);

      pop();
    }
  }
}

// 花の配列
let flowers = [];
// 10×10 のグリッド状に花を配置
let gridRows = 10;
let gridCols = 10;

// 1マスの間隔
let spacing = 60; // 適宜調整

function setup() {
  createCanvas(windowWidth, windowHeight, SVG);
  background(255);
  stroke(0);
  strokeWeight(1);

  // キャンバス中央を基準に格子を敷く
  let centerX = width / 2;
  let centerY = height / 2;

  // グリッド全体の幅・高さ
  // たとえば「(gridCols - 1) * spacing」ぶん左右に敷くイメージ
  let offsetX = centerX - ((gridCols - 1) * spacing) / 2;
  let offsetY = centerY - ((gridRows - 1) * spacing) / 2;

  // 各マスに花を配置
  for (let i = 0; i < gridRows; i++) {
    for (let j = 0; j < gridCols; j++) {
      let fx = offsetX + j * spacing;
      let fy = offsetY + i * spacing;
      let noiseVal = floor(random(-10, 10));
      fx = fx + noiseVal;
      fy = fy + noiseVal;

      // Flowerインスタンスを( fx, fy )に配置
      let f = new Flower(fx, fy);
      flowers.push(f);
    }
  }

  // すべての花をまとめて描画
  for (let f of flowers) {
    f.drawAllLines();
  }

  noLoop(); // 1度だけ描画
}

function draw() {
  // ここでは特に描画しない（noLoopで停止）
}
