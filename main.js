// =============================================
// NAV — Smooth scroll
// =============================================
function go(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// =============================================
// INTRO "MEMBANGUN PORTOFOLIO"
// Kursor warna-warni menggambar kerangka biru tiap elemen hero,
// lalu kerangka berubah jadi tampilan asli. Diputar sekali per sesi.
// =============================================
if ("scrollRestoration" in history && !location.hash) history.scrollRestoration = "manual";
const buildEl = document.getElementById("build");
const buildSkip = document.getElementById("buildSkip");
const buildPct = document.getElementById("buildPct");
const buildMsg = document.getElementById("buildMsg");
const isMobile = window.matchMedia("(max-width: 768px)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let buildDone = false;
const buildTimers = [];
const later = (ms, fn) => buildTimers.push(setTimeout(fn, ms));

// tampilkan semua elemen hero (dipakai saat intro selesai/dilewati)
function revealHero() {
  document.querySelectorAll(".hero-text > *").forEach((el) => el.classList.add("revealed"));
  document.getElementById("photoSpinner").classList.add("spin-done");
  document.body.classList.add("built");
}

function finishBuild() {
  if (buildDone) return;
  buildDone = true;
  buildTimers.forEach(clearTimeout);
  revealHero();
  buildEl.classList.add("done");
  setTimeout(() => {
    buildEl.remove();
    document.body.classList.remove("intro-on");
  }, 650);
}

function playBuild() {
  if (reduceMotion || location.hash) {
    buildEl.remove();
    document.body.classList.remove("intro-on");
    revealHero();
    buildDone = true;
    return;
  }
  window.scrollTo(0, 0);

  // daftar kursor (nama + warna)
  const people = [
    { name: "Royyan", c: "#1a4bff", t: "#fff" },
    { name: "Laravel", c: "#ff2d20", t: "#fff" },
    { name: "UI", c: "#ffc72c", t: "#0d0f14" },
    { name: "Mobile", c: "#00b37a", t: "#fff" },
    { name: "Deploy", c: "#7b5cff", t: "#fff" },
  ].slice(0, isMobile ? 3 : 5);

  const cursors = people.map((p, i) => {
    const el = document.createElement("div");
    el.className = "bc";
    el.style.setProperty("--c", p.c);
    el.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 2l7.5 19 2.6-7.9L21 10.5z" fill="${p.c}" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg><span style="background:${p.c};color:${p.t}">${p.name}</span>`;
    // mulai dari luar layar, dari arah berbeda-beda
    const sx = [-60, innerWidth + 40, innerWidth * 0.5, -60, innerWidth + 40][i];
    const sy = [innerHeight * 0.3, innerHeight * 0.15, innerHeight + 40, innerHeight + 40, innerHeight * 0.8][i];
    el.style.transform = `translate(${sx}px, ${sy}px)`;
    buildEl.appendChild(el);
    return el;
  });
  const moveCursor = (i, x, y, dur = 520) => {
    const el = cursors[i % cursors.length];
    el.style.transitionDuration = dur + "ms";
    el.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
  };

  // elemen hero yang "dibangun", berurutan
  const targets = [
    { sel: ".nav-shell nav", tag: "nav · navbar" },
    { sel: ".h-tag", tag: "p · tag", reveal: ".h-tag" },
    { sel: ".h-title", tag: "h1 · title", reveal: ".h-title" },
    { sel: "#photoCard", tag: "img · photo", reveal: "photo" },
    { sel: ".h-sub", tag: "p · subtitle", reveal: ".h-sub" },
    { sel: ".h-stack", tag: "ul · stack", reveal: ".h-stack" },
    { sel: ".h-cta", tag: "div · cta", reveal: ".h-cta" },
    { sel: ".h-stamp", tag: "svg · badge", reveal: "stamp" },
    { sel: ".h-side", tag: "aside · meta", reveal: "side" },
  ];

  const step = isMobile ? 300 : 360;      // jeda antar elemen
  const draw = isMobile ? 420 : 480;      // lama menggambar kotak
  const start = 650;                      // kursor masuk dulu
  const total = targets.length;

  // kursor masuk ke tengah layar
  cursors.forEach((_, i) => later(80 + i * 70, () => moveCursor(i, innerWidth * (0.3 + 0.1 * i), innerHeight * (0.35 + 0.08 * (i % 3)), 600)));

  targets.forEach((tg, i) => {
    const el = document.querySelector(tg.sel);
    if (!el) return;
    let r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4 || r.top > innerHeight) return;
    const t0 = start + i * step;
    const ci = i % cursors.length;

    // 1) kursor menuju pojok kiri atas elemen
    later(t0, () => { r = el.getBoundingClientRect(); moveCursor(ci, r.left - 4, r.top - 4, 420); });

    // 2) kotak kerangka ditarik dari pojok kiri atas ke kanan bawah
    later(t0 + 420, () => {
      const box = document.createElement("div");
      box.className = "bb";
      box.style.setProperty("--c", people[ci].c);
      box.style.left = r.left + "px";
      box.style.top = r.top + "px";
      box.innerHTML = `<em style="background:${people[ci].c};color:${people[ci].t}">${tg.tag}</em><i class="bb-size">${Math.round(r.width)} × ${Math.round(r.height)}</i>`;
      buildEl.appendChild(box);
      requestAnimationFrame(() => {
        box.style.transitionDuration = draw + "ms";
        box.style.width = r.width + "px";
        box.style.height = r.height + "px";
      });
      moveCursor(ci, r.right - 6, r.bottom - 6, draw);

      // 3) isi asli muncul, kerangka memudar
      later(draw + 140, () => {
        if (tg.reveal === "photo") document.getElementById("photoSpinner").classList.add("spin-done");
        else if (tg.reveal === "stamp" || tg.reveal === "side") document.body.classList.add("show-" + tg.reveal);
        else if (tg.reveal) document.querySelector(tg.reveal).classList.add("revealed");
        else document.body.classList.add("show-nav");
        box.classList.add("fill");
        later(520, () => box.classList.add("out"));
      });
    });

    // progres
    later(t0 + 420, () => {
      const pct = Math.round(((i + 1) / total) * 100);
      buildPct.textContent = pct + "%";
      buildMsg.textContent = `building ${tg.tag.split(" · ")[1]}…`;
    });
  });

  // kursor menyebar keluar layar, intro selesai
  const end = start + (total - 1) * step + 420 + draw + 900;
  later(end - 500, () => {
    buildMsg.textContent = "deployed ✓";
    cursors.forEach((_, i) => moveCursor(i, [-80, innerWidth + 60, innerWidth * 0.2, innerWidth + 60, innerWidth * 0.8][i], [-60, -60, innerHeight + 60, innerHeight * 0.6, innerHeight + 60][i], 700));
  });
  later(end, finishBuild);
}

buildSkip.addEventListener("click", finishBuild);
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !buildDone) finishBuild(); });

