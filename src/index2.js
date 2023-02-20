// import * as THREE from 'three';

// // Create a Three.js scene
// const scene = new THREE.Scene();

// scene.background = new THREE.Color(0x87ceeb); // set background to sky blue color

// // Create a camera and position it above the center of the race track
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(0, 50, 50);
// camera.lookAt(0, 0, 0);

// // Create a renderer and set its size to the window dimensions
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(0x87ceeb); // set clear color to sky blue
// document.body.appendChild(renderer.domElement);

// // Create a circular race track
// const radius = 20; // set the radius of the track
// const segments = 64; // set the number of segments in the circle
// const geometry = new THREE.CircleGeometry(radius, segments);
// const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
// const circle = new THREE.Mesh(geometry, material);
// scene.add(circle);

// // Add some lights to the scene
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 1);
// pointLight.position.set(0, 100, 0);
// scene.add(pointLight);  

// // Render the scene
// function animate () {
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
// }

// animate();



// === === === === === === === === === === === === === === === === === === === === === === === === === === === 
// === === === === === === === === === === === === === === === === === === === === === === === === === === === 
// === === === === === === === === === === === === === === === === === === === === === === === === === === === 
// === === === === === === === === === === === === === === === === === === === === === === === === === === === 
// import * as THREE from 'three';
// // import texture from '../images/background.jpg';

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Load the stadium texture
// const textureLoader = new THREE.TextureLoader();
// const stadiumTexture = textureLoader.load('images/background.jpg');

// // Create a material using the texture
// const material = new THREE.MeshBasicMaterial({ map: stadiumTexture });

// // Create the points that define the shape of the stadium
// const points = [
//   new THREE.Vector3(0, 0, 0),
//   new THREE.Vector3(10, 0, 0),
//   new THREE.Vector3(15, 10, 0),
//   new THREE.Vector3(15, 20, 0),
//   new THREE.Vector3(10, 30, 0),
//   new THREE.Vector3(0, 30, 0),
//   new THREE.Vector3(-5, 20, 0),
//   new THREE.Vector3(-5, 10, 0),
//   new THREE.Vector3(0, 0, 0)
// ];

// // Create a buffer geometry for the stadium
// const geometry = new THREE.BufferGeometry().setFromPoints(points);

// // Set the height of the stadium
// const height = 30;

// // Extrude the shape to create a 3D object
// const extrudeSettings = {
//   steps: 1,
//   depth: height,
//   bevelEnabled: false
// };
// const extrudeGeometry = new THREE.ExtrudeGeometry(geometry, extrudeSettings);
// const stadium = new THREE.Mesh(extrudeGeometry, material);

// // Position the stadium
// stadium.position.set(0, -height / 2, 0);

// // Add the stadium to the scene
// scene.add(stadium);

// // Add some lights to the scene
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 0.5);
// pointLight.position.set(0, 100, 0);
// scene.add(pointLight);

// // Render the scene
// function animate () {
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
// }

// animate();
