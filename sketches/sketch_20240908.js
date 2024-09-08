function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  let radius = windowWidth <= 600 ? 30 : 60; // 円の半径。画面幅が600px以下ならシェイプを小さくする
  let controlOffset = radius * 0.5; // 丸みを調整するための制御点のオフセット

  // 描画領域の幅と高さのうち長い方の1/3を円の半径として使用
  let maxRadius = max(width, height) / 3;

  stroke(0); // 線の色を黒に設定
  strokeWeight(2);
  noFill(); // 塗りつぶしを無効化

  textSize(6); // テキストの表示サイズを8pxに設定
  textAlign(LEFT); // テキストを左揃えに設定

  // ランダムな位置に100個のシェイプを描画（指定した円の範囲内）
  for (let j = 0; j < 100; j++) {
    push();

    // 円の範囲内でランダムな位置を生成
    let angle = random(TWO_PI); // ランダムな角度
    let r = random(maxRadius); // ランダムな半径の距離
    let x = r * cos(angle); // x座標
    let y = r * sin(angle); // y座標

    // シェイプをランダムな円の範囲に配置
    translate(width / 2 + x, height / 2 + y);

    // ランダムな回転を加える
    rotate(random(TWO_PI)); // 0からTWO_PI（360度）のランダムな回転

    // 4つのセグメントを描く
    for (let i = 0; i < 4; i++) {
      push();
      rotate(HALF_PI * i); // 90度ごとに回転

      // カスタムシェイプで円弧を丸みを持たせて描く
      beginShape();
      let startX = 0;
      let startY = 0;
      vertex(startX, startY); // 始点

      // 最初のベジェ曲線の制御点と終点
      let cx1 = controlOffset * 0.1 + random(-8, 8); // 制御点1にランダム性を追加
      let cy1 = controlOffset * 0.1 + random(-8, 8);
      let cx2 = radius * 1.5 + random(-8, 8); // 制御点2にランダム性を追加
      let cy2 = -controlOffset * 1.5 + random(-8, 8);
      let x2 = radius + random(-8, 8); // 終点にランダム性を追加
      let y2 = radius / 2 + random(-8, 8);

      // ベジェ曲線で滑らかな形を描く
      bezierVertex(cx1, cy1, cx2, cy2, x2, y2);

      // 2つ目のベジェ曲線の制御点と終点
      let cx3 = controlOffset + random(-8, 8); // 制御点3にランダム性を追加
      let cy3 = radius * 1.5 + random(-8, 8);
      let cx4 = controlOffset * 0.1 + random(-8, 8); // 制御点4にランダム性を追加
      let cy4 = controlOffset * 0.1 + random(-8, 8);
      let x3 = random(-8, 8); // 終点にランダム性を追加
      let y3 = random(-8, 8);

      bezierVertex(cx3, cy3, cx4, cy4, x3, y3);
      endShape(CLOSE);

      // 色分けして各点を表示
      noStroke();

      // 始点: 黒 + 座標表示
      fill(0);
      ellipse(startX, startY, 6, 6);
      text(`(${round(startX)}, ${round(startY)})`, startX + 5, startY - 5);

      // 制御点1: 赤 + 座標表示
      fill(255, 0, 0);
      ellipse(cx1, cy1, 6, 6);
      text(`(${round(cx1)}, ${round(cy1)})`, cx1 + 5, cy1 - 5);

      // 制御点2: 緑 + 座標表示
      fill(0, 255, 0);
      ellipse(cx2, cy2, 6, 6);
      text(`(${round(cx2)}, ${round(cy2)})`, cx2 + 5, cy2 - 5);

      // 終点: 青 + 座標表示
      fill(0, 0, 255);
      ellipse(x2, y2, 6, 6);
      text(`(${round(x2)}, ${round(y2)})`, x2 + 5, y2 - 5);

      // 2つ目の制御点1: 赤 + 座標表示
      fill(255, 0, 0);
      ellipse(cx3, cy3, 6, 6);
      text(`(${round(cx3)}, ${round(cy3)})`, cx3 + 5, cy3 - 5);

      // 2つ目の制御点2: 緑 + 座標表示
      fill(0, 255, 0);
      ellipse(cx4, cy4, 6, 6);
      text(`(${round(cx4)}, ${round(cy4)})`, cx4 + 5, cy4 - 5);

      // 2つ目の終点: 青 + 座標表示
      fill(0, 0, 255);
      ellipse(x3, y3, 6, 6);
      text(`(${round(x3)}, ${round(y3)})`, x3 + 5, y3 - 5);

      pop();
    }
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // ウィンドウサイズ変更時にキャンバスをリサイズ
  setup(); // 再描画
}
