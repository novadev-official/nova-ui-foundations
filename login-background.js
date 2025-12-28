const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

// Matrix Characters (Binary + Katakana + Roman)
const chars = '01010101ABCDEFGHIJKLMNOPQRSTUVWXYZノヴァデベロップメント';
const charArray = chars.split('');

const fontSize = 14;
const columns = width / fontSize;

// Drops array - one per column
const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

// Handle Resize
window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Reset drops
    const newColumns = width / fontSize;
    drops.length = 0;
    for (let i = 0; i < newColumns; i++) {
        drops[i] = 1;
    }
});

function draw() {
    // Translucent black background to create trail effect
    ctx.fillStyle = 'rgba(5, 5, 7, 0.05)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        // Random char
        const text = charArray[Math.floor(Math.random() * charArray.length)];

        // Color: Nova Cyan/Purple gradient simulation or just Cyan
        // Alternating colors for a "cyber" look
        if (Math.random() > 0.5) {
            ctx.fillStyle = '#00f2ff'; // Cyan
        } else {
            ctx.fillStyle = '#bd00ff'; // Purple
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly after it has crossed screen
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Increment Y coordinate
        drops[i]++;
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    draw();
}

animate();
