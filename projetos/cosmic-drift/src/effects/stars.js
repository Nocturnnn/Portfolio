export function initStars(space) {
  const STAR_COUNT = 1000;
  const STAR_LIFETIME_MIN = 10;
  const STAR_LIFETIME_MAX = 20;

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createStar() {
    const star = document.createElement("div");
    star.classList.add("star");

    const x = random(0, window.innerWidth);
    const y = random(0, window.innerHeight);

    const depth = Math.random();

    const dx = random(-10, 10) * depth;
    const dy = random(-10, 10) * depth;

    const size = depth < 0.4 ? 1 : depth < 0.8 ? 1.5 : 2.5;
    const opacity = depth < 0.4 ? 0.25 : depth < 0.8 ? 0.5 : 0.9;
    const blur = depth < 0.4 ? 0.6 : depth < 0.8 ? 0.3 : 0;
    const z = depth < 0.4 ? 1 : depth < 0.8 ? 2 : 3;

    const duration =
      random(STAR_LIFETIME_MIN, STAR_LIFETIME_MAX) / (depth + 0.3);

    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    star.style.setProperty("--dx", `${dx}px`);
    star.style.setProperty("--dy", `${dy}px`);
    star.style.setProperty("--opacity", opacity);
    star.style.setProperty("--blur", `${blur}px`);
    star.style.setProperty("--z", z);

    star.style.animationDuration = `${duration}s`;

    space.appendChild(star);
    setTimeout(() => star.remove(), duration * 1000);
  }

  function spawnStars() {
    createStar();
    setTimeout(spawnStars, random(30, 40));
  }

  for (let i = 0; i < STAR_COUNT; i++) {
    setTimeout(createStar, random(0, 4000));
  }

  spawnStars();
}
