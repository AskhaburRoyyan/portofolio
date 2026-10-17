(function () {
  const D = window.PORTFOLIO;
  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Profil & hero ---------- */
  const p = D.profile;
  $("navName").textContent = p.name;
  $("heroRole").textContent = p.role;
  $("heroName").textContent = p.name;
  $("heroIntro").textContent = p.intro;
  $("heroLoc").textContent = p.location;
  $("footText").textContent = `© ${new Date().getFullYear()} ${p.name}`;

  /* ---------- Proyek ---------- */
  const statusText = { live: "Sudah dipakai", dev: "Dalam pengembangan" };
  const host = (url) => {
    try { return new URL(url).host.replace(/^www\./, ""); } catch { return ""; }
  };

  const projectHTML = (pr, i) => {
    const imgs = (pr.images || []).filter(Boolean);
    const bar = host(pr.link) || pr.title.toLowerCase();
    const thumbs =
      imgs.length > 1
        ? `<div class="thumbs" role="tablist" aria-label="Screenshot ${esc(pr.title)}">
            ${imgs.map((src, k) => `<button class="thumb${k === 0 ? " is-on" : ""}" data-src="${esc(src)}" role="tab" aria-selected="${k === 0}" aria-label="Screenshot ${k + 1}">
              <img src="${esc(src)}" alt="" loading="lazy"></button>`).join("")}
          </div>`
        : "";
    const links = [
      pr.link && `<a href="${esc(pr.link)}" target="_blank" rel="noopener">Kunjungi ${esc(host(pr.link))}</a>`,
      pr.repo && `<a href="${esc(pr.repo)}" target="_blank" rel="noopener">Lihat kode</a>`,
    ].filter(Boolean).join("");

    return `<article class="project${i % 2 ? " flip" : ""}">
      <div class="shot">
        <div class="frame">
          <div class="frame-bar"><span></span><span></span><span></span><em>${esc(bar)}</em></div>
          <button class="frame-view" aria-label="Perbesar screenshot ${esc(pr.title)}">
            ${imgs.length ? `<img class="main-img" src="${esc(imgs[0])}" alt="Screenshot ${esc(pr.title)}" loading="lazy">` : ""}
          </button>
        </div>
        ${thumbs}
      </div>
      <div class="info">
        <p class="org">${esc(pr.org)}${pr.status && statusText[pr.status] ? `<span class="status s-${pr.status}">${statusText[pr.status]}</span>` : ""}</p>
        <h3>${esc(pr.title)}</h3>
        <p class="summary">${esc(pr.summary)}</p>
        ${pr.points && pr.points.length ? `<ul class="points">${pr.points.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
        ${pr.stack && pr.stack.length ? `<ul class="stack" aria-label="Teknologi">${pr.stack.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
        ${links ? `<div class="links">${links}</div>` : ""}
      </div>
    </article>`;
  };
  $("projectList").innerHTML = D.projects.map(projectHTML).join("");

  // Screenshot yang belum ada → tampilkan kotak penanda, sembunyikan thumbnail kosong
  const missing = '<div class="missing">Screenshot belum ditambahkan</div>';
  const onFail = (img, fn) =>
    img.complete && !img.naturalWidth ? fn() : img.addEventListener("error", fn, { once: true });
  document.querySelectorAll(".main-img").forEach((img) =>
    onFail(img, () => { const v = img.closest(".frame-view"); if (v) v.outerHTML = missing; })
  );
  document.querySelectorAll(".frame-view").forEach((b) => { if (!b.querySelector("img")) b.outerHTML = missing; });
  document.querySelectorAll(".thumb img").forEach((img) =>
    onFail(img, () => {
      const t = img.closest(".thumb");
      if (!t) return;
      const box = t.parentElement;
      t.remove();
      if (box.children.length < 2) box.remove();
    })
  );

  // Ganti screenshot lewat thumbnail
  document.addEventListener("click", (e) => {
    const t = e.target.closest(".thumb");
    if (!t) return;
    const shot = t.closest(".shot");
    const main = shot.querySelector(".main-img");
    if (main) main.src = t.dataset.src;
    shot.querySelectorAll(".thumb").forEach((b) => {
      b.classList.toggle("is-on", b === t);
      b.setAttribute("aria-selected", b === t);
    });
  });

  // Perbesar screenshot
  const viewer = $("viewer"), vImg = $("viewerImg");
  document.addEventListener("click", (e) => {
    const v = e.target.closest(".frame-view");
    if (!v || !viewer.showModal) return;
    const img = v.querySelector("img");
    vImg.src = img.src;
    vImg.alt = img.alt;
    viewer.showModal();
  });
  $("viewerClose").addEventListener("click", () => viewer.close());
  viewer.addEventListener("click", (e) => { if (e.target === viewer) viewer.close(); });

  /* ---------- Keahlian ---------- */
  $("skillList").innerHTML = D.skills
    .map((g) => `<div class="skill"><h3>${esc(g.group)}</h3><ul>${g.items.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></div>`)
    .join("");

  /* ---------- Tentang ---------- */
  const photo = $("aboutPhoto");
  if (p.photo) { photo.src = p.photo; photo.alt = `Foto ${p.name}`; } else photo.remove();
  $("aboutText").innerHTML = p.about.map((t) => `<p>${esc(t)}</p>`).join("");

  /* ---------- Kontak ---------- */
  const c = D.contact;
  $("contactMain").innerHTML = c.email
    ? `<a class="contact-email" href="mailto:${esc(c.email)}">${esc(c.email)}</a>`
    : "";
  const social = [
    c.whatsapp && ["WhatsApp", `https://wa.me/${c.whatsapp}`],
    c.github && ["GitHub", c.github],
    c.linkedin && ["LinkedIn", c.linkedin],
    c.instagram && ["Instagram", c.instagram],
  ].filter(Boolean);
  $("contactLinks").innerHTML = social
    .map(([n, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${n}</a></li>`)
    .join("");
})();
