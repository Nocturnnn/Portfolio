AOS.init({
  duration: 1000,
  once: false,
});

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const overlay = document.querySelector(".time-stop-overlay");
const historyLink = document.getElementById("history-link");

/* =========================
   🔁 RESTAURAR ÚLTIMA PÁGINA
========================= */

// Se existir página salva e não for a atual
const savedPage = localStorage.getItem("lastPage");

if (
  savedPage &&
  savedPage !== window.location.href &&
  window.location.pathname.endsWith("index.html")
) {
  window.location.href = savedPage;
}

/* =========================
   🎞️ RESTAURAR SLIDE ATIVO
========================= */

const savedSlideIndex = localStorage.getItem("activeSlide");

if (savedSlideIndex !== null && slides[savedSlideIndex]) {
  slides.forEach((s) => s.classList.remove("active"));
  dots.forEach((d) => d.classList.remove("active"));

  slides[savedSlideIndex].classList.add("active");
  dots[savedSlideIndex].classList.add("active");

  const theme = slides[savedSlideIndex].dataset.theme;
  document.documentElement.style.setProperty("--theme-color", theme);
}

/* =========================
   🎯 TROCA DE SLIDES
========================= */

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = dot.dataset.slide;

    if (slides[index].classList.contains("active")) return;

    overlay.classList.add("active");
    document.body.classList.add("freeze");

    setTimeout(() => {
      slides.forEach((s) => s.classList.remove("active"));
      dots.forEach((d) => d.classList.remove("active"));

      slides[index].classList.add("active");
      dot.classList.add("active");

      const theme = slides[index].dataset.theme;
      document.documentElement.style.setProperty("--theme-color", theme);

      // 💾 Salva slide atual
      localStorage.setItem("activeSlide", index);

      AOS.refreshHard();
    }, 350);

    setTimeout(() => {
      overlay.classList.remove("active");
      document.body.classList.remove("freeze");
    }, 800);
  });
});

/* =========================
   📜 LINK HISTORY DINÂMICO
========================= */

if (historyLink) {
  historyLink.addEventListener("click", (e) => {
    e.preventDefault();

    const activeSlide = document.querySelector(".slide.active");
    const character = activeSlide.dataset.character;
    const index = activeSlide.dataset.slide;

    const url = `History/history.html?character=${character}`;

    // 💾 Salva página e slide
    localStorage.setItem("lastPage", url);
    localStorage.setItem("activeSlide", index);

    window.location.href = url;
  });
}

/* =========================
   ⭐ CAMPO DE ESTRELAS
========================= */

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

const pagination = document.getElementById("pagination");
const toggle = document.querySelector(".menu-toggle");

toggle.addEventListener("click", () => {
  pagination.classList.toggle("open");

  if (pagination.classList.contains("open")) {
    document.querySelector(".menu-items").style.display = "flex";
  } else {
    document.querySelector(".menu-items").style.display = "none";
  }
});
