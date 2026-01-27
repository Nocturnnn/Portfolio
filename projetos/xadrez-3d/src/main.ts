import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";

// =======================
// Cena
// =======================
const scene: THREE.Scene = new THREE.Scene();

// =======================
// Câmera
// =======================
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);

camera.position.set(0, 1.8, 7);
camera.lookAt(0, 1, 0);

// =======================
// Renderer
// =======================
const canvas = document.getElementById("webgl") as HTMLCanvasElement;

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;

// =======================
// Luzes
// =======================
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
// Tabuleiro 3D
// =======================
const loader: GLTFLoader = new GLTFLoader();

loader.load("../public/3d/chess_set.glb", (gltf) => {
  const board: THREE.Group = gltf.scene;
  scene.add(board);

  board.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;

      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];

      materials.forEach((mat) => {
        if (mat instanceof THREE.MeshStandardMaterial) {
          mat.metalness = 0.4;
          mat.roughness = 0.35;
        }
      });
    }
  });
});

// =======================
// Loop de render
// =======================
let t: number = 0;

function animate(): void {
  t += 0.0015;

  camera.position.x = Math.sin(t) * 1.2;
  camera.position.z = 7 + Math.cos(t) * 0.6;
  camera.lookAt(0, 1, 0);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

// =======================
// GSAP Animations
// =======================
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
