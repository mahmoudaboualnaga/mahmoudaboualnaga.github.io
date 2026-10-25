/* Portfolio app. All content lives in portfolio.json — edit that file, not this one. */
let PROFILE, FIGURES, SERVICES, CATEGORIES, PROJECTS, EXPERIENCE, ALSO, TOOLS, QUOTE;

/* ============================================================
   DRAWINGS (used when a project has no image)
   ============================================================ */
const ART = {
  gate: '<rect x="72" y="44" width="56" height="58" rx="4"/><circle cx="100" cy="44" r="8" class="r"/><path class="r" d="M100 44L152 30M100 44L50 28M100 44V12"/><path d="M20 102h160"/><path d="M32 102V54M168 102V54" stroke-dasharray="4 3"/><text x="100" y="116" text-anchor="middle">TRIPOD TURNSTILE</text>',
  cylinder: '<rect x="20" y="38" width="150" height="44" rx="4"/><circle cx="40" cy="60" r="16"/><circle cx="40" cy="60" r="7"/><g class="r"><path d="M70 38v-14M88 38v-20M106 38v-10M124 38v-18M142 38v-12"/></g><path d="M70 38v22M88 38v22M106 38v22M124 38v22M142 38v22" stroke-dasharray="3 3"/><path d="M20 96h150M20 92v8M170 92v8"/><text x="95" y="112" text-anchor="middle">CYLINDER · SECTION</text>',
  gauge: '<path d="M30 30h60v18H66v24h24v18H30z"/><path d="M110 30h60v18h-24v24h24v18h-60z"/><text x="60" y="108" text-anchor="middle">GO</text><text x="140" y="108" text-anchor="middle" class="r" fill="currentColor">NO-GO</text>',
  key: '<circle cx="40" cy="60" r="22"/><circle cx="40" cy="60" r="8"/><path d="M62 52h108v16H62"/><path class="r" d="M80 68l6 10 6-10 6 14 6-14 6 8 6-8 6 12 6-12"/><text x="120" y="38" text-anchor="middle">BITTING CODE</text>',
  mold: '<rect x="25" y="20" width="150" height="36"/><rect x="25" y="64" width="150" height="36"/><rect x="60" y="44" width="80" height="12" class="r"/><rect x="60" y="64" width="80" height="14" class="r"/><path d="M35 20v80M165 20v80" stroke-dasharray="4 3"/><path d="M15 60h170" stroke-dasharray="8 3 2 3"/><text x="100" y="114" text-anchor="middle">PARTING LINE</text>',
  cavities: (() => { let s = '<rect x="20" y="16" width="160" height="88"/>'; for (let r = 0; r < 5; r++) for (let c = 0; c < 9; c++) { const x = 34 + c * 16.5, y = 28 + r * 16; s += `<path class="${(r + c) % 7 === 0 ? 'r' : ''}" d="M${x} ${y + 3}c0-4 6-4 6 0 0-4 6-4 6 0 0 4-6 7-6 8 0-1-6-4-6-8z"/>`; } return s; })(),
  enclosure: '<path d="M40 40l60-20 60 20v46l-60 20-60-20z"/><path d="M40 40l60 20 60-20M100 60v46"/><path class="r" d="M58 52l28 9v18l-28-9z"/><circle cx="128" cy="62" r="3"/><circle cx="142" cy="57" r="3"/><circle cx="128" cy="82" r="3"/>',
  scan: '<path d="M20 90 L35 60 L50 80 L62 50 L78 72 L90 44" /><path d="M35 60 L62 50 M50 80 L78 72 M20 90 L50 80 M62 50 L90 44 M35 60 L50 80 M62 50 L78 72" stroke-width="0.8"/><path class="r" d="M104 64h20m-6-6 6 6-6 6"/><path d="M138 90c0-30 14-46 38-46"/><path d="M138 90h38V44"/><circle cx="160" cy="72" r="6"/>',
  instrument: '<path d="M20 64h96"/><path d="M20 58h96v12H20z"/><path d="M116 60c20-4 36-10 50-24"/><path d="M116 68c22-2 40-6 56-14"/><path class="r" d="M30 58v-12M30 70v12M110 58v-12M110 70v12M30 50h80"/><text x="70" y="46" text-anchor="middle">HANDLE</text>',
  mill: '<circle cx="80" cy="64" r="34"/><circle cx="80" cy="64" r="6"/><g class="r"><path d="M80 58V36M86 64h22M80 70v22M74 64H52"/></g><path d="M64 30l-10-14h52l-10 14"/><path d="M114 64h40l10 30h-60"/><text x="140" y="110" text-anchor="middle">HAMMER MILL</text>',
  drum: '<path d="M10 40h180M10 46h180"/><path d="M20 46l14 40M60 46l-14 40M100 46l14 40M140 46l-14 40M180 46l-14 40"/><ellipse cx="100" cy="30" rx="12" ry="18" class="r"/><path d="M100 12h46M100 48h46"/><ellipse cx="146" cy="30" rx="12" ry="18"/><path d="M10 92h180" stroke-dasharray="6 4"/>',
  chair: '<path d="M60 20v40M140 20v40M60 30h80M60 50h80"/><path d="M50 100l90-50M150 100L60 50"/><circle class="r" cx="100" cy="72" r="4"/><path d="M40 100h30M130 100h30"/><text x="100" y="116" text-anchor="middle">FOLDED · OPEN</text>',
  car: '<path d="M20 78h20l10-20h60l20-14h40l10 20v14h-12"/><circle cx="52" cy="82" r="13"/><circle cx="148" cy="82" r="13"/><path d="M68 82h66"/><path class="r" d="M90 58l10-18h14"/><path d="M164 64l16-4"/>',
  enclosureIcon: '<path d="M10 16l22-8 22 8v24l-22 8-22-8z"/><path d="M10 16l22 8 22-8M32 24v24"/><path d="M17 23l9 3v8l-9-3z"/>',
  moldIcon: '<rect x="8" y="8" width="48" height="18"/><rect x="8" y="30" width="48" height="18"/><rect x="22" y="20" width="20" height="6"/><rect x="22" y="30" width="20" height="8"/><path d="M14 8v40M50 8v40" stroke-dasharray="3 2"/>',
  scanIcon: '<path d="M6 46L14 26L22 38L28 20L36 32L42 14"/><path d="M14 26L28 20M22 38L36 32"/><path d="M46 46c0-16 4-24 12-24"/><path d="M46 46h12V22"/>',
  machineIcon: '<circle cx="24" cy="30" r="14"/><circle cx="24" cy="30" r="4"/><path d="M24 12v4M24 44v4M6 30h4M38 30h4M11 17l3 3M34 40l3 3M11 43l3-3M34 20l3-3"/><path d="M42 30h14v18H38"/>'
};