// mulai setelah font siap (maks 1,2 detik menunggu) agar ukuran kotak tepat
const heroImg = document.querySelector(".photo-img");
const imgReady = heroImg && !heroImg.complete ? new Promise((r) => { heroImg.addEventListener("load", r, { once: true }); heroImg.addEventListener("error", r, { once: true }); }) : Promise.resolve();
Promise.race([Promise.all([document.fonts ? document.fonts.ready : Promise.resolve(), imgReady]), new Promise((r) => setTimeout(r, 1800))])
  .then(() => requestAnimationFrame(playBuild));

// =============================================
// PHOTO — tilt ringan mengikuti mouse
// =============================================
const photoCard = document.getElementById("photoCard");
let tiltPending = false, lastMX = 0, lastMY = 0;

document.addEventListener(
  "mousemove",
  (e) => {
    lastMX = e.clientX;
    lastMY = e.clientY;
    if (!tiltPending) {
      tiltPending = true;
      requestAnimationFrame(applyTilt);
    }
  },
  { passive: true }
);

function applyTilt() {
  tiltPending = false;
  const r = photoCard.getBoundingClientRect();
  if (r.bottom < 0 || r.top > innerHeight) return;
  const dx = (lastMX - (r.left + r.width / 2)) / (innerWidth / 2);
  const dy = (lastMY - (r.top + r.height / 2)) / (innerHeight / 2);
  photoCard.style.transform =
    `perspective(800px) rotateX(${-dy * 8}deg) rotateY(${dx * 8}deg)`;
}

