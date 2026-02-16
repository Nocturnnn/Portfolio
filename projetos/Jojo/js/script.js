AOS.init({
  duration: 1000,
  once: false,
});

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const overlay = document.querySelector(".time-stop-overlay");

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = dot.dataset.slide;
    console.log('...')

    if (slides[index].classList.contains("active")) return;

    // ⚡ Ativa efeito Time Stop
    overlay.classList.add("active");
    document.body.classList.add("freeze");

    setTimeout(() => {
      slides.forEach((s) => s.classList.remove("active"));
      dots.forEach((d) => d.classList.remove("active"));

      slides[index].classList.add("active");
      dot.classList.add("active");

      const theme = slides[index].dataset.theme;
      document.documentElement.style.setProperty("--theme-color", theme);

      AOS.refreshHard();
    }, 350);

    setTimeout(() => {
      overlay.classList.remove("active");
      document.body.classList.remove("freeze");
    }, 800);
  });
});

/* ⭐ Criar estrelas aleatórias */
const starsContainer = document.querySelector(".stars");

function createStars(amount = 40) {
  for (let i = 0; i < amount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    const size = Math.random() * 6 + 2;
    star.style.width = size + "px";
    star.style.height = size + "px";

    star.style.top = Math.random() * 100 + "%";
    star.style.left = Math.random() * 100 + "%";

    star.style.animationDuration = 1.5 + Math.random() * 2 + "s";

    starsContainer.appendChild(star);
  }
}

createStars(50);
