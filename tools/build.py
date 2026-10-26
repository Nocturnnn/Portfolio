"""Generate PT/EN static pages from one template. Python standard library only."""
from pathlib import Path
from html import escape
from urllib.parse import urljoin
import json
import re

from html_tree import Node, parse, fragment

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://nocturnnn.github.io/Portfolio/"
LOCALES = {"pt-BR": "pt", "en": "en"}


def read_json(path):
    return json.loads((ROOT / path).read_text(encoding="utf-8"))


def translate(data, key, **params):
    value = data[key]
    return re.sub(r"\{(\w+)\}", lambda match: str(params.get(match[1], match[0])), value)


def validate_locales(locales):
    primary = locales["pt-BR"]
    for locale, data in locales.items():
        if set(data) != set(primary):
            raise ValueError(f"Translation key mismatch in {locale}: {set(data) ^ set(primary)}")
        for key, value in data.items():
            if not isinstance(value, str) or not value.strip():
                raise ValueError(f"Invalid translation: {locale}/{key}")
            if sorted(re.findall(r"\{\w+\}", value)) != sorted(re.findall(r"\{\w+\}", primary[key])):
                raise ValueError(f"Placeholder mismatch: {locale}/{key}")


def cards_html(projects, data, images):
    result = []
    for index, project in enumerate(projects):
        t = lambda key, **params: escape(translate(data, key, **params))
        asset = images.get(project["image"], {"src": project["image"], "srcset": "", "width": 1440, "height": 900})
        title = t(f"project.{project['id']}.title")
        tags = "".join(f"<span>{t('tag.' + tag)}</span>" for tag in project["stack"][:5])
        hidden = " hidden" if index >= 12 else ""
        result.append(f'''<article class="card reveal" data-prerendered data-reveal="bottom"{hidden}>
          <div class="card-media"><img src="{escape(asset['src'])}" srcset="{escape(asset['srcset'])}" sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 960px) and (max-height: 580px) 660px, (max-width: 1100px) 44vw, 420px" width="{asset['width']}" height="{asset['height']}" alt="{title}" loading="lazy" decoding="async"><div class="card-overlay"></div><div class="card-badges"><span class="card-badge">{t('category.' + project['type'])}</span><span class="card-badge">{t('tag.' + project['stack'][0])}</span></div></div>
          <div class="card-content"><h3>{title}</h3><p>{t(f"project.{project['id']}.description")}</p><div class="card-footer"><div class="tags">{tags}</div><a href="{escape(project['link'], quote=True)}" target="_blank" rel="noopener noreferrer" class="card-link" aria-label="{t('projects.open', title=data[f"project.{project['id']}.title"])}">{t('projects.link')} <span aria-hidden="true">→</span></a></div></div>
        </article>''')
    return "\n".join(result)


def structured_data(locale, data, projects):
    canonical = SITE + LOCALES[locale] + "/"
    person = {"@type": "Person", "@id": SITE + "#person", "name": "Mateus Vitor", "url": SITE, "jobTitle": data["seo.jobTitle"], "sameAs": ["https://github.com/Nocturnnn", "https://www.linkedin.com/in/mateus-vitor-2a3ba7335/"], "knowsAbout": ["React", "Next.js", "TypeScript", "Web Design", "UI/UX", "Web accessibility"], "alumniOf": {"@type": "CollegeOrUniversity", "name": "Universidade Pitágoras Unopar Anhanguera"}}
    listing = {"@type": "ItemList", "@id": SITE + "#projects", "numberOfItems": len(projects), "itemListElement": [{"@type": "ListItem", "position": i + 1, "item": {"@type": "CreativeWork", "identifier": p["id"], "name": data[f"project.{p['id']}.title"], "url": urljoin(SITE, p["link"]), "creator": {"@id": SITE + "#person"}}} for i, p in enumerate(projects)]}
    return {"@context": "https://schema.org", "@graph": [person, {"@type": "WebSite", "@id": SITE + "#website", "url": SITE, "name": "Mateus Vitor — Portfolio", "inLanguage": ["pt-BR", "en"]}, {"@type": "WebPage", "@id": canonical + "#page", "url": canonical, "name": data["seo.title"], "description": data["seo.description"], "inLanguage": locale, "about": {"@id": SITE + "#person"}, "mainEntity": {"@id": SITE + "#projects"}}, listing, {"@type": "WebApplication", "name": "NocturnShop", "url": "https://www.nocturnshop.com/", "creator": {"@id": SITE + "#person"}, "applicationCategory": "BusinessApplication"}]}


