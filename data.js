/* =========================================================
   ISI PORTOFOLIO — edit file ini saja untuk mengubah konten.
   Kolom yang dikosongkan ("") otomatis tidak ditampilkan.
   ========================================================= */

window.PORTFOLIO = {
  profile: {
    name: "Askhabur Royyan",
    role: "Web developer Laravel",
    intro:
      "Saya membangun sistem informasi berbasis web untuk organisasi di Tuban, dari website yayasan sosial sampai sistem kampus.",
    location: "Tuban, Jawa Timur",
    photo: "assets/img/profile.jpg",
    about: [
      "Saya mahasiswa S1 Sistem Informasi di Institut Teknologi dan Bisnis Tuban. Sebagian besar pekerjaan saya adalah aplikasi web dengan Laravel: panel admin, pengelolaan data, dan sistem yang dipakai sehari-hari oleh pengguna sungguhan.",
      "Saat ini saya sedang menyelesaikan skripsi tentang sistem Micro-ERP untuk kafe, dengan pemesanan lewat QR code di meja.",
    ],
  },

  contact: {
    email: "", // contoh: "nama@gmail.com"
    github: "https://github.com/AskhaburRoyyan",
    linkedin: "", // contoh: "https://linkedin.com/in/username"
    instagram: "", // contoh: "https://instagram.com/username"
    whatsapp: "", // contoh: "6281234567890" (tanpa + dan spasi)
  },

  skills: [
    { group: "Backend", items: ["Laravel", "PHP", "Laravel Breeze (autentikasi)"] },
    { group: "Frontend", items: ["Blade", "Tailwind CSS", "HTML & CSS", "JavaScript"] },
    { group: "Database & deploy", items: ["MySQL", "Git & GitHub", "cPanel hosting", "Laragon"] },
  ],

  /* Foto proyek: taruh di folder assets/img/projects/
     lalu tulis nama filenya di "images". Foto pertama jadi sampul. */
  projects: [
    {
      title: "Website Dompet Sosial Al-Uswah Tuban",
      org: "Yayasan sosial",
      status: "live", // "live" | "dev" | ""
      summary:
        "Membangun ulang website yayasan dari WordPress menjadi aplikasi Laravel, lengkap dengan panel admin supaya pengurus bisa mengelola seluruh isi website sendiri.",
      points: [
        "Panel admin untuk mengelola program, kegiatan, artikel, banner, rekening donasi, legalitas, dan pengurus",
        "Halaman buletin: admin mengunggah PDF dan sampul tiap edisi",
        "Struktur organisasi dengan tab per divisi dan kartu foto pengurus",
        "Optimasi SEO dan deploy ke hosting cPanel di domain dsu.or.id",
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
      summary: "Sistem informasi manajemen untuk Unit Kegiatan Mahasiswa ITB Tuban.",
      points: [],
      stack: [],
      link: "",
      repo: "",
      images: ["assets/img/projects/ukm-1.jpg", "assets/img/projects/ukm-2.jpg", "assets/img/projects/ukm-3.jpg"],
    },
  ],
};