document.getElementById("hero").addEventListener("mouseleave", () => {
  photoCard.style.transition = "transform 0.6s ease";
  photoCard.style.transform = "perspective(800px)";
  setTimeout(() => (photoCard.style.transition = "transform 0.08s ease-out"), 650);
});

// =============================================
// TECH STACK — logo asli (folder icons/)
// =============================================
const skills = [
  { logo: ["laravel"], nm: "Laravel", cat: "Backend" },
  { logo: ["codeigniter"], nm: "CodeIgniter", cat: "Backend" },
  { logo: ["php"], nm: "PHP", cat: "Bahasa" },
  { logo: ["mysql"], nm: "MySQL", cat: "Database" },
  { logo: ["javascript"], nm: "JavaScript", cat: "Bahasa" },
  { logo: ["html5", "css3"], nm: "HTML & CSS", cat: "Frontend" },
  { logo: ["tailwindcss"], nm: "Tailwind CSS", cat: "Frontend" },
  { logo: ["git", "github"], nm: "Git & GitHub", cat: "Tools" },
  { logo: ["cpanel"], nm: "cPanel", cat: "Deploy" },
  { logo: ["java", "androidstudio"], nm: "Java · Android Studio", cat: "Mobile" },
  { logo: ["java", "netbeans"], nm: "Java · NetBeans", cat: "Desktop" },
];

document.getElementById("skGrid").innerHTML = skills.map((s) => `
  <div class="sk">
    <div class="sk-ic">${s.logo.map((l) => `<img src="icons/${l}.svg" alt="${l}" loading="lazy">`).join("")}</div>
    <div class="sk-nm">${s.nm}</div>
    <div class="sk-cat">${s.cat}</div>
  </div>`).join("") + `
  <div class="sk sk-more"><span>↗</span><b>TERUS<br>BELAJAR</b></div>`;

