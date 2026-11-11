// =============================================
// NAV — Smooth scroll
// =============================================
function go(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// =============================================
// LOADER
// =============================================
const msgs = ["INIT SYSTEMS...", "MOUNTING APP...", "READY ↗"];
let p = 0, mi = 0;
const fill = document.getElementById("ldFill");
const pctEl = document.getElementById("ldPct");
const msgEl = document.getElementById("ldMsg");

const ldI = setInterval(() => {
  p += Math.random() * 5 + 3;
  if (p > 100) p = 100;
  fill.style.width = p + "%";
  pctEl.textContent = Math.floor(p) + "%";
  const idx = Math.floor((p / 100) * msgs.length);
  if (idx > mi && mi < msgs.length - 1) {
    mi = idx;
    msgEl.textContent = msgs[mi];
  }
  if (p >= 100) {
    clearInterval(ldI);
    msgEl.textContent = msgs[msgs.length - 1];
    setTimeout(() => {
      document.getElementById("loader").classList.add("gone");
      playHeroIntro();
    }, 500);
  }
}, 60);

// =============================================
// HERO INTRO (jalan otomatis setelah loader)
// =============================================
function playHeroIntro() {
  const spinner = document.getElementById("photoSpinner");
  spinner.classList.add("do-spin");
  spinner.addEventListener(
    "animationend",
    () => {
      spinner.classList.remove("do-spin");
      spinner.classList.add("spin-done");
    },
    { once: true }
  );

  const textEls = document.querySelectorAll(".hero-text > *");
  const delays = [250, 850, 1550, 2550, 3300, 3950, 4650];
  textEls.forEach((el, i) => {
    const ms = delays[i] !== undefined ? delays[i] : 300 + i * 600;
    setTimeout(() => el.classList.add("revealed"), ms);
  });
}

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
    imgs: ["projects/bem-1.jpg", "projects/bem-2.jpg", "projects/bem-3.jpg"],
  },
  {
    n: "002", t: "WEBSITE DSU TUBAN", status: "LIVE", org: "DSU Tuban",
    d: "Website Dompet Sosial Al-Uswah Tuban, dibangun ulang dari WordPress ke Laravel dengan panel admin untuk mengelola program, kegiatan, artikel, buletin, dan struktur pengurus, plus kalkulator zakat.",
    tags: ["LARAVEL", "TAILWIND", "MySQL", "BREEZE"],
    cat: "WEBSITE YAYASAN", link: "https://dsu.or.id",
    imgs: ["projects/dsu-1.jpg", "projects/dsu-2.jpg", "projects/dsu-3.jpg"],
  },
  {
    n: "003", t: "MICRO-ERP LATAR KOPI", status: "DEV", org: "Latar Kopi",
    d: "Sistem operasional kafe: pelanggan memesan dengan scan QR di meja, pembayaran dikonfirmasi kasir, lalu pesanan diteruskan ke dapur. Resep tiap menu memotong stok bahan baku otomatis dan menghitung HPP serta margin. Akun terpisah untuk owner, kasir, dan dapur.",
    tags: ["LARAVEL", "TAILWIND", "MySQL"],
    cat: "SISTEM KAFE · ERP", link: "",
    imgs: ["projects/latarkopi-1.jpg", "projects/latarkopi-2.jpg", "projects/latarkopi-3.jpg"],
  },
  {
    n: "004", t: "SISTEM PEMBAYARAN MAHASISWA", status: "", org: "ITB Tuban",
    d: "Sistem pembayaran kampus: admin membuat tagihan per jenis pembayaran dan tahun akademik, mengatur potongan dan cicilan, memverifikasi bukti transfer, lalu mengekspor laporan rekap dan tunggakan ke Excel atau PDF. Mahasiswa masuk dengan NIM untuk melihat tagihannya.",
    tags: ["LARAVEL", "LIVEWIRE", "MySQL"],
    cat: "SISTEM PEMBAYARAN", link: "",
    imgs: ["projects/pembayaran-1.jpg", "projects/pembayaran-2.jpg", "projects/pembayaran-3.jpg"],
  },
  {
    n: "005", t: "SIM UKM ITB TUBAN", status: "", org: "ITB Tuban",
    d: "Platform pengelolaan UKM kampus: data UKM, pendaftaran anggota, kegiatan dan absensi, proposal, SK, prestasi, serta anggaran. Lima peran dengan dashboard masing-masing: admin, pengurus, sekretariat, bendahara, dan mahasiswa.",
    tags: ["LARAVEL", "MySQL", "MULTI-ROLE"],
    cat: "SISTEM INFORMASI", link: "",
    imgs: ["projects/simukm-1.jpg"],
  },
  {
    n: "006", t: "WEBSITE UKM KEWIRAUSAHAAN", status: "DEV", org: "UKM Kewirausahaan",
    d: "Website UKM Kewirausahaan ITB Tuban: katalog produk mahasiswa, profil usaha anggota, cek pesanan, agenda dengan pendaftaran online, galeri, testimoni, pendaftaran anggota, dan portal khusus anggota. Disiapkan untuk dikelola sendiri oleh admin UKM.",
    tags: ["LARAVEL", "MySQL"],
    cat: "WEBSITE UKM", link: "",
    imgs: ["projects/ukmkwu-1.jpg"],
  },
];


const pjHost = (u) => { try { return new URL(u).host.replace(/^www\./, ""); } catch (e) { return ""; } };
const pjStatus = { LIVE: ["LIVE", ""], DEV: ["DALAM PENGEMBANGAN", " dev"] };

document.getElementById("pjGrid").innerHTML = projects.map((pj) => {
  const tag = pj.link ? `a href="${pj.link}" target="_blank" rel="noopener"` : "div";
  const end = pj.link ? "a" : "div";
  return `
  <${tag} class="pj${pj.link ? " has-link" : ""}">
    <div class="pj-img">
      <span class="pj-empty">SCREENSHOT MENYUSUL</span>
      ${pj.imgs.map((src, i) => `<img src="${src}" alt="Screenshot ${pj.t}" loading="lazy"${i === 0 ? ' class="on"' : ""} onerror="this.remove()">`).join("")}
      ${pjStatus[pj.status] ? `<span class="pj-badge${pjStatus[pj.status][1]}">${pjStatus[pj.status][0]}</span>` : ""}
      ${pj.imgs.length > 1 ? `<div class="pj-ind">${pj.imgs.map((_, i) => `<i${i === 0 ? ' class="on"' : ""}></i>`).join("")}</div>` : ""}
    </div>
    <div class="pj-bar">
      <div><span class="pj-cat">${pj.cat}</span><span class="pj-t">${pj.t}</span></div>
      <span class="pj-arr">${pj.link ? "↗" : pj.n}</span>
    </div>
    <div class="pj-body">
      <p class="pj-d">${pj.d}</p>
      <div class="pj-meta">
        <span class="pj-org">${pj.org}${pj.link ? ` · ${pjHost(pj.link)}` : ""}</span>
        ${pj.tags.length ? `<span class="pj-tags">${pj.tags.join(" · ")}</span>` : ""}
      </div>
    </div>
  </${end}>`;
}).join("");

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
