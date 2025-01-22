function setup() {
  createCanvas(windowWidth, windowHeight); // ウィンドウサイズに合わせたキャンバス
  pixelDensity(1); // ピクセル密度を1に設定
  background(200);
  noLoop(); // 描画を一度だけ行う

  let noiseLevel = 255;
  let noiseScale = 0.01;

  loadPixels(); // ピクセルデータをロード
  for (let y = 0; y < height; y++) {
    let ny = noiseScale * y;
    for (let x = 0; x < width; x++) {
      let nx = noiseScale * x;
      let n = noise(nx, ny); // 2Dノイズ値
      let c = floor(n * noiseLevel); // 0〜255にスケーリング

      let index = (x + y * width) * 4;
      pixels[index] = c; // Red
      pixels[index + 1] = c; // Green
      pixels[index + 2] = c; // Blue
      pixels[index + 3] = 255; // Alpha
    }
  }
  updatePixels(); // ピクセルデータを更新

  describe("A gray cloudy pattern.");
}

function draw() {
  // 描画はsetup()で完了
}
