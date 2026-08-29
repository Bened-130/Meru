// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
}

function closeMenu() {
    isMenuOpen = false;
    menuBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// Add click event to menu button
if (menuBtn) {
    menuBtn.addEventListener('click', toggleMenu);
}

// Close menu when clicking on a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close menu when clicking outside
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        closeMenu();
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
    }
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            if (navbar) {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Music Player
let isPlaying = false;
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');

function toggleMusic() {
    if (!bgMusic) return;
    
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.textContent = '🎵';
        musicBtn.classList.remove('playing');
    } else {
        bgMusic.play().catch(e => console.log('Audio play failed:', e));
        musicBtn.textContent = '🎶';
        musicBtn.classList.add('playing');
    }
    isPlaying = !isPlaying;
}

if (musicBtn) {
    musicBtn.addEventListener('click', toggleMusic);
}

// Confetti Effect
const canvas = document.getElementById('confetti-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiParticles = [];
    const colors = ['#d4af37', '#e5c158', '#f5f5f0', '#1a1a1a', '#ffffff'];

    class Particle {
        constructor(x, y) {
            this.x = x || Math.random() * canvas.width;
            this.y = y || -10;
            this.size = Math.random() * 8 + 4;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    function createConfetti() {
        for (let i = 0; i < 3; i++) {
            confettiParticles.push(new Particle());
        }
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = confettiParticles.length - 1; i >= 0; i--) {
            const p = confettiParticles[i];
            p.update();
            p.draw();
            
            if (p.y > canvas.height) {
                confettiParticles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animateConfetti);
    }

    // Start ambient confetti
    setInterval(createConfetti, 300);
    animateConfetti();

    // Burst confetti on click
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
        
        for (let i = 0; i < 15; i++) {
            const p = new Particle(e.clientX, e.clientY);
            p.speedY = Math.random() * 4 - 2;
            p.speedX = Math.random() * 4 - 2;
            confettiParticles.push(p);
        }
    });

    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Preload images
window.addEventListener('load', () => {
    const images = [
        'assets/images/background.jpg',
        'assets/images/memory1.jpg',
        'assets/images/memory2.jpg',
        'assets/images/memory3.jpg',
        'assets/images/memory4.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});