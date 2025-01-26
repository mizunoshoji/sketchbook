// Flowerクラス
class Flower {
  constructor(cx, cy, randomValue, phase) {
    // 引数で受け取った座標に配置
    this.cx = cx;
    this.cy = cy;
    this.random = randomValue;
    this.phase = phase; // フェーズ番号

    // ランダムな角度
    this.angle = random(TWO_PI);

    // ランダムな大きさなど
    this.aMax = this.random * 0.7;
    this.patelHeight = this.random * 1.4;
    this.totalLines = this.patelHeight * 4;

    // デバッグ用の円
    circle(this.cx, this.cy, floor(random(4, 6)));
  }

  // 一度にすべて描画（アニメーションなし）
  drawAllLines() {
    stroke("rgba(126, 68, 213, 0.5)");
    for (let i = 0; i < this.totalLines; i++) {
      let phaseIndex = floor(i / this.patelHeight);
      let lineIndex = i % this.patelHeight;

      // 進捗 0~1
      let progress = lineIndex / this.patelHeight;

      // 幅(例)：サイン波 + ノイズ
      let noiseVal = noise(lineIndex * 0.02);
      let aCurrent;

      if (this.phase === 1) {
        // フェーズ1の形
        aCurrent =
          this.aMax * sin(Math.PI * progress) ** 2 * noise(lineIndex * 0.01);
      } else {
        // フェーズ2の形
        aCurrent =
          this.aMax * sin(Math.PI * progress) ** 2 + noise(lineIndex * 0.01);
      }

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
      translate(this.cx, this.cy);
      rotate(this.angle);

      line(Ax, Ay, Bx, By);
      line(Ax, Ay, Cx, Cy);

      pop();
    }
  }
}

// SmallFlowerクラス
class SmallFlower {
  constructor(cx, cy, randomValue, phase) {
    // 引数で受け取った座標に配置
    this.cx = cx;
    this.cy = cy;
    this.random = randomValue / 5; // SmallFlowerは小さくするためサイズを縮小
    this.phase = phase; // フェーズ番号

    // ランダムな角度
    this.angle = random(TWO_PI);

    // ランダムな大きさなど
    this.aMax = this.random * 0.8;
    this.patelHeight = this.random * 1.4;
    this.totalLines = this.patelHeight * 4;

    // デバッグ用の円
    circle(this.cx, this.cy, floor(random(2, 4)));
  }

  // 一度にすべて描画（アニメーションなし）
  drawAllLines() {
    stroke("rgba(52, 43, 179, 0.5)");
    for (let i = 0; i < this.totalLines; i++) {
      let phaseIndex = floor(i / this.patelHeight);
      let lineIndex = i % this.patelHeight;

      // 進捗 0~1
      let progress = lineIndex / this.patelHeight;

      // 幅(例)：サイン波 + ノイズ
      let noiseVal = noise(lineIndex * 0.01);
      let aCurrent;

      if (this.phase === 1) {
        // フェーズ1の形
        aCurrent = this.aMax * sin(Math.PI * progress) ** 2 * noiseVal;
      } else {
        // フェーズ2の形
        aCurrent = this.aMax * (sin(Math.PI * progress) ** 2 + noiseVal);
      }

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
      translate(this.cx, this.cy);
      rotate(this.angle);

      line(Ax, Ay, Bx, By);
      line(Ax, Ay, Cx, Cy);

      pop();
    }
  }
}

// 花の配列
let flowers = [];
let gridRows = 12;
let gridCols = 10;
let spacing = 80;

function setup() {
  createCanvas(windowWidth, windowHeight, SVG);
  background("rgba(72, 223, 226, 0.67)");
  strokeWeight(1);

  for (let phase = 1; phase <= 2; phase++) {
    // グリッド全体のランダムオフセット
    // let gridOffsetX = random(-300, 300);
    // let gridOffsetY = random(-100, 100);

    // let centerX = width / 2 + gridOffsetX;
    // let centerY = height / 2 + gridOffsetY;
    let centerX = width / 2;
    let centerY = height / 2;
    // グリッドの中央インデックス
    let midI = (gridRows - 1) * 0.5;
    let midJ = (gridCols - 1) * 0.5;

    for (let i = 0; i < gridRows; i++) {
      for (let j = 0; j < gridCols; j++) {
        // i, j から中心に対して相対値 (di, dj)
        let di = i - midI;
        let dj = j - midJ;

        // ダイヤモンド変換
        let dx = dj - di;
        let dy = di + dj;

        // 菱形配置
        let fx = centerX + dx * spacing;
        // 縦方向は 0.5倍にして調整
        let fy = centerY + dy * (spacing * 0.7);

        // 少しランダムな揺らぎ
        let noiseVal = random(-50, 50);
        fx += noiseVal;
        fy += noiseVal;

        let randomValue = floor(random(40, 45));

        // Flowerインスタンスを (fx, fy) に配置

        let f = new Flower(fx, fy, randomValue, phase);
        flowers.push(f);

        // SmallFlowerインスタンスを同じ位置に配置
        let sf = new SmallFlower(fx, fy, randomValue, phase);
        flowers.push(sf);
      }
    }

    // すべての花をまとめて描画
    for (let f of flowers) {
      f.drawAllLines();
    }
  }

  noLoop();
}

function draw() {
  // noLoop で停止
}
