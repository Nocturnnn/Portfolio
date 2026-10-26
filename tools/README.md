# Portfolio assets

The site is static and does not need a build server.

After adding a project image to `img/portifolio/`, run:

```powershell
python tools/optimize-images.py
```

This requires Pillow. It preserves originals, creates WebP variants at 480,
800 and 1200 pixels, and regenerates `js/project-images.js`. The hero and
project cards select the appropriate variant through `srcset` and `sizes`.
Projects missing from the manifest still fall back to their original image.
Run `npm run build` afterwards to refresh the localized static HTML as well.

The local Inter variable font supports weights 400–800 and Latin characters,
including Portuguese accents. Its license is in `assets/fonts/OFL.txt`.

For translation editing, localized page generation and publication, see the
root `README.md` and `docs/INTERNATIONALIZATION.md`.
