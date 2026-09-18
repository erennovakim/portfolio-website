# Eren Nova Kim — portfolio

Personal site for Eren Nova Kim, product designer. One scrollable home page and four static
case study pages. HTML, CSS, and a small amount of vanilla JavaScript. No build step.

## Running it

From the project root:

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

## Layout

- `index.html`, `css/site.css`, `js/site.js` — home page (the design source)
- `work/{slug}/index.html` — case studies
- `404.html` — unknown routes
- `assets/` — photograph, covers, placeholders
- `art/` — 4px-dot cloud masks (`generate-clouds.py` regenerates them)

## Case studies

Each study is a folder under `work/`. Card links on the home page point at `/work/{slug}/`.
Shared chrome (nav, footer, type, colour) comes from `css/site.css`. Study-only rules are
namespaced under `.page-study` so they cannot change the home page.
