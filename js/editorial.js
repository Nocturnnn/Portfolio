document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".mobile-menu");
  menu?.addEventListener("click", (event) => {
    if (event.target.closest("a")) menu.open = false;
  });
  document.addEventListener("click", (event) => {
    if (menu?.open && !menu.contains(event.target)) menu.open = false;
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu?.open) {
      menu.open = false;
      menu.querySelector("summary").focus();
    }
  });
  const diploma = document.getElementById("diploma-dialog");
  const openButton = document.querySelector("[data-open-diploma]");
  if (!diploma || !openButton) return;

  openButton.addEventListener("click", () => {
    if (typeof diploma.showModal === "function") diploma.showModal();
    else location.href = "docs/diploma-ads-exibicao.pdf";
  });
  diploma.querySelector(".diploma-close").addEventListener("click", () => diploma.close());
  diploma.addEventListener("click", (event) => {
    if (event.target !== diploma) return;
    const bounds = diploma.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) diploma.close();
  });
  diploma.addEventListener("close", () => openButton.focus({ preventScroll: true }));
});
