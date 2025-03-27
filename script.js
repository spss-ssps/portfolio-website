const mousetrace = document.getElementById('mousetrace');
mousetrace.width = window.innerWidth;
mousetrace.height = window.innerHeight;
const ctx = mousetrace.getContext('2d');

let stars = [];
let mouseX = 0;
let mouseY = 0;

// Capture mouse position
mousetrace.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    
    // Add a star with random size
    stars.push({
        x: mouseX,
function draw() {
    ctx.clearRect(0, 0, mousetrace.width, mousetrace.height);
    
    lines.forEach((line, index) => {
        ctx.strokeStyle = `rgba(0, 0, 0, ${line.alpha})`; // Fade effect using alpha
        ctx.beginPath();
        ctx.moveTo(line.x, line.y); // Move to the current mouse position
        ctx.lineTo(line.x + 5, line.y + 1);
        ctx.stroke();
        line.alpha -= 0.0001; 
        if (line.alpha <= 0) {
            lines.splice(index, 1);
        }
    });

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
// Function to clear all traces
function clearTraces() {
    lines = [];
    ctx.clearRect(0, 0, mousetrace.width, mousetrace.height);
}

function drawCircles() {
    draw = function() {
        ctx.clearRect(0, 0, mousetrace.width, mousetrace.height);
        
        lines.forEach((line, index) => {
            ctx.fillStyle = `rgba(0, 0, 0, ${line.alpha})`; // Fade effect using alpha
            ctx.beginPath();
            ctx.arc(line.x, line.y, 5, 0, Math.PI * 2);
            ctx.fill();
            line.alpha -= 0.01; 
            if (line.alpha <= 0) {
                lines.splice(index, 1);
            }
        });

        requestAnimationFrame(draw);
    };
    
    requestAnimationFrame(draw);
}

drawCircles();