def render(locale, data, projects, images, entry=False):
    tree = parse((ROOT / "templates/index.html").read_text(encoding="utf-8"))
    canonical = SITE + LOCALES[locale] + "/"
    head = next(n for n in tree.walk() if n.tag == "head")
    base = next(n for n in tree.walk() if n.tag == "base")
    base.attrs["href"] = "./" if entry else "../"
    for element in tree.walk():
        if element.tag == "html": element.attrs["lang"] = locale
        if element.tag == "title": element.children = [Node(text=data["seo.title"])]
        if element.tag == "meta" and element.attrs.get("name") == "description": element.attrs["content"] = data["seo.description"]
        for binding in element.attrs.get("data-i18n-text", "").split("|"):
            if not binding: continue
            index, key = binding.split(":", 1)
            child = element.children[int(index)]
            child.text = re.sub(r"\S[\s\S]*\S|\S", lambda _: data[key], child.text)
        for binding in element.attrs.get("data-i18n-attributes", "").split("|"):
            if binding:
                attr, key = binding.split("=", 1)
                element.attrs[attr] = data[key]
        if element.attrs.get("data-section-link"):
            element.attrs["href"] = LOCALES[locale] + "/" + element.attrs["data-section-link"]
        if "data-locale-switch" in element.attrs:
            selected = element.attrs["data-locale-switch"]
            element.attrs["href"] = LOCALES[selected] + "/"
            if selected == locale: element.attrs["aria-current"] = "page"
        if element.attrs.get("id") == "projectsGrid": element.children = fragment(cards_html(projects, data, images))
        if element.attrs.get("id") == "projectsCounter": element.children = [Node(text=translate(data, "projects.count", start=1, end=min(12, len(projects)), total=len(projects)))]
    # Router is synchronous and early; localized routes do not redirect.
    head.children.insert(1, Node("script", [("src", "js/locale-bootstrap.js")]))
    meta = lambda attr, name, value: f'<meta {attr}="{name}" content="{escape(value, quote=True)}">'
    seo = [f'<link rel="canonical" href="{canonical}">', f'<link rel="alternate" hreflang="pt-BR" href="{SITE}pt/">', f'<link rel="alternate" hreflang="en" href="{SITE}en/">', f'<link rel="alternate" hreflang="x-default" href="{SITE}">']
    for attr, name, value in [
        ("property", "og:type", "website"), ("property", "og:site_name", "Mateus Vitor"), ("property", "og:title", data["seo.title"]), ("property", "og:description", data["seo.description"]), ("property", "og:url", canonical), ("property", "og:locale", "pt_BR" if locale == "pt-BR" else "en_US"), ("property", "og:locale:alternate", "en_US" if locale == "pt-BR" else "pt_BR"), ("property", "og:image", SITE + "assets/social/portfolio.png"), ("property", "og:image:type", "image/png"), ("property", "og:image:width", "1200"), ("property", "og:image:height", "630"), ("property", "og:image:alt", data["seo.imageAlt"]), ("name", "twitter:card", "summary_large_image"), ("name", "twitter:title", data["seo.title"]), ("name", "twitter:description", data["seo.description"]), ("name", "twitter:image", SITE + "assets/social/portfolio.png"), ("name", "twitter:image:alt", data["seo.imageAlt"]), ("name", "robots", "index,follow,max-image-preview:large")]:
        seo.append(meta(attr, name, value))
    head.children.extend(fragment("\n" + "\n".join(seo)))
    schema = json.dumps(structured_data(locale, data, projects), ensure_ascii=False, separators=(",", ":")).replace("<", "\\u003c")
    head.children.append(Node("script", [("type", "application/ld+json"), ("id", "structured-data")]))
    head.children[-1].children = [Node(text=schema, raw=True)]
    body = next(n for n in tree.walk() if n.tag == "body")
    initial = Node("script", [("id", "initial-locale"), ("type", "application/json")])
    initial.children = [Node(text=json.dumps(data, ensure_ascii=False, separators=(",", ":")).replace("<", "\\u003c"), raw=True)]
    body.children.append(initial)
    return "\n".join(line.rstrip() for line in tree.html().splitlines()).rstrip() + "\n"


def build():
    locales = {key: read_json(f"locales/{key}.json") for key in LOCALES}
    validate_locales(locales)
    projects = read_json("data/projects.json")
    raw = (ROOT / "js/project-images.js").read_text(encoding="utf-8")
    images = json.loads(raw[raw.index("{"):raw.rindex("}") + 1])
    for locale, slug in LOCALES.items():
        directory = ROOT / slug
        directory.mkdir(exist_ok=True)
        (directory / "index.html").write_text(render(locale, locales[locale], projects, images), encoding="utf-8")
    (ROOT / "index.html").write_text(render("pt-BR", locales["pt-BR"], projects, images, entry=True), encoding="utf-8")
    (ROOT / "js/projects-data.js").write_text("// Generated from data/projects.json by tools/build.py.\nwindow.portfolioProjects = " + json.dumps(projects, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    alternates = "".join(f'<xhtml:link rel="alternate" hreflang="{key}" href="{SITE}{slug}/" />' for key, slug in LOCALES.items()) + f'<xhtml:link rel="alternate" hreflang="x-default" href="{SITE}" />'
    urls = "".join(f"<url><loc>{url}</loc>{alternates}</url>" for url in (SITE, SITE + "pt/", SITE + "en/"))
    (ROOT / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">' + urls + "</urlset>\n", encoding="utf-8")
    (ROOT / "robots.txt").write_text("User-agent: *\nAllow: /\nSitemap: " + SITE + "sitemap.xml\n", encoding="utf-8")
    (ROOT / ".nojekyll").touch()
    print(f"Built /, /pt/ and /en/: {len(projects)} projects, {len(locales['en'])} translation keys per language.")


if __name__ == "__main__":
    build()
