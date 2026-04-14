document.addEventListener("DOMContentLoaded", () => {
  const projects = [
    {
      title: "Balduíno IV — Poster Editorial",
      description:
        "Experiência editorial inspirada em pôsteres históricos, com tipografia monumental e atmosfera dramática.",
      image: "img/portifolio/Balduino.png",
      link: "projetos/Balduino_IV/",
      type: "Editorial",
      stack: ["HTML", "CSS", "Typography", "UI Design"],
      featured: true,
    },
    {
      title: "The Blood Crowned Monarch",
      description:
        "Projeto dark-fantasy com estética cinematográfica, efeitos sutis e narrativa visual intensa.",
      image: "img/portifolio/monarch.png",
      link: "projetos/monarch/",
      type: "Landing Page",
      stack: ["UI", "UX", "Front-end", "Cinematic"],
      featured: true,
    },
    {
      title: "Dream House — Real Estate Landing Page",
      description:
        "Landing page imobiliária com abordagem editorial, tipografia refinada e elementos decorativos sutis inspirados em layouts cinematográficos.",
      image: "img/portifolio/dream-house.png",
      link: "projetos/dream-house-home/",
      type: "Landing Page",
      stack: ["HTML", "CSS", "Editorial", "UI Design"],
      featured: true,
    },
    {
      title: "O Pinguim e a Montanha (meme)",
      description:
        "Experimento visual e narrativo inspirado em um meme existencial, combinando humor, atmosfera e direção de arte.",
      image: "img/portifolio/pingu.png",
      link: "projetos/penguin/",
      type: "Experimento",
      stack: ["HTML", "CSS", "JavaScript", "UI", "Front-end", "Cinemático"],
      featured: true,
    },
    {
      title: "Xadrez 3D — Experiência Cinematográfica",
      description:
        "Experimento visual em WebGL com atmosfera contemplativa, iluminação dramática e composição inspirada na filosofia do xadrez.",
      image: "img/portifolio/chess3d.png",
      link: "projetos/chess-3d/",
      type: "3D Web Experience",
      stack: ["Three.js", "WebGL", "JavaScript", "GSAP", "React", "CSS", "3D"],
      featured: true,
    },
    {
      title: "Cosmic Drift Surfista Prateado — Experiência Visual Espacial",
      description:
        "Projeto com foco em fluidez visual, profundidade falsa e geração procedural de elementos para criar uma experiência espacial imersiva.",
      image: "img/portifolio/surfer.png",
      link: "projetos/Surfista_Prateado/",
      type: "Experimento",
      stack: ["React", "Vite", "JavaScript", "CSS Animations", "Performance"],
      featured: false,
    },
    {
      title: "Baldur’s Gate 3 — Codex Cinematográfico Interativo",
      description:
        "Interface estilo grimório arcano com foco em narrativa, atmosfera sombria e estrutura orientada a dados.",
      image: "img/portifolio/BDG3.png",
      link: "projetos/bdg3-characters/",
      type: "Interface Interativa",
      stack: ["HTML5", "CSS3", "JavaScript", "AOS", "UI/UX", "Dark Theme"],
      featured: false,
    },
    {
      title: "JoJo — Experiência Cinematográfica Interativa",
      description:
        "Projeto visual inspirado em JoJo’s Bizarre Adventure com navegação imersiva, mudança de atmosfera e forte identidade estética.",
      image: "img/portifolio/Jojo.png",
      link: "projetos/Jojo/",
      type: "Interface Interativa",
      stack: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "UI/UX"],
      featured: false,
    },
    {
      title: "NeuroFlow AI — Landing Page SaaS com Next.js",
      description:
        "Landing page SaaS moderna com base escalável, foco em estrutura, animações suaves e organização por componentes.",
      image: "img/portifolio/neuroflow_ai.png",
      link: "https://github.com/Nocturnnn/Neuroflow_AI",
      type: "SaaS",
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS v4",
        "Framer Motion",
      ],
      featured: true,
    },
    {
      title: "Bedroom Aparts — Dashboard Imobiliário com React + Motion",
      description:
        "Dashboard premium com visualização de dados, glassmorphism, microinterações e arquitetura pronta para evolução.",
      image: "img/portifolio/Bedroom Aparts.png",
      link: "https://bedroom-aparts.vercel.app/",
      type: "Dashboard",
      stack: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Motion",
        "Recharts",
      ],
      featured: true,
    },
    {
      title: "Karzone Luxury Automotive — Experiência Web Premium",
      description:
        "Landing page automotiva com storytelling visual, rolagem cinematográfica e vitrine interativa de veículos.",
      image: "img/portifolio/Cars.png",
      link: "https://cars-delta-two.vercel.app/",
      type: "Landing Page",
      stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"],
      featured: true,
    },
    {
      title: "Vantage Expedition — Experiência Web Cinematográfica",
      description:
        "Projeto inspirado em explorações alpinas, com interface editorial, expansão de cards e atmosfera imersiva.",
      image: "img/portifolio/Vantage.png",
      link: "https://vantage-adventure.vercel.app/",
      type: "Landing Page",
      stack: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Motion",
        "Responsive Design",
      ],
      featured: true,
    },
    {
      title: "NocturnGear — Experiência Web Premium Outdoor",
      description:
        "Projeto com estética robusta e sofisticada, grid interativo de produtos e direção visual voltada ao universo outdoor.",
      image: "img/portifolio/nocturngear.png",
      link: "https://nocturn-gear.vercel.app/",
      type: "E-commerce UI",
      stack: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Motion",
        "Responsive Design",
      ],
      featured: true,
    },
    {
      title: "Nike 3D Product Experience — Showcase Interativo de Produto",
      description:
        "Experiência 3D de produto com WebGL, rotação dinâmica, scroll guiado e foco total no tênis como protagonista visual.",
      image: "img/portifolio/Nike.png",
      link: "https://github.com/Nocturnnn/nike-shoe-landing",
      type: "3D Web Experience",
      stack: [
        "React",
        "TypeScript",
        "Three.js",
        "React Three Fiber",
        "GSAP",
        "Framer Motion",
        "Tailwind CSS",
        "WebGL",
      ],
      featured: true,
    },
    {
      title: "Pagani Digital Showroom — Experiência Web 3D",
      description:
        "Showroom automotivo digital com iluminação cinematográfica, renderização 3D em tempo real e ambientação premium.",
      image: "img/portifolio/pagani.png",
      link: "https://github.com/Nocturnnn/pagani-automobili",
      type: "3D Web Experience",
      stack: [
        "Next.js",
        "React",
        "Three.js",
        "React Three Fiber",
        "GSAP",
        "ScrollTrigger",
        "WebGL",
      ],
      featured: true,
    },
    {
      title: "Neo-Street — Experiência Web Inspirada em Streetwear Futurista",
      description:
        "Projeto visual ousado com estética urbana digital, grids marcantes e identidade de marca experimental.",
      image: "img/portifolio/neo street.png",
      link: "https://neo-street.vercel.app/",
      type: "E-commerce UI",
      stack: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "UI/UX Design",
        "Creative Front-end",
      ],
      featured: true,
    },
    {
      title: "Portfolio Scene — Hero Cinematográfica Interativa",
      description:
        "Experimento visual desenvolvido para explorar uma abertura de portfólio mais artística, com tipografia monumental, parallax no mouse, cards centralizados com falso 3D e acabamento glass premium.",
      image: "img/portifolio/cinematic-portifolio.png",
      link: "https://portfolio-cinematic-brown.vercel.app/",
      type: "Experimento",
      stack: [
        "React",
        "Vite",
        "JavaScript",
        "CSS",
        "Parallax",
        "Glassmorphism",
        "Creative Front-end",
      ],
      featured: true,
    },
    {
      title: "Dark Fantasy Living Wallpaper — Experiência Web 3D Ritualística",
      description:
        "Projeto experimental inspirado na estética de wallpapers cinematográficos de desktop, transformando esse conceito em uma experiência web viva com modelo 3D central, halo luminoso, partículas, butterflies e atmosfera dark fantasy em tempo real.",
      image: "img/portifolio/dark-fantasy.png",
      link: "https://github.com/Nocturnnn/dark-fantasy-site",
      type: "3D Web Experience",
      stack: [
        "React",
        "Vite",
        "JavaScript",
        "Three.js",
        "React Three Fiber",
        "GLB",
        "Tailwind CSS v4",
        "Framer Motion",
        "WebGL",
      ],
      featured: true,
    },
    {
      title: "Eterna — Poster Editorial Sci-Fi Interativo",
      description:
        "Experimento visual desenvolvido em React com proposta editorial e atmosfera sci-fi minimalista, combinando tipografia monumental animada, glow reativo ao mouse, parallax em múltiplas camadas, efeito liquid distortion nas letras e microdetalhes de interface para criar uma hero section artística e cinematográfica.",
      image: "img/portifolio/eterna-design.png",
      link: "https://eterna-hero.vercel.app/",
      type: "Experimento",
      stack: [
        "React",
        "Vite",
        "JavaScript",
        "CSS",
        "Creative Front-end",
        "Parallax",
        "Motion Design",
      ],
      featured: true,
    },
    {
      title: "Portal Terra — Boas-vindas para Alienígenas 👽🌍",
      description:
        "Landing page experimental com estética sci-fi que simula um portal diplomático da Terra, tentando convencer alienígenas a não atacarem o planeta. Combina humor, vídeo de fundo e interface cinematográfica para criar uma experiência imersiva e criativa.",
      image: "img/portifolio/bem vindo há terra.png",
      link: "https://welcome-earth-five.vercel.app/",
      type: "Landing Page",
      stack: [
        "React",
        "Vite",
        "JavaScript",
        "CSS",
        "UI/UX",
        "Motion",
        "Creative Front-end",
      ],
      featured: true,
    },
    {
      title: "Noc Checkbox — Dashboard Analítico Premium",
      description:
        "Dashboard moderno com foco em visualização de dados, combinando glassmorphism, microinterações, gráficos interativos e layout inspirado em interfaces sci-fi. Desenvolvido para transformar dados complexos em uma experiência visual clara, rápida e elegante.",
      image: "img/portifolio/noccheckbox.png",
      link: "https://dashboard-checkbox-jt1l.vercel.app/",
      type: "Dashboard",
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Recharts",
        "Lucide Icons",
        "UI/UX",
        "Data Visualization",
      ],
      featured: true,
    },
    {
      title: "Conduit API — WhatsApp Link Generator",
      description:
        "Landing page SaaS estilizada para geração de links do WhatsApp, com foco em conversão, UX refinada, microinterações e identidade visual premium inspirada no ecossistema WhatsApp.",
      image: "img/portifolio/WhatsApp_Api.png",
      link: "https://whats-app-api-sigma.vercel.app/",
      type: "SaaS",
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "App Router",
        "Server Components",
        "UI/UX",
      ],
      featured: true,
    },
    {
      title: "Yamara — Premium Motorcycle Showcase",
      description:
        "Showcase automotivo premium com visual futurista, hero cinematográfico, scroll de modelos e microinterações elegantes para a marca fictícia Yamara.",
      image: "img/portifolio/yamara.png",
      link: "https://yamara.vercel.app/",
      type: "Landing Page",
      stack: [
        "React",
        "TypeScript",
        "Vite",
        "CSS",
        "UI/UX",
        "Responsive Design",
        "Motion",
      ],
      featured: true,
    },
    {
      title: "Steel Ball Run — Experiência Cinematográfica Interativa",
      description:
        "Homenagem visual inspirada em JoJo: Steel Ball Run, com scroll cinematográfico, transições dramáticas, atmosfera dinâmica e foco total na identidade de cada personagem.",
      image: "img/portifolio/steel ball run.png",
      link: "https://steel-ball-run-site.vercel.app/",
      type: "Interface Interativa",
      stack: [
        "React",
        "TypeScript",
        "Vite",
        "Framer Motion",
        "UI/UX",
        "Creative Front-end",
      ],
      featured: true,
    },
    {
      title: "Diepio Clone — Arcade Shooter com TypeScript",
      description:
        "Jogo de navegador inspirado em diep.io, com combate 2D em Canvas, progressão por XP, level up e upgrades para transformar o tanque em uma máquina de caos geométrico.",
      image: "img/portifolio/diepio.png",
      link: "https://diepio-clone.vercel.app/",
      type: "Browser Game",
      stack: ["TypeScript", "Vite", "HTML5 Canvas", "Game Dev", "2D"],
      featured: true,
    },
    {
      title: "Calm Access Login — Interface de Login com Next.js 15",
      description:
        "Tela de login refinada com validação local, mostrar e ocultar senha, indicador de força, alerta de Caps Lock, modo de recuperação e conta demo para teste rápido.",
      image: "img/portifolio/login-1.png",
      link: "https://login-1-rose.vercel.app/",
      type: "Authentication UI",
      stack: [
        "Next.js 15",
        "React 19",
        "TypeScript",
        "Tailwind CSS 4",
        "Lucide React",
        "Motion",
      ],
      featured: true,
    },
    {
      title: "White Stone — Experiência Espiritual Interativa",
      description:
        "Experiência interativa inspirada na simbologia da pedra branca de Apocalipse 2:17.",
      image: "img/portifolio/Pedra branca.png",
      link: "https://sua-pedra-branca.vercel.app/",
      type: "Interface Interativa",
      stack: [
        "React",
        "JavaScript",
        "Framer Motion",
        "CSS",
        "UI/UX",
        "Creative Front-end",
      ],
      featured: true,
    },
    {
      title: "Elden Ring — Experiência Editorial Interativa",
      description:
        "Experiência front-end autoral desenvolvida com React, TypeScript, Vite e Framer Motion, que transforma a estética sombria de Elden Ring em uma apresentação editorial interativa.",
      image: "img/portifolio/elden-editorial.png",
      link: "https://elden-editorial.vercel.app/",
      type: "Interface Interativa",
      stack: [
        "React",
        "TypeScript",
        "Vite",
        "Framer Motion",
        "UI/UX",
        "Creative Front-end",
      ],
      featured: true,
    },
    {
      title: "Immersia — Landing Page para Ativações Tecnológicas",
      description:
        "Projeto conceito de landing page premium com visual tecnológico, animações refinadas e foco em performance, experiência e posicionamento de marca.",
      image: "img/portifolio/Emmersia.png",
      link: "https://immersia-murex.vercel.app/",
      type: "Freelance Project",
      stack: ["React", "TypeScript", "Vite", "CSS", "Performance", "Branding"],
      featured: true,
    },
    {
      title: "Login Lamp — Interface de Login Interativa",
      description:
        "Tela de login criada em React com uma lâmpada interativa ao lado do formulário: ao puxar a corda, a luz liga e desliga, alterando toda a atmosfera da experiência e deixando a autenticação muito mais memorável.",
      image: "img/portifolio/login-lamp.png",
      link: "https://login-lamp-seven.vercel.app/",
      type: "Authentication UI",
      stack: [
        "React",
        "Vite",
        "JavaScript",
        "UI/UX",
        "Motion",
        "Creative Front-end",
      ],
      featured: true,
    },
    {
      title: "Nubank Concept — Landing Page Premium",
      description:
        "Landing page conceitual inspirada no universo Nubank, com hero cinematográfico centrado no cartão Ultravioleta, narrativa visual premium, animações refinadas e foco em branding, confiança e conversão.",
      image: "img/portifolio/Nubank.png",
      link: "https://nubank-rho.vercel.app/",
      type: "Landing Page",
      stack: ["React", "TypeScript", "Vite", "UI/UX", "Branding", "Motion"],
      featured: true,
    },
  ];

  const projectsGrid = document.getElementById("projectsGrid");
  const stackFilter = document.getElementById("stackFilter");
  const typeFilter = document.getElementById("typeFilter");
  const searchInput = document.getElementById("searchInput");
  const resetFilters = document.getElementById("resetFilters");
  const projectsCounter = document.getElementById("projectsCounter");
  const emptyState = document.getElementById("emptyState");
  const heroProjectCount = document.getElementById("heroProjectCount");

  heroProjectCount.textContent = `${projects.length}+`;

  populateFilters(projects);
  renderProjects(projects);
  initMockupSlider(projects.filter((project) => project.featured));
  revealOnScroll();
  initFilterEvents();

  function populateFilters(projectsList) {
    const allStacks = [
      ...new Set(projectsList.flatMap((project) => project.stack)),
    ].sort((a, b) => a.localeCompare(b, "pt-BR"));

    const allTypes = [
      ...new Set(projectsList.map((project) => project.type)),
    ].sort((a, b) => a.localeCompare(b, "pt-BR"));

    allStacks.forEach((stack) => {
      const option = document.createElement("option");
      option.value = stack;
      option.textContent = stack;
      stackFilter.appendChild(option);
    });

    allTypes.forEach((type) => {
      const option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      typeFilter.appendChild(option);
    });
  }

  function initFilterEvents() {
    searchInput.addEventListener("input", applyFilters);
    stackFilter.addEventListener("change", applyFilters);
    typeFilter.addEventListener("change", applyFilters);

    resetFilters.addEventListener("click", () => {
      searchInput.value = "";
      stackFilter.value = "all";
      typeFilter.value = "all";
      applyFilters();
    });
  }

  function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    const selectedStack = stackFilter.value;
    const selectedType = typeFilter.value;

    const filtered = projects.filter((project) => {
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.type.toLowerCase().includes(query) ||
        project.stack.some((item) => item.toLowerCase().includes(query));

      const matchesStack =
        selectedStack === "all" || project.stack.includes(selectedStack);

      const matchesType =
        selectedType === "all" || project.type === selectedType;

      return matchesSearch && matchesStack && matchesType;
    });

    renderProjects(filtered);
  }

  function renderProjects(projectsList) {
    projectsGrid.innerHTML = "";

    if (!projectsList.length) {
      projectsCounter.textContent = "0 projetos encontrados";
      emptyState.classList.remove("hidden");
      return;
    }

    emptyState.classList.add("hidden");
    projectsCounter.textContent = `${projectsList.length} projeto${projectsList.length > 1 ? "s" : ""} encontrado${projectsList.length > 1 ? "s" : ""}`;

    projectsList.forEach((project, index) => {
      const card = document.createElement("article");
      const direction = index % 2 === 0 ? "left" : "right";

      card.className = "card reveal";
      card.dataset.reveal = direction;
      card.style.setProperty("--delay", `${Math.min(index * 0.04, 0.24)}s`);

      const highlightedTags = project.stack.slice(0, 5);

      card.innerHTML = `
        <div class="card-media">
          <img src="${project.image}" alt="${project.title}" loading="lazy" />
          <div class="card-overlay"></div>

          <div class="card-badges">
            <span class="card-badge">${project.type}</span>
            <span class="card-badge">${project.stack[0]}</span>
          </div>
        </div>

        <div class="card-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>

          <div class="card-footer">
            <div class="tags">
              ${highlightedTags.map((tag) => `<span>${tag}</span>`).join("")}
            </div>

            <a href="${project.link}" target="_blank" class="card-link">
              Ver projeto
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      `;

      projectsGrid.appendChild(card);
    });

    initCardGlow();
    initCardTilt();
    refreshRevealObserver();
  }

  function initMockupSlider(featuredProjects) {
    const slider = document.getElementById("mockupSlider");
    const overlay = document.getElementById("mockupOverlay");
    const title = document.getElementById("mockupTitle");
    const type = document.getElementById("mockupType");

    if (!slider || !overlay || !featuredProjects.length) return;

    slider.innerHTML = featuredProjects
      .map(
        (project, index) => `
          <div class="mockup-slide ${index === 0 ? "active" : ""}">
            <img src="${project.image}" alt="${project.title}" />
          </div>
        `,
      )
      .join("");

    const slides = slider.querySelectorAll(".mockup-slide");
    let current = 0;

    updateMockupContent();

    setInterval(() => {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
      updateMockupContent();
    }, 4200);

    function updateMockupContent() {
      const currentProject = featuredProjects[current];
      overlay.href = currentProject.link;
      title.textContent = currentProject.title;
      type.textContent = currentProject.type;
    }
  }

  function initCardGlow() {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--x", `${event.clientX - rect.left}px`);
        card.style.setProperty("--y", `${event.clientY - rect.top}px`);
      });
    });
  }

  function initCardTilt() {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        if (window.innerWidth < 900) return;

        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateY = (x / rect.width - 0.5) * 7;
        const rotateX = (y / rect.height - 0.5) * -7;

        card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  function revealOnScroll() {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
      },
    );

    elements.forEach((element) => observer.observe(element));
    window.__revealObserver = observer;
  }

  function refreshRevealObserver() {
    if (window.__revealObserver) {
      window.__revealObserver.disconnect();
    }
    revealOnScroll();
  }
});
