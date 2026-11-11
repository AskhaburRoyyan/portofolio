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
// SKILLS — kartu statis, tanpa persentase
// Baris atas: kartu besar · Baris bawah: kartu mini
// accent: cyan | purple | green | orange | pink | yellow
// =============================================
// logo: nama file di folder icons/ (tanpa .svg)
const skills = [
  { cat: "BACKEND", logo: ["laravel"], nm: "LARAVEL", ds: "MVC, autentikasi (Breeze), Eloquent ORM, panel admin CRUD", accent: "pink" },
  { cat: "BACKEND", logo: ["codeigniter"], nm: "CODEIGNITER", ds: "Aplikasi web PHP dengan pola MVC", accent: "orange" },
  { cat: "LANGUAGE", logo: ["php"], nm: "PHP", ds: "Bahasa utama untuk logika backend", accent: "purple" },
  { cat: "DATABASE", logo: ["mysql"], nm: "MySQL", ds: "Perancangan tabel, relasi, dan query", accent: "cyan" },
  { cat: "LANGUAGE", logo: ["javascript"], nm: "JAVASCRIPT", ds: "Interaksi halaman dan validasi form", accent: "yellow" },
];

const tools = [
  { cat: "FRONTEND", logo: ["html5", "css3"], nm: "HTML & CSS", accent: "orange" },
  { cat: "FRONTEND", logo: ["tailwindcss"], nm: "TAILWIND CSS", accent: "cyan" },
  { cat: "TOOLS", logo: ["git", "github"], nm: "GIT & GITHUB", accent: "green" },
  { cat: "DEPLOY", logo: ["cpanel"], nm: "CPANEL HOSTING", accent: "purple" },
  { cat: "MOBILE", logo: ["java", "androidstudio"], nm: "JAVA · ANDROID STUDIO", accent: "pink" },
  { cat: "DESKTOP", logo: ["java", "netbeans"], nm: "JAVA · NETBEANS", accent: "yellow" },
];

const skLogos = (s) => s.logo.map((l) => `<img src="icons/${l}.svg" alt="${l}" loading="lazy">`).join("");

const accentColors = {
  cyan: "#00cfff", purple: "#7b5cff", green: "#00d68f",
  orange: "#ff6b35", pink: "#ff4d9d", yellow: "#ffb800",
};

document.getElementById("skGrid").innerHTML = skills.map((s) => {
  const col = accentColors[s.accent];
  return `
    <div class="sk" data-accent="${s.accent}">
      <div class="sk-cat" style="color:${col}">${s.cat}</div>
      <div class="sk-ic">${skLogos(s)}</div>
      <div class="sk-nm">${s.nm}</div>
      <div class="sk-ds">${s.ds}</div>
    </div>`;
}).join("");

document.getElementById("skGridMini").innerHTML = tools.map((s) => {
  const col = accentColors[s.accent];
  return `
    <div class="sk mini" data-accent="${s.accent}">
      <div class="sk-ic">${skLogos(s)}</div>
      <div class="sk-mini-tx">
        <div class="sk-nm">${s.nm}</div>
        <div class="sk-mini-cat" style="color:${col}">${s.cat}</div>
      </div>
    </div>`;
}).join("");

// =============================================
// PROJECTS — screenshot bergantian otomatis
// imgs: taruh foto di folder "projects/" lalu tulis
// namanya, misal "projects/latarkopi-1.jpg".
// status: "LIVE" | "DEV" | ""  (DEV = dalam pengembangan)
// =============================================
const projects = [
  {
    n: "001", t: "WEBSITE & PORTAL BEM ITB TUBAN", status: "LIVE", org: "BEM ITB Tuban",
    d: "Web profil BEM sekaligus portal administrasi: pengajuan dan pelacakan surat UKM sampai kemahasiswaan, arsip, program kerja, aspirasi mahasiswa dengan nomor tiket, akun per kementerian dengan hak akses berbeda, dan notifikasi Web Push.",
    tags: ["LARAVEL", "MySQL", "WEB PUSH", "CPANEL"],
    accent: "cyan-purple", link: "https://bemitbtuban.com",
    imgs: ["projects/bem-1.jpg", "projects/bem-2.jpg", "projects/bem-3.jpg"],
  },
  {
    n: "002", t: "WEBSITE DSU TUBAN", status: "LIVE", org: "DSU Tuban",
    d: "Website Dompet Sosial Al-Uswah Tuban, dibangun ulang dari WordPress ke Laravel dengan panel admin untuk mengelola program, kegiatan, artikel, buletin, dan struktur pengurus, plus kalkulator zakat.",
    tags: ["LARAVEL", "TAILWIND", "MySQL", "BREEZE"],
    accent: "green-cyan", link: "https://dsu.or.id",
    imgs: ["projects/dsu-1.jpg", "projects/dsu-2.jpg", "projects/dsu-3.jpg"],
  },
  {
    n: "003", t: "MICRO-ERP LATAR KOPI", status: "DEV", org: "Latar Kopi",
    d: "Sistem operasional kafe: pelanggan memesan dengan scan QR di meja, pembayaran dikonfirmasi kasir, lalu pesanan diteruskan ke dapur. Resep tiap menu memotong stok bahan baku otomatis dan menghitung HPP serta margin. Akun terpisah untuk owner, kasir, dan dapur.",
    tags: ["LARAVEL", "TAILWIND", "MySQL"],
    accent: "orange-pink", link: "",
    imgs: ["projects/latarkopi-1.jpg", "projects/latarkopi-2.jpg", "projects/latarkopi-3.jpg"],
  },
  {
    n: "004", t: "SISTEM PEMBAYARAN MAHASISWA", status: "", org: "ITB Tuban",
    d: "Sistem pembayaran kampus: admin membuat tagihan per jenis pembayaran dan tahun akademik, mengatur potongan dan cicilan, memverifikasi bukti transfer, lalu mengekspor laporan rekap dan tunggakan ke Excel atau PDF. Mahasiswa masuk dengan NIM untuk melihat tagihannya.",
    tags: ["LARAVEL", "LIVEWIRE", "MySQL"],
    accent: "purple-pink", link: "",
    imgs: ["projects/pembayaran-1.jpg", "projects/pembayaran-2.jpg", "projects/pembayaran-3.jpg"],
  },
  {
    n: "005", t: "SIM UKM ITB TUBAN", status: "", org: "ITB Tuban",
    d: "Platform pengelolaan UKM kampus: data UKM, pendaftaran anggota, kegiatan dan absensi, proposal, SK, prestasi, serta anggaran. Lima peran dengan dashboard masing-masing: admin, pengurus, sekretariat, bendahara, dan mahasiswa.",
    tags: ["LARAVEL", "MySQL", "MULTI-ROLE"],
    accent: "blue-cyan", link: "",
    imgs: ["projects/simukm-1.jpg"],
  },
  {
    n: "006", t: "WEBSITE UKM KEWIRAUSAHAAN", status: "DEV", org: "UKM Kewirausahaan",
    d: "Website UKM Kewirausahaan ITB Tuban: katalog produk mahasiswa, profil usaha anggota, cek pesanan, agenda dengan pendaftaran online, galeri, testimoni, pendaftaran anggota, dan portal khusus anggota. Disiapkan untuk dikelola sendiri oleh admin UKM.",
    tags: ["LARAVEL", "MySQL"],
    accent: "yellow-green", link: "",
    imgs: ["projects/ukmkwu-1.jpg"],
  },
];

