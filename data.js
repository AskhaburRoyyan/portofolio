/* =========================================================
   ISI PORTOFOLIO — edit file ini saja untuk mengubah konten.
   Kolom yang dikosongkan ("" atau []) otomatis tidak ditampilkan.
   ========================================================= */

window.PORTFOLIO = {
  profile: {
    name: "Askhabur Royyan",
    role: "Web Developer",
    headline: "Membangun sistem informasi yang dipakai sungguhan",
    intro:
      "Saya membuat aplikasi web berbasis Laravel untuk organisasi di Tuban, dari website yayasan sosial sampai sistem kampus.",
    tags: ["Laravel", "PHP", "MySQL", "Tailwind CSS"],
    location: "Tuban, Jawa Timur",
    photo: "assets/img/profile.webp", // foto di hero
    photoAbout: "assets/img/profile-full.webp", // foto di bagian Tentang
    about: [
      "Saya mahasiswa S1 Sistem Informasi di Institut Teknologi dan Bisnis Tuban. Saya mengembangkan aplikasi web dengan Laravel dan CodeIgniter, mulai dari panel admin, pengelolaan data, sampai deploy ke hosting.",
      "Saya memakai AI sebagai partner development untuk mempercepat eksplorasi dan debugging, tanpa melepas kendali atas solusi yang saya bangun.",
    ],
    quote: "Build fast. Solve problems. Ship things.",
    facts: [
      { label: "Pendidikan", value: "S1 Sistem Informasi, ITB Tuban" },
      { label: "Fokus", value: "Aplikasi web & panel admin" },
      { label: "Sedang dikerjakan", value: "Skripsi Micro-ERP untuk kafe" },
      { label: "Lokasi", value: "Tuban, Jawa Timur" },
    ],
  },

  contact: {
    email: "", // contoh: "nama@gmail.com"
    github: "https://github.com/AskhaburRoyyan",
    linkedin: "", // contoh: "https://linkedin.com/in/username"
    instagram: "", // contoh: "https://instagram.com/username"
    whatsapp: "", // contoh: "6281234567890" (tanpa + dan spasi)
  },

  /* accent: violet | cyan | pink | lime | orange | yellow */
  skills: [
    { name: "Laravel", group: "Backend", desc: "MVC, autentikasi (Breeze), Eloquent, panel admin CRUD", accent: "pink" },
    { name: "CodeIgniter", group: "Backend", desc: "Aplikasi web PHP dengan pola MVC", accent: "orange" },
    { name: "PHP", group: "Bahasa", desc: "Bahasa utama untuk backend", accent: "violet" },
    { name: "MySQL", group: "Database", desc: "Perancangan tabel, relasi, dan query", accent: "cyan" },
    { name: "Tailwind CSS", group: "Frontend", desc: "Tampilan responsif yang rapi", accent: "cyan" },
    { name: "HTML, CSS & JavaScript", group: "Frontend", desc: "Dasar tampilan dan interaksi halaman", accent: "yellow" },
    { name: "Git & GitHub", group: "Tools", desc: "Version control dan penyimpanan kode", accent: "lime" },
    { name: "cPanel", group: "Deploy", desc: "Upload aplikasi Laravel, domain, dan database", accent: "violet" },
  ],

  /* Foto proyek: taruh di folder assets/img/projects/
     lalu tulis nama filenya di "images". Foto pertama jadi sampul. */
  projects: [
    {
      title: "Website Dompet Sosial Al-Uswah Tuban",
      org: "Yayasan sosial",
      status: "live", // "live" | "dev" | ""
      accent: "cyan",
      summary:
        "Membangun ulang website yayasan dari WordPress menjadi aplikasi Laravel, lengkap dengan panel admin supaya pengurus bisa mengelola seluruh isi website sendiri.",
      points: [
        "Panel admin untuk program, kegiatan, artikel, banner, rekening donasi, legalitas, dan pengurus",
        "Halaman buletin: admin mengunggah PDF dan sampul tiap edisi",
        "Struktur organisasi dengan tab per divisi dan kartu foto pengurus",
        "Optimasi SEO dan deploy ke hosting cPanel",
      ],
      stack: ["Laravel", "Tailwind CSS", "MySQL", "Breeze"],
      link: "https://dsu.or.id",
      repo: "",
      images: ["assets/img/projects/dsu-1.jpg", "assets/img/projects/dsu-2.jpg", "assets/img/projects/dsu-3.jpg"],
    },
    {
      title: "Sistem Pembayaran Mahasiswa",
      org: "Institut Teknologi dan Bisnis Tuban",
      status: "",
      accent: "violet",
      summary: "Sistem untuk mengelola pembayaran mahasiswa ITB Tuban.",
      points: [],
      stack: [],
      link: "",
      repo: "",
      images: ["assets/img/projects/pembayaran-1.jpg", "assets/img/projects/pembayaran-2.jpg", "assets/img/projects/pembayaran-3.jpg"],
    },
    {
      title: "SIM UKM",
      org: "Institut Teknologi dan Bisnis Tuban",
      status: "",
      accent: "pink",
      summary: "Sistem informasi manajemen untuk Unit Kegiatan Mahasiswa ITB Tuban.",
      points: [],
      stack: [],
      link: "",
      repo: "",
      images: ["assets/img/projects/ukm-1.jpg", "assets/img/projects/ukm-2.jpg", "assets/img/projects/ukm-3.jpg"],
    },
  ],
};
