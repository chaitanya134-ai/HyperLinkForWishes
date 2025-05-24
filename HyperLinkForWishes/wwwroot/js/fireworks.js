// fireworks.js
window.startFireworks = function (name = "Deepika") {
    const canvas = document.getElementById("fireworks");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const particles = [];
    let animationId;
    let textOpacity = 0;
    let textScale = 0.5;
    let textAnimation = 0;

    // Set canvas size to fill container
    function resizeCanvas() {
        const container = canvas.parentElement;
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }

    // Initial resize
    resizeCanvas();

    // Resize on window resize
    window.addEventListener('resize', resizeCanvas);

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createParticle(x, y, isTrail = false) {
        const colors = [
            '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24',
            '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe',
            '#fd79a8', '#fdcb6e', '#e17055', '#00b894'
        ];

        const color = colors[Math.floor(Math.random() * colors.length)];

        return {
            x: x,
            y: y,
            radius: isTrail ? random(1, 2) : random(2, 5),
            alpha: 1,
            speedX: isTrail ? random(-2, 2) : random(-8, 8),
            speedY: isTrail ? random(-2, 2) : random(-8, 8),
            color: color,
            gravity: isTrail ? 0.1 : 0.2,
            friction: 0.98,
            isTrail: isTrail
        };
    }

    function createRocket() {
        const startX = random(50, canvas.width - 50);
        const startY = canvas.height;
        const targetY = random(50, canvas.height * 0.4);

        return {
            x: startX,
            y: startY,
            targetY: targetY,
            speed: random(8, 12),
            exploded: false,
            trail: []
        };
    }

    function explode(x, y) {
        // Create main explosion particles
        const particleCount = random(30, 60);
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle(x, y));
        }

        // Create trailing sparkles
        for (let i = 0; i < 20; i++) {
            particles.push(createParticle(x + random(-20, 20), y + random(-20, 20), true));
        }
    }

    function randomExplosion() {
        const x = random(100, canvas.width - 100);
        const y = random(50, canvas.height * 0.6);
        explode(x, y);
    }

    function drawBirthdayText() {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Animate text entrance
        if (textOpacity < 1) {
            textOpacity += 0.02;
        }
        if (textScale < 1) {
            textScale += 0.02;
        }

        textAnimation += 0.05;
        const bounce = Math.sin(textAnimation) * 5;

        ctx.save();
        ctx.globalAlpha = textOpacity;
        ctx.translate(centerX, centerY + bounce);
        ctx.scale(textScale, textScale);

        // Text shadow/glow effect
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Main text
        ctx.font = 'bold 48px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Gradient text
        const gradient = ctx.createLinearGradient(0, -30, 0, 30);
        gradient.addColorStop(0, '#FFD700');
        gradient.addColorStop(0.5, '#FFA500');
        gradient.addColorStop(1, '#FF6347');

        ctx.fillStyle = gradient;
        ctx.fillText('Happiest Birthday', 0, -20);

        // Name text
        ctx.font = 'bold 36px Arial, sans-serif';
        const nameGradient = ctx.createLinearGradient(0, -15, 0, 15);
        nameGradient.addColorStop(0, '#FF69B4');
        nameGradient.addColorStop(0.5, '#FF1493');
        nameGradient.addColorStop(1, '#00FF00');

        ctx.fillStyle = nameGradient;
        ctx.fillText(name , 0, 30);

        // Text outline
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.font = 'bold 48px Arial, sans-serif';
        ctx.strokeText('Happiest Birthday', 0, -20);
        ctx.font = 'bold 36px Arial, sans-serif';
        ctx.strokeText(name, 0, 30);

        ctx.restore();
    }

    const rockets = [];

    function animate() {
        // Clear canvas with slight trail effect
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw rockets
        for (let i = rockets.length - 1; i >= 0; i--) {
            const rocket = rockets[i];

            if (!rocket.exploded) {
                rocket.y -= rocket.speed;

                // Add trail particle
                rocket.trail.push({
                    x: rocket.x + random(-2, 2),
                    y: rocket.y + random(-2, 2),
                    alpha: 0.8,
                    color: '#ffa500'
                });

                // Limit trail length
                if (rocket.trail.length > 10) {
                    rocket.trail.shift();
                }

                // Check if rocket reached target height
                if (rocket.y <= rocket.targetY) {
                    rocket.exploded = true;
                    explode(rocket.x, rocket.y);
                }
            }

            // Draw rocket trail
            rocket.trail.forEach((t, index) => {
                ctx.beginPath();
                ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = t.color;
                ctx.globalAlpha = t.alpha * (index / rocket.trail.length);
                ctx.fill();
                t.alpha -= 0.05;
            });

            // Remove exploded rockets with faded trails
            if (rocket.exploded && rocket.trail.every(t => t.alpha <= 0)) {
                rockets.splice(i, 1);
            }
        }

        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];

            // Apply physics
            p.speedY += p.gravity;
            p.speedX *= p.friction;
            p.speedY *= p.friction;

            p.x += p.speedX;
            p.y += p.speedY;
            p.alpha -= p.isTrail ? 0.02 : 0.015;

            // Draw particle with glow effect
            ctx.save();
            ctx.globalAlpha = p.alpha;

            // Outer glow
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius + 2, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha * 0.3;
            ctx.fill();

            // Inner particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();

            ctx.restore();

            // Remove faded particles
            if (p.alpha <= 0.01) {
                particles.splice(i, 1);
            }
        }

        // Draw birthday text on top
        drawBirthdayText();

        ctx.globalAlpha = 1;
        animationId = requestAnimationFrame(animate);
    }

    // Launch rockets periodically
    function launchRocket() {
        rockets.push(createRocket());
    }

    // Create some random explosions for immediate effect
    setTimeout(() => randomExplosion(), 100);
    setTimeout(() => randomExplosion(), 300);
    setTimeout(() => randomExplosion(), 500);

    // Start periodic rocket launches
    const rocketInterval = setInterval(() => {
        if (Math.random() > 0.3) { // 70% chance to launch
            launchRocket();
        }
    }, 1200);

    // Occasional random explosions
    const explosionInterval = setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance for random explosion
            randomExplosion();
        }
    }, 2000);

    // Start animation
    animate();

    // Return cleanup function
    return function cleanup() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        clearInterval(rocketInterval);
        clearInterval(explosionInterval);
        window.removeEventListener('resize', resizeCanvas);
    };
};