import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// GSAP global
gsap.registerPlugin(ScrollTrigger);

// =======================
// CENA
// =======================
const scene = new THREE.Scene();

// =======================
// CÂMERA
// =======================
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);
camera.position.set(0, 1.8, 7);

// =======================
// RENDERER
// =======================
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("webgl"),
  antialias: true,
  alpha: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
renderer.physicallyCorrectLights = true;

// =======================
// LUZ
// =======================
const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
keyLight.position.set(6, 8, 4);

const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
fillLight.position.set(-4, 3, -6);

scene.add(keyLight, fillLight);

// =======================
// MODELO
// =======================
let pawnMesh = null;
let pawnBlack = null;
let pawnWhite = null;

new GLTFLoader().load("./3d/chess_set.glb", (gltf) => {
  scene.add(gltf.scene);

  gltf.scene.traverse((child) => {
    console.log(child.type, "→", child.name);
  });
});

new GLTFLoader().load("./3d/chess_set.glb", (gltf) => {
  scene.add(gltf.scene);

  gltf.scene.traverse((child) => {
    if (child.isMesh && child.name.toLowerCase().includes("pawn")) {
      pawnMesh = child;
    }
  });

  gltf.scene.traverse((child) => {
    if (!child.isMesh) return;

    if (child.name === "Pawn_1_Pawn_1_0") {
      pawnBlack = child;
    }

    if (child.name === "Pawn_2_Pawn_2_0") {
      pawnWhite = child;
    }
  });
});

// =======================
// ESTADO DE CÂMERA
// =======================
let t = 0;
let autoOrbit = true;
const lookTarget = new THREE.Vector3(0, 1, 0);

// =======================
// LOOP
// =======================
function animate() {
  if (autoOrbit) {
    t += 0.001;
    camera.position.x = Math.sin(t) * 1.1;
    camera.position.z = 7 + Math.cos(t) * 0.5;
    camera.lookAt(lookTarget);
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

// =======================
// TEXTO FIXO (FUNDO)
/// =======================
const chapterFixed = document.querySelector(".chapter-fixed");

gsap.to(chapterFixed, {
  scale: 1.02,
  duration: 6,
  yoyo: true,
  repeat: -1,
  ease: "sine.inOut",
});

function setChapter(text) {
  gsap.to(chapterFixed, {
    opacity: 0,
    duration: 0.4,
    onComplete: () => {
      chapterFixed.textContent = text;
      gsap.to(chapterFixed, {
        opacity: 1,
        duration: 0.6,
      });
    },
  });
}

// =======================
// SCROLL → TEXTO
// =======================
ScrollTrigger.create({
  trigger: '[data-focus="pawn"]',
  start: "top center",
  onEnter: () => setChapter("PEÃO"),
  onLeaveBack: () => setChapter("XADREZ"),
});

// =======================
// SCROLL → CÂMERA (FOCO NO PEÃO)
// =======================
ScrollTrigger.create({
  trigger: '[data-focus="pawn"]',
  start: "top center",
  end: "bottom center",

  onEnter: () => {
    if (!pawnMesh) return;

    autoOrbit = false;

    pawnBlack.getWorldPosition(lookTarget);

    gsap.to(camera.position, {
      x: -lookTarget.x - 1.1,
      y: lookTarget.y + 2.7,
      z: lookTarget.z + 2.0,
      duration: 1.4,
      ease: "power3.out",
      onUpdate: () => {
        camera.lookAt(lookTarget);
      },
    });
  },

  onLeaveBack: () => {
    autoOrbit = true;

    gsap.to(camera.position, {
      x: 0,
      y: 1.8,
      z: 7,
      duration: 1.2,
      ease: "power3.out",
      onUpdate: () => {
        camera.lookAt(0, 1, 0);
      },
    });
  },
});

// =======================
// RESIZE
// =======================
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
