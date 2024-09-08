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
