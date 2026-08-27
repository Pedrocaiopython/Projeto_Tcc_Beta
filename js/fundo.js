const canvas = document.getElementById('fundo-canvas');
const ctx = canvas.getContext('2d');

const particles = [];
const particleCount = 90;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticle() {
    const glow = getComputedStyle(document.documentElement)
        .getPropertyValue('--cor-glow')
        .trim() || '#00d9ff';

    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.8 + 1.2,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        color: glow
    };
}

function initParticles() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
    }
}

function drawParticles() {
    const glow = getComputedStyle(document.documentElement)
        .getPropertyValue('--cor-glow')
        .trim() || '#00d9ff';

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const particle of particles) {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.fillStyle = glow;
        ctx.shadowBlur = 15;
        ctx.shadowColor = glow;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.shadowBlur = 0;
    requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

resizeCanvas();
initParticles();
drawParticles();