// =============================================
// SELECTED WORK — screenshot bergantian otomatis
// imgs: foto di folder "projects/"
// status: "LIVE" | "DEV" | ""  (DEV = dalam pengembangan)
// =============================================
const projects = [
  {
    n: "001", t: "WEBSITE & PORTAL BEM ITB TUBAN", status: "LIVE", org: "BEM ITB Tuban",
    d: "Web profil BEM sekaligus portal administrasi: pengajuan dan pelacakan surat UKM sampai kemahasiswaan, arsip, program kerja, aspirasi mahasiswa dengan nomor tiket, akun per kementerian dengan hak akses berbeda, dan notifikasi Web Push.",
    tags: ["LARAVEL", "MySQL", "WEB PUSH", "CPANEL"],
    cat: "WEB PORTAL", link: "https://bemitbtuban.com",
    logos: ["laravel", "mysql", "cpanel"],
    features: [
      "Halaman profil: kabinet, program kerja, berita, pengumuman, dan transparansi",
      "Sampaikan aspirasi dengan nomor tiket dan halaman cek status tiket",
      "Pengajuan dan pelacakan surat UKM sampai ke kemahasiswaan",
      "Akun terpisah per kementerian dengan hak akses berbeda",
      "Ruang Update Mahasiswa: info akademik, beasiswa, lomba, dan pelatihan",
      "Tanda tangan dokumen PDF dan notifikasi Web Push ke HP pengurus",
    ],
    imgs: ["projects/bem-1.jpg", "projects/bem-2.jpg", "projects/bem-3.jpg"],
  },
  {
    n: "002", t: "WEBSITE DSU TUBAN", status: "LIVE", org: "DSU Tuban",
    d: "Website Dompet Sosial Al-Uswah Tuban, dibangun ulang dari WordPress ke Laravel dengan panel admin untuk mengelola program, kegiatan, artikel, buletin, dan struktur pengurus, plus kalkulator zakat.",
    tags: ["LARAVEL", "TAILWIND", "MySQL", "BREEZE"],
    cat: "WEBSITE YAYASAN", link: "https://dsu.or.id",
    logos: ["laravel", "tailwindcss", "mysql", "cpanel"],
    features: [
      "Panel admin untuk program, kegiatan, artikel, banner, rekening donasi, legalitas, dan pengurus",
      "Buletin: admin mengunggah PDF dan sampul tiap edisi",
      "Struktur organisasi dengan tab per divisi dan kartu foto pengurus",
      "Kalkulator zakat untuk pengunjung",
      "Optimasi SEO dan deploy ke hosting cPanel di domain dsu.or.id",
    ],
    imgs: ["projects/dsu-1.jpg", "projects/dsu-2.jpg", "projects/dsu-3.jpg"],
  },
  {
    n: "003", t: "MICRO-ERP LATAR KOPI", status: "DEV", org: "Latar Kopi",
    d: "Sistem operasional kafe: pelanggan memesan dengan scan QR di meja, pembayaran dikonfirmasi kasir, lalu pesanan diteruskan ke dapur. Resep tiap menu memotong stok bahan baku otomatis dan menghitung HPP serta margin. Akun terpisah untuk owner, kasir, dan dapur.",
    tags: ["LARAVEL", "TAILWIND", "MySQL"],
    cat: "SISTEM KAFE · ERP", link: "",
    logos: ["laravel", "tailwindcss", "mysql"],
    features: [
      "Pelanggan memesan dengan scan QR Code yang ada di tiap meja",
      "Alur bayar dulu: dikonfirmasi kasir, baru diteruskan ke dapur/bar",
      "Menu & resep dengan perhitungan HPP dan margin otomatis",
      "Stok bahan baku berkurang otomatis sesuai resep, lengkap dengan riwayat mutasi",
      "Akun terpisah untuk owner, kasir, dan dapur",
      "Dashboard omzet harian dan laporan penjualan",
    ],
    imgs: ["projects/latarkopi-1.jpg", "projects/latarkopi-2.jpg", "projects/latarkopi-3.jpg"],
  },
  {
    n: "004", t: "SISTEM PEMBAYARAN MAHASISWA", status: "", org: "ITB Tuban",
    d: "Sistem pembayaran kampus: admin membuat tagihan per jenis pembayaran dan tahun akademik, mengatur potongan dan cicilan, memverifikasi bukti transfer, lalu mengekspor laporan rekap dan tunggakan ke Excel atau PDF. Mahasiswa masuk dengan NIM untuk melihat tagihannya.",
    tags: ["LARAVEL", "LIVEWIRE", "MySQL"],
    cat: "SISTEM PEMBAYARAN", link: "",
    logos: ["laravel", "mysql"],
    features: [
      "Tagihan per jenis pembayaran dan tahun akademik",
      "Pengaturan potongan dan pembayaran cicilan",
      "Verifikasi bukti transfer dan pengelolaan rekening bank",
      "Laporan rekap pembayaran dan tunggakan, ekspor ke Excel dan PDF",
      "Mahasiswa masuk dengan NIM untuk melihat tagihannya",
    ],
    imgs: ["projects/pembayaran-1.jpg", "projects/pembayaran-2.jpg", "projects/pembayaran-3.jpg"],
  },
  {
    n: "005", t: "SIM UKM ITB TUBAN", status: "", org: "ITB Tuban",
    d: "Platform pengelolaan UKM kampus: data UKM, pendaftaran anggota, kegiatan dan absensi, proposal, SK, prestasi, serta anggaran. Lima peran dengan dashboard masing-masing: admin, pengurus, sekretariat, bendahara, dan mahasiswa.",
    tags: ["LARAVEL", "MySQL", "MULTI-ROLE"],
    cat: "SISTEM INFORMASI", link: "",
    logos: ["laravel", "mysql"],
    features: [
      "Data UKM dan pendaftaran anggota per periode",
      "Kegiatan UKM lengkap dengan absensi",
      "Pengajuan proposal dan penerbitan SK",
      "Pencatatan prestasi dan pengelolaan anggaran",
      "Lima peran dengan dashboard sendiri: admin, pengurus, sekretariat, bendahara, mahasiswa",
    ],
    imgs: ["projects/simukm-1.jpg"],
  },
  {
    n: "006", t: "WEBSITE UKM KEWIRAUSAHAAN", status: "DEV", org: "UKM Kewirausahaan",
    d: "Website UKM Kewirausahaan ITB Tuban: katalog produk mahasiswa, profil usaha anggota, cek pesanan, agenda dengan pendaftaran online, galeri, testimoni, pendaftaran anggota, dan portal khusus anggota. Disiapkan untuk dikelola sendiri oleh admin UKM.",
    tags: ["LARAVEL", "MySQL"],
    cat: "WEBSITE UKM", link: "",
    logos: ["laravel", "mysql"],
    features: [
      "Katalog produk mahasiswa dengan pencarian per kategori",
      "Profil usaha anggota (Family) dan kirim pesan ke penjual",
      "Cek status pesanan dan testimoni pembeli",
      "Agenda kegiatan dengan pendaftaran online",
      "Galeri, pendaftaran anggota, dan portal khusus anggota",
    ],
    imgs: ["projects/ukmkwu-1.jpg"],
  },
];


