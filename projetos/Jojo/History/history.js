const data = {
  jotaro: {
    name: "Jotaro Kujo",
    subtitle: "Stand User — Star Platinum",
    theme: "#5A4FCF",
    history: `
Jotaro Kujo é o protagonista da Parte 3: Stardust Crusaders.
Neto de Joseph Joestar, ele descobre ainda adolescente que possui um Stand,
manifestação física de sua energia espiritual, chamado Star Platinum.

Inicialmente acreditando estar possuído por um espírito maligno, Jotaro se
entrega voluntariamente à prisão até compreender a natureza de seu poder.
Ao descobrir que sua mãe, Holly Kujo, desenvolveu um Stand instável que ameaça
sua vida, ele parte em uma jornada pelo mundo ao lado de seu avô e aliados
para derrotar DIO e quebrar a maldição que afeta sua família.

Durante a viagem que atravessa o Japão, Hong Kong, Índia, Egito e outros
lugares, Jotaro enfrenta inúmeros usuários de Stand enviados por DIO.
Mesmo mantendo uma personalidade fria, sarcástica e aparentemente
indiferente, ele demonstra profundo senso de responsabilidade e proteção
por seus companheiros.

Star Platinum se destaca por sua força absurda, velocidade incomparável
e precisão cirúrgica. No confronto final contra DIO no Cairo, Jotaro
desperta a habilidade de parar o tempo por alguns segundos, igualando-se
ao poder do inimigo e vencendo uma das batalhas mais icônicas da série.

Anos depois, Jotaro se torna um renomado biólogo marinho, mantendo sua
postura reservada, mas sempre pronto para agir quando a família Joestar
volta a ser ameaçada. Sua presença continua influenciando eventos nas
partes seguintes da saga, consolidando-o como um dos personagens mais
icônicos e poderosos de JoJo's Bizarre Adventure.
`,
  },

  dio: {
    name: "Dio Brando",
    subtitle: "Vampire — The World",
    theme: "#C6A300",
    history: `
      Dio Brando é o principal antagonista da saga inicial.
      Adotado pela família Joestar, desenvolve inveja e ambição extrema.
      
      Após usar a Máscara de Pedra, torna-se vampiro.
      Séculos depois retorna como usuário do Stand The World,
      capaz de parar o tempo.
      
      Seu confronto contra Jotaro Kujo é um dos mais icônicos da série.
    `,
  },
};

AOS.init({
  duration: 1000,
  once: false,
});

const params = new URLSearchParams(window.location.search);
const character = params.get("character");

if (data[character]) {
  document.getElementById("character-name").textContent = data[character].name;
  document.getElementById("character-subtitle").innerText =
    data[character].subtitle;
  document.getElementById("character-history").innerText =
    data[character].history;

  document.documentElement.style.setProperty(
    "--theme-color",
    data[character].theme,
  );
}
