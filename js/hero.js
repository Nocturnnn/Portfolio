document.addEventListener("DOMContentLoaded", floatingHero);

/* Native scrolling drives the scene; pointer and scroll ease independently. */
function floatingHero() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const stage = hero.querySelector(".hero-stage");
  const intro = hero.querySelector(".hero-intro");
  const toggle = hero.querySelector(".hero-motion-toggle");
  const outro = hero.querySelectorAll(".hero-meta, .hero-details, .hero-bottom");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  const mobile = matchMedia("(max-width: 600px)");
  const clamp = (value) => Math.max(0, Math.min(1, value));
  const smoothstep = (value) => value * value * (3 - 2 * value);
  let progress = 0;
  let targetProgress = 0;
  let pointerX = 0;
  let pointerY = 0;
  let targetX = 0;
  let targetY = 0;
  let frame = 0;
  let lastTime = 0;
  let start = 0;
  let distance = 1;
  let width = innerWidth;
  let height = innerHeight;
  let paused = false;
  let focusIntro = false;

  function render() {
    const travel = smoothstep(clamp((progress - .05) / .8));
    const opacity = 1 - smoothstep(clamp(progress / .38));
    const introOpacity = smoothstep(clamp((progress - .48) / .37));
    hero.style.setProperty("--outro-opacity", opacity.toFixed(4));
    hero.style.setProperty("--name-y", `${-progress * 65}px`);
    hero.style.setProperty("--art-x", `${mobile.matches ? 0 : -width * .23 * travel}px`);
    hero.style.setProperty("--art-y", `${mobile.matches ? -height * .235 * travel : 0}px`);
    hero.style.setProperty("--art-scale", 1 - travel * (mobile.matches ? .38 : .22));
    hero.style.setProperty("--intro-opacity", introOpacity.toFixed(4));
    hero.style.setProperty("--intro-y", `${(1 - introOpacity) * 35}px`);
    hero.style.setProperty("--pointer-x", `${pointerX.toFixed(2)}px`);
    hero.style.setProperty("--pointer-y", `${pointerY.toFixed(2)}px`);
    intro.inert = introOpacity < .5;
    outro.forEach((element) => { element.inert = opacity < .15; });
    if (focusIntro && introOpacity > .95) {
      intro.focus({ preventScroll: true });
      focusIntro = false;
    }
  }

  function tick(time) {
    const delta = lastTime ? Math.min(time - lastTime, 64) : 16;
    lastTime = time;
    const ease = 1 - Math.exp(-delta / 95);
    progress += (targetProgress - progress) * ease;
    pointerX += (targetX - pointerX) * ease;
    pointerY += (targetY - pointerY) * ease;
    render();
    if (Math.abs(targetProgress - progress) > .0001 ||
        Math.abs(targetX - pointerX) > .02 || Math.abs(targetY - pointerY) > .02) {
      frame = requestAnimationFrame(tick);
    } else {
      frame = 0;
      lastTime = 0;
    }
  }

  function requestTick() {
    if (!frame && !reducedMotion.matches && !document.hidden) frame = requestAnimationFrame(tick);
  }

  function onScroll() {
    targetProgress = clamp((scrollY - start) / distance);
    requestTick();
  }

  function measure() {
    width = innerWidth;
    height = stage.clientHeight;
    start = hero.getBoundingClientRect().top + scrollY;
    distance = Math.max(1, hero.offsetHeight - height);
    onScroll();
  }

  function configure() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    const reduced = reducedMotion.matches;
    hero.classList.toggle("hero--animated", !reduced);
    toggle.hidden = reduced;
    if (reduced) {
      hero.removeAttribute("style");
      intro.inert = false;
      outro.forEach((element) => { element.inert = false; });
      return;
    }
    measure();
    progress = targetProgress;
    render();
  }

  stage.addEventListener("pointermove", (event) => {
    if (paused || reducedMotion.matches || !finePointer.matches) return;
    const bounds = stage.getBoundingClientRect();
    targetX = ((event.clientX - bounds.left) / bounds.width - .5) * 24;
    targetY = ((event.clientY - bounds.top) / bounds.height - .5) * 20;
    requestTick();
  });
  stage.addEventListener("pointerleave", () => {
    targetX = targetY = 0;
    requestTick();
  });
  toggle.addEventListener("click", () => {
    paused = !paused;
    hero.classList.toggle("hero-motion-paused", paused);
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.setAttribute("aria-label", paused ? "Retomar movimento flutuante" : "Pausar movimento flutuante");
    toggle.firstElementChild.textContent = paused ? "▷" : "Ⅱ";
    targetX = targetY = 0;
    requestTick();
  });
  hero.querySelector(".hero-scroll").addEventListener("click", (event) => {
    if (reducedMotion.matches) return;
    event.preventDefault();
    focusIntro = true;
    scrollTo({ top: start + distance * .94, behavior: "smooth" });
  });
  intro.tabIndex = -1;
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", measure, { passive: true });
  window.addEventListener("pageshow", configure);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
    } else onScroll();
  });
  reducedMotion.addEventListener("change", configure);
  configure();
}

