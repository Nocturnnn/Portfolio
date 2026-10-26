(function () {
  "use strict";
  const routing = window.PortfolioLocale;
  const initial = document.getElementById("initial-locale");
  const base = new URL("./", document.baseURI);
  const cache = new Map();
  const requests = new Map();
  let locale = document.documentElement.lang === "en" ? "en" : "pt-BR";
  let dictionary = JSON.parse(initial.textContent);
  let revision = 0;
  cache.set(locale, dictionary);

  function format(value, params = {}) {
    return value.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? `{${key}}`));
  }
  function t(key, params) {
    return format(dictionary[key] ?? `[${key}]`, params);
  }
  function languageUrl(next, hash = location.hash) {
    const url = new URL(routing.slug(next) + "/", base);
    url.search = location.search;
    url.hash = hash;
    return url;
  }
  function load(next) {
    if (cache.has(next)) return Promise.resolve(cache.get(next));
    if (requests.has(next)) return requests.get(next);
    const request = fetch(new URL(`locales/${next}.json`, base), { credentials: "same-origin" })
      .then((response) => {
        if (!response.ok) throw new Error("Translation unavailable");
        return response.json();
      }).then((data) => {
        if (Object.keys(dictionary).some((key) => typeof data[key] !== "string")) throw new Error("Incomplete translation");
        cache.set(next, data);
        return data;
      }).finally(() => requests.delete(next));
    requests.set(next, request);
    return request;
  }
  function applyText(root = document) {
    root.querySelectorAll("[data-i18n-text]").forEach((element) => {
      element.dataset.i18nText.split("|").forEach((binding) => {
        const split = binding.indexOf(":");
        const child = element.childNodes[Number(binding.slice(0, split))];
        if (child?.nodeType === Node.TEXT_NODE) {
          child.nodeValue = child.nodeValue.replace(/\S[\s\S]*\S|\S/, t(binding.slice(split + 1)));
        }
      });
    });
    root.querySelectorAll("[data-i18n-attributes]").forEach((element) => {
      element.dataset.i18nAttributes.split("|").forEach((binding) => {
        const split = binding.indexOf("=");
        element.setAttribute(binding.slice(0, split), t(binding.slice(split + 1)));
      });
    });
  }
  function updateMetadata() {
    document.title = t("seo.title");
    const canonical = `https://nocturnnn.github.io/Portfolio/${routing.slug(locale)}/`;
    const fields = {
      'meta[name="description"]': t("seo.description"),
      'meta[property="og:title"]': t("seo.title"),
      'meta[property="og:description"]': t("seo.description"),
      'meta[property="og:url"]': canonical,
      'meta[property="og:locale"]': locale === "pt-BR" ? "pt_BR" : "en_US",
      'meta[property="og:locale:alternate"]': locale === "pt-BR" ? "en_US" : "pt_BR",
      'meta[property="og:image:alt"]': t("seo.imageAlt"),
      'meta[name="twitter:title"]': t("seo.title"),
      'meta[name="twitter:description"]': t("seo.description"),
      'meta[name="twitter:image:alt"]': t("seo.imageAlt"),
    };
    Object.entries(fields).forEach(([selector, value]) => document.querySelector(selector)?.setAttribute("content", value));
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", canonical);
    const schema = document.getElementById("structured-data");
    if (schema) {
      const data = JSON.parse(schema.textContent);
      data["@graph"].forEach((node) => {
        if (node["@type"] === "Person") node.jobTitle = t("seo.jobTitle");
        if (node["@type"] === "WebPage") {
          node["@id"] = canonical + "#page";
          Object.assign(node, { name: t("seo.title"), description: t("seo.description"), inLanguage: locale, url: canonical });
        }
        if (node["@type"] === "ItemList") node.itemListElement.forEach((item) => {
          item.item.name = t(`project.${item.item.identifier}.title`);
        });
      });
      schema.textContent = JSON.stringify(data);
    }
  }
  function apply() {
    document.documentElement.lang = locale;
    applyText();
    document.querySelectorAll("[data-section-link]").forEach((link) => {
      link.href = languageUrl(locale, link.dataset.sectionLink).href;
    });
    document.querySelectorAll("[data-locale-switch]").forEach((link) => {
      link.href = languageUrl(link.dataset.localeSwitch).href;
      if (link.dataset.localeSwitch === locale) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    document.querySelectorAll("[data-contact-email]").forEach((link) => {
      link.href = `mailto:mateus.vitor2352@gmail.com?subject=${encodeURIComponent(t("contact.emailSubject"))}`;
    });
    updateMetadata();
    window.dispatchEvent(new CustomEvent("portfolio:languagechange", { detail: { locale } }));
  }
  async function change(next, { remember = true, historyMode = "push" } = {}) {
    if (!routing.supported.includes(next)) return;
    const ticket = ++revision;
    const status = document.getElementById("language-status");
    status.textContent = t("language.loading");
    status.classList.remove("has-error");
    document.querySelectorAll("[data-locale-switch]").forEach((link) => link.setAttribute("aria-busy", "true"));
    try {
      const data = await load(next);
      if (ticket !== revision) return;
      dictionary = data;
      locale = next;
      if (remember) {
        try { localStorage.setItem(routing.storageKey, locale); } catch (_) { /* Switching still works without persistence. */ }
      }
      const target = languageUrl(locale);
      if (historyMode === "push" && target.href !== location.href) history.pushState({}, "", target.href);
      apply();
      status.textContent = "";
    } catch (_) {
      if (ticket === revision) {
        status.textContent = t("language.error");
        status.classList.add("has-error");
      }
    } finally {
      if (ticket === revision) document.querySelectorAll("[data-locale-switch]").forEach((link) => link.removeAttribute("aria-busy"));
    }
  }
  window.PortfolioI18n = {
    t, change, applyText,
    get locale() { return locale; },
    projectSearchText(id) {
      return [...cache.values()].flatMap((data) => [data[`project.${id}.title`], data[`project.${id}.description`]]).join(" ");
    },
  };
  document.addEventListener("DOMContentLoaded", () => {
    apply();
    document.querySelectorAll("[data-locale-switch]").forEach((link) => {
      link.addEventListener("click", (event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        change(link.dataset.localeSwitch);
      });
      link.addEventListener("pointerenter", () => load(link.dataset.localeSwitch).catch(() => {}), { once: true });
      link.addEventListener("focus", () => load(link.dataset.localeSwitch).catch(() => {}), { once: true });
    });
  });
  window.addEventListener("popstate", () => {
    const next = routing.routeLocale(location.pathname, base.pathname);
    if (next && next !== locale) change(next, { remember: false, historyMode: "none" });
  });
})();
