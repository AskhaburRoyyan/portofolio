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
    }, 500);
  }
}, 60);

// =============================================
// AUDIO
// =============================================
const bgAudio = document.getElementById("bgAudio");
bgAudio.volume = 0.5;
let audioPlaying = false;

function startAudio() {
  bgAudio
    .play()
    .then(() => {
      audioPlaying = true;
      document.getElementById("audioBtn").textContent = "🔊";
    })
    .catch(() => {});
}

function toggleAudio() {
  const btn = document.getElementById("audioBtn");
  if (audioPlaying) {
    bgAudio.pause();
    btn.textContent = "🔇";
    audioPlaying = false;
  } else {
    startAudio();
  }
}

// =============================================
// START OVERLAY + HERO INTRO
// =============================================
const startOverlay = document.getElementById("startOverlay");
const startBtn = document.getElementById("startBtn");

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

startBtn.addEventListener("click", () => {
  startAudio();
  startOverlay.classList.add("fade-out");
  setTimeout(() => {
    startOverlay.classList.add("gone");
    playHeroIntro();
  }, 850);
});

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
// MARQUEE HELPER (dipakai Skills & Projects)
// =============================================
function setupMarquee({ track, carousel, prevBtn, nextBtn, dotsEl, cardSel, cardW, speed, reverse }) {
  const gap = 1.2 * 16;
  const count = track.querySelectorAll(cardSel).length / 2; // asli + clone
  const totalW = count * (cardW + gap);

  track.querySelectorAll(cardSel).forEach((c) => {
    c.style.width = cardW + "px";
    c.style.minWidth = cardW + "px";
  });
  track.style.setProperty("--marquee-dist", `-${totalW}px`);
  if (reverse) track.style.animationDirection = "reverse";
  track.style.animationDuration = totalW / speed + "s";
  track.classList.add("marquee-mode");

  carousel.addEventListener("mouseenter", () => track.classList.add("paused"));
  carousel.addEventListener("mouseleave", () => track.classList.remove("paused"));

  // Geser manual: majukan/mundurkan currentTime animasi
  function shift(pxDir) {
    const anim = track.getAnimations()[0];
    if (!anim) return;
    const dur = anim.effect.getComputedTiming().duration;
    const deltaMs = ((cardW + gap) / speed) * 1000 * pxDir * (reverse ? -1 : 1);
    let t = (anim.currentTime || 0) + deltaMs;
    t = ((t % dur) + dur) % dur;
    anim.currentTime = t;
  }
  if (prevBtn) prevBtn.addEventListener("click", () => shift(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => shift(1));

  if (dotsEl) dotsEl.style.display = "none";
}

// =============================================
// SKILLS — VARIASI: 2 baris berlawanan arah
// Baris A: kartu besar (5) · Baris B: kartu mini (4)
// =============================================
const skills = [
  { cat: "FRONTEND", icon: "⬡", nm: "REACT + R3F", ds: "3D web interfaces & component architecture", lv: 94, accent: "cyan" },
  { cat: "3D / WEBGL", icon: "◉", nm: "THREE.JS", ds: "Real-time 3D scenes, shaders, particle systems", lv: 90, accent: "purple" },
  { cat: "ANIMATION", icon: "◈", nm: "GSAP + SCROLL", ds: "Cinematic scroll-driven animations", lv: 92, accent: "green" },
  { cat: "FRONTEND", icon: "◆", nm: "VUE 3 + NUXT", ds: "Reactive UI & server-side rendering", lv: 88, accent: "orange" },
  { cat: "BACKEND", icon: "▣", nm: "LARAVEL", ds: "REST APIs, MVC, authentication & eloquent ORM", lv: 91, accent: "pink" },
  { cat: "LANGUAGE", icon: "◎", nm: "TYPESCRIPT", ds: "Type-safe fullstack development", lv: 87, accent: "yellow" },
  { cat: "MOBILE", icon: "◐", nm: "FLUTTER", ds: "Cross-platform mobile apps for iOS & Android", lv: 82, accent: "cyan" },
  { cat: "BACKEND", icon: "▶", nm: "NODE.JS", ds: "REST APIs, WebSocket, real-time systems", lv: 85, accent: "green" },
  { cat: "LANGUAGE", icon: "◑", nm: "JAVA", ds: "OOP, Android & backend service development", lv: 80, accent: "orange" },
];

const accentColors = {
  cyan: "#00cfff", purple: "#7b5cff", green: "#00d68f",
  orange: "#ff6b35", pink: "#ff4d9d", yellow: "#ffb800",
};

const rowA = skills.slice(0, 5);
const rowB = skills.slice(5);

const skTrackA = document.getElementById("skTrackA");
const skTrackB = document.getElementById("skTrackB");

function buildSkCard(s, mini) {
  const col = accentColors[s.accent];
  const card = document.createElement("div");
  card.className = mini ? "sk mini" : "sk";
  card.dataset.accent = s.accent;
  if (mini) {
    card.innerHTML = `
      <div class="sk-ic" style="color:${col}">${s.icon}</div>
      <div class="sk-mini-tx">
        <div class="sk-nm">${s.nm}</div>
        <div class="sk-mini-cat" style="color:${col}">${s.cat}</div>
      </div>
      <div class="sk-mini-lv" style="color:${col}">${s.lv}<span>%</span></div>`;
  } else {
    card.innerHTML = `
      <div class="sk-cat" style="color:${col}">${s.cat}</div>
      <div class="sk-ic" style="color:${col}">${s.icon}</div>
      <div class="sk-nm">${s.nm}</div>
      <div class="sk-ds">${s.ds}</div>
      <div class="sk-tr"><div class="sk-fl" data-w="${s.lv}" style="background:linear-gradient(90deg,${col},${col}88)"></div></div>`;
  }
  return card;
}

function fillTrack(track, list, mini) {
  list.forEach((s) => track.appendChild(buildSkCard(s, mini)));
  list.forEach((s) => {
    const clone = buildSkCard(s, mini);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });
}

fillTrack(skTrackA, rowA, false);
fillTrack(skTrackB, rowB, true);

const isMobile = window.innerWidth < 640;

setupMarquee({
  track: skTrackA,
  carousel: document.getElementById("skCarousel"),
  prevBtn: document.getElementById("skPrev"),
  nextBtn: document.getElementById("skNext"),
  dotsEl: null,
  cardSel: ".sk",
  cardW: isMobile ? 215 : 250,
  speed: 30,
  reverse: false,
});

setupMarquee({
  track: skTrackB,
  carousel: document.getElementById("skCarousel"),
  prevBtn: null, // listener sudah dipasang di baris A
  nextBtn: null,
  dotsEl: null,
  cardSel: ".sk",
  cardW: isMobile ? 180 : 215,
  speed: 24,
  reverse: true,
});

let skBarsAnimated = false;
const skillObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !skBarsAnimated) {
        skBarsAnimated = true;
        document.querySelectorAll(".sk-fl").forEach((el) => (el.style.width = el.dataset.w + "%"));
      }
    });
  },
  { threshold: 0.25 }
);
skillObs.observe(document.getElementById("skills"));

