const cards = document.querySelectorAll(".card");
const counter = document.getElementById("counter");

let selected = [];

cards.forEach(card => {
  card.addEventListener("click", () => {
    const name = card.dataset.name;

    card.classList.toggle("selected");

    if (selected.includes(name)) {
      selected = selected.filter(item => item !== name);
    } else {
      selected.push(name);
    }

    counter.textContent = `Selecionados: ${selected.length}`;
  });
});