const pjHost = (u) => { try { return new URL(u).host.replace(/^www\./, ""); } catch (e) { return ""; } };
const pjStatus = { LIVE: ["LIVE", ""], DEV: ["DALAM PENGEMBANGAN", " dev"] };

document.getElementById("pjGrid").innerHTML = projects.map((pj, idx) => `
  <div class="pj" role="button" tabindex="0" data-idx="${idx}" aria-label="Lihat detail ${pj.t}">
    <div class="pj-img">
      <span class="pj-empty">SCREENSHOT MENYUSUL</span>
      ${pj.imgs.map((src, i) => `<img src="${src}" alt="Screenshot ${pj.t}" loading="lazy"${i === 0 ? ' class="on"' : ""} onerror="this.remove()">`).join("")}
      ${pjStatus[pj.status] ? `<span class="pj-badge${pjStatus[pj.status][1]}">${pjStatus[pj.status][0]}</span>` : ""}
      ${pj.imgs.length > 1 ? `<div class="pj-ind">${pj.imgs.map((_, i) => `<i${i === 0 ? ' class="on"' : ""}></i>`).join("")}</div>` : ""}
    </div>
    <div class="pj-bar">
      <div><span class="pj-cat">${pj.cat}</span><span class="pj-t">${pj.t}</span></div>
      <span class="pj-more">LIHAT DETAIL</span>
    </div>
    <div class="pj-body">
      <p class="pj-d">${pj.d}</p>
      <div class="pj-meta">
        <span class="pj-org">${pj.org}${pj.link ? ` · ${pjHost(pj.link)}` : ""}</span>
        ${pj.tags.length ? `<span class="pj-tags">${pj.tags.join(" · ")}</span>` : ""}
      </div>
    </div>
  </div>`).join("");

const live = projects.filter((p) => p.status === "LIVE").length;
document.getElementById("factProjects").textContent = `${projects.length} proyek, ${live} sudah live`;

// Hanya screenshot yang sedang terlihat yang berganti (hemat baterai/prosesor HP)
const pjVisible = new Set();
const pjImgObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => (e.isIntersecting ? pjVisible.add(e.target) : pjVisible.delete(e.target)));
});
document.querySelectorAll(".pj-img").forEach((box) => pjImgObs.observe(box));

