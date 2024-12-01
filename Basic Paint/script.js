// Canvas and context setup
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

// Variables for drawing
let drawing = false;
let brushColor = '#000000';
let brushSize = 5;
let erasing = false;

// Toolbar elements
const colorPicker = document.getElementById('colorPicker');
const brushSizeSlider = document.getElementById('brushSize');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const toggleModeBtn = document.getElementById('toggleMode');

// Function to start drawing
function startDrawing(e) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

// Function to stop drawing
function stopDrawing() {
    drawing = false;
    ctx.closePath();
}

// Function to draw on the canvas
function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = erasing ? 'white' : brushColor;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
}

// Event listeners for drawing
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);

// Event listener for color picker
colorPicker.addEventListener('input', (e) => {
    brushColor = e.target.value;
    erasing = false; // Switch to drawing mode when color is picked
});

// Event listener for brush size
brushSizeSlider.addEventListener('input', (e) => {
    brushSize = e.target.value;
});

// Eraser button
eraserBtn.addEventListener('click', () => {
    erasing = true;
});

// Clear button
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Light/Dark Mode Toggle
toggleModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    toggleModeBtn.textContent = document.body.classList.contains('light-mode') ? 'Dark Mode' : 'Light Mode';
});
