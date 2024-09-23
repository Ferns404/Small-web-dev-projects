// Elements
const colorPicker = document.getElementById("colorPicker");
const hexValue = document.getElementById("hexValue");
const rgbValue = document.getElementById("rgbValue");
const saveColorBtn = document.getElementById("saveColorBtn");
const savedColors = document.getElementById("savedColors");

// Update color information when the color picker is used
colorPicker.addEventListener("input", function () {
  const selectedColor = colorPicker.value;
  hexValue.textContent = selectedColor;
  rgbValue.textContent = hexToRgb(selectedColor);
});

// Convert Hex to RGB
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

// Convert RGB to Hex (to use later for saved colors)
function rgbToHex(rgb) {
  const result = rgb.match(/\d+/g);
  const r = parseInt(result[0]).toString(16).padStart(2, '0');
  const g = parseInt(result[1]).toString(16).padStart(2, '0');
  const b = parseInt(result[2]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

// Save the color to the saved colors section
saveColorBtn.addEventListener("click", function () {
  const colorBox = document.createElement("div");
  colorBox.classList.add("color-box");
  colorBox.style.backgroundColor = colorPicker.value;
  
  // Add click event to each saved color to show the hex and RGB values
  colorBox.addEventListener("click", function () {
    const savedColor = colorBox.style.backgroundColor;
    const savedHex = rgbToHex(savedColor);
    hexValue.textContent = savedHex;
    rgbValue.textContent = savedColor;
  });

  savedColors.appendChild(colorBox);
});
