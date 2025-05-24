const canvas = document.getElementById('cursor');
const context = canvas.getContext('2d');

// Property
let pointerProperty = {
    size: 40,
    x: 0,
    y: 0
}

// Pointer
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    pointerProperty.x = (e.clientX - rect.left) * scaleX;
    pointerProperty.y = (e.clientY - rect.top) * scaleY;
});

// Draw Image
function pointerImage() {
    context.beginPath();
    context.arc(pointerProperty.x, pointerProperty.y, pointerProperty.size, 0, 2 * Math.PI);
    context.fillStyle = 'green';
    context.fill();
    context.strokeStyle = 'red';
    context.lineWidth = 7;
    context.stroke();
    
    context.save();
}

// Gameloop 
function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    pointerImage();
    requestAnimationFrame(gameLoop);
}

gameLoop();