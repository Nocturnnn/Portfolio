AOS.init({
  duration: 1000,
  once: false
});

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

dots.forEach(dot => {
  dot.addEventListener("click", () => {
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    const index = dot.dataset.slide;

    slides[index].classList.add("active");
    dot.classList.add("active");

    const theme = slides[index].dataset.theme;
    document.documentElement.style.setProperty("--theme-color", theme);

    // 🔥 Reinicia animações AOS ao trocar slide
    setTimeout(() => {
      AOS.refreshHard();
    }, 300);
  });
});
