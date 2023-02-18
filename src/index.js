import * as THREE from 'three';

// Create a Three.js scene
const scene = new THREE.Scene();

// Create a camera and position it above the center of the race track
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 50, 50);
camera.lookAt(0, 0, 0);

// Create a renderer and set its size to the window dimensions
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a circular race track
const radius = 20; // set the radius of the track
const segments = 64; // set the number of segments in the circle
const geometry = new THREE.CircleGeometry(radius, segments);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const circle = new THREE.Mesh(geometry, material);
scene.add(circle);

// Add some lights to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 100, 0);
scene.add(pointLight);

// Render the scene
function animate () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
