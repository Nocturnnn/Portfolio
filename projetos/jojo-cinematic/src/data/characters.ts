export interface Character {
  id: string;
  name: string;
  subtitle: string;
  theme: string;
  history: string;
}

export const characters: Record<string, Character> = {
  jotaro: {
    id: "jotaro",
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
    id: "dio",
    name: "Dio Brando",
    subtitle: "Vampire — The World",
    theme: "#C6A300",
    history: `
Dio Brando é o antagonista central da saga Joestar e uma das figuras
mais emblemáticas de JoJo's Bizarre Adventure.

Nascido na pobreza e criado por um pai alcoólatra e abusivo, DIO
desenvolveu desde cedo uma personalidade fria, manipuladora e
extremamente ambiciosa. Após a morte de seu pai, ele é adotado por
George Joestar I, passando a viver na luxuosa mansão da família
Joestar ao lado de Jonathan Joestar.

Movido por inveja e desejo de poder, DIO tenta destruir Jonathan
psicologicamente e assumir o controle da herança da família.
Sua ambição o leva a utilizar a antiga Máscara de Pedra, um artefato
misterioso que o transforma em vampiro, concedendo-lhe força,
velocidade, regeneração e imortalidade.

Mesmo após ser derrotado por Jonathan, DIO sobrevive ao tomar
posse de seu corpo, permanecendo oculto por quase um século
no fundo do oceano. Ao despertar na década de 1980, ele manifesta
um Stand chamado The World.

The World possui habilidades físicas esmagadoras e, principalmente,
o poder de parar o tempo por alguns segundos, colocando DIO em
uma posição aparentemente invencível contra seus inimigos.

Durante os eventos de Stardust Crusaders, DIO atrai diversos usuários
de Stand para servi-lo, espalhando caos pelo mundo enquanto
a família Joestar tenta detê-lo.

Seu confronto final contra Jotaro Kujo, no Cairo, torna-se uma das
batalhas mais icônicas da série — um duelo entre dois usuários
capazes de manipular o tempo.

Mais do que um simples vilão, DIO representa ambição absoluta,
orgulho desmedido e a busca implacável pela transcendência.
Sua influência ecoa por gerações, afetando diretamente os
acontecimentos das partes seguintes da saga.
`,
  },
};
