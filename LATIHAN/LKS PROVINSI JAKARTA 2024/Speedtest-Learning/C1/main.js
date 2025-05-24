const canvas = document.getElementById('cursor');
const ctx = canvas.getContext('2d');

// Property
let pointerProperty = {
    x: 200,
    y: 200,
    size: 70
}

let boomEffectProperty = {
    size: 60
}

// Pointer
canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    pointerProperty.x = (e.clientX - rect.left) * scaleX;
    pointerProperty.y = (e.clientY - rect.top) * scaleY;
});

// Click
let boomEffect = [];
canvas.addEventListener("click", () => {
    boomEffect.push({
        x: pointerProperty.x,
        y: pointerProperty.y,
        startTime: Date.now()
    });
});

// Draw
function drawPointer() {
    ctx.beginPath();
    ctx.moveTo(pointerProperty.x, pointerProperty.y + pointerProperty.size / 2);
    ctx.lineTo(pointerProperty.x + pointerProperty.size / 2, pointerProperty.y - pointerProperty.size / 2);
    ctx.lineTo(pointerProperty.x - pointerProperty.size / 2, pointerProperty.y - pointerProperty.size / 2);
    ctx.closePath();

    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.save();
}

// Boom effect
function drawBoomEffect() {
    const now = Date.now();
    const duration = 300;

    boomEffect = boomEffect.filter(b => now - b.startTime < duration);
    boomEffect.forEach(b => {
        const progress = (now - b.startTime) / duration;
        const size = boomEffectProperty.size + progress * 20;
        const alpha = 1 - progress;

        ctx.beginPath();
        ctx.arc(b.x - boomEffectProperty.size / 3, b.y - boomEffectProperty.size / 3, size, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(128, 128, 128, ${alpha})`;
        ctx.fill();
        ctx.save();
    });
}

// Gameloop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(gameLoop);
    
    drawBoomEffect();
    drawPointer();  
}

gameLoop();