// p5.js インスタンスモードで複数キャンバスをランダムなサイズで生成し、各キャンバスに桜の花びらを描画

const numCanvases = 4; // 生成するキャンバスの数
const minSize = 100; // キャンバスの最小幅・最小高さ
const margin = 30; // 画面端からの余白
const palette = ["rgb(255,255,255)", "rgb(121,121,121)", "rgb(0,0,0)"];

window.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < numCanvases; i++) {
    const w =
      Math.floor(Math.random() * (window.innerWidth - minSize - 2 * margin)) +
      minSize;
    const h =
      Math.floor(Math.random() * (window.innerHeight - minSize - 2 * margin)) +
      minSize;
    const x = margin + Math.random() * (window.innerWidth - w - 2 * margin);
    const y = margin + Math.random() * (window.innerHeight - h - 2 * margin);

    // 1. カテゴリごとに min/max とダイスの面数を定義（weightではなくsidesで直接面数を指定）
    const densityCategories = [
      { label: "少ない", min: 5, max: 20, sides: 2 }, // d10のうち2面
      { label: "中くらい", min: 21, max: 50, sides: 5 }, // 5面
      { label: "多い", min: 51, max: 100, sides: 3 }, // 3面
    ];

    // 2. ダイス（d10）を振る
    const totalSides = densityCategories.reduce((sum, c) => sum + c.sides, 0); // 10
    const roll = Math.ceil(Math.random() * totalSides); // 1～10

    // 3. 出目を累積面数でカテゴリにマッピング
    let acc = 0;
    let category = densityCategories[densityCategories.length - 1]; // フォールバック
    for (const cat of densityCategories) {
      acc += cat.sides;
      if (roll <= acc) {
        category = cat;
        break;
      }
    }

    // 4. 選ばれたカテゴリの範囲内で最終的な花びら数をランダムに決定
    const petalsCount =
      Math.floor(Math.random() * (category.max - category.min + 1)) +
      category.min;

    console.log(
      `d${totalSides}を振って${roll} → ${category.label} → ${petalsCount} 枚`
    );

    // (2) キャンバス単位の表示スケールをランダムに決定
    const scaleMin = 0.5;
    const scaleMax = 10;
    const petalScale = Math.random() * (scaleMax - scaleMin) + scaleMin;

    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = `${x}px`;
    container.style.top = `${y}px`;
    document.body.appendChild(container);
    // フレーム（境界線）と余白を追加してキャンバスを囲む
    container.style.border = `4px solid ${palette[2]}`;
    container.style.borderRadius = "32px"; // 角丸を追加
    container.style.overflow = "hidden"; // 角丸内にキャンバスをクリップ
    container.style.padding = "20px";
    container.style.backgroundColor = palette[0];

    new p5((p) => {
      p.setup = () => {
        const cnv = p.createCanvas(w, h, p.SVG);
        cnv.style("border", `2px solid ${palette[2]}`);
        cnv.style("border-radius", "12px");
        // canvas の四隅が丸くなるよう、overflow も hidden
        cnv.style("overflow", "hidden");
        // p.background(palette[0]);
        // cnv.style("width", `${w * canvasScale}px`);
        // cnv.style("height", `${h * canvasScale}px`);
        drawPetals();
        p.noLoop();
        p.saveCanvas(cnv, `sakura-${index}`, "svg");
      };

      function drawPetals() {
        for (let j = 0; j < petalsCount; j++) {
          const rx = p.random(p.width);
          const ry = p.random(p.height);
          p.push();
          p.translate(rx, ry);
          p.rotate(p.random(p.TWO_PI));
          // ３）**花びらパスだけ**をスケール
          p.scale(petalScale);
          emergeSakuraPetal();
          p.pop();
        }
      }

      function emergeSakuraPetal() {
        p.noFill();
        p.stroke(palette[2]);
        p.beginShape();
        p.vertex(11.9582, 37.2183);
        p.bezierVertex(12.0741, 37.1495, 12.0796, 37.1331, 11.9979, 37.1018);
        p.bezierVertex(11.9336, 37.0771, 11.9144, 37.0881, 11.9385, 37.1358);
        p.bezierVertex(11.9581, 37.1746, 11.9374, 37.1615, 11.8924, 37.1066);
        p.bezierVertex(11.8149, 37.012, 11.8028, 37.013, 11.6604, 37.125);
        p.bezierVertex(11.5573, 37.2061, 11.5101, 37.2195, 11.5099, 37.1678);
        p.bezierVertex(11.5097, 37.1178, 11.4248, 37.0902, 11.2569, 37.0856);
        p.bezierVertex(11.0203, 37.0791, 10.7879, 36.9513, 10.8677, 36.8715);
        p.bezierVertex(10.887, 36.8521, 10.8758, 36.8363, 10.8427, 36.8363);
        p.bezierVertex(10.7515, 36.8363, 10.6161, 36.451, 10.5119, 35.8951);
        p.bezierVertex(10.385, 35.2179, 10.25, 34.816, 9.9497, 34.2215);
        p.bezierVertex(9.5982, 33.5256, 9.3753, 33.1931, 8.8397, 32.566);
        p.bezierVertex(8.5856, 32.2685, 8.1794, 31.7592, 7.937, 31.4342);
        p.bezierVertex(6.57, 29.6018, 6.2763, 29.2053, 6.1158, 28.9758);
        p.bezierVertex(6.0186, 28.8366, 5.7674, 28.5306, 5.5577, 28.2957);
        p.bezierVertex(5.1505, 27.8398, 4.8223, 27.4155, 4.3646, 26.7533);
        p.bezierVertex(4.2081, 26.5268, 3.8609, 26.0317, 3.5932, 25.6532);
        p.bezierVertex(3.3254, 25.2746, 3.0226, 24.8149, 2.9203, 24.6315);
        p.bezierVertex(2.4114, 23.7198, 1.7766, 21.7144, 1.4849, 20.0968);
        p.bezierVertex(1.3349, 19.265, 1.3005, 18.9087, 1.2767, 17.9404);
        p.bezierVertex(1.2592, 17.2269, 1.2724, 16.6243, 1.3111, 16.3746);
        p.bezierVertex(1.3458, 16.1515, 1.3771, 15.8536, 1.3807, 15.7126);
        p.bezierVertex(1.3951, 15.1519, 1.5079, 14.4644, 1.661, 14.0045);
        p.bezierVertex(1.7496, 13.7384, 1.9552, 13.0466, 2.1178, 12.4672);
        p.bezierVertex(2.4491, 11.2872, 2.6435, 10.7837, 3.1576, 9.7743);
        p.bezierVertex(3.5564, 8.991, 3.9245, 8.4112, 4.3938, 7.8269);
        p.bezierVertex(4.5699, 7.6077, 4.8005, 7.3002, 4.9064, 7.1436);
        p.bezierVertex(5.3529, 6.483, 6.391, 5.1659, 6.8958, 4.6196);
        p.bezierVertex(7.1947, 4.2961, 7.6796, 3.8378, 7.9734, 3.6012);
        p.bezierVertex(8.2671, 3.3645, 8.6547, 3.0326, 8.8347, 2.8637);
        p.bezierVertex(9.0146, 2.6947, 9.2867, 2.4763, 9.4393, 2.3782);
        p.bezierVertex(9.5919, 2.2801, 9.8448, 2.1183, 10.0014, 2.0185);
        p.bezierVertex(10.2969, 1.8303, 11.4336, 1.3107, 11.9472, 1.1291);
        p.bezierVertex(12.386, 0.9739, 12.8013, 0.9435, 13.1226, 1.043);
        p.bezierVertex(13.3878, 1.1251, 13.4038, 1.1234, 13.5981, 0.9915);
        p.bezierVertex(13.7087, 0.9165, 13.8822, 0.8395, 13.9837, 0.8205);
        p.bezierVertex(14.4093, 0.7406, 15.0003, 1.0593, 15.4071, 1.5879);
        p.bezierVertex(15.8905, 2.2162, 16.1221, 2.9165, 16.1221, 3.7499);
        p.bezierVertex(16.1221, 4.035, 16.1413, 4.2674, 16.1648, 4.2664);
        p.bezierVertex(16.1883, 4.2653, 16.348, 4.0539, 16.5197, 3.7966);
        p.bezierVertex(17.214, 2.7562, 17.8579, 2.0751, 18.3427, 1.8683);
        p.bezierVertex(18.7691, 1.6863, 19.4424, 1.6812, 19.8515, 1.8569);
        p.bezierVertex(20.0081, 1.9241, 20.2828, 2.009, 20.4619, 2.0456);
        p.bezierVertex(20.843, 2.1234, 21.4476, 2.5009, 21.9371, 2.9668);
        p.bezierVertex(22.1134, 3.1346, 22.3746, 3.3686, 22.5176, 3.4867);
        p.bezierVertex(22.8435, 3.756, 23.4196, 4.4626, 23.6844, 4.918);
        p.bezierVertex(23.7953, 5.1087, 23.9286, 5.3159, 23.9807, 5.3786);
        p.bezierVertex(24.0328, 5.4412, 24.1396, 5.6077, 24.2181, 5.7487);
        p.bezierVertex(24.2966, 5.8896, 24.4611, 6.1714, 24.5837, 6.375);
        p.bezierVertex(24.8548, 6.8249, 24.9262, 7.0023, 25.0904, 7.6343);
        p.bezierVertex(25.2558, 8.2706, 25.4769, 8.838, 25.9406, 9.8156);
        p.bezierVertex(26.3776, 10.7369, 26.4959, 11.1042, 26.6571, 12.0402);
        p.bezierVertex(26.7218, 12.416, 26.8119, 12.8852, 26.8574, 13.0828);
        p.bezierVertex(26.9029, 13.2805, 26.9402, 13.5256, 26.9402, 13.6275);
        p.bezierVertex(26.9402, 13.7294, 26.9999, 14.2082, 27.073, 14.6916);
        p.bezierVertex(27.1896, 15.4624, 27.204, 15.7415, 27.1904, 16.9653);
        p.bezierVertex(27.1666, 19.0955, 27.0851, 19.8685, 26.7681, 20.9687);
        p.bezierVertex(26.4554, 22.054, 25.668, 23.6395, 25.0153, 24.4985);
        p.bezierVertex(24.7965, 24.7863, 24.5347, 25.1879, 24.4334, 25.3909);
        p.bezierVertex(24.2605, 25.7373, 23.9908, 26.1794, 23.5472, 26.8438);
        p.bezierVertex(23.2313, 27.3169, 22.5595, 28.0758, 22.1358, 28.4381);
        p.bezierVertex(21.916, 28.626, 21.3634, 29.139, 20.9077, 29.5781);
        p.bezierVertex(19.3532, 31.0762, 18.4268, 31.7738, 16.4068, 32.9676);
        p.bezierVertex(14.3157, 34.2033, 13.6208, 34.8515, 12.8835, 36.254);
        p.bezierVertex(12.561, 36.8674, 12.2616, 37.207, 11.9942, 37.2627);
        p.bezierVertex(11.8252, 37.2979, 11.8249, 37.2974, 11.9582, 37.2183);
        p.endShape(p.CLOSE);
      }
    }, container);
  }
});
