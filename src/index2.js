import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const aspect = window.innerWidth / window.innerHeight;
let insetWidth, insetHeight;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // set background to sky blue color

let camera = new THREE.PerspectiveCamera(70, aspect, 0.01, 500);
camera.position.z = 55;
camera.lookAt(0, 0, 0);
camera.name = 'PlayerCam';

var camera_top = new THREE.PerspectiveCamera(90, aspect, 0.1, 500);
camera_top.position.z = 35;
camera_top.lookAt(0, 0, 0);
camera_top.name = 'OverheadCam';

// camera.add(camera_top);
// scene.add(camera);
// scene.add(camera_top);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// var renderer_top = new THREE.WebGLRenderer();
// renderer_top.setSize(200,200);
// renderer_top.setViewport(0, window.innerHeight - 200, 200, 200);
// document.body.appendChild(renderer_top.domElement);

const light = new THREE.AmbientLight(); // soft white light
scene.add(light);

// ====================== STADIUM =========================================
const uvs = [
  1, 0,
  0, 0,
  0, 1,
  1, 1,
];

var textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load('images/crowd.jpg');
var material = new THREE.MeshBasicMaterial({ map: texture });
var rectangle;
var geometry;

const len = 30;
const h_f = 0.4;
const l_f = 1.75;

var positions = [
  [
    len, len, 0,
    len, -len, 0,
    len * l_f, -len * l_f, len * h_f,
    len * l_f, len * l_f, len * h_f,
  ],
  [
    -len, len, 0,
    len, len, 0,
    len * l_f, len * l_f, len * h_f,
    -len * l_f, len * l_f, len * h_f,
  ],
  [
    -len, -len, 0,
    -len, len, 0,
    -len * l_f, len * l_f, len * h_f,
    -len * l_f, -len * l_f, len * h_f,
  ],
  [
    len, -len, 0,
    -len, -len, 0,
    -len * l_f, -len * l_f, len * h_f,
    len * l_f, -len * l_f, len * h_f,
  ],
];

for (let i = 0; i < 4; i++) {
  geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions[i]), 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
  geometry.setIndex([0, 1, 2, 0, 2, 3]);

  rectangle = new THREE.Mesh(geometry, material);
  scene.add(rectangle);
}
// ====================== STADIUM /=========================================
// ====================== FIELD =========================================

// create a new plane geometry with width 10 and height 5
geometry = new THREE.PlaneGeometry(2 * len, 2 * len);
material = new THREE.MeshBasicMaterial({ color: 0x11ff11 });
rectangle = new THREE.Mesh(geometry, material);
scene.add(rectangle);

// TRACK
const track_width = 10;
const boundary = 2;

geometry = new THREE.CircleGeometry(len - boundary, 50);
material = new THREE.MeshBasicMaterial({ color: 0x000000 });
var circle = new THREE.Mesh(geometry, material);
scene.add(circle);

geometry = new THREE.CircleGeometry(len - boundary - track_width, 50);
material = new THREE.MeshBasicMaterial({ color: 0x11ff11 });
circle = new THREE.Mesh(geometry, material);
scene.add(circle);

// ====================== FIELD /=========================================


var loader = new GLTFLoader();
loader.load('models/mcqueen/scene.gltf',
  (gltf) => {

    gltf.scene.position.set(0, 0, 0);
    console.log("scene", scene);
    // console.log("mesh", mesh);

    // Position the camera to view the model
    var box = new THREE.Box3().setFromObject(gltf.scene);
    gltf.scene.scale.set((2 / Math.abs(box.max.x - box.min.x)), (1 / Math.abs(box.max.y - box.min.y)), (4 / Math.abs(box.max.z - box.min.z)));
    box = new THREE.Box3().setFromObject(gltf.scene);
    // log all the scale factors
    console.log("scale factors: ", (2 / Math.abs(box.max.x - box.min.x)), (1 / Math.abs(box.max.y - box.min.y)), (4 / Math.abs(box.max.z - box.min.z)));

    var center = box.getCenter(new THREE.Vector3());
    gltf.scene.position.set(-center.x, -center.y, -center.z);
    // camera.position.set(center.x, center.y, box.max.z + 1);
    console.log("center", center);
    console.log("box", box);
    // log the dimensions of the bounding box of the model
    console.log("dimensions: ", box.max.x - box.min.x, box.max.y - box.min.y, box.max.z - box.min.z);


    // camera.lookAt(center);

    scene.add(gltf.scene);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  (error) => {
    console.error('Error loading GLTF model', error);
  });

// Listen for keydown events
document.addEventListener('keydown', function (event) {
  switch (event.key) {
    case 'ArrowLeft':
      camera.position.x -= 0.6;
      break;
    case 'ArrowRight':
      camera.position.x += 0.6;
      break;
    case 'ArrowUp':
      camera.position.y += 0.6;
      break;
    case 'ArrowDown':
      camera.position.y -= 0.6;
      break;
    case 'a':
      camera.position.z += 0.6;
      break;
    case 'z':
      camera.position.z -= 0.6;
      break;
  }
});


resize();

animate();

function resize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  insetWidth = 300;
  insetHeight = 300;

  camera_top.aspect = 1;
  camera_top.updateProjectionMatrix();
}
window.addEventListener('resize', resize);

function animate () {
  requestAnimationFrame(animate);

  renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);

  renderer.clearDepth();
  renderer.setScissorTest(true);
  renderer.setScissor(
    window.innerWidth - insetWidth - 16,
    window.innerHeight - insetHeight - 16,
    insetWidth,
    insetHeight
  );
  renderer.setViewport(
    window.innerWidth - insetWidth - 16,
    window.innerHeight - insetHeight - 16,
    insetWidth,
    insetHeight
  );

  renderer.render(scene, camera_top);
  renderer.setScissorTest(false);
  // console.log("camera z", camera.position.z);
}

