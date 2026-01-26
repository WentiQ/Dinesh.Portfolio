// --- STAR COLLISION LOADING ANIMATION ---
let collisionSceneActive = true;

function initStarCollision() {
    const canvas = document.getElementById('collision-canvas');
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    camera.position.z = 30;

    // Create two realistic glowing stars
    const createStar = (x, initialVx, initialVy) => {
        const geometry = new THREE.SphereGeometry(3, 64, 64);
        const material = new THREE.MeshStandardMaterial({
            color: 0xff3e3e,
            emissive: 0xff3e3e,
            emissiveIntensity: 1.5,
            metalness: 0.8,
            roughness: 0.2,
        });
        const star = new THREE.Mesh(geometry, material);
        star.position.set(x, 0, 0);
        star.velocity = new THREE.Vector3(initialVx, initialVy, 0);
        
        // Add a glowing halo
        const haloGeometry = new THREE.SphereGeometry(3.5, 32, 32);
        const haloMaterial = new THREE.MeshBasicMaterial({
            color: 0xff9f43,
            transparent: true,
            opacity: 0.4,
        });
        const halo = new THREE.Mesh(haloGeometry, haloMaterial);
        star.add(halo);
        
        return star;
    };

    const star1 = createStar(-18, 0.5, 0);
    const star2 = createStar(18, -0.5, 0);
    
    star1.mass = 1;
    star2.mass = 1;
    
    scene.add(star1, star2);

    // Lighting
    const pointLight = new THREE.PointLight(0xff3e3e, 2);
    pointLight.position.set(0, 0, 15);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Particles for explosion - enhanced
    let particles = [];
    const createExplosion = () => {
        const particleCount = 300; // More particles
        const colors = [0xff3e3e, 0xff9f43, 0xfeca57, 0xff6b6b, 0xffa500];
        
        for (let i = 0; i < particleCount; i++) {
            const geometry = new THREE.SphereGeometry(0.15, 8, 8);
            const color = colors[Math.floor(Math.random() * colors.length)];
            const material = new THREE.MeshBasicMaterial({
                color: color,
            });
            const particle = new THREE.Mesh(geometry, material);
            particle.position.set(0, 0, 0);
            
            // Random spherical distribution with varying speeds
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const speed = 5 + Math.random() * 20; // Wider speed range
            
            particle.velocity = new THREE.Vector3(
                speed * Math.sin(phi) * Math.cos(theta),
                speed * Math.sin(phi) * Math.sin(theta),
                speed * Math.cos(phi)
            );
            
            particle.life = 4;
            particle.maxLife = 4;
            particle.acceleration = new THREE.Vector3(0, 0, 0);
            
            scene.add(particle);
            particles.push(particle);
        }

        // Add glowing light burst from explosion center
        const burstLight = new THREE.PointLight(0xff9f43, 5);
        burstLight.position.set(0, 0, 0);
        burstLight.decay = 2;
        scene.add(burstLight);
        
        // Fade out burst light
        setTimeout(() => {
            scene.remove(burstLight);
        }, 1000);
    };

    let collisionTime = -1;
    let animationTime = 0;
    const G = 0.5; // Gravitational constant

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        animationTime += 0.016;

        // Gravitational physics and rotation before collision
        if (collisionTime < 0 && animationTime < 2.2) {
            // Calculate distance between stars
            const dx = star2.position.x - star1.position.x;
            const dy = star2.position.y - star1.position.y;
            const dz = star2.position.z - star1.position.z;
            const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);

            // Apply gravitational forces
            if (distance > 0.1) {
                const force = G / (distance * distance);
                
                // Force on star1
                const fx1 = (force * dx) / distance;
                const fy1 = (force * dy) / distance;
                const fz1 = (force * dz) / distance;
                
                // Force on star2 (opposite)
                const fx2 = -fx1;
                const fy2 = -fy1;
                const fz2 = -fz1;
                
                // Update velocities
                star1.velocity.x += fx1 * 0.016;
                star1.velocity.y += fy1 * 0.016;
                star1.velocity.z += fz1 * 0.016;
                
                star2.velocity.x += fx2 * 0.016;
                star2.velocity.y += fy2 * 0.016;
                star2.velocity.z += fz2 * 0.016;
            }

            // Update positions
            star1.position.add(star1.velocity);
            star2.position.add(star2.velocity);
            
            // Rotate stars
            star1.rotation.x += 0.008;
            star1.rotation.y += 0.012;
            star1.rotation.z += 0.006;
            
            star2.rotation.x += 0.008;
            star2.rotation.y += 0.012;
            star2.rotation.z += 0.006;

            // Check collision
            const collisionDist = Math.abs(star1.position.distanceTo(star2.position));
            if (collisionDist < 6) {
                collisionTime = animationTime;
                createExplosion();
                star1.visible = false;
                star2.visible = false;
            }
        }

        // Update particles after collision with realistic physics
        if (collisionTime > 0) {
            for (let i = particles.length - 1; i >= 0; i--) {
                const particle = particles[i];
                
                // Apply gravity fade and drag
                particle.velocity.multiplyScalar(0.97);
                particle.position.add(particle.velocity);
                
                // Fade out
                particle.life -= 0.016;
                particle.material.opacity = particle.life / particle.maxLife * 0.8;
                
                // Scale down as they fade
                const scale = particle.life / particle.maxLife;
                particle.scale.set(scale, scale, scale);

                if (particle.life <= 0) {
                    scene.remove(particle);
                    particles.splice(i, 1);
                }
            }
        }

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initStarCollision();
});

