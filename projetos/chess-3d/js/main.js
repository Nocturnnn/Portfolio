import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Cena
const scene = new THREE.Scene();

// Câmera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);
camera.position.set(0, 1.8, 7);
camera.lookAt(0, 1, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("webgl"),
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;

// Luz
const backLight = new THREE.DirectionalLight(0xffffff, 0.8);
backLight.position.set(-5, 5, -5);
scene.add(backLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
keyLight.position.set(4, 6, 4);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
fillLight.position.set(-4, 2, 4);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xffffff, 0.9);
rimLight.position.set(-6, 6, -6);
scene.add(rimLight);

// =======================
// TABULEIRO 3D (GLB)
// =======================
const loader = new GLTFLoader();

loader.load("./3d/chess_set.glb", (gltf) => {
  const board = gltf.scene;
  scene.add(board);

  board.traverse((child) => {
    if (child.isMesh) {
      const mats = Array.isArray(child.material)
        ? child.material
        : [child.material];

      mats.forEach((mat) => {
        if (mat.isMeshStandardMaterial) {
          mat.metalness = 0.4;
          mat.roughness = 0.35;
        }
      });
    }
  });
});

// Render loop
let t = 0;

function animate() {
  t += 0.0015;

  camera.position.x = Math.sin(t) * 1.2;
  camera.position.z = 7 + Math.cos(t) * 0.6;
  camera.lookAt(0, 1, 0);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

gsap.from(".intro-text h1", {
  opacity: 0,
  y: 30,
  duration: 1.8,
  ease: "power3.out",
});

gsap.from(".intro-text p", {
  opacity: 0,
  y: 20,
  delay: 0.6,
  duration: 1.4,
  ease: "power3.out",
});

gsap.from(".intro-text--right", {
  opacity: 0,
  x: 40,
  delay: 1.2,
  duration: 1.6,
  ease: "power3.out",
});
