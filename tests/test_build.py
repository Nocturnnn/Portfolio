import json
from pathlib import Path
import re
import sys
import unittest
import struct
from collections import Counter

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "tools"))
from build import LOCALES, SITE, read_json, render, structured_data, validate_locales
from html_tree import parse


class StaticBuildTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.locales = {locale: read_json(f"locales/{locale}.json") for locale in LOCALES}
        cls.projects = read_json("data/projects.json")
        raw = (ROOT / "js/project-images.js").read_text(encoding="utf-8")
        cls.images = json.loads(raw[raw.index("{"):raw.rindex("}") + 1])

    def test_keys_and_placeholders_match(self):
        validate_locales(self.locales)
        self.assertGreaterEqual(len(self.locales["en"]), 300)

    def test_missing_keys_are_rejected(self):
        broken = {locale: dict(data) for locale, data in self.locales.items()}
        broken["en"].pop("hero.projects")
        with self.assertRaisesRegex(ValueError, "key mismatch"):
            validate_locales(broken)

    def test_every_project_category_and_tag_is_translated(self):
        for data in self.locales.values():
            for project in self.projects:
                for key in [f"project.{project['id']}.title", f"project.{project['id']}.description", "category." + project["type"], *["tag." + tag for tag in project["stack"]]]:
                    self.assertIn(key, data)
                    self.assertTrue(data[key].strip())

    def test_original_project_urls_and_images_are_preserved(self):
        previous = json.loads((ROOT / "tests/fixtures/project-links.json").read_text(encoding="utf-8"))
        current = {(p["image"], p["link"]) for p in self.projects}
        self.assertEqual(len(previous), 45)
        for project in previous:
            self.assertIn((project["image"], project["link"]), current)

    def test_generated_pages_are_current(self):
        for locale, slug in LOCALES.items():
            self.assertEqual((ROOT / slug / "index.html").read_text(encoding="utf-8"), render(locale, self.locales[locale], self.projects, self.images))
        self.assertEqual((ROOT / "index.html").read_text(encoding="utf-8"), render("pt-BR", self.locales["pt-BR"], self.projects, self.images, entry=True))

    def test_static_pages_contain_all_projects_before_javascript(self):
        for slug in LOCALES.values():
            tree = parse((ROOT / slug / "index.html").read_text(encoding="utf-8"))
            cards = [node for node in tree.walk() if node.tag == "article" and "card" in node.attrs.get("class", "").split()]
            self.assertEqual(len(cards), len(self.projects))
            counter = next(node for node in tree.walk() if node.attrs.get("id") == "projectsCounter")
            text = "".join(child.text or "" for child in counter.children)
            self.assertIn("45", text)
            self.assertNotEqual(text.strip(), "0 projetos encontrados")

    def test_ids_anchors_and_translation_bindings(self):
        for locale, slug in LOCALES.items():
            data = self.locales[locale]
            tree = parse((ROOT / slug / "index.html").read_text(encoding="utf-8"))
            ids = [n.attrs["id"] for n in tree.walk() if "id" in n.attrs]
            self.assertTrue(all(count == 1 for count in Counter(ids).values()))
            for node in tree.walk():
                if "data-section-link" in node.attrs:
                    self.assertIn(node.attrs["data-section-link"][1:], ids)
                    self.assertEqual(node.attrs["href"], slug + "/" + node.attrs["data-section-link"])
                for binding in node.attrs.get("data-i18n-text", "").split("|"):
                    if not binding: continue
                    index, key = binding.split(":", 1)
                    self.assertEqual(node.children[int(index)].text.strip(), data[key])
                for binding in node.attrs.get("data-i18n-attributes", "").split("|"):
                    if not binding: continue
                    attr, key = binding.split("=", 1)
                    self.assertEqual(node.attrs[attr], data[key])

    def test_metadata_and_structured_data(self):
        for locale, slug in LOCALES.items():
            tree = parse((ROOT / slug / "index.html").read_text(encoding="utf-8"))
            html = next(n for n in tree.walk() if n.tag == "html")
            self.assertEqual(html.attrs["lang"], locale)
            links = [n for n in tree.walk() if n.tag == "link"]
            self.assertTrue(any(n.attrs.get("rel") == "canonical" and n.attrs.get("href") == SITE + slug + "/" for n in links))
            self.assertEqual({n.attrs["hreflang"] for n in links if "hreflang" in n.attrs}, {"pt-BR", "en", "x-default"})
            schema = structured_data(locale, self.locales[locale], self.projects)
            listing = next(n for n in schema["@graph"] if n["@type"] == "ItemList")
            self.assertEqual(listing["numberOfItems"], 45)
            self.assertEqual(len(listing["itemListElement"]), 45)

    def test_local_assets_and_responsive_sources_exist(self):
        tree = parse((ROOT / "en/index.html").read_text(encoding="utf-8"))
        for node in tree.walk():
            paths = []
            if node.tag in ("img", "script") and node.attrs.get("src"): paths.append(node.attrs["src"])
            if node.tag == "link" and node.attrs.get("rel") in ("stylesheet", "preload", "shortcut icon"): paths.append(node.attrs["href"])
            if node.attrs.get("srcset"): paths.extend(item.strip().split(" ")[0] for item in node.attrs["srcset"].split(","))
            for path in paths:
                self.assertTrue((ROOT / path).is_file(), path)
        image = (ROOT / "assets/social/portfolio.png").read_bytes()
        self.assertEqual(image[:8], b"\x89PNG\r\n\x1a\n")
        self.assertEqual(struct.unpack(">II", image[16:24]), (1200, 630))

    def test_english_has_no_known_portuguese_interface_labels(self):
        tree = parse((ROOT / "en/index.html").read_text(encoding="utf-8"))
        visible_text = " ".join(node.text or "" for node in tree.walk() if not node.raw)
        for phrase in ("Ver projetos", "Limpar filtros", "Graduação concluída", "Pausar movimento", "Voltar ao topo", "Nenhum projeto encontrado", "Colação de grau"):
            self.assertNotIn(phrase, visible_text)


if __name__ == "__main__":
    unittest.main()
