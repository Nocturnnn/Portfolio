/* Small, synchronous router: runs in the head before the first body paint. */
(function (global) {
  "use strict";
  const supported = ["pt-BR", "en"];
  const storageKey = "portfolio.language";
  function detect(saved, languages) {
    if (supported.includes(saved)) return saved;
    const primary = Array.isArray(languages) ? languages[0] : languages;
    return typeof primary === "string" && /^pt(?:-|$)/i.test(primary) ? "pt-BR" : "en";
  }
  function routeLocale(pathname, basePath) {
    if (!pathname.startsWith(basePath)) return null;
    const path = pathname.slice(basePath.length).replace(/index\.html$/, "");
    return path === "pt/" ? "pt-BR" : path === "en/" ? "en" : null;
  }
  function slug(locale) { return locale === "pt-BR" ? "pt" : "en"; }
  const api = { supported, storageKey, detect, routeLocale, slug };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!global.document) return;
  global.PortfolioLocale = api;
  const base = new URL("../", document.currentScript.src);
  const explicit = routeLocale(location.pathname, base.pathname);
  if (explicit) return; // A shared localized URL always keeps its own language.
  const isEntry = location.pathname === base.pathname || location.pathname === base.pathname + "index.html";
  if (!isEntry) return;
  let saved;
  try { saved = localStorage.getItem(storageKey); } catch (_) { /* Storage may be unavailable. */ }
  const locale = detect(saved, navigator.languages?.length ? navigator.languages : navigator.language);
  const target = new URL(slug(locale) + "/", base);
  target.search = location.search;
  target.hash = location.hash;
  location.replace(target.href);
})(typeof window !== "undefined" ? window : globalThis);