const pjHost = (u) => { try { return new URL(u).host.replace(/^www\./, ""); } catch (e) { return ""; } };
const pjStatus = { LIVE: ["LIVE", ""], DEV: ["DALAM PENGEMBANGAN", " dev"] };

document.getElementById("pjGrid").innerHTML = projects.map((pj) => `
  <${pj.link ? `a href="${pj.link}" target="_blank" rel="noopener"` : "div"} class="pj${pj.link ? " has-link" : ""}" data-accent="${pj.accent}">
    <div class="pj-shot">
      <div class="pj-bar"><i></i><i></i><i></i><em>${pjHost(pj.link) || pj.t.toLowerCase()}</em></div>
      <div class="pj-img">
        <span class="pj-empty">SCREENSHOT MENYUSUL</span>
        ${pj.imgs.map((src, i) => `<img src="${src}" alt="Screenshot ${pj.t}" loading="lazy"${i === 0 ? ' class="on"' : ""} onerror="this.remove()">`).join("")}
        ${pj.imgs.length > 1 ? `<div class="pj-ind">${pj.imgs.map((_, i) => `<i${i === 0 ? ' class="on"' : ""}></i>`).join("")}</div>` : ""}
      </div>
    </div>
    <div class="pj-in">
      ${pj.link ? `<div class="pj-arr">↗</div>` : ""}
      <div class="pj-n">//${pj.n}${pjStatus[pj.status] ? `<span class="pj-live${pjStatus[pj.status][1]}"><span class="ct-dot"></span>${pjStatus[pj.status][0]}</span>` : ""}</div>
      <div class="pj-t">${pj.t}</div>
      <div class="pj-d">${pj.d}</div>
      ${pj.tags.length ? `<div class="pj-tags">${pj.tags.map((t) => `<span class="pj-tag">${t}</span>`).join("")}</div>` : ""}
    </div>
  </${pj.link ? "a" : "div"}>`).join("");

// Screenshot berganti otomatis tiap 3,5 detik
// Hanya gambar yang sedang terlihat di layar yang berganti (hemat baterai/prosesor HP)
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
// COUNTER
// =============================================
function animCount(el, target, suffix = "") {
  let v = 0;
  const step = target / 50;
  const iv = setInterval(() => {
    v = Math.min(v + step, target);
    el.textContent = Math.floor(v) + suffix;
    if (v >= target) clearInterval(iv);
  }, 28);
}
const statsObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      animCount(document.getElementById("sn1"), projects.length, "");
      animCount(document.getElementById("sn2"), projects.filter((p) => p.status === "LIVE").length, "");
      animCount(document.getElementById("sn3"), new Set(projects.map((p) => p.org)).size, "");
      animCount(document.getElementById("sn4"), skills.length + tools.length, "");
      statsObs.disconnect();
    }
  });
}, { threshold: 0.4 });
statsObs.observe(document.getElementById("about"));

// =============================================
// MOBILE — menu bawah aktif & titik slider proyek
// =============================================
const mTabLinks = document.querySelectorAll(".m-tab a");
const secObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      mTabLinks.forEach((a) => a.classList.toggle("on", a.dataset.sec === e.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
["hero", "about", "skills", "work", "contact"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) secObs.observe(el);
});

const pjGridEl = document.getElementById("pjGrid");
const pjDotsEl = document.getElementById("pjDots");
pjDotsEl.innerHTML = projects.map((_, i) => `<button aria-label="Proyek ${i + 1}"${i === 0 ? ' class="on"' : ""}></button>`).join("");
const pjDotBtns = pjDotsEl.querySelectorAll("button");
pjDotBtns.forEach((b, i) =>
  b.addEventListener("click", () => pjGridEl.scrollTo({ left: i * pjGridEl.clientWidth, behavior: "smooth" }))
);
pjGridEl.addEventListener("scroll", () => {
  const i = Math.round(pjGridEl.scrollLeft / pjGridEl.clientWidth);
  pjDotBtns.forEach((b, k) => b.classList.toggle("on", k === i));
}, { passive: true });
