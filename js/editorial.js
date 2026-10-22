document.addEventListener("DOMContentLoaded", () => {
  const diploma = document.getElementById("diploma-dialog");
  const openButton = document.querySelector("[data-open-diploma]");
  if (!diploma || !openButton) return;

  openButton.addEventListener("click", () => diploma.showModal());
  diploma.querySelector(".diploma-close").addEventListener("click", () => diploma.close());
  diploma.addEventListener("click", (event) => {
    if (event.target !== diploma) return;
    const bounds = diploma.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) diploma.close();
  });
  diploma.addEventListener("close", () => openButton.focus({ preventScroll: true }));
});
