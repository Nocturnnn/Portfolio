document.addEventListener("DOMContentLoaded", () => {
  const charactersData = {
    Astarion: {
      name: "Astarion",
      title: "Vampire Spawn",
      image: "img/astarion.png",
      history: `
Astarion é um elfo alto transformado em vampiro spawn sob o domínio cruel de Cazador Szarr, um poderoso vampiro de Baldur’s Gate.
Durante mais de duzentos anos, viveu como escravo, sendo forçado a seduzir vítimas para alimentar seu mestre.
Privado de liberdade e dignidade, desenvolveu uma personalidade sarcástica e manipuladora como mecanismo de sobrevivência.

O parasita illithid implantado em sua mente rompe parcialmente o controle de Cazador, oferecendo-lhe algo que jamais teve: autonomia.
Entre sede de poder, trauma profundo e desejo por liberdade, Astarion luta para decidir se continuará sendo vítima… ou se tornará algo muito mais perigoso.
    `,
      characteristics: {
        Race: "High Elf (Vampire Spawn)",
        Class: "Rogue",
        Subclass: "Arcane Trickster",
        Alignment: "Chaotic Neutral",
        Origin: "Baldur's Gate",
        Abilities:
          "Stealth, Sneak Attack, Vampiric Bite, Manipulation, Illusion Magic",
      },
    },

    Shadowheart: {
      name: "Shadowheart",
      title: "Cleric of Shar",
      image: "img/shadowheart.png",
      history: `
Shadowheart é uma meia-elfa devota à deusa Shar, Senhora da Noite e do Esquecimento.
Criada dentro de um culto secreto, teve sua memória fragmentada como parte de um ritual de devoção, tornando-se uma arma moldada pela fé e pelo sigilo.

Reservada e desconfiada, carrega um artefato misterioso ligado aos eventos centrais da trama.
Ao longo da jornada, sua fé é posta à prova, forçando-a a confrontar verdades ocultas sobre sua identidade, seu passado e o eterno conflito entre Shar e Selûne.
    `,
      characteristics: {
        Race: "Half-Elf",
        Class: "Cleric",
        Subclass: "Trickery Domain",
        Alignment: "Neutral",
        Origin: "Unknown (Sharran Cloister)",
        Abilities:
          "Healing Magic, Radiant & Necrotic Spells, Blessings of Shar, Stealth Support",
      },
    },

    Laezel: {
      name: "Lae'zel",
      title: "Githyanki Warrior",
      image: "img/Laezel.jfif",
      history: `
Lae’zel é uma guerreira githyanki criada sob a rígida cultura militar de seu povo.
Treinada desde a infância para exterminar mind flayers, ela vê o mundo através de disciplina, honra e superioridade racial.

Orgulhosa e impiedosa, acredita que a única cura para o parasita illithid está nas mãos de sua rainha, Vlaakith.
Contudo, ao confrontar mentiras dentro de sua própria sociedade, Lae’zel enfrenta uma crise de fé que desafia tudo o que sempre acreditou.
    `,
      characteristics: {
        Race: "Githyanki",
        Class: "Fighter",
        Subclass: "Battle Master",
        Alignment: "Lawful Neutral",
        Origin: "Astral Plane",
        Abilities:
          "Martial Superiority, Psionic Resistance, Great Weapon Combat, Tactical Maneuvers",
      },
    },

    Gale: {
      name: "Gale",
      title: "Wizard of Waterdeep",
      image: "img/Gale.jfif",
      history: `
Gale é um mago prodigioso da cidade de Waterdeep.
Antigo pupilo e amante da deusa Mystra, buscou poder arcano além de seus limites e acabou aprisionando em seu peito uma Netherese Destruction Orb — uma bomba mágica capaz de devastar cidades inteiras.

Elegante, carismático e intelectualmente brilhante, Gale vive sob constante ameaça de autodestruição.
Sua jornada é marcada por culpa, ambição e o desejo de redenção diante da deusa que o abandonou.
    `,
      characteristics: {
        Race: "Human",
        Class: "Wizard",
        Subclass: "Evocation",
        Alignment: "Neutral Good",
        Origin: "Waterdeep",
        Abilities:
          "Arcane Mastery, Elemental Spells, High Intelligence, Netherese Orb (unstable magic core)",
      },
    },

    Karlach: {
      name: "Karlach",
      title: "Infernal Engine",
      image: "img/Karlach.jfif",
      history: `
Karlach é uma tiefling que foi vendida ainda jovem para servir como soldado no exército de Zariel no Avernus.
Seu coração foi substituído por um motor infernal, tornando-a uma arma viva movida a fogo demoníaco.

Apesar de seu passado brutal e das chamas que queimam sob sua pele, Karlach mantém uma personalidade calorosa, vibrante e leal.
Agora livre do inferno, busca aproveitar cada momento de sua liberdade antes que seu próprio motor consuma sua vida.
    `,
      characteristics: {
        Race: "Tiefling",
        Class: "Barbarian",
        Subclass: "Berserker",
        Alignment: "Chaotic Good",
        Origin: "Baldur's Gate / Avernus",
        Abilities:
          "Rage, Infernal Engine Overdrive, Fire Resistance, Brutal Strength",
      },
    },

    Wyll: {
      name: "Wyll",
      title: "The Blade of Frontiers",
      image: "img/Wyll.jfif",
      history: `
Wyll é o filho do Grão-Duque de Baldur’s Gate, mas abandonou sua posição para se tornar um herói popular conhecido como “A Lâmina das Fronteiras”.
Em busca de poder para proteger os inocentes, fez um pacto com a cambion Mizora.

Embora se apresente como nobre e altruísta, seu acordo demoníaco o persegue constantemente.
Wyll luta para equilibrar honra, dever familiar e as consequências de sua ambição juvenil.
    `,
      characteristics: {
        Race: "Human",
        Class: "Warlock",
        Subclass: "Fiend Patron",
        Alignment: "Neutral Good",
        Origin: "Baldur's Gate",
        Abilities:
          "Eldritch Blast, Infernal Magic, Pact Weapon, Heroic Swordplay",
      },
    },

    Halsin: {
      name: "Halsin",
      title: "Druid of the Emerald Grove",
      image: "img/Halsin.jfif",
      history: `
Halsin é um elfo druida e Primeiro Druida do Bosque Esmeralda.
Protetor incansável do equilíbrio natural, dedicou sua vida à preservação das terras selvagens contra corrupção e influência sombria.

Séculos atrás, participou da guerra contra Ketheric Thorm, testemunhando a devastação causada pela Shadow-Curse.
Carrega culpa por não ter conseguido impedir totalmente aquela tragédia.
Sábio, paciente e imponente, Halsin representa força tranquila — mas quando a natureza é ameaçada, torna-se uma tempestade viva.
    `,
      characteristics: {
        Race: "Wood Elf",
        Class: "Druid",
        Subclass: "Circle of the Moon",
        Alignment: "Neutral Good",
        Origin: "Emerald Grove",
        Abilities:
          "Wild Shape (Bear Form), Nature Magic, Healing, Environmental Control",
      },
    },

    Minthara: {
      name: "Minthara",
      title: "Drow Paladin",
      image: "img/Minthara.jfif",
      history: `
Minthara é uma drow da Casa Baenre, criada na cultura implacável de Menzoberranzan.
Treinada para comandar e dominar, cresceu sob a doutrina de Lolth, onde fraqueza significa morte.

Inicialmente uma líder implacável dos goblins sob influência do Absolute,
Minthara pode se libertar da manipulação mental e revelar uma personalidade estratégica, fria e intensamente determinada.

Ambiciosa e pragmática, ela acredita que poder é a única linguagem que o mundo realmente entende.
    `,
      characteristics: {
        Race: "Drow (Lolth-Sworn)",
        Class: "Paladin",
        Subclass: "Oath of Vengeance",
        Alignment: "Lawful Evil",
        Origin: "Menzoberranzan",
        Abilities:
          "Divine Smite, Tactical Command, Darkvision Superior, Ruthless Precision",
      },
    },

    Jaheira: {
      name: "Jaheira",
      title: "High Harper Druid",
      image: "img/Jaheira.jfif",
      history: `
Jaheira é uma lendária heroína dos eventos anteriores de Baldur’s Gate e membro veterana dos Harpers.
Meio-elfa experiente, lutou contra deuses mortos, tiranos e ameaças cósmicas.

Agora mais velha, mas não menos formidável, atua como líder estratégica na resistência contra o Absolute.
Carrega cicatrizes emocionais do passado, incluindo a perda de seu marido Khalid, mas mantém firme seu compromisso com a justiça e o equilíbrio.

Sua presença simboliza continuidade e legado dentro da saga.
    `,
      characteristics: {
        Race: "Half-Elf",
        Class: "Druid / Fighter",
        Subclass: "Circle of the Land",
        Alignment: "Neutral Good",
        Origin: "Baldur's Gate",
        Abilities:
          "Nature Magic, Dual Wield Combat, Leadership, Harper Intelligence Network",
      },
    },

    Withers: {
      name: "Withers",
      title: "Servant of Death",
      image: "img/Withers Baldurs gate 3.jfif",
      history: `
Withers é uma figura enigmática encontrada em uma cripta antiga.
De aparência cadavérica e comportamento sereno, demonstra conhecimento profundo sobre morte, destino e as forças divinas que regem o mundo.

Gradualmente revela-se como um servo de Jergal, antigo deus da morte que precedeu Bane, Bhaal e Myrkul.
Observador silencioso dos acontecimentos, Withers age como mediador entre vida e morte, oferecendo ressurreição e orientação filosófica.

Ele raramente interfere diretamente — mas compreende mais do que aparenta.
    `,
      characteristics: {
        Race: "Undead (Avatar of Jergal)",
        Class: "Unknown",
        Subclass: "Divine Servitor",
        Alignment: "True Neutral",
        Origin: "Ancient Crypt",
        Abilities:
          "Resurrection, Soul Knowledge, Divine Insight, Fate Observation",
      },
    },

    DarkUrge: {
      name: "The Dark Urge",
      title: "Origin of Blood",
      image: "img/DarkUrge.jfif",
      history: `
The Dark Urge é uma origem jogável marcada por impulsos violentos e memórias fragmentadas.
Diferente dos demais protagonistas, sua história está diretamente ligada a Bhaal, o deus do assassinato.

Consumido por desejos sanguinários incontroláveis, o Dark Urge luta entre abraçar sua natureza assassina ou resistir ao chamado divino.
Seu passado envolve conspirações, cultos secretos e participação ativa nos planos do Absolute.

Ele representa a batalha mais crua entre livre-arbítrio e destino.
    `,
      characteristics: {
        Race: "Custom (Bhaalspawn)",
        Class: "Custom",
        Subclass: "Custom",
        Alignment: "Chaotic Evil (variable)",
        Origin: "Bhaal’s Cult",
        Abilities:
          "Murderous Compulsion, High Adaptability, Unique Story Events, Divine Bloodline",
      },
    },

    Emperor: {
      name: "The Emperor",
      title: "Mind Flayer",
      image: "img/The emperor Baldurs gate 3.jfif",
      history: `
The Emperor é um mind flayer incomum que mantém sua individualidade e consciência intactas.
Diferente da maioria de sua espécie, ele rompeu com o Elder Brain e desenvolveu autonomia própria.

Astuto, calculista e extremamente pragmático, ele manipula eventos nas sombras para sobreviver e manter controle sobre o poder do Netherbrain.
Embora afirme agir por necessidade e preservação mútua, suas intenções nunca são totalmente transparentes.

Ele representa a zona cinzenta entre monstro e aliado — uma mente brilhante presa em um corpo que simboliza terror.
    `,
      characteristics: {
        Race: "Mind Flayer (Illithid)",
        Class: "Psionic Entity",
        Subclass: "Independent Illithid",
        Alignment: "Lawful Neutral",
        Origin: "Baldur’s Gate (Former Identity Unknown)",
        Abilities:
          "Psionic Domination, Telepathy, Mind Control Resistance, Illithid Transformation",
      },
    },

    Alfira: {
      name: "Alfira",
      title: "Tiefling Bard",
      image: "img/Alfira _ Baldur's Gate 3.jfif",
      history: `
Alfira é uma jovem tiefling barda refugiada após a destruição de Elturel.
Sensível e artística, usa a música como forma de processar trauma e manter viva a esperança de seu povo.

Determinada a compor uma canção memorável que honre os que sofreram,
Alfira simboliza a resistência cultural diante da adversidade.

Mesmo em meio ao caos da guerra e da corrupção, sua arte permanece como um lembrete de humanidade.
    `,
      characteristics: {
        Race: "Tiefling",
        Class: "Bard",
        Subclass: "College of Lore",
        Alignment: "Neutral Good",
        Origin: "Elturel",
        Abilities:
          "Inspiration, Musical Magic, Emotional Resilience, Support Spells",
      },
    },

    Volo: {
      name: "Volo",
      title: "Wandering Scholar",
      image: "img/Volo.jfif",
      history: `
Volothamp Geddarm, conhecido como Volo, é um famoso — e exageradamente confiante — explorador e escritor.
Autor de diversos guias sobre criaturas e regiões de Faerûn, mistura conhecimento genuíno com dramatização excessiva.

Apesar de parecer cômico e imprudente, Volo frequentemente se envolve em eventos históricos importantes.
Sua curiosidade quase suicida o coloca em perigo constante, mas também o torna testemunha privilegiada de acontecimentos raros.

Ele é tanto alívio cômico quanto cronista involuntário da catástrofe.
    `,
      characteristics: {
        Race: "Human",
        Class: "Wizard (Self-Proclaimed Scholar)",
        Subclass: "None",
        Alignment: "Chaotic Neutral",
        Origin: "Faerûn",
        Abilities:
          "Lore Knowledge, Improvised Magic, Fearless Curiosity, Unintentional Survival",
      },
    },

    Mizora: {
      name: "Mizora",
      title: "Cambion Tempter",
      image: "img/Mizora the devil.jfif",
      history: `
Mizora é uma cambion a serviço de Zariel, arquidiaba de Avernus.
Sedutora, manipuladora e implacável, ela firmou um pacto com Wyll, concedendo-lhe poder em troca de obediência.

Mizora enxerga contratos como jogos estratégicos, sempre encontrando brechas para manter controle.
Seu comportamento mistura charme provocativo e crueldade calculada.

Para ela, mortais são peças em um tabuleiro infernal — e cada acordo é uma vitória política nos Nove Infernos.
    `,
      characteristics: {
        Race: "Cambion",
        Class: "Fiend",
        Subclass: "Infernal Agent of Zariel",
        Alignment: "Lawful Evil",
        Origin: "Avernus (Nine Hells)",
        Abilities:
          "Infernal Contract Magic, Fire Manipulation, Teleportation, Psychological Manipulation",
      },
    },

    DameAylin: {
      name: "Dame Aylin",
      title: "Daughter of Selûne",
      image: "img/Dame Ay.jfif",
      history: `
Dame Aylin é uma aasimar e filha direta da deusa Selûne, deusa da lua.
Conhecida também como a Nightsong, ela foi capturada e aprisionada por décadas como parte do ritual que sustentava a imortalidade de Ketheric Thorm.

Privada de liberdade, sofreu tortura e exploração divina, mas jamais perdeu sua fé ou convicção.
Sua libertação marca um ponto decisivo na luta contra as forças da Shadow-Curse.

Aylin é fervorosa, intensa e movida por justiça divina.
Ela representa luz resiliente diante de corrupção e fanatismo.
    `,
      characteristics: {
        Race: "Aasimar (Daughter of Selûne)",
        Class: "Paladin",
        Subclass: "Oath of Devotion",
        Alignment: "Lawful Good",
        Origin: "Selûnite Temple",
        Abilities:
          "Radiant Smite, Divine Flight, Celestial Resilience, Moonlight Empowerment",
      },
    },

    Isobel: {
      name: "Isobel",
      title: "Cleric of Selûne",
      image: "img/Isobel.jfif",
      history: `
Isobel é uma poderosa clériga de Selûne e filha de Ketheric Thorm.
Após morrer tragicamente no passado, foi ressuscitada por intervenção divina, tornando-se símbolo de esperança contra a Shadow-Curse.

Ela mantém ativa a proteção mágica da Última Luz, criando um santuário contra a escuridão que consome as terras.
Gentil e determinada, Isobel carrega o peso da corrupção de seu pai e do conflito entre luz e morte.

Sua existência é um desafio direto ao domínio de Myrkul.
    `,
      characteristics: {
        Race: "Human",
        Class: "Cleric",
        Subclass: "Light Domain",
        Alignment: "Neutral Good",
        Origin: "Reithwin",
        Abilities:
          "Radiant Barriers, Healing Magic, Undead Repulsion, Moonlight Blessings",
      },
    },

    Orin: {
      name: "Orin",
      title: "The Red — Chosen of Bhaal",
      image: "img/Orin.jfif",
      history: `
Orin, conhecida como Orin the Red, é a Escolhida de Bhaal, deus do assassinato.
Imprevisível, sádica e teatral, ela vê o assassinato como forma de arte.

Capaz de mudar de forma e manipular identidades, infiltra-se entre aliados para espalhar paranoia e medo.
Sua devoção a Bhaal é absoluta, buscando provar-se superior até mesmo a outros herdeiros do sangue divino.

Ela representa o caos sanguinário e a celebração da morte como espetáculo.
    `,
      characteristics: {
        Race: "Human (Bhaalspawn)",
        Class: "Rogue",
        Subclass: "Assassin / Shapeshifter",
        Alignment: "Chaotic Evil",
        Origin: "Temple of Bhaal",
        Abilities:
          "Shapeshifting, Deadly Precision, Psychological Terror, Divine Murderous Boon",
      },
    },

    Gortash: {
      name: "Gortash",
      title: "Chosen of Bane",
      image: "img/Gortash.jfif",
      history: `
Enver Gortash é um político brilhante e manipulador que ascende ao poder em Baldur’s Gate.
Como Escolhido de Bane, deus da tirania, ele governa por meio de controle, vigilância e força militar.

Criador dos Steel Watchers — construtos mecânicos letais — Gortash combina tecnologia arcana com ambição política.
Carismático em público e implacável nos bastidores, ele acredita que ordem absoluta é a única forma de estabilidade.

Sua visão de futuro é construída sobre dominação estratégica.
    `,
      characteristics: {
        Race: "Human",
        Class: "Artificer / Tyrant Leader",
        Subclass: "Chosen of Bane",
        Alignment: "Lawful Evil",
        Origin: "Baldur’s Gate",
        Abilities:
          "Political Manipulation, Steel Watch Control, Strategic Warfare, Tyrannical Authority",
      },
    },

    Raphael: {
      name: "Raphael",
      title: "Devil of the House of Hope",
      image: "img/Raphael.jfif",
      history: `
Raphael é um cambion poderoso e senhor da House of Hope.
Elegante, teatral e extremamente culto, oferece contratos aparentemente vantajosos aos desesperados.

Ao contrário de Mizora, Raphael opera como aristocrata infernal,
preferindo barganhas sofisticadas que prendem almas por meio de ambição e orgulho.

Ele busca artefatos de imenso poder e enxerga o caos do Absolute como oportunidade de expansão infernal.
Para Raphael, todo mortal possui um preço — basta descobrir qual.
    `,
      characteristics: {
        Race: "Cambion",
        Class: "Archdevil Noble",
        Subclass: "Infernal Contract Master",
        Alignment: "Lawful Evil",
        Origin: "House of Hope (Avernus)",
        Abilities:
          "Soul Contracts, Hellfire Magic, Dimensional Control, Infernal Charisma",
      },
    },

    KethericThorm: {
      name: "Ketheric Thorm",
      title: "Chosen of Myrkul",
      image: "img/KethericThorm.jfif",
      history: `
Ketheric Thorm foi outrora um paladino devoto de Selûne e líder respeitado.
Após a morte de sua filha Isobel, mergulhou em desespero e voltou-se para Myrkul, deus da morte.

Transformado em Escolhido de Myrkul, tornou-se imortal enquanto a Nightsong permanecesse aprisionada.
Ele lidera as forças do Absolute com disciplina fria e fé necromântica.

Ketheric não é movido por sadismo, mas por luto distorcido.
Seu arco representa a queda trágica de um homem que perdeu tudo e buscou poder para negar a morte.
    `,
      characteristics: {
        Race: "Human",
        Class: "Paladin / Death Knight",
        Subclass: "Chosen of Myrkul",
        Alignment: "Lawful Evil",
        Origin: "Reithwin",
        Abilities:
          "Necromancy, Immortality Link, Divine Smite (Corrupted), Undead Command",
      },
    },
  };

  const panel = document.getElementById("character-panel");
  const panelImage = document.getElementById("panel-image");
  const panelName = document.getElementById("panel-name");
  const panelTitle = document.getElementById("panel-title");
  const panelHistory = document.getElementById("panel-history");
  const panelCharacteristics = document.getElementById("panel-characteristics");
  const closePanel = document.getElementById("close-panel");

  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const name = card.dataset.name;
      const data = charactersData[name];

      if (!data) return;

      panelImage.src = data.image;
      panelImage.alt = data.name;
      panelName.textContent = data.name;
      panelTitle.textContent = data.title;
      panelHistory.textContent = data.history;

      panelCharacteristics.innerHTML = "";

      for (let key in data.characteristics) {
        const div = document.createElement("div");
        div.innerHTML = `<strong>${key}:</strong> ${data.characteristics[key]}`;
        panelCharacteristics.appendChild(div);
      }

      if (
        name === "Laezel" ||
        name === "Gale" ||
        name === "Halsin" ||
        name === "Minthara" ||
        name === "The Dark Urge" ||
        name === "Alfira" ||
        name === "Orin"
      ) {
        panelImage.style.objectPosition = "top center";
      } else {
        panelImage.style.objectPosition = "center center";
      }

      panel.classList.remove("hidden");
      setTimeout(() => {
        panel.classList.add("active");
      }, 10);
    });
  });

  closePanel.addEventListener("click", () => {
    panel.classList.remove("active");

    setTimeout(() => {
      panel.classList.add("hidden");
    }, 600);
  });
});