setInterval(() => {
  if (document.hidden) return;
  pjVisible.forEach((box) => {
    const imgs = [...box.querySelectorAll("img")];
    if (imgs.length < 2) return;
    const i = imgs.findIndex((im) => im.classList.contains("on"));
    const next = (i + 1) % imgs.length;
    imgs.forEach((im, k) => im.classList.toggle("on", k === next));
    box.querySelectorAll(".pj-ind i").forEach((d, k) => d.classList.toggle("on", k === next));
  });
}, 3500);

// =============================================
// MOBILE — menu bawah aktif & titik slider proyek
// =============================================
const mTabLinks = document.querySelectorAll(".m-tab a");
const secObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) mTabLinks.forEach((a) => a.classList.toggle("on", a.dataset.sec === e.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
["hero", "work", "about", "skills", "contact"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) secObs.observe(el);
});

const pjGridEl = document.getElementById("pjGrid");
const pjDotsEl = document.getElementById("pjDots");
pjDotsEl.innerHTML = projects.map((_, i) => `<button aria-label="Proyek ${i + 1}"${i === 0 ? ' class="on"' : ""}></button>`).join("");
const pjDotBtns = pjDotsEl.querySelectorAll("button");
const pjStep = () => (pjGridEl.firstElementChild ? pjGridEl.firstElementChild.getBoundingClientRect().width + 12 : pjGridEl.clientWidth);
pjDotBtns.forEach((b, i) => b.addEventListener("click", () => pjGridEl.scrollTo({ left: i * pjStep(), behavior: "smooth" })));
pjGridEl.addEventListener("scroll", () => {
  const i = Math.round(pjGridEl.scrollLeft / pjStep());
  pjDotBtns.forEach((b, k) => b.classList.toggle("on", k === i));
}, { passive: true });

// =============================================
// NAVBAR — tandai menu section yang sedang dilihat (kuning)
// =============================================
const navMap = { hero: "go('hero')", about: "go('about')", skills: "go('skills')", work: "go('work')", contact: "go('contact')" };
const navLinks = document.querySelectorAll(".navl a");
const navObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    navLinks.forEach((a) => a.classList.toggle("on", a.getAttribute("onclick") === navMap[e.target.id]));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
Object.keys(navMap).forEach((id) => { const el = document.getElementById(id); if (el) navObs.observe(el); });

// =============================================
// POPUP DETAIL PROYEK
// Tutup: tombol ✕, klik di luar, Esc, atau tombol Back di HP
// =============================================
const pdModal = document.getElementById("pdModal");
const pd = (id) => document.getElementById(id);
let pdIdx = 0, pdImg = 0, pdFromHistory = false;

function pdShowImg(i) {
  const pj = projects[pdIdx];
  if (!pj.imgs.length) return;
  // berhenti di ujung (tidak berputar)
  pdImg = Math.max(0, Math.min(pj.imgs.length - 1, i));
  pd("pdPrev").disabled = pdImg === 0;
  pd("pdNext").disabled = pdImg === pj.imgs.length - 1;
  pd("pdImg").src = pj.imgs[pdImg];
  pd("pdImg").alt = `Screenshot ${pj.t} ${pdImg + 1}`;
  pd("pdThumbs").querySelectorAll("button").forEach((b, k) => b.classList.toggle("on", k === pdImg));
  pd("pdCount").textContent = `${pdImg + 1} / ${pj.imgs.length}`;
}