// =============================================
// PROJECTS — VARIASI: marquee zigzag + float
// =============================================
const projects = [
  { n: "001", t: "WEBSITE DSU TUBAN", d: "Website Dompet Sosial Al-Uswah Tuban, dibangun ulang dari WordPress ke Laravel dengan panel admin untuk mengelola program, artikel, buletin, dan pengurus.", tags: ["LARAVEL", "TAILWIND", "MySQL", "BREEZE"], accent: "cyan-purple", link: "https://dsu.or.id" },
  { n: "002", t: "SISTEM PEMBAYARAN MAHASISWA", d: "Sistem untuk mengelola pembayaran mahasiswa Institut Teknologi dan Bisnis Tuban.", tags: [], accent: "green-cyan", link: "" },
  { n: "003", t: "SIM UKM ITB TUBAN", d: "Sistem informasi manajemen untuk Unit Kegiatan Mahasiswa Institut Teknologi dan Bisnis Tuban.", tags: [], accent: "purple-pink", link: "" },
];

const pjTrack = document.getElementById("pjTrack");

function buildPjCard(pj) {
  const card = document.createElement("div");
  card.className = "pj";
  card.dataset.accent = pj.accent;
  if (pj.link) card.onclick = () => window.open(pj.link);
  card.innerHTML = `
    <div class="pj-in">
      <div class="pj-arr">↗</div>
      <div class="pj-n">//${pj.n}</div>
      <div class="pj-t">${pj.t}</div>
      <div class="pj-d">${pj.d}</div>
      <div class="pj-tags">${pj.tags.map((t) => `<span class="pj-tag">${t}</span>`).join("")}</div>
    </div>`;
  return card;
}

projects.forEach((pj) => pjTrack.appendChild(buildPjCard(pj)));
projects.forEach((pj) => {
  const clone = buildPjCard(pj);
  clone.setAttribute("aria-hidden", "true");
  pjTrack.appendChild(clone);
});

setupMarquee({
  track: pjTrack,
  carousel: document.getElementById("pjCarousel"),
  prevBtn: document.getElementById("pjPrev"),
  nextBtn: document.getElementById("pjNext"),
  dotsEl: null,
  cardSel: ".pj",
  cardW: isMobile ? 290 : 340,
  speed: 20,
  reverse: false,
});

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