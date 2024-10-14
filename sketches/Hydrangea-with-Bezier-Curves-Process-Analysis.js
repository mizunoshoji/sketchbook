let radius, controlOffset, numShapes;
let description; // テキストDOM要素
let xPosition; // テキストのX座標
let speed = 1.5; // テキストが流れる速度
let descriptionText =
  "これはプログラムによるアジサイの素描である。この素描はプログラムによる形の生成と決定の方法に焦点をあてている。その方法を示すために、座標や回転の情報がこのスケッチに反映されている。キャンバスの中央（width / 2, height / 2）を基準にシェイプ（1つの花）を描画し、各シェイプはランダムな角度で回転する。シェイプは4つのベジェ曲線のセグメント（1つの花びら）で構成され、それぞれのセグメントは90度ずつ回転しながら描かれる。ベジェ曲線は、始点（SP）から終点（EP）に向かう滑らかな曲線であり、2つの制御点（CP1、CP2）によって形が決まる。制御点が曲線の形状をコントロールし、これにより、曲線の滑らかさや曲がり具合が調整される。曲線の制御点や終点の位置はランダムに変動し、それが形のバリエーションを生み出す。ベジェ曲線はbeginShape()とbezierVertex()で描画され、各セグメントには次のポイントが含まれる。SP (Start Point): 始点、CP1 (Control Point 1): 曲線の最初の制御点、CP2 (Control Point 2): 曲線の2番目の制御点、EP (End Point): 終点、CP3 (Control Point 3): 終点から始点に戻るための最初の制御点、CP4 (Control Point 4): 始点に戻るための2番目の制御点。ベジェ曲線はSPから始まり、CP1、CP2を通ってEPまで滑らかな曲線を描く。その後、EPからCP3、CP4を通って再びSPに戻り、1つのセグメント（1つの花びら）が完了する。4回繰り返してシェイプ全体（1つの花）を形成する。さらに、random()を使用して各制御点や終点の座標にランダムな変動を加えるため、シェイプの形は確率的に決定され、毎回異なる形となる。";

function setup() {
  createCanvas(windowWidth, windowHeight, SVG);
  initializeVariables();
  drawShapes();

  // "テスト"というテキスト要素を作成
  testText = createP(descriptionText);
  testText.style("font-size", "24px");
  testText.style("color", "#333");
  testText.style("position", "fixed"); // フロートさせる
  testText.style("top", "10px"); // 画面の上に固定
  testText.style("left", "0px"); // 初期位置
  testText.style("white-space", "nowrap"); // テキストが折り返されないようにする

  // テキストの初期位置を設定（画面の右側から開始）
  xPosition = windowWidth;
}

function draw() {
  // テキストの位置を更新して右から左に流す
  xPosition -= speed;
  testText.position(xPosition, 10); // 左上に固定しつつ、X座標を変化

  // テキストが画面の左端を超えたら、右端に戻す（ループ）
  if (xPosition < -testText.size().width) {
    xPosition = windowWidth; // 右端から再スタート
  }
}

function initializeVariables() {
  radius = min(width, height) / 4.5;
  controlOffset = radius * 0.5;
  numShapes = 1;

  strokeWeight(2);
  textSize(12);
  textAlign(CENTER, CENTER); // ラベルのテキストの位置を中央に設定
}

function drawShapes() {
  for (let j = 0; j < numShapes; j++) {
    drawCustomShape(width / 2, height / 2);
  }
}

function drawCustomShape(x, y) {
  push();
  translate(x, y); // 中心に移動
  let angle = random(TWO_PI); // ランダムな角度で回転
  rotate(angle);

  // 補助線（回転後のx軸とy軸）を描画
  drawRotatedAxes();

  for (let i = 0; i < 4; i++) {
    push();
    rotate(HALF_PI * i); // 90度ごとの回転
    drawBezierShape();
    pop();
  }
  pop();
}

function drawRotatedAxes() {
  stroke(0); // 黒色の補助線
  strokeWeight(1);

  // x軸の線
  line(-radius * 2, 0, radius * 2, 0);
  // y軸の線
  line(0, -radius * 2, 0, radius * 2);

  // x軸ラベル
  noStroke();
  fill(0); // 黒色のラベル
  text("X", radius * 2 + 10, 0); // x軸の終端に「X」を表示

  // y軸ラベル
  text("Y", 0, -radius * 2 - 10); // y軸の終端に「Y」を表示
}

function drawBezierShape() {
  noFill();
  stroke(0);
  beginShape();
  let startX = 0,
    startY = 0;
  vertex(startX, startY);

  let cx1 = controlOffset * 0.1 + random(-8, 8);
  let cy1 = controlOffset * 0.1 + random(-8, 8);
  let cx2 = radius * 1.5 + random(-8, 8);
  let cy2 = -controlOffset * 1.5 + random(-8, 8);
  let x2 = radius + random(-8, 8);
  let y2 = radius / 2 + random(-8, 8);

  bezierVertex(cx1, cy1, cx2, cy2, x2, y2);

  let cx3 = controlOffset + random(-8, 8);
  let cy3 = radius * 1.5 + random(-8, 8);
  let cx4 = controlOffset * 0.1 + random(-8, 8);
  let cy4 = controlOffset * 0.1 + random(-8, 8);

  bezierVertex(cx3, cy3, cx4, cy4, startX, startY);
  endShape(CLOSE);

  // 各制御点と座標を表示
  displayPointsWithLabels([
    { label: "SP\n", x: startX, y: startY }, // 黒
    { label: "CP1\n", x: cx1, y: cy1 }, // 黒
    { label: "CP2\n", x: cx2, y: cy2 }, // 黒
    { label: "EP\n", x: x2, y: y2 }, // 黒
    { label: "CP3\n", x: cx3, y: cy3 }, // 黒
    { label: "CP4\n", x: cx4, y: cy4 }, // 黒
  ]);
}

// 座標とラベルを黒で表示する関数
function displayPointsWithLabels(points) {
  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    drawPointAndText(point.label, point.x, point.y); // 黒の座標とラベルを表示
  }
}

function drawPointAndText(label, x, y) {
  fill(0); // 黒色を適用
  stroke(0); // 黒色の輪郭線
  ellipse(x, y, 6, 6); // 点を描く
  noStroke(); // テキストの輪郭を消す
  textStyle(NORMAL);
  text(`${label} (${round(x)}, ${round(y)})`, x + 10, y); // ラベルと座標を表示
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // キャンバスサイズの変更
  initializeVariables(); // 再初期化
  drawShapes(); // 再描画
}
