let petalRefs = [];
let maxElements = 1000;
let codeText = `function draw() {
  let rx = random(width);
  let ry = random(height);
  push();
  translate(rx, ry);
  rotate(random(TWO_PI));
  emergeSakuraPetal();
  pop();
  evanesceSakuraPetal();
}`;

let palette = [
  "rgb(255,255,255)",
  "rgb(255,204,255)",
  "rgb(252, 176, 255)",
  "rgb(255,153,255)",
  "rgb(71,71,209)",
  "rgb(102,153,255)",
];

function setup() {
  document.body.style.backgroundColor = palette[floor(random(6))];
  let margin = 30;
  let canvasWidth = windowWidth - 2 * margin;
  let canvasHeight = windowHeight - 2 * margin;
  let canvas = createCanvas(canvasWidth, canvasHeight, SVG);
  canvas.position(margin, margin);
  canvas.style("outline", "4px solid " + palette[floor(random(6))]);
  strokeWeight(1);
  background(palette[floor(random(6))]);
  createCodeOverlay(codeText, margin, margin);
  frameRate(20);
}

function draw() {
  let rx = random(width);
  let ry = random(height);
  push();
  translate(rx, ry);
  rotate(random(TWO_PI));
  emergeSakuraPetal();
  pop();
  evanesceSakuraPetal();
}

