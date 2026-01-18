(function () {
  TextoDeslizante();
  MockupIMG();

  function atualizarLinkMockup() {
    const slider = document.querySelector(".mockup-slider");
    const overlayLink = document.querySelector(".mockup-overlay");

    if (!slider || !overlayLink) return;

    const imagemAtiva = slider.querySelector("img.active");
    if (!imagemAtiva) return;

    const novoLink = imagemAtiva.dataset.link;
    if (novoLink) {
      overlayLink.href = novoLink;
    }
  }

  function TextoDeslizante() {
    const reveals = document.querySelectorAll(".reveal, .reveal-left");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.15,
      },
    );

    reveals.forEach((el) => observer.observe(el));
  }

  function MockupIMG() {
    const slides = document.querySelectorAll(".mockup-slider img");
    let current = 0;

    atualizarLinkMockup();

    setInterval(() => {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
      atualizarLinkMockup();
    }, 4000);
  }
})();
