(function () {
  const D = window.PORTFOLIO;
  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Hero ---------- */
  const p = D.profile;
  $("navName").textContent = p.name;
  $("heroRole").textContent = `${p.role} · ${p.location}`;
  $("heroHeadline").textContent = p.headline;
  $("heroIntro").textContent = p.intro;
  $("heroTags").innerHTML = p.tags.map((t) => `<li class="h-pill">${esc(t)}</li>`).join("");
  const heroPhoto = $("heroPhoto");
  heroPhoto.src = p.photo;
  heroPhoto.alt = `Foto ${p.name}`;
  $("footText").textContent = `© ${new Date().getFullYear()} ${p.name}`;

  // Foto sedikit miring mengikuti mouse (hanya desktop)
  const card = $("photoCard");
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    let pending = false, mx = 0, my = 0;
    document.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        const r = card.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        const dx = (mx - (r.left + r.width / 2)) / (innerWidth / 2);
        const dy = (my - (r.top + r.height / 2)) / (innerHeight / 2);
        card.style.transform = `perspective(800px) rotateX(${-dy * 6}deg) rotateY(${dx * 6}deg)`;
      });
    }, { passive: true });
  }

  /* ---------- Tentang ---------- */
  $("h-about").textContent = `Halo, saya ${p.name.split(" ").slice(-1)[0]}`;
  const aboutPhoto = $("aboutPhoto");
  if (p.photoAbout) { aboutPhoto.src = p.photoAbout; aboutPhoto.alt = `Foto ${p.name}`; }
  else aboutPhoto.closest(".abt-visual").remove();
  $("aboutText").innerHTML = p.about.map((t) => `<p class="abt-p">${esc(t)}</p>`).join("");
  if (p.quote) $("aboutQuote").textContent = p.quote; else $("aboutQuote").remove();
  $("aboutFacts").innerHTML = (p.facts || [])
    .map((f) => `<div class="abt-fact"><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`)
    .join("");

  /* ---------- Keahlian ---------- */
  $("skillList").innerHTML = D.skills
    .map((s) => `<li class="sk" data-accent="${esc(s.accent || "violet")}">
        <span class="sk-cat">${esc(s.group)}</span>
        <span class="sk-nm">${esc(s.name)}</span>
        <span class="sk-ds">${esc(s.desc)}</span>
      </li>`)
    .join("");

  /* ---------- Proyek ---------- */
  const statusText = { live: "Sudah dipakai", dev: "Dalam pengembangan" };
  const host = (url) => { try { return new URL(url).host.replace(/^www\./, ""); } catch { return ""; } };

  $("projectList").innerHTML = D.projects.map((pr, i) => {
    const imgs = (pr.images || []).filter(Boolean);
    const bar = host(pr.link) || pr.title.toLowerCase();
    const thumbs = imgs.length > 1
      ? `<div class="thumbs" role="tablist" aria-label="Screenshot ${esc(pr.title)}">${imgs.map((src, k) =>
          `<button class="thumb${k === 0 ? " is-on" : ""}" data-src="${esc(src)}" role="tab" aria-selected="${k === 0}" aria-label="Screenshot ${k + 1}"><img src="${esc(src)}" alt="" loading="lazy"></button>`).join("")}</div>`
      : "";
    const links = [
      pr.link && `<a href="${esc(pr.link)}" target="_blank" rel="noopener">Kunjungi ${esc(host(pr.link))}</a>`,
      pr.repo && `<a href="${esc(pr.repo)}" target="_blank" rel="noopener">Lihat kode</a>`,
    ].filter(Boolean).join("");
    return `<article class="pj${i % 2 ? " flip" : ""}" data-accent="${esc(pr.accent || "violet")}">
      <div class="pj-shot">
        <div class="frame">
          <div class="frame-bar"><span></span><span></span><span></span><em>${esc(bar)}</em></div>
          ${imgs.length ? `<button class="frame-view" aria-label="Perbesar screenshot ${esc(pr.title)}"><img class="main-img" src="${esc(imgs[0])}" alt="Screenshot ${esc(pr.title)}" loading="lazy"></button>` : ""}
        </div>
        ${thumbs}
      </div>
      <div class="pj-in">
        <p class="pj-org">${esc(pr.org)}${pr.status && statusText[pr.status] ? `<span class="pj-status s-${pr.status}">${statusText[pr.status]}</span>` : ""}</p>
        <h3 class="pj-t">${esc(pr.title)}</h3>
        <p class="pj-d">${esc(pr.summary)}</p>
        ${pr.points && pr.points.length ? `<ul class="pj-points">${pr.points.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
        ${pr.stack && pr.stack.length ? `<ul class="pj-tags" aria-label="Teknologi">${pr.stack.map((t) => `<li class="pj-tag">${esc(t)}</li>`).join("")}</ul>` : ""}
        ${links ? `<div class="pj-links">${links}</div>` : ""}
      </div>
    </article>`;
  }).join("");

  // Screenshot yang belum ada → kotak penanda; thumbnail kosong disembunyikan
  const missing = '<div class="missing">Screenshot belum ditambahkan</div>';
  const onFail = (img, fn) => (img.complete && !img.naturalWidth ? fn() : img.addEventListener("error", fn, { once: true }));
  document.querySelectorAll(".frame").forEach((f) => { if (!f.querySelector(".frame-view")) f.insertAdjacentHTML("beforeend", missing); });
  document.querySelectorAll(".main-img").forEach((img) => onFail(img, () => { const v = img.closest(".frame-view"); if (v) v.outerHTML = missing; }));
  document.querySelectorAll(".thumb img").forEach((img) => onFail(img, () => {
    const t = img.closest(".thumb"); if (!t) return;
    const box = t.parentElement; t.remove();
    if (box.children.length < 2) box.remove();
  }));

  document.addEventListener("click", (e) => {
    const t = e.target.closest(".thumb");
    if (t) {
      const shot = t.closest(".pj-shot"), main = shot.querySelector(".main-img");
      if (main) main.src = t.dataset.src;
      shot.querySelectorAll(".thumb").forEach((b) => { b.classList.toggle("is-on", b === t); b.setAttribute("aria-selected", b === t); });
      return;
    }
    const v = e.target.closest(".frame-view");
    if (v && viewer.showModal) {
      const img = v.querySelector("img");
      vImg.src = img.src; vImg.alt = img.alt;
      viewer.showModal();
    }
  });
  const viewer = $("viewer"), vImg = $("viewerImg");
  $("viewerClose").addEventListener("click", () => viewer.close());
  viewer.addEventListener("click", (e) => { if (e.target === viewer) viewer.close(); });

  /* ---------- Kontak ---------- */
  const c = D.contact;
  $("contactMain").innerHTML = c.email
    ? `<a class="ct-email" href="mailto:${esc(c.email)}">${esc(c.email)}</a><br><a class="btn-c ct-btn" href="mailto:${esc(c.email)}">Kirim email</a>`
    : c.whatsapp ? `<a class="btn-c ct-btn" href="https://wa.me/${esc(c.whatsapp)}" target="_blank" rel="noopener">Chat WhatsApp</a>` : "";
  $("contactLinks").innerHTML = [
    c.whatsapp && c.email && ["WhatsApp", `https://wa.me/${c.whatsapp}`],
    c.github && ["GitHub", c.github],
    c.linkedin && ["LinkedIn", c.linkedin],
    c.instagram && ["Instagram", c.instagram],
  ].filter(Boolean).map(([n, u]) => `<li><a class="soc" href="${esc(u)}" target="_blank" rel="noopener">${n}</a></li>`).join("");
})();
