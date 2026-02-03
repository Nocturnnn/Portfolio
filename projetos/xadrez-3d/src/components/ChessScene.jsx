import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ChessScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
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
      canvas: canvasRef.current,
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

    const accentLight = new THREE.DirectionalLight(0xffffff, 0.35);
    accentLight.position.set(-6, 3, 4);

    scene.add(keyLight, fillLight, accentLight);

    // =======================
    // PEÇAS (PRETAS)
    // =======================
    const pieces = {
      pawn: null,
      queen: null,
      rook: null,
      bishop: null,
      knight: null,
      king: null,
    };

    // =======================
    // MODELO
    // =======================
    const loader = new GLTFLoader();

    loader.load("/assets/chess_set.glb", (gltf) => {
      scene.add(gltf.scene);

      gltf.scene.traverse((child) => {
        if (!child.isMesh) return;

        switch (child.name) {
          case "Pawn_1_Pawn_1_0":
            pieces.pawn = child;
            enhanceBlackPiece(child);
            break;

          case "Queen_1_Queen_1_0":
            pieces.queen = child;
            enhanceBlackPiece(child);
            break;

          case "Rook_1_Rook_1_0":
            pieces.rook = child;
            enhanceBlackPiece(child);
            break;

          case "Bishop_1_Bishop_1_0":
            pieces.bishop = child;
            enhanceBlackPiece(child);
            break;

          case "Knight_1_Knight_1_0":
            pieces.knight = child;
            enhanceBlackPiece(child);
            break;

          case "King_1_King_1_0":
            pieces.king = child;
            enhanceBlackPiece(child);
            break;
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
    let rafId;

    function animate() {
      if (autoOrbit) {
        t += 0.001;
        camera.position.x = Math.sin(t) * 1.1;
        camera.position.z = 7 + Math.cos(t) * 0.5;
        camera.lookAt(lookTarget);
      }

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    }

    animate();

    // =======================
    // TEXTO FIXO (CAPÍTULO)
    // =======================
    const chapterFixed = document.querySelector(".chapter-fixed");

    gsap.to(chapterFixed, {
      scale: 1.02,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    function setChapter(text) {
      gsap.to(chapterFixed, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          chapterFixed.textContent = text;
          gsap.to(chapterFixed, { opacity: 1, duration: 0.6 });
        },
      });
    }

    // =======================
    // FOCO DE CÂMERA
    // =======================
    function focusOnPiece(key, label) {
      const piece = pieces[key];
      if (!piece) return;

      autoOrbit = false;

      piece.getWorldPosition(lookTarget);
      lookTarget.x -= 2;

      setChapter(label);

      gsap.to(camera.position, {
        x: lookTarget.x - 3.4,
        y: lookTarget.y + 3.6,
        z: lookTarget.z + 5.2,
        duration: 1.4,
        ease: "power3.out",
        onUpdate: () => camera.lookAt(lookTarget),
      });
    }

    // =======================
    // SCROLL → CAPÍTULOS
    // =======================
    const labels = {
      pawn: "PEÃO",
      queen: "DAMA",
      rook: "TORRE",
      bishop: "BISPO",
      knight: "CAVALO",
      king: "REI",
    };

    document.querySelectorAll("[data-focus]").forEach((section) => {
      const key = section.dataset.focus;

      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",

        onEnter: () => focusOnPiece(key, labels[key]),

        onLeaveBack: () => {
          autoOrbit = true;
          setChapter("XADREZ");

          gsap.to(camera.position, {
            x: 0,
            y: 1.8,
            z: 7,
            duration: 1.2,
            ease: "power3.out",
            onUpdate: () => camera.lookAt(0, 1, 0),
          });
        },
      });
    });

    // =======================
    // RESIZE
    // =======================
    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", onResize);

    // =======================
    // CLEANUP
    // =======================
    return () => {
      cancelAnimationFrame(rafId);
      renderer.dispose();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} id="webgl" />;
}

// =======================
// AJUSTE DE MATERIAL (PEÇAS PRETAS)
// =======================
function enhanceBlackPiece(mesh) {
  const mat = mesh.material;

  if (!mat || !mat.isMeshStandardMaterial) return;

  mat.color.setRGB(0.18, 0.18, 0.18);
  mat.roughness = Math.min(mat.roughness + 0.15, 1);
  mat.metalness = Math.max(mat.metalness - 0.1, 0);
  mat.envMapIntensity = 1.2;
  mat.needsUpdate = true;
}
