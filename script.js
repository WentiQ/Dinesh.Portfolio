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