document.addEventListener("DOMContentLoaded", () => {
  const sketchLinks = document.getElementById("sketch-links");

  fetch("sketches.json")
    .then((response) => response.json())
    .then((sketches) => {
      sketches.forEach((sketch) => {
        const link = document.createElement("a");
        // sketch_template.htmlにクエリパラメータとしてファイル名を渡す
        link.href = `void.html?sketch=${sketch.file}`;
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

    function showText() {
      if (index < fullText.length) {
        textElement.innerHTML += fullText[index]; // 1文字ずつ追加
        index++;
        setTimeout(showText, 150); // 文字が表示される速度
      } else {
        cursorElement.style.display = "none"; // 最後の文字が入力された後にカーソルを消す
      }
    }

    showText();
  }

  // 初回実行
  setTimeout(typeText, 1000); // 1秒後に最初のアニメーション開始

  // 5秒ごとにループして実行
  setInterval(typeText, 5000);
});
