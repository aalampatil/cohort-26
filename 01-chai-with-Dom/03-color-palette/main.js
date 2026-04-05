const format = document.querySelector("#format");
const tone = document.querySelector("#tone");
const button = document.querySelector("#generateBtn");
const palette = document.querySelector("#palette");

function generatePalette() {
  palette.innerHTML = "";

  const generateRGB = () => {
    let min = 0;
    let max = 256;

    if (tone.value === "light") {
      min = 150;
      max = 256;
    }

    if (tone.value === "dark") {
      min = 0;
      max = 100;
    }

    const r = Math.floor(Math.random() * (max - min) + min);
    const g = Math.floor(Math.random() * (max - min) + min);
    const b = Math.floor(Math.random() * (max - min) + min);

    return { r, g, b };
  };

  const generateHEX = () => {
    const { r, g, b } = generateRGB();

    const rHex = r.toString(16).padStart(2, "0");
    const gHex = g.toString(16).padStart(2, "0");
    const bHex = b.toString(16).padStart(2, "0");

    return `#${rHex}${gHex}${bHex}`;
  };

  for (let i = 0; i < 5; i++) {
    const div = document.createElement("div");

    if (format.value === "rgb") {
      const { r, g, b } = generateRGB();
      const rgbValue = `rgb(${r},${g},${b})`;

      div.style.backgroundColor = rgbValue;
      div.classList.add("item");
      div.textContent = rgbValue;
    } else {
      const hex = generateHEX();

      div.style.backgroundColor = hex;
      div.classList.add("item");
      div.textContent = hex;
    }

    div.addEventListener("click", () => {
      window.navigator.clipboard.writeText(div.textContent);
      alert("color code copied to clipboard");
    });

    palette.appendChild(div);
  }
}

button.addEventListener("click", generatePalette);

generatePalette();
