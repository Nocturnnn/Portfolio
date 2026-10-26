document.addEventListener("DOMContentLoaded", () => {
  const i18n = window.PortfolioI18n;
  const t = (key, params) => i18n.t(key, params);
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  const catalog = window.portfolioProjects;
  const localizeProject = (project) => ({
    ...project,
    title: t(`project.${project.id}.title`),
    description: t(`project.${project.id}.description`),
  });
  let projects = catalog.map(localizeProject);
  const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const responsiveLayout = matchMedia("(max-width: 760px), (max-width: 960px) and (max-height: 580px)");
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let revealObserver;
  let searchTimer;
  const projectImage = (project) => window.portfolioImages?.[project.image] || {
    src: project.image, srcset: "", width: 1440, height: 900,
  };

  function updateHeroProjects() {
    document.querySelectorAll("[data-hero-project-index]").forEach((preview) => {
      const project = projects[Number(preview.dataset.heroProjectIndex)];
      if (!project) return;
      const link = preview.querySelector("a");
      const image = preview.querySelector("img");
      link.href = project.link;
      link.setAttribute("aria-label", t("projects.open", { title: project.title }));
      const asset = projectImage(project);
      image.srcset = asset.srcset;
      image.sizes = "(max-width: 760px) 62vw, (max-width: 960px) and (max-height: 580px) 270px, (max-width: 900px) 50vw, 36vw";
      image.width = asset.width;
      image.height = asset.height;
      image.src = asset.src;
      image.alt = project.title;
      preview.querySelector(".hero-window-bar > span").textContent = project.title.split(" — ")[0];
    });

  }
  updateHeroProjects();

  const projectsGrid = document.getElementById("projectsGrid");
  const stackFilter = document.getElementById("stackFilter");
  const typeFilter = document.getElementById("typeFilter");
  const searchInput = document.getElementById("searchInput");
  const resetFilters = document.getElementById("resetFilters");
  const projectsCounter = document.getElementById("projectsCounter");
  const projectsPagination = document.getElementById("projectsPagination");
  const emptyState = document.getElementById("emptyState");
  let projectsPerPage = responsiveLayout.matches ? 6 : 12;
  let filteredProjects = [...projects];
  let currentPage = 1;


  populateFilters(projects);
  renderProjects();
  revealOnScroll();
  initFilterEvents();
  responsiveLayout.addEventListener("change", () => {
    const firstIndex = (currentPage - 1) * projectsPerPage;
    projectsPerPage = responsiveLayout.matches ? 6 : 12;
    currentPage = Math.floor(firstIndex / projectsPerPage) + 1;
    renderProjects();
    revealOnScroll();
  });
  reducedMotion.addEventListener("change", () => revealOnScroll());
  window.addEventListener("portfolio:languagechange", () => {
    projects = catalog.map(localizeProject);
    populateFilters(projects);
    updateHeroProjects();
    applyFilters({ resetPage: false });
  });

  function populateFilters(projectsList) {
    const selectedStack = stackFilter.value || "all";
    const selectedType = typeFilter.value || "all";
    stackFilter.replaceChildren(new Option(t("filters.allStacks"), "all"));
    typeFilter.replaceChildren(new Option(t("filters.allTypes"), "all"));
    const compare = new Intl.Collator(i18n.locale).compare;
    [...new Set(projectsList.flatMap((project) => project.stack))]
      .sort((a, b) => compare(t(`tag.${a}`), t(`tag.${b}`)))
      .forEach((value) => stackFilter.appendChild(new Option(t(`tag.${value}`), value)));
    [...new Set(projectsList.map((project) => project.type))]
      .sort((a, b) => compare(t(`category.${a}`), t(`category.${b}`)))
      .forEach((value) => typeFilter.appendChild(new Option(t(`category.${value}`), value)));
    stackFilter.value = selectedStack;
    typeFilter.value = selectedType;
  }

  function initFilterEvents() {
    searchInput.addEventListener("input", () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(applyFilters, 140);
    });
    searchInput.addEventListener("search", applyFilters);
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        clearTimeout(searchTimer);
        applyFilters();
      }
    });
    stackFilter.addEventListener("change", applyFilters);
    typeFilter.addEventListener("change", applyFilters);

    resetFilters.addEventListener("click", () => {
      searchInput.value = "";
      stackFilter.value = "all";
      typeFilter.value = "all";
      applyFilters();
    });
  }

  function applyFilters(options = {}) {
    clearTimeout(searchTimer);
    const query = normalize(searchInput.value.trim());
    const selectedStack = stackFilter.value;
    const selectedType = typeFilter.value;

    filteredProjects = projects.filter((project) => {
      const searchable = [
        i18n.projectSearchText(project.id), project.title, project.description,
        project.type, t(`category.${project.type}`), ...project.stack,
        ...project.stack.map((tag) => t(`tag.${tag}`)),
      ].join(" ");
      const matchesSearch = !query || normalize(searchable).includes(query);

      const matchesStack =
        selectedStack === "all" || project.stack.includes(selectedStack);

      const matchesType =
        selectedType === "all" || project.type === selectedType;

      return matchesSearch && matchesStack && matchesType;
    });

    if (options.resetPage !== false) currentPage = 1;
    renderProjects();
  }

  function renderProjects(shouldScroll = false) {
    projectsGrid.querySelectorAll(".reveal").forEach((card) => revealObserver?.unobserve(card));
    projectsGrid.innerHTML = "";
    projectsPagination.innerHTML = "";

    const totalProjects = filteredProjects.length;
    const totalPages = Math.ceil(totalProjects / projectsPerPage);

    if (!totalProjects) {
      projectsCounter.textContent = t("projects.emptyCounter");
      emptyState.classList.remove("hidden");
      projectsPagination.classList.add("hidden");
      refreshRevealObserver();
      return;
    }

    if (currentPage > totalPages) currentPage = totalPages;

    emptyState.classList.add("hidden");
    projectsPagination.classList.toggle("hidden", totalPages <= 1);

    const pageStart = (currentPage - 1) * projectsPerPage;
    const pageEnd = Math.min(pageStart + projectsPerPage, totalProjects);
    const pageProjects = filteredProjects.slice(pageStart, pageEnd);

    projectsCounter.textContent = totalProjects === 1 ? t("projects.one") : t("projects.count", { start: pageStart + 1, end: pageEnd, total: totalProjects });

    pageProjects.forEach((project, index) => {
      const card = document.createElement("article");
      const direction = index % 2 === 0 ? "left" : "right";

      card.className = "card reveal";
      card.dataset.reveal = direction;
      card.style.setProperty("--delay", `${Math.min(index * 0.04, 0.24)}s`);

      const highlightedTags = project.stack.slice(0, 5);
      const asset = projectImage(project);

      card.innerHTML = `
        <div class="card-media">
          <img src="${escapeHtml(asset.src)}" srcset="${escapeHtml(asset.srcset)}" sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 960px) and (max-height: 580px) 660px, (max-width: 1100px) 44vw, 420px" width="${asset.width}" height="${asset.height}" alt="${escapeHtml(project.title)}" loading="lazy" decoding="async" />
          <div class="card-overlay"></div>

          <div class="card-badges">
            <span class="card-badge">${escapeHtml(t(`category.${project.type}`))}</span>
            <span class="card-badge">${escapeHtml(t(`tag.${project.stack[0]}`))}</span>
          </div>
        </div>

        <div class="card-content">
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.description)}</p>

          <div class="card-footer">
            <div class="tags">
              ${highlightedTags.map((tag) => `<span>${escapeHtml(t(`tag.${tag}`))}</span>`).join("")}
            </div>

            <a href="${escapeHtml(project.link)}" target="_blank" rel="noopener noreferrer" class="card-link" aria-label="${escapeHtml(t("projects.open", { title: project.title }))}">
              ${escapeHtml(t("projects.link"))}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      `;

      projectsGrid.appendChild(card);
    });

    renderPagination(totalPages);
    initCardGlow();
    initCardTilt();
    refreshRevealObserver();

    if (shouldScroll) {
      document
        .getElementById("projetos")
        .scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
    }
  }

  function renderPagination(totalPages) {
    if (totalPages <= 1) return;

    const firstButton = createPaginationButton(t("pagination.first"), 1, {
      disabled: currentPage === 1,
      label: t("pagination.firstLabel"), edge: true,
    });

    const previousButton = createPaginationButton(t("pagination.previous"), currentPage - 1, {
      disabled: currentPage === 1,
      label: t("pagination.previousLabel"),
    });

    const nextButton = createPaginationButton(t("pagination.next"), currentPage + 1, {
      disabled: currentPage === totalPages,
      label: t("pagination.nextLabel"),
    });

    const lastButton = createPaginationButton(t("pagination.last"), totalPages, {
      disabled: currentPage === totalPages,
      label: t("pagination.lastLabel"), edge: true,
    });

    projectsPagination.appendChild(firstButton);
    projectsPagination.appendChild(previousButton);
    const summary = document.createElement("span");
    summary.className = "pagination-summary";
    summary.textContent = `${currentPage} / ${totalPages}`;
    summary.setAttribute("aria-label", t("pagination.summary", { page: currentPage, total: totalPages }));
    projectsPagination.appendChild(summary);

    getVisiblePages(totalPages).forEach((page) => {
      if (page === "...") {
        const ellipsis = document.createElement("span");
        ellipsis.className = "pagination-ellipsis";
        ellipsis.textContent = "...";
        projectsPagination.appendChild(ellipsis);
        return;
      }

      const pageButton = createPaginationButton(page, page, {
        active: page === currentPage,
        label: t("pagination.page", { page }),
      });

      projectsPagination.appendChild(pageButton);
    });

    projectsPagination.appendChild(nextButton);
    projectsPagination.appendChild(lastButton);
  }

  function createPaginationButton(text, page, options = {}) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = text;
    button.className = typeof text === "number" ? "pagination-page" :
      (options.edge ? "pagination-edge" : "pagination-direction");
    button.disabled = Boolean(options.disabled);
    button.setAttribute("aria-label", options.label);

    if (options.active) {
      button.classList.add("active");
      button.setAttribute("aria-current", "page");
    }

    button.addEventListener("click", () => {
      if (button.disabled || page === currentPage) return;
      currentPage = page;
      renderProjects(true);
      const replacement = [...projectsPagination.querySelectorAll("button")].find(
        (item) => item.getAttribute("aria-label") === options.label && !item.disabled,
      ) || projectsPagination.querySelector(".pagination-direction:not(:disabled)");
      replacement?.focus({ preventScroll: true });
    });

    return button;
  }

  function getVisiblePages(totalPages) {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages = new Set([1, totalPages, currentPage]);

    if (currentPage > 1) pages.add(currentPage - 1);
    if (currentPage < totalPages) pages.add(currentPage + 1);
    if (currentPage <= 3) pages.add(2).add(3).add(4);
    if (currentPage >= totalPages - 2) {
      pages.add(totalPages - 1).add(totalPages - 2).add(totalPages - 3);
    }

    return [...pages]
      .filter((page) => page >= 1 && page <= totalPages)
      .sort((a, b) => a - b)
      .reduce((items, page, index, sortedPages) => {
        if (index > 0 && page - sortedPages[index - 1] > 1) {
          items.push("...");
        }

        items.push(page);
        return items;
      }, []);
  }

  function initCardGlow() {
    if (responsiveLayout.matches || !finePointer.matches || reducedMotion.matches) return;
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
    if (responsiveLayout.matches || !finePointer.matches || reducedMotion.matches) return;
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

  function revealOnScroll(root = document) {
    const elements = root.querySelectorAll(".reveal:not(.active)");
    if (responsiveLayout.matches || reducedMotion.matches || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("active"));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: .08 });
    }
    elements.forEach((element) => revealObserver.observe(element));
  }

  function refreshRevealObserver() {
    revealOnScroll(projectsGrid);
  }
});
