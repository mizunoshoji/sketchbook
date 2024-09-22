document.addEventListener("DOMContentLoaded", () => {
  const sketchLinks = document.getElementById("sketch-links");

  fetch("sketches.json")
    .then((response) => response.json())
    .then((sketches) => {
      sketches.forEach((sketch) => {
        const link = document.createElement("a");

        // p5.jsのバージョンに応じてvoid.htmlを切り替える
        const version =
          sketch.p5jsversion === "1.6.x" ? "void-svg.html" : "void.html";

        // クエリパラメータとしてスケッチファイル名を渡す
        link.href = `${version}?sketch=${sketch.file}`;
        link.className = "sketch-item";
        link.innerHTML = `${sketch.name} <br> ${sketch.date}`;
        sketchLinks.appendChild(link);
      });
    })
    .catch((error) => console.error("Error loading sketches:", error));
});

document.addEventListener("DOMContentLoaded", () => {
  const textElement = document.getElementById("text");
  const cursorElement = document.getElementById("cursor");
  const fullText = "Drawing Life"; // 表示したいテキスト

  function typeText() {
    let index = 0;
    textElement.innerHTML = ""; // テキストをリセット
    cursorElement.style.display = "inline"; // カーソルを再表示

    // まずカーソルを2秒間表示してから文字を入力
    setTimeout(() => {
      function showText() {
        if (index < fullText.length) {
          textElement.innerHTML += fullText[index]; // 1文字ずつ追加
          index++;
          setTimeout(showText, 150); // 文字が表示される速度
        } else {
          cursorElement.style.display = "none"; // 最後の文字が入力された後にカーソルを消す
        }
      }

      showText(); // 文字入力を開始
    }, 2000); // 2秒待機してから文字入力を開始
  }

  // 初回実行
  typeText();

  // ループして2秒待ってから次のアニメーションを開始
  setInterval(() => {
    typeText(); // 文字入力を繰り返し実行
  }, 7000); // 全体のサイクルを管理 (5秒でアニメーション + 2秒の待機)
});