function pdOpen(idx) {
  pdIdx = idx;
  const pj = projects[idx];
  const st = pjStatus[pj.status];
  pd("pdCat").textContent = pj.cat;
  pd("pdTitle").textContent = pj.t;
  pd("pdStatus").innerHTML = st ? `<span class="pj-badge${st[1]}">${st[0]}</span>` : "";
  pd("pdOrg").textContent = pj.org;
  pd("pdDesc").textContent = pj.d;
  pd("pdFeat").innerHTML = (pj.features || []).map((f) => `<li>${f}</li>`).join("");
  pd("pdFeatWrap").hidden = !(pj.features || []).length;
  pd("pdTech").innerHTML = (pj.logos || []).map((l) => `<span><img src="icons/${l}.svg" alt="">${l === "tailwindcss" ? "Tailwind" : l === "cpanel" ? "cPanel" : l === "mysql" ? "MySQL" : l.charAt(0).toUpperCase() + l.slice(1)}</span>`).join("")
    + pj.tags.filter((t) => !["LARAVEL", "MySQL", "TAILWIND", "CPANEL"].includes(t)).map((t) => `<span class="txt">${t}</span>`).join("");
  const live = pd("pdLive");
  if (pj.link) { live.href = pj.link; live.hidden = false; pd("pdLiveHost").textContent = pjHost(pj.link); }
  else live.hidden = true;
  pd("pdUrl").textContent = pj.link ? pjHost(pj.link) : "localhost · dalam pengembangan";
  pd("pdNote").hidden = !!pj.link;
  pd("pdThumbs").innerHTML = pj.imgs.map((src, i) => `<button aria-label="Screenshot ${i + 1}"><img src="${src}" alt=""></button>`).join("");
  pd("pdThumbs").querySelectorAll("button").forEach((b, i) => b.addEventListener("click", () => pdShowImg(i)));
  pd("pdGallery").classList.toggle("empty", !pj.imgs.length);
  pd("pdGallery").classList.toggle("single", pj.imgs.length < 2);
  if (pj.imgs.length) pdShowImg(0); else pd("pdImg").removeAttribute("src");
  pdModal.showModal();
  pdModal.scrollTop = 0;
  document.body.classList.add("pd-lock");
  history.pushState({ pd: true }, "");
}

function pdClose() {
  if (!pdModal.open) return;
  pdModal.close();
  document.body.classList.remove("pd-lock");
  if (!pdFromHistory && history.state && history.state.pd) history.back();
  pdFromHistory = false;
}

document.getElementById("pjGrid").addEventListener("click", (e) => {
  const card = e.target.closest(".pj");
  if (card) pdOpen(+card.dataset.idx);
});
document.getElementById("pjGrid").addEventListener("keydown", (e) => {
  const card = e.target.closest(".pj");
  if (card && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); pdOpen(+card.dataset.idx); }
});
pd("pdClose").addEventListener("click", pdClose);
pd("pdPrev").addEventListener("click", () => pdShowImg(pdImg - 1));
pd("pdNext").addEventListener("click", () => pdShowImg(pdImg + 1));
pdModal.addEventListener("click", (e) => { if (e.target === pdModal) pdClose(); });
pdModal.addEventListener("cancel", (e) => { e.preventDefault(); pdClose(); });
pdModal.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") pdShowImg(pdImg - 1);
  if (e.key === "ArrowRight") pdShowImg(pdImg + 1);
});
window.addEventListener("popstate", () => { if (pdModal.open) { pdFromHistory = true; pdClose(); } });

// geser (swipe) galeri di HP
let pdTouchX = null;
pd("pdGallery").addEventListener("touchstart", (e) => { pdTouchX = e.touches[0].clientX; }, { passive: true });
pd("pdGallery").addEventListener("touchend", (e) => {
  if (pdTouchX === null) return;
  const dx = e.changedTouches[0].clientX - pdTouchX;
  if (Math.abs(dx) > 40) pdShowImg(pdImg + (dx < 0 ? 1 : -1));
  pdTouchX = null;
});

// =============================================
// STEMPEL — putaran berhenti saat stempel tidak terlihat di layar
// =============================================
const stampEl = document.querySelector(".h-stamp");
if (stampEl) {
  new IntersectionObserver((entries) => {
    entries.forEach((e) => stampEl.classList.toggle("paused", !e.isIntersecting));
  }).observe(stampEl);
}
