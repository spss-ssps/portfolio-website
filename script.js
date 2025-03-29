const mousetrace = document.getElementById('mousetrace');
const ctx = mousetrace.getContext('2d');

let circles = [];
let mouseX = 0;
let mouseY = 0;
let lastAddedTime = 5;

// Set initial canvas size
mousetrace.width = window.innerWidth;
mousetrace.height = window.innerHeight;

// Update canvas size when window is resized
window.addEventListener('resize', () => {
    mousetrace.width = window.innerWidth;
    mousetrace.height = window.innerHeight;
});

mousetrace.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    
    // Only add a new circle every 50ms for better spacing
    const currentTime = Date.now();
    if (currentTime - lastAddedTime > 50) {
        circles.push({
            x: mouseX,
            y: mouseY,
            alpha: 0.8,
            size: Math.random() * 5 + 3,
            color: `rgb(${Math.floor(Math.random()*156)+100}, ${Math.floor(Math.random()*156)+100}, ${Math.floor(Math.random()*156)+100})` // Random color between 100-255
        });
        lastAddedTime = currentTime;
    }
});

function draw() {
    ctx.clearRect(0, 0, mousetrace.width, mousetrace.height);

    // Draw all circles
    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        ctx.fillStyle = circle.color.replace('rgb', 'rgba').replace(')', `, ${circle.alpha})`); // Add alpha to color
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
        ctx.fill();
        
        circle.alpha -= 0.01; // Fade out the circles
        if (circle.alpha <= 0) {
            circles.splice(i, 1); // Remove the circle once it's completely faded
            i--; // Adjust index after removing an element
        }
    }

    requestAnimationFrame(draw); // Continue the animation
}

requestAnimationFrame(draw); // Start the drawing process
