const words = [
  "ELE",
  "O PINGUIM",
  "A CRIATURA",
  "O VIAJANTE",
  "ALGUÉM",
  "NINGUÉM",
];

const target = document.getElementById("subject");
const typingSpeed = 150;
const deletingSpeed = 150;
const holdAfterType = 1600;
const holdAfterDelete = 600;

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    charIndex++;
    target.textContent = currentWord.slice(0, charIndex) + "_";

    if (charIndex === currentWord.length) {
      setTimeout(() => (isDeleting = true), holdAfterType);
    }
  } else {
    charIndex--;
    target.textContent = currentWord.slice(0, charIndex) + "_";

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(() => {}, holdAfterDelete);
    }
  }

  setTimeout(typeLoop, isDeleting ? deletingSpeed : typingSpeed);
}

typeLoop();
