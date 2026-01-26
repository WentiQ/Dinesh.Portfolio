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