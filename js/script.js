document.addEventListener("DOMContentLoaded", () => {
  sliderMockup();
  glowCards();
  revealOnScroll();
});

/* =========================
   SLIDER DO MOCKUP
========================= */
function sliderMockup() {
  const slider = document.querySelector(".mockup-slider");
  const slides = slider?.querySelectorAll("img");
  const overlay = document.querySelector(".mockup-overlay");

  if (!slides || slides.length === 0 || !overlay) return;

  let current = 0;

  slides.forEach((img, i) => img.classList.toggle("active", i === 0));
  atualizarLink();

  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
    atualizarLink();
  }, 4500);

  function atualizarLink() {
    const link = slides[current].dataset.link;
    if (link) overlay.href = link;
  }
}

/* =========================
   GLOW DINÂMICO DOS CARDS
========================= */
function glowCards() {
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--x", `${e.clientX - r.left}px`);
      card.style.setProperty("--y", `${e.clientY - r.top}px`);
    });
  });
}

/* =========================
   motion design de interface
========================= */
function revealOnScroll() {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target); // anima só uma vez
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  elements.forEach((el) => observer.observe(el));
}