/* ============================================================
   RENDER
   ============================================================ */
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const svg = (body, vb = "0 0 200 120", cls = "draw") =>
  `<svg class="${cls}" viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" font-family="IBM Plex Mono, monospace" font-size="8" letter-spacing="1" aria-hidden="true">${body}</svg>`;

function renderHero() {
  $("brand-mark").textContent = PROFILE.initials;
  $("brand-name").textContent = PROFILE.name;
  const parts = PROFILE.name.split(" ");
  $("hero-name").innerHTML = parts.map(esc).join("<br>");
  $("hero-lede").textContent = PROFILE.lede;
  $("hero-status").textContent = PROFILE.status;
  $("hero-location").textContent = PROFILE.location;
  const ctas = [`<a class="btn primary" href="#projects">See projects</a>`];
  if (PROFILE.cv) ctas.push(`<a class="btn" href="${esc(PROFILE.cv)}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14"/></svg>Download CV</a>`);
  ctas.push(`<a class="btn" href="#contact">Contact me</a>`);
  $("hero-ctas").innerHTML = ctas.join("");
  const p = $("portrait");
  if (PROFILE.photo) {
    p.innerHTML = `<img src="${esc(PROFILE.photo)}" alt="Portrait of ${esc(PROFILE.fullName)}">`;
  } else {
    p.innerHTML = `<div class="monogram">${svg(
      `<circle cx="100" cy="100" r="70" stroke-dasharray="2 4"/><path d="M100 18v164M18 100h164" stroke-dasharray="10 4 2 4" stroke-width="0.8"/>
       <text x="100" y="118" text-anchor="middle" font-family="Barlow Condensed, Arial Narrow, sans-serif" font-size="58" font-weight="700" letter-spacing="2" fill="currentColor" stroke="none">${esc(PROFILE.initials)}</text>`,
      "0 0 200 200", "")}</div>`;
  }
  $("footer-name").textContent = "© " + new Date().getFullYear() + " " + PROFILE.fullName;
}

