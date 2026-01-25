const clock = document.getElementById("clock");
const phrase = document.getElementById("phrase");

const phrases = [
  "As aventuras que nenhum pinguim jamais viu",
  "Diante de tudo, ele permanece",
  "O mundo é grande demais para pressa",
  "Nem toda jornada precisa de testemunhas",
  "O silêncio também é um caminho",
  "Firme, mesmo quando ninguém observa",
  "A vastidão não o intimida",
  "Ele não espera. Ele existe.",
];

function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  clock.textContent = `${hours}:${minutes}`;
}

function changePhrase() {
  phrase.style.opacity = 0;
  setTimeout(() => {
    const random = Math.floor(Math.random() * phrases.length);
    phrase.textContent = phrases[random];
    phrase.style.opacity = 1;
  }, 1000);
}

updateClock();
setInterval(updateClock, 1000);
setInterval(changePhrase, 10000);
