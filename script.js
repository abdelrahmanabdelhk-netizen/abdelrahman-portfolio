document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Terminal Typing Effect
    const roles = ["web_penetration_tester", "network_pentester", "embedded_systems_eng", "security_researcher"];
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector('.typing-text');
    
    function typeEffect() {
        const currentRole = roles[currentRoleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            typingElement.textContent = currentRole.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }
        
        let typeSpeed = isDeleting ? 40 : 100;
        
        if (!isDeleting && currentCharIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before new word
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start typing after initial delay
    if (typingElement) {
        setTimeout(typeEffect, 1000);
    }

    // 2. Intersection Observer for Reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Vanilla JS 3D Tilt Effect
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', handleTilt);
        el.addEventListener('mouseleave', resetTilt);
    });

    function handleTilt(e) {
        const el = this;
        // Get dimensions
        const rect = el.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        
        // Mouse position relative to element
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Calculate rotation (-10 to 10 degrees max)
        const rotateX = ((mouseY / height) - 0.5) * -10;
        const rotateY = ((mouseX / width) - 0.5) * 10;
        
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        el.style.transition = 'transform 0.1s ease';
    }

    function resetTilt() {
        this.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        this.style.transition = 'transform 0.5s ease-out';
    }

    // 4. Smooth Scrolling for Navbar
    document.querySelectorAll('.nav-links a, .mobile-nav-overlay a, .nav-logo, .hero-actions a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80, // offset for navbar
                        behavior: 'smooth'
                    });
                    // Close mobile menu if open
                    document.querySelector('.mobile-nav-overlay').style.display = 'none';
                }
            }
        });
    });

    // 5. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    
    if (mobileBtn && mobileOverlay) {
        mobileBtn.addEventListener('click', () => {
            const currentDisplay = window.getComputedStyle(mobileOverlay).display;
            if (currentDisplay === 'none') {
                mobileOverlay.style.display = 'flex';
                mobileOverlay.style.position = 'fixed';
                mobileOverlay.style.inset = '0';
                mobileOverlay.style.background = 'rgba(7, 9, 8, 0.95)';
                mobileOverlay.style.zIndex = '40';
                mobileOverlay.style.flexDirection = 'column';
                mobileOverlay.style.alignItems = 'center';
                mobileOverlay.style.justifyContent = 'center';
                
                // Style the ul and li inside
                const ul = mobileOverlay.querySelector('ul');
                ul.style.listStyle = 'none';
                ul.style.textAlign = 'center';
                ul.style.display = 'flex';
                ul.style.flexDirection = 'column';
                ul.style.gap = '2rem';
                
                const links = mobileOverlay.querySelectorAll('a');
                links.forEach(l => {
                    l.style.color = '#fff';
                    l.style.textDecoration = 'none';
                    l.style.fontSize = '2rem';
                    l.style.fontFamily = "'Outfit', sans-serif";
                    l.style.fontWeight = '600';
                });
            } else {
                mobileOverlay.style.display = 'none';
            }
        });
    }
});

// 6. Lightbox Global Functions
function openLightbox(imgSrc, captionText) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    if(lightbox && lightboxImg) {
        lightboxImg.src = imgSrc;
        if(lightboxCaption && captionText) {
            lightboxCaption.textContent = captionText;
            lightboxCaption.style.display = 'block';
        } else if(lightboxCaption) {
            lightboxCaption.style.display = 'none';
        }
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if(lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 7. Cyber Canvas Background (Particles Network)
const canvas = document.getElementById('cyber-bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    function init() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        
        particles = [];
        // Adjust particle density based on screen size
        const numParticles = Math.min(Math.floor(width * height / 12000), 120);
        
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                radius: Math.random() * 1.5 + 0.5
            });
        }
    }
    
    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw particles and connections
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            
            p.x += p.vx;
            p.y += p.vy;
            
            // Bounce off edges
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(62, 207, 142, 0.4)'; // Emerald
            ctx.fill();
            
            // Connect particles
            for (let j = i + 1; j < particles.length; j++) {
                let p2 = particles[j];
                let dx = p.x - p2.x;
                let dy = p.y - p2.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    // Fade line opacity based on distance
                    ctx.strokeStyle = `rgba(0, 242, 254, ${0.2 * (1 - dist/120)})`; // Cyan
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(draw);
    }
    
    window.addEventListener('resize', init);
    init();
    draw();
}
