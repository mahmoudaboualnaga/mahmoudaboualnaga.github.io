# Mahmoud Elsayed — Portfolio

R&D and mechanical design engineer: plastic enclosures, injection molds, reverse engineering (mesh to CAD), machine design and production.

[LinkedIn](https://www.linkedin.com/in/mahmoud-elsayed-aboualnaga) · [Upwork](https://www.upwork.com/freelancers/mahmoudaboualnaga) · [Khamsat](https://khamsat.com/user/mahmoud74elsayed)

## How this site works

A static site served by GitHub Pages. No build step.

| File | What it holds |
|---|---|
| `portfolio.json` | All the content: profile, services, projects, experience, tools, contact links |
| `index.html` | Page layout |
| `style.css` | Look and feel (light and dark themes) |
| `app.js` | Reads `portfolio.json` and builds the page |
| `assets/` | Profile photo and project photos |

## Updating content

Edit `portfolio.json` directly on GitHub (pencil icon → Commit). The site updates in about a minute.

- **CV:** upload the PDF to `assets/` (or a GitHub Release) and set `"cv": "assets/Mahmoud_Elsayed_CV.pdf"`.
- **Project photo:** upload it to `assets/projects/` and set `"image": "assets/projects/fridge-door-mold.jpg"` on that project. Projects without a photo show a line drawing.
- **New project:** copy an existing block in `"projects"` and change the text. `"cat"` must be one of the keys in `"categories"`.
- **Hide something:** leave its field empty (`""`) and it disappears from the page.

## Preview locally

`portfolio.json` is loaded with `fetch`, so double-clicking `index.html` won't work. From this folder run:

```
python -m http.server 8000
```

then open http://localhost:8000.
