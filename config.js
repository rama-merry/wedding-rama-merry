/**
 * ====================================================================
 * WEDDING INVITATION CONFIGURATION
 * ====================================================================
 * Seluruh data undangan pernikahan dapat diubah melalui file ini.
 * Tidak perlu memodifikasi kode HTML atau CSS untuk mengubah konten,
 * foto, tanggal, rekening, atau kutipan.
 */

const WEDDING_CONFIG = {
  // 1. DATA UMUM & TEMA
  meta: {
    title: "The Wedding of Rama & Merry",
    description: "Undangan Pernikahan Digital Rama Oktamala & Neng Meri Ratna Sapuri. Merupakan kehormatan bagi kami atas kehadiran dan doa restu Anda.",
    keywords: "undangan pernikahan digital, wedding invitation, rama merry wedding, luxury wedding",
    ogImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    favicon: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=64&q=80"
  },

  // 2. DATA MEMPELAI
  couple: {
    groom: {
      fullName: "Rama Oktamala, S.T.",
      nickname: "Rama",
      sonOf: "Putra Kedua dari Bapak Ade Saripudin & Ibu Dede Juhayah (Almh)",
      photo: "/assets/img/rama.jpg",
      photoFrame: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      instagram: "https://instagram.com",
      instagramUsername: "@ramaoktamala",
      bio: "Seorang guru IT yang percaya bahwa cinta sejati adalah ruang terindah untuk berpulang dan bertumbuh bersama."
    },
    bride: {
      fullName: "Neng Meri Ratna Sapuri, S.Pd.",
      nickname: "Merry",
      daughterOf: "Putri Kedua dari Bapak Uum & Ibu Eutik",
      photo: "/assets/img/merry.jpg",
      instagram: "https://instagram.com",
      instagramUsername: "@merryratna_s",
      bio: "Guru PPKn yang meyakini takdir indah yang telah Tuhan gariskan."
    },
    hashtag: "#RamaMerryForever",
    announcement: "The Wedding Celebration Of"
  },

  // 3. WAKTU & TANGGAL PERNIKAHAN
  // Format ISO: YYYY-MM-DDTHH:mm:ss (WIB = UTC+7)
  weddingDate: {
    targetCountdown: "2026-12-28T08:00:00+07:00", // Waktu countdown
    displayDate: "Senin, 28 Desember 2026",
    hijriDate: "19 Rajab 1448 H"
  },

  // 4. AGENDA ACARA (AKAD & RESEPSI)
  events: [
    {
      id: "akad",
      title: "Akad Nikah",
      badge: "Intimate Ceremony",
      day: "Senin",
      date: "28 Desember 2026",
      time: "08.00 - 09.00 WIB",
      venue: "Kp. Peuteuyjaya",
      address: "Kp. Peuteuyjaya RT 003 RW 003 Desa Jayaratu Kec. Sariwangi",
      googleMapsUrl: "https://maps.app.goo.gl/t4E89NnFMvvgDCQx9",
      notes: "Diharapkan hadir 15 menit sebelum acara dimulai demi kekhidmatan prosesi akad nikah."
    },
    {
      id: "resepsi",
      title: "Resepsi Pernikahan",
      badge: "Grand Reception",
      day: "Senin",
      date: "28 Desember 2026",
      time: "09.30 - 14.30 WIB",
      venue: "Kp. Peuteuyjaya",
      address: "Kp. Peuteuyjaya RT 003 RW 003 Desa Jayaratu Kec. Sariwangi",
      googleMapsUrl: "https://maps.app.goo.gl/t4E89NnFMvvgDCQx9",
      notes: "Protokol kesopanan dan kebersamaan senantiasa kami junjung tinggi."
    }
  ],

  // 5. GOOGLE CALENDAR HELPER
  calendar: {
    title: "The Wedding of Rama & Merry",
    details: "Pernikahan Rama Oktamala & Neng Meri Ratna Sapuri di Kp. Peuteuyjaya.",
    location: "Kp. Peuteuyjaya RT 003 RW 003 Desa Jayaratu Kec. Sariwangi",
    startIso: "20261212T010000Z", // UTC time (08:00 WIB = 01:00 UTC)
    endIso: "20261212T073000Z"    // UTC time (14:30 WIB = 07:30 UTC)
  },

  // 6. KUTIPAN PERNIKAHAN / AYAT SUCI
  quote: {
    verse: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
    translation: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.",
    source: "QS. Ar-Rum Ayat 21",
    blessingText: "Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami bermaksud menyelenggarakan syukuran pernikahan putra-putri kami."
  },

  // 7. KISAH CINTA (LOVE STORY TIMELINE)
  loveStory: [
    {
      year: "1 Maret 2026",
      title: "Awal Pertemuan Kita",
      image: "assets/img/pertama.jpg",
      description: "Dipertemukan oleh seorang teman, dilanjutkan dengan obrolan yang kian intens setiap harinya. Pertemuan pertama kami di sebuah kafe saat Buka Puasa Bersama menjadi saksi; percakapan sederhana tentang perjalanan hidup yang mengawali ribuan cerita panjang, hingga akhirnya kami memutuskan untuk merangkai masa depan bersama."
    },
    {
      year: "26 Maret 2026",
      title: "Mengenal Lebih Dekat & Satu Visi",
      image: "assets/img/kita.png",
      description: "Tak butuh waktu lama bagi kami untuk menyadari bahwa tujuan kami sama. Langkah berikutnya membawa kami untuk saling mengenalkan diri ke tengah keluarga masing-masing. Kehangatan serta restu dari kedua keluarga menjadi pondasi kuat bagi kami untuk menyatukan visi dan menatap masa depan bersama."
    },
    {
      year: "11 Juli 2026",
      title: "Ikrar Komitmen & Lamaran",
      image: "assets/img/tunangan.png",
      description: "Dipeluk kehangatan keluarga terdekat, sebuah lamaran sederhana menjadi penanda komitmen kami untuk melangkah lebih jauh. Janji diucapkan dan restu digenggam, membawa kami siap mengarungi babak baru kehidupan bersama."
    },
    {
      year: "28 Desember 2026",
      title: "Menuju Gerbang Sakinah",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
      description: "Sebuah babak baru resmi kami buka. Kami siap mengikat janji suci di hadapan Allah SWT dan seluruh keluarga serta sahabat tercinta."
    }
  ],

  // 8. GALERI PREWEDDING (Minimal 6 foto beresolusi tinggi dengan variasi rasio)
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      caption: "Cinta Abadi dalam Balutan Kehangatan Senja",
      category: "Outdoor"
    },
    {
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
      caption: "Tatapan Penuh Makna Menatap Masa Depan",
      category: "Studio"
    },
    {
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
      caption: "Genggaman Tangan yang Tak Pernah Lepas",
      category: "Intimate"
    },
    {
      url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
      caption: "Langkah Bersama di Setiap Lorong Kehidupan",
      category: "Outdoor"
    },
    {
      url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
      caption: "Tawa dan Keceriaan Dua Hati yang Bersatu",
      category: "Studio"
    },
    {
      url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80",
      caption: "Sumpah Setia di Hadapan Semesta",
      category: "Intimate"
    },
    {
      url: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=80",
      caption: "Keanggunan Tradisi dan Modernitas",
      category: "Tradisional"
    },
    {
      url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80",
      caption: "Momen Emas yang Terukir Selamanya",
      category: "Outdoor"
    }
  ],

  // 9. MUSIK LATAR (BACKGROUND MUSIC)
  music: {
    title: "still with you (Romantic Piano & Cello)",
    artist: "The Piano Guys Style",
    // File audio lokal atau URL audio MP3:
    url: "assets/audio/still-with-you.mp3",
    autoPlayAfterCover: true // Musik berputar otomatis hanya setelah pengguna klik "Buka Undangan"
  },

  // 10. INFORMASI REKENING DIGITAL & HADIAH (WEDDING GIFT)
  gift: {
    description: "Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda bermaksud memberikan tanda kasih berupa hadiah digital, kami menyediakan informasi berikut:",
    accounts: [
      {
        bank: "BRI",
        accountNumber: "436101015572539",
        accountHolder: "RAMA OKTAMALA",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg",
        color: "from-blue-900 to-indigo-900"
      },
      {
        bank: "DANA",
        accountNumber: "082295987133",
        accountHolder: "RAMA OKTAMALA",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg",
        color: "from-amber-900 to-yellow-950"
      }
    ],
    qris: {
      enabled: true,
      image: "assets/img/qris.jpeg",
      description: "Pindai QRIS untuk seluruh dompet digital (GoPay, OVO, Dana, ShopeePay, LinkAja, & Mobile Banking)"
    },
    physicalGift: {
      enabled: true,
      recipient: "Neng Meri Ratna Sapuri",
      phone: "+62 857-5975-2372",
      address: "Jl. KH. M. Syasandi Kp. Sukaharja Kec. Sawirangi Kab. Tasikmalaya",
      courierNotes: "Titipkan di Klinik RIDWANA Medika"
    }
  },

  // 12. PENGATURAN FIREBASE REALTIME DATABASE (RSVP & BUKU TAMU CLOUD)
  firebase: {
    apiKey: "AIzaSyDSEe5SitVsOQjd9APHkliIeXgFnRn3gIw",
    authDomain: "undangan-digital-b92fe.firebaseapp.com",
    databaseURL: "https://undangan-digital-b92fe-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "undangan-digital-b92fe",
    storageBucket: "undangan-digital-b92fe.firebasestorage.app",
    messagingSenderId: "504706015457",
    appId: "1:504706015457:web:a6b9d0043f973b7b2917a0",
    measurementId: "G-9YLLWQ9Y0M",
    rtdbPath: "ucapan_rsvp"
  },

  // PENGATURAN RSVP UMUM
  rsvp: {
    maxGuestsPerSubmission: 5,
    initialWishes: [
      {
        id: 1,
        name: "H. Andi Muhammad & Keluarga",
        attendance: "Hadir",
        guestsCount: 2,
        message: "Barakallahu laka wa baraka 'alaika wa jama'a bainakuma fii khoir. Selamat menempuh hidup baru Rama & dr. Merry. Semoga menjadi keluarga sakinah, mawaddah, warahmah.",
        timestamp: "2026-11-01T10:30:00"
      },
      {
        id: 2,
        name: "dr. Maya Anggraini, Sp.A",
        attendance: "Hadir",
        guestsCount: 1,
        message: "Selamat ya Merry cantik dan Mas Rama! Bahagia dan langgeng selalu sampai kakek nenek. Ditunggu di venue!",
        timestamp: "2026-11-02T14:15:00"
      },
      {
        id: 3,
        name: "Dimas Suryo, S.T.",
        attendance: "Hadir",
        guestsCount: 2,
        message: "Selamat brader Rama! Akhirnya berlabuh ke pelabuhan terakhir. Semoga dilancarkan segala persiapannya sampai hari H. Sehat selalu kedua mempelai!",
        timestamp: "2026-11-03T18:45:00"
      },
      {
        id: 4,
        name: "Keluarga Besar Alm. Ir. Sutanto",
        attendance: "Hadir",
        guestsCount: 3,
        message: "Turut bersuka cita atas pernikahan ananda Rama dan Merry. Semoga Allah senantiasa melimpahkan berkah cinta dan rezeki melimpah dalam rumah tangga kalian.",
        timestamp: "2026-11-04T09:20:00"
      },
      {
        id: 5,
        name: "Sarah Amanda & Suami",
        attendance: "Tidak Hadir",
        guestsCount: 0,
        message: "Mohon maaf yang sebesar-besarnya belum bisa hadir langsung karena masih di luar negeri. Namun doa terbaik kami panjatkan dari jauh untuk kalian berdua! Happy wedding!",
        timestamp: "2026-11-05T16:00:00"
      }
    ]
  },

  // 13. FITUR BERBAGI KE WHATSAPP (SHARE INVITATION)
  share: {
    defaultGuestName: "Tamu Undangan",
    whatsappTemplate: (guestName, url) => 
      `*Undangan Pernikahan Digital*\n\n` +
      `Kepada Yth. *${guestName}*,\n\n` +
      `Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri hari bahagia pernikahan kami:\n\n` +
      `*Rama Oktamala & Neng Meri Ratna Sapuri*\n` +
      `🗓 Senin, 28 Desember 2026\n` +
      `📍 Jayaratu Sariwangi\n\n` +
      `Informasi lengkap acara, lokasi, dan reservasi kehadiran dapat diakses melalui tautan berikut:\n` +
      `${url}\n\n` +
      `Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.\n\n` +
      `Terima kasih,\n` +
      `*Rama & Merry*`
  }
};

// Ekspor ke window agar dapat diakses di seluruh script
if (typeof window !== "undefined") {
  window.WEDDING_CONFIG = WEDDING_CONFIG;
}
