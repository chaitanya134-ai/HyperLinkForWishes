//let fireworksCleanup;
//let fireworksActive = true;

//document.addEventListener('DOMContentLoaded', function () {
//    const name = '';
//    const canvas = document.getElementById('fireworks');
//    canvas.width = window.innerWidth;
//    canvas.height = window.innerHeight;

//    fireworksCleanup = startFireworks(name);

//    window.addEventListener('resize', function () {
//        canvas.width = window.innerWidth;
//        canvas.height = window.innerHeight;
//    });
//});

//window.triggerBigExplosion = function () {
//    const canvas = document.getElementById("fireworks");
//    if (!canvas || !window.createMegaExplosion) return;

//    for (let i = 0; i < 8; i++) {
//        setTimeout(() => {
//            const x = Math.random() * (canvas.width - 200) + 100;
//            const y = Math.random() * (canvas.height * 0.7) + 50;
//            window.createMegaExplosion(x, y);
//        }, i * 150);
//    }
//};

//window.toggleFireworks = function () {
//    const toggleBtn = document.getElementById('toggleBtn');

//    if (fireworksActive) {
//        if (fireworksCleanup) {
//            fireworksCleanup();
//            fireworksCleanup = null;
//        }
//        fireworksActive = false;
//        toggleBtn.textContent = '▶️ Start Fireworks';
//        toggleBtn.style.background = 'rgba(0, 255, 0, 0.3)';
//    } else {
//        const name = '';
//        fireworksCleanup = window.startFireworks(name);
//        fireworksActive = true;
//        toggleBtn.textContent = '⏸️ Pause Fireworks';
//        toggleBtn.style.background = 'rgba(255, 255, 255, 0.2)';
//    }
//};

//window.changeColors = function () {
//    if (window.changeFireworksColors) {
//        window.changeFireworksColors();
//    }
//};

//window.addEventListener('beforeunload', function () {
//    if (fireworksCleanup) {
//        fireworksCleanup();
//    }
//});