function renderFigures() {
  $("figures").innerHTML = FIGURES.map((f) =>
    `<div class="fig"><b>${esc(f.value)}${f.unit ? `<small>${esc(f.unit)}</small>` : ""}</b><p>${esc(f.label)}</p></div>`).join("");
}

function renderServices() {
  $("services-list").innerHTML = SERVICES.map((s) => `
    <div class="svc">
      ${svg(ART[s.icon + "Icon"], "0 0 64 56", "")}
      <div>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.text)}</p>
        <ul>${s.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      </div>
    </div>`).join("");
}

let activeFilter = "all";
function renderFilters() {
  const counts = PROJECTS.reduce((m, p) => (m[p.cat] = (m[p.cat] || 0) + 1, m), {});
  const keys = ["all", ...Object.keys(CATEGORIES).filter((k) => counts[k])];
  $("filters").innerHTML = keys.map((k) =>
    `<button class="chip" type="button" data-f="${k}" aria-pressed="${k === activeFilter}">${k === "all" ? "All" : esc(CATEGORIES[k])}<em>${k === "all" ? PROJECTS.length : counts[k]}</em></button>`).join("");
  $("filters").onclick = (e) => {
    const b = e.target.closest("button[data-f]");
    if (!b) return;
    activeFilter = b.dataset.f;
    try { sessionStorage.setItem("pf-filter", activeFilter); } catch (_) {}
    document.querySelectorAll("#filters .chip").forEach((c) => c.setAttribute("aria-pressed", c.dataset.f === activeFilter));
    document.querySelectorAll("#sheets .sheet").forEach((s) => { s.hidden = !(activeFilter === "all" || s.dataset.cat === activeFilter); });
  };
}

