const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const routing = require("../js/locale-bootstrap.js");

for (const [languages, expected] of [
  [["pt-BR", "en"], "pt-BR"], [["pt-PT"], "pt-BR"], [["PT-br"], "pt-BR"],
  [["en-GB", "pt-BR"], "en"], [["fr-FR", "pt-BR"], "en"], [["ja-JP"], "en"], [[], "en"], [undefined, "en"],
]) test(`browser language ${JSON.stringify(languages)} → ${expected}`, () => assert.equal(routing.detect(null, languages), expected));

test("a saved manual choice takes precedence", () => {
  assert.equal(routing.detect("en", ["pt-BR"]), "en");
  assert.equal(routing.detect("pt-BR", ["en-US"]), "pt-BR");
  assert.equal(routing.detect("invalid", ["pt-BR"]), "pt-BR");
});

test("localized routes work with both repository and root base paths", () => {
  assert.equal(routing.routeLocale("/Portfolio/en/", "/Portfolio/"), "en");
  assert.equal(routing.routeLocale("/Portfolio/pt/index.html", "/Portfolio/"), "pt-BR");
  assert.equal(routing.routeLocale("/en/", "/"), "en");
  assert.equal(routing.routeLocale("/Portfolio/projetos/example/", "/Portfolio/"), null);
  assert.equal(routing.routeLocale("/Elsewhere/en/", "/Portfolio/"), null);
});

function bootstrap({ path = "/Portfolio/", language = "en-US", saved, blockedStorage = false } = {}) {
  let redirected;
  const document = { currentScript: { src: "https://example.test/Portfolio/js/locale-bootstrap.js" } };
  const location = { pathname: path, search: "?utm_source=community", hash: "#projetos", replace(value) { redirected = value; } };
  const context = { URL, document, location, navigator: { languages: [language] }, localStorage: { getItem() { if (blockedStorage) throw new Error("Blocked"); return saved; } }, window: { document } };
  vm.runInNewContext(fs.readFileSync(require.resolve("../js/locale-bootstrap.js"), "utf8"), context);
  return redirected;
}
test("entry routing keeps campaign parameters and section hash", () => {
  assert.equal(bootstrap({ language: "pt-BR" }), "https://example.test/Portfolio/pt/?utm_source=community#projetos");
  assert.equal(bootstrap({ language: "de-DE" }), "https://example.test/Portfolio/en/?utm_source=community#projetos");
});
test("explicit shared URLs are never overridden by stored preferences", () => {
  assert.equal(bootstrap({ path: "/Portfolio/en/", saved: "pt-BR", language: "pt-BR" }), undefined);
  assert.equal(bootstrap({ path: "/Portfolio/pt/", saved: "en" }), undefined);
});
test("blocked storage still permits automatic browser detection", () => {
  assert.match(bootstrap({ language: "pt-BR", blockedStorage: true }), /\/pt\/\?/);
});
test("unrelated project routes are not redirected", () => {
  assert.equal(bootstrap({ path: "/Portfolio/projetos/monarch/" }), undefined);
});
