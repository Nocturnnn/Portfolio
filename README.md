# Mateus Vitor — Portfolio

Static HTML, CSS and JavaScript portfolio with Brazilian Portuguese and English.
The existing design, floating hero, project catalog and mobile interactions are retained.

## Run locally

Requires Node.js and Python 3.12 or later for development. No npm dependencies are required.

```powershell
npm run build
npm test
npm run dev
```

Open `http://127.0.0.1:5175/Portfolio/`. The preview serves the real `/Portfolio/`
base path used by GitHub Pages. Use `/Portfolio/pt/` and `/Portfolio/en/` for
explicit language URLs. The default entry chooses a language before rendering.

## Edit content

- `locales/pt-BR.json`: Portuguese copy, accessibility labels, metadata and all project descriptions.
- `locales/en.json`: English equivalents, with exactly the same keys and placeholders.
- `data/projects.json`: stable project IDs, links, images, types and technology tags.
- `templates/index.html`: the single page template and its translation bindings.
- `style/`: existing presentation plus the small language-selector stylesheet.

Run `npm run build` after changing copy, project data or the template.
`index.html`, `pt/index.html`, `en/index.html` and `js/projects-data.js` are generated
outputs; edit the source files above rather than these generated files.

For new project images, run `python tools/optimize-images.py` with Pillow installed,
then rebuild. Existing projects retain their original URLs.

## Language selection

1. An explicit `/pt/` or `/en/` URL keeps its requested language.
2. The default entry respects the visitor's last manual choice, when browser storage allows it.
3. Otherwise, a primary browser language starting with `pt` selects `pt-BR`.
4. All other primary languages select English.

The PT/EN links also work without JavaScript. With JavaScript enabled, switching
uses a cached translation dictionary and the History API without a full reload.
Filters, search and the selected project page remain available during switching.

Language preference is an experience signal, **not proof of nationality or location**.
No IP geolocation, GPS permission, analytics identifier or third-party detection service is used.

## Publish with the existing GitHub Pages setup

Run the build and tests, then commit and push the generated outputs together with
their source files to the branch already used for GitHub Pages. The root entry,
localized directories and `.nojekyll` work with static branch-based publishing.
The existing project directories remain in place.

This task prepares the changes locally; publishing requires that commit/push.
After publication, verify:

- `https://nocturnnn.github.io/Portfolio/`
- `https://nocturnnn.github.io/Portfolio/pt/`
- `https://nocturnnn.github.io/Portfolio/en/`

See [the implementation and validation report](docs/INTERNATIONALIZATION.md)
for SEO details, tests, verification limits and maintenance instructions.