function renderProjects() {
  $("sheets").innerHTML = PROJECTS.map((p, i) => {
    const no = "ME-" + String(i + 1).padStart(3, "0");
    const art = p.image
      ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">`
      : svg(ART[p.art] || ART.machineIcon);
    const cells = [["Client", p.org], ["Year", p.year], ["Process", p.process], ["Role", p.role]].filter((c) => c[1]);
    if (cells.length % 2) cells.push(["Dwg no.", no]);
    return `
      <article class="sheet" data-cat="${p.cat}" ${activeFilter !== "all" && activeFilter !== p.cat ? "hidden" : ""}>
        <div class="art">${art}<span class="dwg mono">${no}</span><span class="cat mono">${esc(CATEGORIES[p.cat])}</span></div>
        <div class="sheet-body">
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.text)}</p>
          ${p.points?.length ? `<ul class="points">${p.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
        </div>
        <div class="tblock">${cells.map((c) => `<div><span>${esc(c[0])}</span><b>${esc(c[1])}</b></div>`).join("")}</div>
        ${p.link ? `<a class="more" href="${esc(p.link)}" target="_blank" rel="noopener">View details →</a>` : ""}
      </article>`;
  }).join("");
}

function renderExperience() {
  $("timeline").innerHTML = EXPERIENCE.map((r) => `
    <div class="role">
      <div class="when">${esc(r.when)}</div>
      <div>
        <h3>${esc(r.title)}</h3>
        <p class="org">${esc(r.org)}</p>
        <ul>${r.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      </div>
    </div>`).join("");
  $("also").innerHTML = ALSO.map((a) => `<div><b>${esc(a.title)}</b><span>${esc(a.text)}</span></div>`).join("");
}

function renderTools() {
  $("tools").innerHTML = TOOLS.map((t) =>
    `<div><h3 class="mono">${esc(t.group)}</h3><ul>${t.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join("");
}

function renderQuote() {
  if (!QUOTE.text) { $("quote").hidden = true; return; }
  $("quote").innerHTML = `<div class="mono">Redline note</div><blockquote>“${esc(QUOTE.text)}”</blockquote><figcaption>${esc(QUOTE.by)}</figcaption>`;
}

function renderContact() {
  $("contact-text").textContent = PROFILE.contactText;
  const rows = [];
  if (PROFILE.email) rows.push(`<div class="channel"><span class="mono">Email</span><a id="ch-email" href="mailto:${esc(PROFILE.email)}">${esc(PROFILE.email)}</a><button class="copy" type="button" data-copy="ch-email">Copy</button></div>`);
  if (PROFILE.phone) rows.push(`<div class="channel"><span class="mono">Phone</span><a id="ch-phone" href="tel:${esc(PROFILE.phone.replace(/\s/g, ""))}">${esc(PROFILE.phone)}</a><button class="copy" type="button" data-copy="ch-phone">Copy</button></div>`);
  if (PROFILE.whatsapp) rows.push(`<div class="channel"><span class="mono">WhatsApp</span><a href="https://wa.me/${esc(PROFILE.whatsapp)}" target="_blank" rel="noopener">Message me on WhatsApp</a></div>`);
  if (PROFILE.linkedin) rows.push(`<div class="channel"><span class="mono">LinkedIn</span><a href="${esc(PROFILE.linkedin)}" target="_blank" rel="noopener">${esc(PROFILE.linkedin.replace(/^https?:\/\/(www\.)?/, ""))}</a></div>`);
  if (PROFILE.upwork) rows.push(`<div class="channel"><span class="mono">Upwork</span><a href="${esc(PROFILE.upwork)}" target="_blank" rel="noopener">Hire me on Upwork</a></div>`);
  if (PROFILE.khamsat) rows.push(`<div class="channel"><span class="mono">Khamsat</span><a href="${esc(PROFILE.khamsat)}" target="_blank" rel="noopener">Hire me on Khamsat</a></div>`);
  if (PROFILE.cv) rows.push(`<div class="channel"><span class="mono">CV</span><a href="${esc(PROFILE.cv)}" target="_blank" rel="noopener">Download my CV</a></div>`);
  $("channels").innerHTML = rows.join("");
  $("channels").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-copy]");
    if (!btn) return;
    const el = $(btn.dataset.copy);
    const reset = () => setTimeout(() => (btn.textContent = "Copy"), 1600);
    const fallback = () => { const r = document.createRange(); r.selectNodeContents(el); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); btn.textContent = "Selected"; reset(); };
    try { navigator.clipboard.writeText(el.textContent).then(() => { btn.textContent = "Copied"; reset(); }, fallback); } catch (_) { fallback(); }
  });
}

function initTheme() {
  const root = document.documentElement;
  try { const t = localStorage.getItem("pf-theme"); if (t) root.dataset.theme = t; } catch (_) {}
  $("theme-btn").addEventListener("click", () => {
    const current = root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("pf-theme", next); } catch (_) {}
  });
}

function initNavHighlight() {
  const links = [...document.querySelectorAll("nav.links a")];
  const ids = links.map((a) => a.getAttribute("href").slice(1));
  const onScroll = () => {
    let cur = "";
    for (const id of ids) { const el = $(id); if (el && el.getBoundingClientRect().top < 160) cur = id; }
    links.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + cur));
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

async function boot() {
  initTheme();
  let data;
  try {
    const res = await fetch("portfolio.json", { cache: "no-cache" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    data = await res.json();
  } catch (err) {
    console.error("Could not load portfolio.json:", err);
    document.getElementById("hero-lede").textContent =
      "Content could not load. If you opened index.html straight from your computer, run it through a local server or GitHub Pages instead.";
    return;
  }
  ({ profile: PROFILE, figures: FIGURES, services: SERVICES, categories: CATEGORIES, projects: PROJECTS,
     experience: EXPERIENCE, also: ALSO, tools: TOOLS, quote: QUOTE } = data);
  try { const f = sessionStorage.getItem("pf-filter"); if (f && (f === "all" || CATEGORIES[f])) activeFilter = f; } catch (_) {}
  renderHero();
  renderFigures();
  renderServices();
  renderFilters();
  renderProjects();
  renderExperience();
  renderTools();
  renderQuote();
  renderContact();
  initNavHighlight();
}

document.addEventListener("DOMContentLoaded", boot);
