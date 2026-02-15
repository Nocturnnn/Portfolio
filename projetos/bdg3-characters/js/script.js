const cards = document.querySelectorAll(".card");
const counter = document.getElementById("counter");

window.addEventListener("load", () => {
  const intro = document.getElementById("intro");
  const audio = document.getElementById("intro-audio");

  let started = false;
  audio.volume = 0.3;

  const startExperience = () => {
    if (started) return;
    started = true;

    // Libera animação da logo
    intro.classList.add("play");

    // Inicia música
    audio.loop = true;
    audio.play();

    // Remove hint
    intro.removeEventListener("click", startExperience);

    // Some com a intro após a animação
    setTimeout(() => {
      intro.classList.add("hidden");
    }, 6500);
  };

  intro.addEventListener("click", startExperience);
});

const audio = document.getElementById("intro-audio");
const muteBtn = document.getElementById("mute-btn");
const icon = muteBtn.querySelector("i");

let isMuted = false;

muteBtn.addEventListener("click", () => {
  isMuted = !isMuted;
  audio.muted = isMuted;

  icon.classList.toggle("fa-volume-high", !isMuted);
  icon.classList.toggle("fa-volume-xmark", isMuted);

  muteBtn.classList.toggle("muted", isMuted);
});
