// 定数定義
const numCanvases = 4; // 枠の数
const minSize = 100; // 枠の最小サイズ
const margin = 8; // 画面端からの余白
const padding = 20; // 枠内の余白
const palette = ["rgb(255,255,255)", "rgb(203, 203, 203)", "rgb(0, 0, 0)"];
// 花びら枚数カテゴリ
const densityCategories = [
  { min: 5, max: 20, sides: 2 },
  { min: 21, max: 50, sides: 5 },
  { min: 51, max: 100, sides: 3 },
];

// SVGパスデータ。AI生成された桜の花びらのビットマップ画像をトレースした結果
const PETAL_D = `M 13.119 37.6241 C 13.2348 37.5553 13.2404 37.5389 13.1587 37.5076 C 13.0944 37.4829 13.0752 37.4939 13.0993 37.5416 C 13.1189 37.5804 13.0982 37.5673 13.0532 37.5124 C 12.9757 37.4178 12.9636 37.4188 12.8212 37.5308 C 12.7181 37.6119 12.6709 37.6253 12.6707 37.5736 C 12.6704 37.5236 12.5856 37.496 12.4177 37.4914 C 12.1811 37.4849 11.9487 37.3571 12.0285 37.2773 C 12.0478 37.2579 12.0366 37.2421 12.0035 37.2421 C 11.9123 37.2421 11.7769 36.8568 11.6727 36.3009 C 11.5458 35.6237 11.4108 35.2218 11.1105 34.6273 C 10.759 33.9314 10.5361 33.5989 10.0005 32.9718 C 9.7464 32.6743 9.3402 32.165 9.0977 31.84 C 7.7308 30.0076 7.437 29.6111 7.2766 29.3816 C 7.1793 29.2424 6.9282 28.9364 6.7184 28.7015 C 6.3113 28.2456 5.9831 27.8213 5.5254 27.1591 C 5.3688 26.9326 5.0217 26.4375 4.754 26.059 C 4.4862 25.6804 4.1834 25.2207 4.0811 25.0373 C 3.5722 24.1256 2.9374 22.1202 2.6457 20.5026 C 2.4957 19.6709 2.4613 19.3145 2.4375 18.3462 C 2.42 17.6327 2.4332 17.0301 2.4719 16.7805 C 2.5066 16.5573 2.5378 16.2594 2.5415 16.1184 C 2.5559 15.5577 2.6687 14.8702 2.8218 14.4103 C 2.9104 14.1442 3.116 13.4524 3.2786 12.873 C 3.6099 11.693 3.8043 11.1895 4.3184 10.1801 C 4.7172 9.3968 5.0853 8.817 5.5546 8.2327 C 5.7307 8.0135 5.9613 7.706 6.0671 7.5494 C 6.5137 6.8888 7.5518 5.5717 8.0566 5.0254 C 8.3555 4.7019 8.8404 4.2436 9.1342 4.007 C 9.4279 3.7703 9.8155 3.4384 9.9955 3.2695 C 10.1754 3.1005 10.4475 2.8821 10.6001 2.784 C 10.7527 2.6859 11.0056 2.5241 11.1622 2.4243 C 11.4577 2.2361 12.5944 1.7165 13.108 1.5349 C 13.5468 1.3797 13.9621 1.3493 14.2834 1.4488 C 14.5486 1.5309 14.5645 1.5292 14.7589 1.3973 C 14.8695 1.3223 15.043 1.2453 15.1444 1.2263 C 15.5701 1.1464 16.1611 1.4651 16.5678 1.9937 C 17.0513 2.622 17.2829 3.3223 17.2829 4.1557 C 17.2829 4.4408 17.3021 4.6732 17.3256 4.6722 C 17.3491 4.6711 17.5088 4.4597 17.6805 4.2024 C 18.3748 3.162 19.0187 2.4809 19.5035 2.2741 C 19.9299 2.0921 20.6032 2.087 21.0123 2.2627 C 21.1689 2.3299 21.4436 2.4148 21.6227 2.4514 C 22.0037 2.5292 22.6084 2.9067 23.0979 3.3726 C 23.2742 3.5404 23.5354 3.7744 23.6784 3.8925 C 24.0043 4.1618 24.5804 4.8684 24.8452 5.3238 C 24.9561 5.5145 25.0894 5.7217 25.1415 5.7844 C 25.1936 5.847 25.3004 6.0135 25.3789 6.1545 C 25.4573 6.2954 25.6219 6.5772 25.7445 6.7808 C 26.0156 7.2307 26.087 7.4081 26.2512 8.0401 C 26.4166 8.6764 26.6377 9.2438 27.1014 10.2214 C 27.5384 11.1427 27.6567 11.51 27.8178 12.446 C 27.8826 12.8218 27.9727 13.291 28.0182 13.4886 C 28.0637 13.6863 28.1009 13.9314 28.1009 14.0333 C 28.1009 14.1352 28.1607 14.614 28.2338 15.0974 C 28.3504 15.8682 28.3648 16.1473 28.3511 17.3711 C 28.3274 19.5013 28.2459 20.2743 27.9289 21.3745 C 27.6161 22.4598 26.8288 24.0453 26.1761 24.9043 C 25.9573 25.1921 25.6955 25.5937 25.5942 25.7967 C 25.4212 26.1431 25.1516 26.5852 24.708 27.2496 C 24.3921 27.7227 23.7203 28.4816 23.2966 28.8439 C 23.0768 29.0318 22.5242 29.5448 22.0685 29.9839 C 20.514 31.482 19.5875 32.1796 17.5676 33.3734 C 15.4765 34.6091 14.7816 35.2573 14.0443 36.6598 C 13.7218 37.2732 13.4224 37.6128 13.155 37.6685 C 12.986 37.7037 12.9856 37.7032 13.119 37.6241 Z`;