function emergeSakuraPetal() {
  fill(palette[floor(random(6))]);
  stroke(palette[floor(random(6))]);
  beginShape();
  vertex(11.9582, 37.2183);
  bezierVertex(12.0741, 37.1495, 12.0796, 37.1331, 11.9979, 37.1018);
  bezierVertex(11.9336, 37.0771, 11.9144, 37.0881, 11.9385, 37.1358);
  bezierVertex(11.9581, 37.1746, 11.9374, 37.1615, 11.8924, 37.1066);
  bezierVertex(11.8149, 37.012, 11.8028, 37.013, 11.6604, 37.125);
  bezierVertex(11.5573, 37.2061, 11.5101, 37.2195, 11.5099, 37.1678);
  bezierVertex(11.5097, 37.1178, 11.4248, 37.0902, 11.2569, 37.0856);
  bezierVertex(11.0203, 37.0791, 10.7879, 36.9513, 10.8677, 36.8715);
  bezierVertex(10.887, 36.8521, 10.8758, 36.8363, 10.8427, 36.8363);
  bezierVertex(10.7515, 36.8363, 10.6161, 36.451, 10.5119, 35.8951);
  bezierVertex(10.385, 35.2179, 10.25, 34.816, 9.9497, 34.2215);
  bezierVertex(9.5982, 33.5256, 9.3753, 33.1931, 8.8397, 32.566);
  bezierVertex(8.5856, 32.2685, 8.1794, 31.7592, 7.937, 31.4342);
  bezierVertex(6.57, 29.6018, 6.2763, 29.2053, 6.1158, 28.9758);
  bezierVertex(6.0186, 28.8366, 5.7674, 28.5306, 5.5577, 28.2957);
  bezierVertex(5.1505, 27.8398, 4.8223, 27.4155, 4.3646, 26.7533);
  bezierVertex(4.2081, 26.5268, 3.8609, 26.0317, 3.5932, 25.6532);
  bezierVertex(3.3254, 25.2746, 3.0226, 24.8149, 2.9203, 24.6315);
  bezierVertex(2.4114, 23.7198, 1.7766, 21.7144, 1.4849, 20.0968);
  bezierVertex(1.3349, 19.265, 1.3005, 18.9087, 1.2767, 17.9404);
  bezierVertex(1.2592, 17.2269, 1.2724, 16.6243, 1.3111, 16.3746);
  bezierVertex(1.3458, 16.1515, 1.3771, 15.8536, 1.3807, 15.7126);
  bezierVertex(1.3951, 15.1519, 1.5079, 14.4644, 1.661, 14.0045);
  bezierVertex(1.7496, 13.7384, 1.9552, 13.0466, 2.1178, 12.4672);
  bezierVertex(2.4491, 11.2872, 2.6435, 10.7837, 3.1576, 9.7743);
  bezierVertex(3.5564, 8.991, 3.9245, 8.4112, 4.3938, 7.8269);
  bezierVertex(4.5699, 7.6077, 4.8005, 7.3002, 4.9064, 7.1436);
  bezierVertex(5.3529, 6.483, 6.391, 5.1659, 6.8958, 4.6196);
  bezierVertex(7.1947, 4.2961, 7.6796, 3.8378, 7.9734, 3.6012);
  bezierVertex(8.2671, 3.3645, 8.6547, 3.0326, 8.8347, 2.8637);
  bezierVertex(9.0146, 2.6947, 9.2867, 2.4763, 9.4393, 2.3782);
  bezierVertex(9.5919, 2.2801, 9.8448, 2.1183, 10.0014, 2.0185);
  bezierVertex(10.2969, 1.8303, 11.4336, 1.3107, 11.9472, 1.1291);
  bezierVertex(12.386, 0.9739, 12.8013, 0.9435, 13.1226, 1.043);
  bezierVertex(13.3878, 1.1251, 13.4038, 1.1234, 13.5981, 0.9915);
  bezierVertex(13.7087, 0.9165, 13.8822, 0.8395, 13.9837, 0.8205);
  bezierVertex(14.4093, 0.7406, 15.0003, 1.0593, 15.4071, 1.5879);
  bezierVertex(15.8905, 2.2162, 16.1221, 2.9165, 16.1221, 3.7499);
  bezierVertex(16.1221, 4.035, 16.1413, 4.2674, 16.1648, 4.2664);
  bezierVertex(16.1883, 4.2653, 16.348, 4.0539, 16.5197, 3.7966);
  bezierVertex(17.214, 2.7562, 17.8579, 2.0751, 18.3427, 1.8683);
  bezierVertex(18.7691, 1.6863, 19.4424, 1.6812, 19.8515, 1.8569);
  bezierVertex(20.0081, 1.9241, 20.2828, 2.009, 20.4619, 2.0456);
  bezierVertex(20.843, 2.1234, 21.4476, 2.5009, 21.9371, 2.9668);
  bezierVertex(22.1134, 3.1346, 22.3746, 3.3686, 22.5176, 3.4867);
  bezierVertex(22.8435, 3.756, 23.4196, 4.4626, 23.6844, 4.918);
  bezierVertex(23.7953, 5.1087, 23.9286, 5.3159, 23.9807, 5.3786);
  bezierVertex(24.0328, 5.4412, 24.1396, 5.6077, 24.2181, 5.7487);
  bezierVertex(24.2966, 5.8896, 24.4611, 6.1714, 24.5837, 6.375);
  bezierVertex(24.8548, 6.8249, 24.9262, 7.0023, 25.0904, 7.6343);
  bezierVertex(25.2558, 8.2706, 25.4769, 8.838, 25.9406, 9.8156);
  bezierVertex(26.3776, 10.7369, 26.4959, 11.1042, 26.6571, 12.0402);
  bezierVertex(26.7218, 12.416, 26.8119, 12.8852, 26.8574, 13.0828);
  bezierVertex(26.9029, 13.2805, 26.9402, 13.5256, 26.9402, 13.6275);
  bezierVertex(26.9402, 13.7294, 26.9999, 14.2082, 27.073, 14.6916);
  bezierVertex(27.1896, 15.4624, 27.204, 15.7415, 27.1904, 16.9653);
  bezierVertex(27.1666, 19.0955, 27.0851, 19.8685, 26.7681, 20.9687);
  bezierVertex(26.4554, 22.054, 25.668, 23.6395, 25.0153, 24.4985);
  bezierVertex(24.7965, 24.7863, 24.5347, 25.1879, 24.4334, 25.3909);
  bezierVertex(24.2605, 25.7373, 23.9908, 26.1794, 23.5472, 26.8438);
  bezierVertex(23.2313, 27.3169, 22.5595, 28.0758, 22.1358, 28.4381);
  bezierVertex(21.916, 28.626, 21.3634, 29.139, 20.9077, 29.5781);
  bezierVertex(19.3532, 31.0762, 18.4268, 31.7738, 16.4068, 32.9676);
  bezierVertex(14.3157, 34.2033, 13.6208, 34.8515, 12.8835, 36.254);
  bezierVertex(12.561, 36.8674, 12.2616, 37.207, 11.9942, 37.2627);
  bezierVertex(11.8252, 37.2979, 11.8249, 37.2974, 11.9582, 37.2183);
  endShape(CLOSE);

  let groups = document.querySelectorAll("g");
  let lastGroup = groups[groups.length - 1];
  if (lastGroup) {
    lastGroup.style.opacity = "0";
    lastGroup.style.transition = "opacity 1s ease-in-out";
    setTimeout(() => {
      lastGroup.style.opacity = "1";
    }, 10);
    setTimeout(() => {
      lastGroup.style.opacity = "0";
    }, 30000);
    petalRefs.push(lastGroup);
  }
}

function evanesceSakuraPetal() {
  if (petalRefs.length > maxElements) {
    let numToRemove = petalRefs.length - maxElements;
    for (let i = 0; i < numToRemove; i++) {
      let el = petalRefs.shift();
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }
  }
}

function createCodeOverlay(codeText, x, y) {
  let codeDiv = createDiv(codeText);
  codeDiv.style("font-family", "monospace");
  codeDiv.style("font-size", "16px");
  codeDiv.style("color", "#ffffff");
  codeDiv.style("background-color", "#0000ff99");
  codeDiv.style("padding", "10px");
  codeDiv.style("position", "absolute");
  codeDiv.style("z-index", "1000");
  codeDiv.style("white-space", "pre");
  codeDiv.position(x, y);
  return codeDiv;
}
