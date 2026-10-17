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
const skills = [
  { cat: "BACKEND", icon: "▣", nm: "LARAVEL", ds: "MVC, autentikasi (Breeze), Eloquent ORM, panel admin CRUD", accent: "pink" },
  { cat: "BACKEND", icon: "◆", nm: "CODEIGNITER", ds: "Aplikasi web PHP dengan pola MVC", accent: "orange" },
  { cat: "LANGUAGE", icon: "◎", nm: "PHP", ds: "Bahasa utama untuk logika backend", accent: "purple" },
  { cat: "DATABASE", icon: "◐", nm: "MySQL", ds: "Perancangan tabel, relasi, dan query", accent: "cyan" },
  { cat: "LANGUAGE", icon: "◈", nm: "JAVASCRIPT", ds: "Interaksi halaman dan validasi form", accent: "yellow" },
];

const tools = [
  { cat: "FRONTEND", icon: "⬡", nm: "HTML & CSS", accent: "orange" },
  { cat: "FRONTEND", icon: "◉", nm: "TAILWIND CSS", accent: "cyan" },
  { cat: "TOOLS", icon: "▶", nm: "GIT & GITHUB", accent: "green" },
  { cat: "DEPLOY", icon: "◑", nm: "CPANEL HOSTING", accent: "purple" },
];

const accentColors = {
  cyan: "#00cfff", purple: "#7b5cff", green: "#00d68f",
  orange: "#ff6b35", pink: "#ff4d9d", yellow: "#ffb800",
};

document.getElementById("skGrid").innerHTML = skills.map((s) => {
  const col = accentColors[s.accent];
  return `
    <div class="sk" data-accent="${s.accent}">
      <div class="sk-cat" style="color:${col}">${s.cat}</div>
      <div class="sk-ic" style="color:${col}">${s.icon}</div>
      <div class="sk-nm">${s.nm}</div>
      <div class="sk-ds">${s.ds}</div>
    </div>`;
}).join("");

document.getElementById("skGridMini").innerHTML = tools.map((s) => {
  const col = accentColors[s.accent];
  return `
    <div class="sk mini" data-accent="${s.accent}">
      <div class="sk-ic" style="color:${col}">${s.icon}</div>
      <div class="sk-mini-tx">
        <div class="sk-nm">${s.nm}</div>
        <div class="sk-mini-cat" style="color:${col}">${s.cat}</div>
      </div>
    </div>`;
}).join("");

// =============================================
// PROJECTS — kartu statis dengan screenshot
// img: taruh foto di folder "projects/" lalu tulis
// namanya, misal "projects/dsu.jpg". Kosong = placeholder.
// =============================================
const projects = [
  {
    n: "001", t: "WEBSITE DSU TUBAN", status: "LIVE",
    d: "Website Dompet Sosial Al-Uswah Tuban, dibangun ulang dari WordPress ke Laravel dengan panel admin untuk mengelola program, artikel, buletin, dan pengurus.",
    tags: ["LARAVEL", "TAILWIND", "MySQL", "BREEZE"],
    accent: "cyan-purple", link: "https://dsu.or.id", img: "projects/dsu.jpg",
  },
  {
    n: "002", t: "SISTEM PEMBAYARAN MAHASISWA", status: "",
    d: "Sistem untuk mengelola pembayaran mahasiswa Institut Teknologi dan Bisnis Tuban.",
    tags: [],
    accent: "green-cyan", link: "", img: "projects/pembayaran.jpg",
  },
  {
    n: "003", t: "SIM UKM ITB TUBAN", status: "",
    d: "Sistem informasi manajemen untuk Unit Kegiatan Mahasiswa Institut Teknologi dan Bisnis Tuban.",
    tags: [],
    accent: "purple-pink", link: "", img: "projects/ukm.jpg",
  },
];

const pjHost = (u) => { try { return new URL(u).host.replace(/^www\./, ""); } catch (e) { return ""; } };

document.getElementById("pjGrid").innerHTML = projects.map((pj) => `
  <${pj.link ? `a href="${pj.link}" target="_blank" rel="noopener"` : "div"} class="pj${pj.link ? " has-link" : ""}" data-accent="${pj.accent}">
    <div class="pj-shot">
      <div class="pj-bar"><i></i><i></i><i></i><em>${pjHost(pj.link) || pj.t.toLowerCase()}</em></div>
      <div class="pj-img">
        ${pj.img ? `<img src="${pj.img}" alt="Screenshot ${pj.t}" loading="lazy" onerror="this.remove()">` : ""}
        <span class="pj-empty">SCREENSHOT MENYUSUL</span>
      </div>
    </div>
    <div class="pj-in">
      ${pj.link ? `<div class="pj-arr">↗</div>` : ""}
      <div class="pj-n">//${pj.n}${pj.status ? `<span class="pj-live"><span class="ct-dot"></span>${pj.status}</span>` : ""}</div>
      <div class="pj-t">${pj.t}</div>
      <div class="pj-d">${pj.d}</div>
      ${pj.tags.length ? `<div class="pj-tags">${pj.tags.map((t) => `<span class="pj-tag">${t}</span>`).join("")}</div>` : ""}
    </div>
  </${pj.link ? "a" : "div"}>`).join("");

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
      animCount(document.getElementById("sn1"), 3, "+");
      animCount(document.getElementById("sn2"), 40, "+");
      animCount(document.getElementById("sn3"), 15, "+");
      animCount(document.getElementById("sn4"), 10, "+");
      statsObs.disconnect();
    }
  });
}, { threshold: 0.4 });
statsObs.observe(document.getElementById("about"));