// --- Mobile Menu Toggle ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// --- Stacked Cards Scroll Effect ---
function handleStackedCards() {
    const stackedCards = document.querySelectorAll('.project-card.stacked');
    
    stackedCards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardTop = cardRect.top;
        const cardHeight = cardRect.height;
        
        // Check if the next card is starting to cover this card
        if (stackedCards[index + 1]) {
            const nextCardRect = stackedCards[index + 1].getBoundingClientRect();
            const nextCardTop = nextCardRect.top;
            
            // If next card is getting close, start compacting this card
            if (nextCardTop < cardTop + cardHeight - 100) {
                card.classList.add('covered');
            } else {
                card.classList.remove('covered');
            }
        }
    });
}

// Run on scroll
window.addEventListener('scroll', handleStackedCards);
// Run on load
window.addEventListener('load', handleStackedCards);

// --- Contact Form Submission ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Create mailto link with form data
        const subject = encodeURIComponent(`New Message from ${name}`);
        const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:dineshpolavarapu66@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Reset form
        contactForm.reset();
        
        // Show success message
        alert('Opening your email client... Please send the email to confirm.');
    });
}

// --- Scroll Animation Observer ---
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Element is entering viewport - add visible class
            entry.target.classList.add('visible');
        } else {
            // Element is leaving viewport - remove visible class
            entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
    animatedElements.forEach(el => observer.observe(el));
});

// --- Scene Setup ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'),
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// --- 3D Floating Geometry (Engineering Symbol) ---
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshStandardMaterial({ 
    color: 0xff3e3e, 
    wireframe: true 
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// --- Adding Particles (The "Idea" Field) ---
function addStars() {
    const starGeometry = new THREE.SphereGeometry(0.1, 24, 24);
    const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(starGeometry, starMaterial);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);
}
Array(300).fill().forEach(addStars);

// --- Lighting ---
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(pointLight, ambientLight);

// --- Smooth Scroll & Mouse Follow ---
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - window.innerWidth / 2) / 100;
    mouseY = (event.clientY - window.innerHeight / 2) / 100;
});

// --- Animation Loop ---
function animate() {
    requestAnimationFrame(animate);

    // Subtle rotation
    torusKnot.rotation.x += 0.002;
    torusKnot.rotation.y += 0.002;

    // React to mouse
    torusKnot.position.x += (mouseX - torusKnot.position.x) * 0.05;
    torusKnot.position.y += (-mouseY - torusKnot.position.y) * 0.05;

    renderer.render(scene, camera);
}

// --- Responsiveness ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

// --- Force resume download for `Download Resume` button ---
document.addEventListener('click', function(e) {
    const btn = e.target.closest && e.target.closest('.btn.tertiary');
    if (!btn) return;
    const href = btn.getAttribute('href');
    if (!href) return;
    e.preventDefault();

    // Fetch file as blob and trigger download to ensure it doesn't open inline
    fetch(href, { cache: 'no-store' })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.blob();
        })
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            // Use download attribute value if provided, fallback to filename from href
            const suggested = btn.getAttribute('download') || href.split('/').pop() || 'resume.pdf';
            a.download = suggested;
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        })
        .catch(() => {
            // Fallback: open the file (browser default)
            window.location.href = href;
        });
});

// --- Header collapse on scroll (hide links on scroll down, show on scroll up) ---
(function() {
    const nav = document.querySelector('nav');
    const navLinks = document.getElementById('nav-links');
    let lastScroll = window.pageYOffset || document.documentElement.scrollTop;
    let ticking = false;

    function onScroll() {
        const current = window.pageYOffset || document.documentElement.scrollTop;

        // ignore tiny scrolls
        if (Math.abs(current - lastScroll) < 8) {
            lastScroll = current;
            return;
        }

        // If mobile menu is open, do not auto-collapse
        const menuOpen = navLinks && navLinks.classList.contains('active');

        if (current > lastScroll && current > 120 && !menuOpen) {
            // scrolling down
            nav.classList.add('collapsed');
        } else {
            // scrolling up or near top
            nav.classList.remove('collapsed');
        }

        // keep lastScroll within bounds
        lastScroll = current <= 0 ? 0 : current;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                onScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Ensure correct state on load
    window.addEventListener('load', onScroll);
    window.addEventListener('resize', onScroll);
})();