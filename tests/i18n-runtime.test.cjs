const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const routing = require("../js/locale-bootstrap.js");
const pt = require("../locales/pt-BR.json");
const en = require("../locales/en.json");

function fixture({ failedFetch = false, blockedStorage = false, incompleteTranslation = false } = {}) {
  function element(dataset = {}) {
    const attrs = {};
    const classes = new Set();
    return { dataset, attrs, textContent: "", childNodes: [], setAttribute(k,v) { attrs[k] = v; }, removeAttribute(k) { delete attrs[k]; }, addEventListener() {}, classList: { add(k) { classes.add(k); }, remove(k) { classes.delete(k); }, contains(k) { return classes.has(k); } } };
  }
  const copy = element({ i18nText: "0:hero.projects" });
  copy.childNodes = [{ nodeType: 3, nodeValue: " Ver projetos " }];
  const section = element({ sectionLink: "#sobre" });
  const links = [element({ localeSwitch: "pt-BR" }), element({ localeSwitch: "en" })];
  const contact = element();
  const status = element();
  const meta = element();
  const callbacks = {}, saved = {}, fetches = [];
  let pushes = 0;
  const location = new URL("https://example.test/Portfolio/pt/#sobre");
  const document = {
    baseURI: "https://example.test/Portfolio/", documentElement: { lang: "pt-BR" }, title: "",
    getElementById(id) { return id === "initial-locale" ? { textContent: JSON.stringify(pt) } : id === "language-status" ? status : null; },
    querySelector() { return meta; },
    querySelectorAll(selector) { return ({ "[data-i18n-text]": [copy], "[data-i18n-attributes]": [], "[data-section-link]": [section], "[data-locale-switch]": links, "[data-contact-email]": [contact] })[selector] || []; },
    addEventListener(name, callback) { callbacks[name] = callback; },
  };
  const window = { PortfolioLocale: routing, dispatchEvent() {}, addEventListener() {} };
  vm.runInNewContext(fs.readFileSync(require.resolve("../js/i18n.js"), "utf8"), {
    window, document, location, URL, Node: { TEXT_NODE: 3 }, CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } },
    history: { pushState(_, __, value) { pushes++; Object.assign(location, {}); location.href = value; } },
    localStorage: { setItem(key, value) { if (blockedStorage) throw new Error("Blocked"); saved[key] = value; } },
    fetch: async (url) => { fetches.push(url.href); return { ok: !failedFetch, json: async () => {
      if (!incompleteTranslation) return en;
      const partial = { ...en }; delete partial["hero.projects"]; return partial;
    } }; },
  });
  callbacks.DOMContentLoaded();
  return { api: window.PortfolioI18n, document, copy, section, links, status, contact, saved, fetches, get pushes() { return pushes; }, location };
}
test("manual switching is atomic, localized and uses history rather than a reload", async () => {
  const app = fixture();
  await app.api.change("en");
  assert.equal(app.document.documentElement.lang, "en");
  assert.equal(app.copy.childNodes[0].nodeValue, " View projects ");
  assert.equal(app.document.title, en["seo.title"]);
  assert.equal(app.saved[routing.storageKey], "en");
  assert.equal(app.links[1].attrs["aria-current"], "page");
  assert.equal(app.section.href, "https://example.test/Portfolio/en/#sobre");
  assert.equal(app.pushes, 1);
  assert.match(app.contact.href, /^mailto:mateus\.vitor2352@gmail\.com\?subject=Web/);
});
test("the embedded initial locale is reused and other translations are cached", async () => {
  const app = fixture();
  await app.api.change("en"); await app.api.change("pt-BR"); await app.api.change("en");
  assert.equal(app.fetches.length, 1);
  assert.equal(app.fetches[0], "https://example.test/Portfolio/locales/en.json");
  assert.match(app.api.projectSearchText("a-casa-da-meia-noite"), /Mistério/);
  assert.match(app.api.projectSearchText("a-casa-da-meia-noite"), /Interactive Mystery/);
});
test("a failed translation request retains the working language and explains the failure", async () => {
  const app = fixture({ failedFetch: true });
  await app.api.change("en");
  assert.equal(app.api.locale, "pt-BR");
  assert.equal(app.document.documentElement.lang, "pt-BR");
  assert.equal(app.pushes, 0);
  assert.equal(app.status.textContent, pt["language.error"]);
  assert.equal(app.status.classList.contains("has-error"), true);
});
test("storage restrictions do not break manual switching", async () => {
  const app = fixture({ blockedStorage: true });
  await app.api.change("en");
  assert.equal(app.api.locale, "en");
  assert.equal(app.document.documentElement.lang, "en");
});
test("unsupported language requests leave the current state untouched", async () => {
  const app = fixture(); await app.api.change("de");
  assert.equal(app.fetches.length, 0); assert.equal(app.api.locale, "pt-BR");
});
test("a rapid second choice wins over an outstanding first request", async () => {
  const app = fixture();
  await Promise.all([app.api.change("en"), app.api.change("pt-BR")]);
  assert.equal(app.api.locale, "pt-BR");
  assert.equal(app.saved[routing.storageKey], "pt-BR");
  assert.equal(app.status.textContent, "");
});
test("incomplete translations are rejected instead of showing mixed content", async () => {
  const app = fixture({ incompleteTranslation: true });
  await app.api.change("en");
  assert.equal(app.api.locale, "pt-BR");
  assert.equal(app.copy.childNodes[0].nodeValue, " Ver projetos ");
  assert.equal(app.status.textContent, pt["language.error"]);
});