// p5.js インスタンス生成
new p5((p) => {
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight, p.SVG); // 全画面SVG
    p.noLoop();

    const svgEl = p._renderer.svg; // <svg>要素参照
    const NS = svgEl.namespaceURI; // 名前空間

    const defs = document.createElementNS(NS, "defs");
    svgEl.appendChild(defs); // <defs>追加

    for (let i = 0; i < numCanvases; i++) {
      // 1. サイズ＆位置計算（外枠込みで収まるように）
      const maxInnerW = window.innerWidth - margin * 2 - padding * 2;
      const maxInnerH = window.innerHeight - margin * 2 - padding * 2;

      // 内枠サイズをランダムに決定
      const w = p.floor(p.random(minSize, maxInnerW));
      const h = p.floor(p.random(minSize, maxInnerH));

      // 外枠サイズ
      const outerW = w + padding * 2;
      const outerH = h + padding * 2;

      // 外枠の左上位置をランダムに（必ず画面内に収まる）
      const x = p.random(margin, window.innerWidth - outerW - margin);
      const y = p.random(margin, window.innerHeight - outerH - margin);

      // 内枠の左上位置
      const innerX = x + padding;
      const innerY = y + padding;

      // 2. 外枠（角丸矩形）
      const outerRadius = 32;
      const outerRect = document.createElementNS(NS, "rect");
      outerRect.setAttribute("x", x);
      outerRect.setAttribute("y", y);
      outerRect.setAttribute("width", outerW);
      outerRect.setAttribute("height", outerH);
      outerRect.setAttribute("rx", outerRadius);
      outerRect.setAttribute("ry", outerRadius);
      outerRect.setAttribute("fill", palette[1]);
      svgEl.appendChild(outerRect);

      // 3. 内枠（角丸矩形）
      const innerRadius = 12;
      const innerRect = document.createElementNS(NS, "rect");
      innerRect.setAttribute("x", innerX);
      innerRect.setAttribute("y", innerY);
      innerRect.setAttribute("width", w);
      innerRect.setAttribute("height", h);
      innerRect.setAttribute("rx", innerRadius);
      innerRect.setAttribute("ry", innerRadius);
      innerRect.setAttribute("fill", palette[0]);
      svgEl.appendChild(innerRect);

      // 4. クリップパス定義（内枠領域）
      const clipPath = document.createElementNS(NS, "clipPath");
      clipPath.setAttribute("id", `clip${i}`);
      defs.appendChild(clipPath);
      const clipRect = document.createElementNS(NS, "rect");
      clipRect.setAttribute("x", innerX);
      clipRect.setAttribute("y", innerY);
      clipRect.setAttribute("width", w);
      clipRect.setAttribute("height", h);
      clipRect.setAttribute("rx", innerRadius);
      clipRect.setAttribute("ry", innerRadius);
      clipPath.appendChild(clipRect);

      // 5. 花びら枚数をサイコロ風決定
      const totalSides = densityCategories.reduce((s, c) => s + c.sides, 0);
      const roll = Math.ceil(Math.random() * totalSides);
      let acc = 0,
        cat = densityCategories[densityCategories.length - 1];
      for (const c of densityCategories) {
        acc += c.sides;
        if (roll <= acc) {
          cat = c;
          break;
        }
      }
      const petalsCount =
        Math.floor(Math.random() * (cat.max - cat.min + 1)) + cat.min;
      const petalScale = p.random(0.5, 10);

      // 6.花びら追加
      const g = document.createElementNS(NS, "g");
      g.setAttribute("clip-path", `url(#clip${i})`);
      svgEl.appendChild(g);

      for (let j = 0; j < petalsCount; j++) {
        const rx = Math.random() * w + innerX;
        const ry = Math.random() * h + innerY;
        const angle = Math.random() * 360;
        const path = document.createElementNS(NS, "path");
        path.setAttribute("d", PETAL_D);
        path.setAttribute(
          "transform",
          `translate(${rx},${ry}) rotate(${angle}) scale(${petalScale})`
        );
        path.setAttribute("stroke", palette[2]);
        path.setAttribute("fill", "none");
        g.appendChild(path);
      }
    }
  };
}, document.body);
