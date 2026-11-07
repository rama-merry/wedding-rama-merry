/**
 * ====================================================================
 * DIGITAL WEDDING INVITATION - APPLICATION LOGIC
 * ====================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // Ensure config is present
  if (typeof WEDDING_CONFIG === "undefined") {
    console.error("WEDDING_CONFIG is not loaded.");
    return;
  }

  initPageData();
  initGuestPersonalization();
  initCoverScreen();
  initAudioPlayer();
  initCountdown();
  initCoupleSection();
  initQuoteSection();
  initLoveStory();
  initEventsSection();
  initGallery();
  initVideoSection();
  // RSVP & Ucapan kini ditangani secara cloud real-time oleh js/firebase-rsvp.js
  // initRsvpAndWishes();
  initGiftsSection();
  initShareTools();
  initScrollEffects();
  initPetals();
});

/* --------------------------------------------------------------------
   1. Inisialisasi Meta Data & Info Utama
-------------------------------------------------------------------- */
function initPageData() {
  const config = WEDDING_CONFIG;
  document.title = config.meta.title;

  // Set couple announcement names on headings
  document.querySelectorAll(".couple-names-text").forEach(el => {
    el.textContent = `${config.couple.groom.nickname} & ${config.couple.bride.nickname}`;
  });

  document.querySelectorAll(".wedding-display-date").forEach(el => {
    el.textContent = config.weddingDate.displayDate;
  });
}

/* --------------------------------------------------------------------
   2. Personalisasi Tamu via URL Parameter (?to=Nama+Tamu)
-------------------------------------------------------------------- */
function getGuestNameFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const rawGuest = urlParams.get("to") || urlParams.get("u") || urlParams.get("nama") || urlParams.get("guest");
  
  if (!rawGuest) {
    return WEDDING_CONFIG.share.defaultGuestName || "Tamu Undangan";
  }

  // Bersihkan karakter dan ubah menjadi format nama yang rapi
  const cleaned = decodeURIComponent(rawGuest.replace(/\+/g, " ").trim());
  return cleaned || "Tamu Undangan";
}

function initGuestPersonalization() {
  const guestName = getGuestNameFromUrl();

  const coverGuestEl = document.getElementById("cover-guest-name");
  if (coverGuestEl) {
    coverGuestEl.textContent = guestName;
  }

  // Pre-fill input nama pada form RSVP
  const rsvpNameInput = document.getElementById("rsvp-name");
  if (rsvpNameInput && guestName !== "Tamu Undangan") {
    rsvpNameInput.value = guestName;
  }
}

/* --------------------------------------------------------------------
   3. Cover Screen & Transisi Buka Undangan
-------------------------------------------------------------------- */
let isInvitationOpened = false;

function initCoverScreen() {
  const cover = document.getElementById("cover");
  const openBtn = document.getElementById("btn-open-invitation");
  
  // Set default body state
  document.body.classList.add("cover-active");

  if (!openBtn || !cover) return;

  openBtn.addEventListener("click", () => {
    openInvitation();
  });
}

function openInvitation() {
  if (isInvitationOpened) return;
  isInvitationOpened = true;

  const cover = document.getElementById("cover");
  const floatingMusic = document.getElementById("floating-music-btn");
  const mobileNav = document.getElementById("mobile-bottom-nav");
  const desktopNav = document.getElementById("desktop-navbar");

  // Mainkan audio latar
  if (window.weddingAudio) {
    window.weddingAudio.play().catch(e => {
      console.log("Audio autoplay prevented by browser policy:", e);
    });
  }

  // Transisi animasi slide up cover
  cover.classList.add("cover-hidden");
  document.body.classList.remove("cover-active");

  // Tampilkan floating controllers
  if (floatingMusic) floatingMusic.classList.remove("hidden");
  if (mobileNav) mobileNav.classList.remove("translate-y-full");
  if (desktopNav) desktopNav.classList.remove("-translate-y-full");

  // Scroll lembut ke Hero Section
  setTimeout(() => {
    const hero = document.getElementById("hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
    }
  }, 300);

  // Efek konfeti pembuka jika library tersedia
  if (typeof confetti === "function") {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C5A880', '#E7D8C4', '#F5EFEB', '#98784E']
    });
  }
}

/* --------------------------------------------------------------------
   4. Audio Player Controller
-------------------------------------------------------------------- */
function initAudioPlayer() {
  const config = WEDDING_CONFIG.music;
  const audio = document.getElementById("bg-audio");
  const toggleBtn = document.getElementById("music-toggle-btn");
  const vinylDisc = document.getElementById("music-vinyl-disc");
  const statusText = document.getElementById("music-status-text");
  const titleText = document.getElementById("music-title-text");
  
  if (!audio) return;
  
  if (titleText && config.title) {
    titleText.textContent = config.title;
  }
  
  audio.src = config.url;
  audio.loop = true;
  window.weddingAudio = audio;

  let isPlaying = false;

  function updateMusicUI(playing) {
    isPlaying = playing;
    const widget = document.getElementById("floating-music-btn");
    
    if (playing) {
      if (widget) widget.classList.add("playing");
      if (vinylDisc) vinylDisc.classList.add("animate-spin-slow");
      if (statusText) statusText.textContent = "Memutar Musik";
    } else {
      if (widget) widget.classList.remove("playing");
      if (vinylDisc) vinylDisc.classList.remove("animate-spin-slow");
      if (statusText) statusText.textContent = "Musik Dijeda";
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play().then(() => updateMusicUI(true)).catch(err => {
          console.error("Gagal memutar audio:", err);
          showToast("Gagal memutar audio: format atau koneksi bermasalah");
        });
      } else {
        audio.pause();
        updateMusicUI(false);
      }
    });
  }

  audio.addEventListener("play", () => updateMusicUI(true));
  audio.addEventListener("pause", () => updateMusicUI(false));
}

/* --------------------------------------------------------------------
   5. Countdown Timer Pernikahan Real-Time
-------------------------------------------------------------------- */
function initCountdown() {
  const targetStr = WEDDING_CONFIG.weddingDate.targetCountdown;
  const targetDate = new Date(targetStr).getTime();

  const daysEl = document.getElementById("countdown-days");
  const hoursEl = document.getElementById("countdown-hours");
  const minutesEl = document.getElementById("countdown-minutes");
  const secondsEl = document.getElementById("countdown-seconds");
  const bannerEl = document.getElementById("countdown-banner");

  if (!daysEl || isNaN(targetDate)) return;

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      if (bannerEl) bannerEl.textContent = "Hari Bahagia Telah Tiba!";
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* --------------------------------------------------------------------
   6. Section Mempelai (Groom & Bride)
-------------------------------------------------------------------- */
function initCoupleSection() {
  const couple = WEDDING_CONFIG.couple;

  // Groom
  const groomName = document.getElementById("groom-name");
  const groomNick = document.getElementById("groom-nickname");
  const groomSonOf = document.getElementById("groom-son-of");
  const groomPhoto = document.getElementById("groom-photo");
  const groomIg = document.getElementById("groom-instagram");

  if (groomName) groomName.textContent = couple.groom.fullName;
  if (groomNick) groomNick.textContent = couple.groom.nickname;
  if (groomSonOf) groomSonOf.textContent = couple.groom.sonOf;
  if (groomPhoto) {
    groomPhoto.src = couple.groom.photo;
    groomPhoto.alt = couple.groom.fullName;
  }
  if (groomIg) {
    groomIg.href = couple.groom.instagram;
    groomIg.textContent = couple.groom.instagramUsername;
  }

  // Bride
  const brideName = document.getElementById("bride-name");
  const brideNick = document.getElementById("bride-nickname");
  const brideDaughterOf = document.getElementById("bride-daughter-of");
  const bridePhoto = document.getElementById("bride-photo");
  const brideIg = document.getElementById("bride-instagram");

  if (brideName) brideName.textContent = couple.bride.fullName;
  if (brideNick) brideNick.textContent = couple.bride.nickname;
  if (brideDaughterOf) brideDaughterOf.textContent = couple.bride.daughterOf;
  if (bridePhoto) {
    bridePhoto.src = couple.bride.photo;
    bridePhoto.alt = couple.bride.fullName;
  }
  if (brideIg) {
    brideIg.href = couple.bride.instagram;
    brideIg.textContent = couple.bride.instagramUsername;
  }
}

/* --------------------------------------------------------------------
   7. Section Love Quote / Ayat Suci
-------------------------------------------------------------------- */
function initQuoteSection() {
  const q = WEDDING_CONFIG.quote;
  const verseEl = document.getElementById("quote-verse");
  const transEl = document.getElementById("quote-translation");
  const srcEl = document.getElementById("quote-source");
  const blessingEl = document.getElementById("quote-blessing");

  if (verseEl && q.verse) verseEl.textContent = q.verse;
  if (transEl && q.translation) transEl.textContent = `"${q.translation}"`;
  if (srcEl && q.source) srcEl.textContent = `(${q.source})`;
  if (blessingEl && q.blessingText) blessingEl.textContent = q.blessingText;
}

/* --------------------------------------------------------------------
   8. Section Kisah Cinta (Timeline)
-------------------------------------------------------------------- */
function initLoveStory() {
  const container = document.getElementById("story-timeline-container");
  if (!container) return;

  const stories = WEDDING_CONFIG.loveStory;
  container.innerHTML = "";

  stories.forEach((item, index) => {
    const isEven = index % 2 === 0;
    const cardHtml = `
      <div class="relative flex flex-col md:flex-row items-center mb-12 md:mb-16 reveal">
        <!-- Marker Tengah -->
        <div class="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-ivory border-2 border-[#C5A880] items-center justify-center shadow-md z-10">
          <span class="w-3 h-3 rounded-full bg-[#C5A880]"></span>
        </div>

        <!-- Kolom Konten -->
        <div class="w-full md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto md:text-left'}">
          <div class="glass-card rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 border border-[#C5A880]/30 group">
            <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#C5A880]/15 text-[#98784E] mb-3">
              ${item.year}
            </span>
            <h3 class="font-cormorant text-2xl font-bold text-[#2C2623] mb-3 group-hover:text-[#98784E] transition-colors">
              ${item.title}
            </h3>
            ${item.image ? `
              <div class="overflow-hidden rounded-xl mb-4 max-h-48">
                <img src="${item.image}" alt="${item.title}" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
              </div>
            ` : ''}
            <p class="text-sm text-[#6B625B] leading-relaxed text-justify">
              ${item.description}
            </p>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", cardHtml);
  });
}

/* --------------------------------------------------------------------
   9. Section Acara (Akad & Resepsi)
-------------------------------------------------------------------- */
function initEventsSection() {
  const container = document.getElementById("events-cards-container");
  if (!container) return;

  const events = WEDDING_CONFIG.events;
  const cal = WEDDING_CONFIG.calendar;
  container.innerHTML = "";

  events.forEach(evt => {
    // Generate Google Calendar Link
    const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(cal.title + ' - ' + evt.title)}&dates=${cal.startIso}/${cal.endIso}&details=${encodeURIComponent(cal.details)}&location=${encodeURIComponent(evt.venue + ', ' + evt.address)}`;

    const card = `
      <div class="glass-card rounded-3xl p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between border border-[#C5A880]/40 shadow-lg hover:shadow-2xl transition-all duration-300 reveal">
        <!-- Corner decorations -->
        <div class="corner-decor corner-tl"></div>
        <div class="corner-decor corner-tr"></div>
        <div class="corner-decor corner-bl"></div>
        <div class="corner-decor corner-br"></div>

        <div>
          <!-- Badge -->
          <div class="text-center mb-6">
            <span class="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#C5A880]/20 text-[#785A33] border border-[#C5A880]/40">
              ${evt.badge}
            </span>
          </div>

          <!-- Title -->
          <h3 class="font-cormorant text-3xl sm:text-4xl font-bold text-center text-[#2C2623] mb-4">
            ${evt.title}
          </h3>

          <div class="w-16 h-0.5 bg-[#C5A880]/50 mx-auto mb-6"></div>

          <!-- Waktu & Hari -->
          <div class="space-y-4 mb-6 text-center">
            <div class="flex items-center justify-center gap-2 text-[#98784E]">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="font-semibold text-base sm:text-lg">${evt.day}, ${evt.date}</span>
            </div>

            <div class="flex items-center justify-center gap-2 text-[#6B625B]">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#98784E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm sm:text-base">${evt.time}</span>
            </div>
          </div>

          <!-- Lokasi & Alamat -->
          <div class="text-center bg-[#F5EFEB]/60 rounded-2xl p-4 sm:p-5 mb-8 border border-[#C5A880]/20">
            <h4 class="font-semibold text-base sm:text-lg text-[#2C2623] mb-2">${evt.venue}</h4>
            <p class="text-xs sm:text-sm text-[#6B625B] leading-relaxed mb-3">${evt.address}</p>
            <p class="text-[11px] text-[#98784E] italic">${evt.notes}</p>
          </div>
        </div>

        <!-- Tombol Aksi -->
        <div class="flex flex-col sm:flex-row gap-3 pt-2">
          <a href="${evt.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C5A880] text-white font-medium text-sm hover:bg-[#98784E] transition-all shadow-md hover:shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Lihat Lokasi Maps</span>
          </a>

          <a href="${calUrl}" target="_blank" rel="noopener noreferrer" class="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-[#C5A880] text-[#785A33] hover:bg-[#C5A880]/15 font-medium text-sm transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Simpan Kalender</span>
          </a>
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", card);
  });
}

/* --------------------------------------------------------------------
   10. Section Galeri Foto & Lightbox
-------------------------------------------------------------------- */
let currentLightboxIndex = 0;

function initGallery() {
  const container = document.getElementById("gallery-grid-container");
  if (!container) return;

  const gallery = WEDDING_CONFIG.gallery;
  container.innerHTML = "";

  gallery.forEach((item, index) => {
    const itemEl = document.createElement("div");
    itemEl.className = "group relative overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 reveal border border-[#C5A880]/30 aspect-square sm:aspect-auto sm:h-72";
    itemEl.innerHTML = `
      <img src="${item.url}" alt="${item.caption}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy">
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
        <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase font-semibold bg-[#C5A880] text-white w-max mb-1">
          ${item.category}
        </span>
        <p class="text-white font-cormorant text-lg font-medium leading-snug">
          ${item.caption}
        </p>
      </div>
    `;

    itemEl.addEventListener("click", () => {
      openLightbox(index);
    });

    container.appendChild(itemEl);
  });

  initLightboxControls();
}

function openLightbox(index) {
  const gallery = WEDDING_CONFIG.gallery;
  if (index < 0 || index >= gallery.length) return;
  currentLightboxIndex = index;

  const modal = document.getElementById("lightbox-modal");
  const img = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");
  const counter = document.getElementById("lightbox-counter");

  if (!modal || !img) return;

  const item = gallery[index];
  img.src = item.url;
  img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
  if (counter) counter.textContent = `${index + 1} / ${gallery.length}`;

  modal.classList.remove("inactive");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const modal = document.getElementById("lightbox-modal");
  if (!modal) return;
  modal.classList.remove("active");
  modal.classList.add("inactive");
  document.body.style.overflow = "";
}

function initLightboxControls() {
  const modal = document.getElementById("lightbox-modal");
  const closeBtn = document.getElementById("lightbox-close-btn");
  const prevBtn = document.getElementById("lightbox-prev-btn");
  const nextBtn = document.getElementById("lightbox-next-btn");

  if (!modal) return;

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const gallery = WEDDING_CONFIG.gallery;
      const prev = (currentLightboxIndex - 1 + gallery.length) % gallery.length;
      openLightbox(prev);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const gallery = WEDDING_CONFIG.gallery;
      const next = (currentLightboxIndex + 1) % gallery.length;
      openLightbox(next);
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.id === "lightbox-backdrop") {
      closeLightbox();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") {
      const gallery = WEDDING_CONFIG.gallery;
      openLightbox((currentLightboxIndex - 1 + gallery.length) % gallery.length);
    }
    if (e.key === "ArrowRight") {
      const gallery = WEDDING_CONFIG.gallery;
      openLightbox((currentLightboxIndex + 1) % gallery.length);
    }
  });
}

/* --------------------------------------------------------------------
   11. Section Video Prewedding
-------------------------------------------------------------------- */
function initVideoSection() {
  const videoWrapper = document.getElementById("video-frame-container");
  const videoTitleEl = document.getElementById("video-title");
  if (!videoWrapper) return;

  const videoConfig = WEDDING_CONFIG.video;
  if (videoTitleEl && videoConfig.title) {
    videoTitleEl.textContent = videoConfig.title;
  }

  if (videoConfig.type === "youtube" && videoConfig.youtubeId) {
    videoWrapper.innerHTML = `
      <div class="relative w-full pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C5A880]/40">
        <iframe 
          class="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/${videoConfig.youtubeId}?enablejsapi=1&rel=0&modestbranding=1" 
          title="${videoConfig.title || 'Prewedding Video'}" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    `;
  } else if (videoConfig.directUrl) {
    videoWrapper.innerHTML = `
      <div class="relative w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C5A880]/40 bg-black">
        <video controls poster="${videoConfig.poster || ''}" class="w-full h-auto max-h-[500px]">
          <source src="${videoConfig.directUrl}" type="video/mp4">
          Browser Anda tidak mendukung pemutaran video tag.
        </video>
      </div>
    `;
  }
}

/* --------------------------------------------------------------------
   12. Section RSVP & Ucapan / Doa (Buku Tamu Digital)
-------------------------------------------------------------------- */
const STORAGE_KEY_WISHES = "wedding_wishes_data";

function getStoredWishes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_WISHES);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("Error parsing wishes from localStorage:", err);
  }
  // Fallback ke data awal pada config
  return WEDDING_CONFIG.rsvp.initialWishes || [];
}

function saveWishes(wishes) {
  try {
    localStorage.setItem(STORAGE_KEY_WISHES, JSON.stringify(wishes));
  } catch (err) {
    console.warn("Error saving wishes to localStorage:", err);
  }
}

function renderWishesList() {
  const container = document.getElementById("wishes-stream-container");
  const countBadge = document.getElementById("wishes-count-badge");
  if (!container) return;

  const wishes = getStoredWishes();
  if (countBadge) {
    countBadge.textContent = `${wishes.length} Doa & Ucapan`;
  }

  if (wishes.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 text-[#6B625B]">
        <p>Belum ada ucapan. Jadilah yang pertama memberikan doa restu!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = "";

  wishes.forEach(item => {
    // Inisial untuk avatar
    const initials = item.name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase() || "T";
    const isAttending = item.attendance === "Hadir";

    const dateFormatted = formatTimestamp(item.timestamp);

    const card = document.createElement("div");
    card.className = "glass-card rounded-2xl p-5 sm:p-6 border border-[#C5A880]/30 hover:border-[#C5A880] transition-all shadow-sm";
    card.innerHTML = `
      <div class="flex items-start gap-3 sm:gap-4">
        <!-- Avatar -->
        <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#C5A880] to-[#98784E] text-white flex items-center justify-center font-bold text-sm sm:text-base shadow-md shrink-0">
          ${initials}
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <h4 class="font-semibold text-base text-[#2C2623] truncate">${escapeHtml(item.name)}</h4>
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${isAttending ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-700'}">
              <span class="w-1.5 h-1.5 rounded-full ${isAttending ? 'bg-emerald-600' : 'bg-stone-500'}"></span>
              ${item.attendance}
            </span>
          </div>

          <p class="text-xs text-[#6B625B] mb-3">${dateFormatted}</p>

          <p class="text-sm text-[#3D352E] leading-relaxed whitespace-pre-line bg-[#F5EFEB]/50 p-3.5 rounded-xl border border-[#C5A880]/20">
            ${escapeHtml(item.message)}
          </p>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function initRsvpAndWishes() {
  renderWishesList();

  const rsvpForm = document.getElementById("rsvp-form");
  if (!rsvpForm) return;

  rsvpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("rsvp-name");
    const guestsInput = document.getElementById("rsvp-guests");
    const attendanceInput = document.querySelector('input[name="attendance"]:checked');
    const messageInput = document.getElementById("rsvp-message");
    const submitBtn = document.getElementById("rsvp-submit-btn");

    const name = nameInput.value.trim();
    const guests = parseInt(guestsInput.value, 10) || 1;
    const attendance = attendanceInput ? attendanceInput.value : "Hadir";
    const message = messageInput.value.trim();

    if (!name || !message) {
      showToast("Mohon lengkapi nama dan ucapan Anda.");
      return;
    }

    // Disable button to prevent double submit
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      <span>Menyimpan Konfirmasi...</span>
    `;

    const newEntry = {
      id: Date.now(),
      name: name,
      attendance: attendance,
      guestsCount: guests,
      message: message,
      timestamp: new Date().toISOString()
    };

    // Kirim ke backend jika endpoint diatur dalam WEDDING_CONFIG.rsvp.backendEndpoint
    const backendEndpoint = WEDDING_CONFIG.rsvp.backendEndpoint;
    if (backendEndpoint && backendEndpoint.trim() !== "") {
      try {
        await fetch(backendEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEntry)
        });
      } catch (err) {
        console.warn("Peringatan: Gagal mengirim ke backend webhook, data tetap disimpan lokal:", err);
      }
    }

    // Simpan ke localStorage agar segera muncul di UI pengunjung
    const currentWishes = getStoredWishes();
    currentWishes.unshift(newEntry);
    saveWishes(currentWishes);

    // Re-render feed
    renderWishesList();

    // Reset pesan
    messageInput.value = "";

    // Kembalikan tombol
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;

    // Tampilkan notifikasi & efek konfeti gembira
    showToast("Terima kasih! Konfirmasi kehadiran & doa Anda telah tersimpan.");
    if (typeof confetti === "function") {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#C5A880', '#D8BE96', '#785A33']
      });
    }

    // Scroll sedikit ke daftar ucapan
    const wishesSection = document.getElementById("wishes");
    if (wishesSection) {
      wishesSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

/* --------------------------------------------------------------------
   13. Section Hadiah Digital (Wedding Gift) & Salin Rekening
-------------------------------------------------------------------- */
function initGiftsSection() {
  const cardsContainer = document.getElementById("gift-accounts-container");
  const qrisContainer = document.getElementById("qris-container");
  const addressContainer = document.getElementById("gift-address-container");

  const giftConfig = WEDDING_CONFIG.gift;

  // Render Rekening Bank
  if (cardsContainer && giftConfig.accounts) {
    cardsContainer.innerHTML = "";
    giftConfig.accounts.forEach(acc => {
      const card = document.createElement("div");
      card.className = "relative overflow-hidden rounded-2xl shadow-xl transition-transform hover:scale-[1.02]";
      card.innerHTML = `
        <div class="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg transition-transform hover:scale-[1.02]" style="background-color: ${acc.bank.toLowerCase().includes('bri') ? '#0A3B7C' : '#0088CC'};">
          
          <!-- Nama Bank / E-Wallet & Chip/Logo Aksen -->
          <div class="flex items-center justify-between mb-8">
            <span class="font-cinzel font-bold text-lg tracking-wider text-white">${acc.bank}</span>
            <div class="w-10 h-6 bg-white/20 rounded-md backdrop-blur-sm"></div>
          </div>

          <!-- Nomor Rekening & Tombol Copy -->
          <div class="mb-4">
            <div class="flex items-center justify-between gap-2">
              <span class="font-mono text-xl sm:text-2xl font-bold tracking-widest text-white select-all">${acc.accountNumber}</span>
              <button type="button" class="btn-copy-account bg-white/20 hover:bg-white/30 text-white text-xs px-3.5 py-1.5 rounded-full transition-colors backdrop-blur-sm flex items-center gap-1.5 font-sans" data-account="${acc.accountNumber}" data-bank="${acc.bank}" title="Salin Nomor Rekening">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
                <span>Copy</span>
              </button>
            </div>
          </div>

          <!-- Atas Nama (a/n) di Kanan Bawah -->
          <div class="text-right">
            <p class="text-xs sm:text-sm text-white/90 tracking-wide font-medium">a/n ${acc.accountHolder}</p>
          </div>

        </div>
      `;

      // Copy listener
      const copyBtn = card.querySelector(".btn-copy-account");
      copyBtn.addEventListener("click", () => {
        copyTextToClipboard(acc.accountNumber, `Nomor rekening ${acc.bank} berhasil disalin!`);
      });

      cardsContainer.appendChild(card);
    });
  }

  // Render QRIS
  if (qrisContainer && giftConfig.qris && giftConfig.qris.enabled) {
    qrisContainer.innerHTML = `
      <div class="glass-card rounded-2xl p-6 sm:p-8 text-center border-2 border-[#C5A880]/40 shadow-xl max-w-sm mx-auto bg-gradient-to-br from-white via-[#F5EFEB]/40 to-[#E7D8C4]/20 relative overflow-hidden">
        <!-- Aksen Dekoratif Sudut -->
        <div class="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#C5A880] rounded-tl-2xl"></div>
        <div class="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#C5A880] rounded-tr-2xl"></div>
        
        <h4 class="font-cinzel text-xl font-bold text-[#785A33] mb-2 tracking-wide">QRIS All Payment</h4>
        <p class="text-xs text-[#6B625B] mb-5 leading-relaxed">${giftConfig.qris.description}</p>
        
        <!-- Wadah Gambar QRIS dengan efek shadow dan bingkai lembut -->
        <div class="bg-white p-3 rounded-xl shadow-md border border-[#C5A880]/30 inline-block mb-4">
          <img src="${giftConfig.qris.image}" alt="QRIS Code" class="w-48 h-48 object-contain mx-auto rounded-md">
        </div>
        
        <p class="text-[11px] font-medium text-[#98784E] tracking-wider uppercase">Mendukung GoPay, OVO, DANA, ShopeePay & BCA Mobile</p>
      </div>
    `;
  }

  // Render Physical Gift Address
  if (addressContainer && giftConfig.physicalGift && giftConfig.physicalGift.enabled) {
    const phys = giftConfig.physicalGift;
    addressContainer.innerHTML = `
      <div class="glass-card rounded-2xl p-6 sm:p-8 border border-[#C5A880]/40 shadow-lg text-left max-w-2xl mx-auto">
        <div class="flex items-center gap-3 mb-4 text-[#98784E]">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h4 class="font-cormorant text-2xl font-bold text-[#2C2623]">Kirim Hadiah Fisik</h4>
        </div>
        
        <div class="space-y-2 mb-6 text-sm text-[#3D352E]">
          <p><span class="font-semibold text-[#6B625B]">Penerima:</span> ${phys.recipient}</p>
          <p><span class="font-semibold text-[#6B625B]">No. Telepon:</span> ${phys.phone}</p>
          <p><span class="font-semibold text-[#6B625B]">Alamat:</span> ${phys.address}</p>
          ${phys.courierNotes ? `<p class="text-xs text-[#98784E] italic"><span class="font-semibold">Catatan Kurir:</span> ${phys.courierNotes}</p>` : ''}
        </div>

        <button type="button" id="btn-copy-address" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C5A880] text-white text-sm font-medium hover:bg-[#98784E] transition-all shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
          </svg>
          <span>Salin Alamat Pengiriman</span>
        </button>
      </div>
    `;

    const copyAddressBtn = document.getElementById("btn-copy-address");
    if (copyAddressBtn) {
      copyAddressBtn.addEventListener("click", () => {
        const fullAddress = `${phys.recipient}\n${phys.phone}\n${phys.address}\n(Catatan: ${phys.courierNotes || ''})`;
        copyTextToClipboard(fullAddress, "Alamat pengiriman hadiah berhasil disalin!");
      });
    }
  }
}

/* --------------------------------------------------------------------
   14. Fitur Berbagi Undangan (WhatsApp & Copy Link)
-------------------------------------------------------------------- */
function initShareTools() {
  const shareBtn = document.getElementById("btn-share-whatsapp");
  const copyLinkBtn = document.getElementById("btn-copy-invitation-link");
  const customGuestInput = document.getElementById("share-custom-guest-name");

  function getTargetUrl(customName) {
    let baseUrl = window.location.href.split('?')[0].split('#')[0];
    if (!customName || customName.trim() === "") {
      return baseUrl;
    }
    return `${baseUrl}?to=${encodeURIComponent(customName.trim())}`;
  }

  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      const name = customGuestInput ? customGuestInput.value : getGuestNameFromUrl();
      const targetUrl = getTargetUrl(name);
      const text = WEDDING_CONFIG.share.whatsappTemplate(name || "Tamu Undangan", targetUrl);
      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(waUrl, "_blank");
    });
  }

  if (copyLinkBtn) {
    copyLinkBtn.addEventListener("click", () => {
      const name = customGuestInput ? customGuestInput.value : getGuestNameFromUrl();
      const targetUrl = getTargetUrl(name);
      copyTextToClipboard(targetUrl, "Tautan undangan berhasil disalin ke papan klip!");
    });
  }
}

/* --------------------------------------------------------------------
   15. Scroll Reveal & Active Navigation
-------------------------------------------------------------------- */
function initScrollEffects() {
  // Intersection Observer untuk animasi Reveal
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: "0px 0px -50px 0px",
      threshold: 0.1
    });

    reveals.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback jika browser lama
    reveals.forEach(el => el.classList.add("active"));
  }

  // Active Bottom Nav & Back to Top
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".mobile-nav-item");
  const backToTopBtn = document.getElementById("btn-back-to-top");

  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;

    // Tombol Back to Top
    if (backToTopBtn) {
      if (scrollY > 500) {
        backToTopBtn.classList.remove("opacity-0", "pointer-events-none");
        backToTopBtn.classList.add("opacity-100", "pointer-events-auto");
      } else {
        backToTopBtn.classList.remove("opacity-100", "pointer-events-auto");
        backToTopBtn.classList.add("opacity-0", "pointer-events-none");
      }
    }

    // Active Nav Item
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 150;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(item => {
          if (item.getAttribute("href") === `#${sectionId}`) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

/* --------------------------------------------------------------------
   16. Falling Romantic Petals Effect
-------------------------------------------------------------------- */
function initPetals() {
  const container = document.getElementById("petals-container");
  if (!container) return;

  const petalCount = 16;
  const colors = [
    "rgba(235, 210, 190, 0.75)",
    "rgba(215, 185, 155, 0.65)",
    "rgba(245, 230, 215, 0.8)",
    "rgba(197, 168, 128, 0.55)"
  ];

  for (let i = 0; i < petalCount; i++) {
    createPetal(container, colors);
  }
}

function createPetal(container, colors) {
  const petal = document.createElement("div");
  petal.className = "petal";
  
  const size = Math.random() * 12 + 8; // 8px to 20px
  const duration = Math.random() * 10 + 8; // 8s to 18s
  const delay = Math.random() * 8;
  const left = Math.random() * 100;
  const color = colors[Math.floor(Math.random() * colors.length)];

  petal.style.width = `${size}px`;
  petal.style.height = `${size * 1.3}px`;
  petal.style.left = `${left}%`;
  petal.style.background = color;
  petal.style.animationDuration = `${duration}s`;
  petal.style.animationDelay = `${delay}s`;

  container.appendChild(petal);
}

/* --------------------------------------------------------------------
   Utility Functions: Toast, Clipboard, Formatting
-------------------------------------------------------------------- */
function showToast(message) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#C5A880] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 3200);
}

function copyTextToClipboard(text, successMessage) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMessage || "Berhasil disalin!");
    }).catch(() => {
      fallbackCopyText(text, successMessage);
    });
  } else {
    fallbackCopyText(text, successMessage);
  }
}

function fallbackCopyText(text, successMessage) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    if (successful) {
      showToast(successMessage || "Berhasil disalin!");
    } else {
      showToast("Gagal menyalin otomatis.");
    }
  } catch (err) {
    showToast("Gagal menyalin otomatis.");
  }
  document.body.removeChild(textArea);
}

function formatTimestamp(isoStr) {
  if (!isoStr) return "";
  try {
    const d = new Date(isoStr);
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const mins = String(d.getMinutes()).padStart(2, "0");
    return `${day} ${month} ${year}, ${hours}.${mins} WIB`;
  } catch (e) {
    return isoStr;
  }
}

function escapeHtml(string) {
  const entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;"
  };
  return String(string).replace(/[&<>"'/]/g, (s) => entityMap[s]);
}

// Ekspor fungsi utility ke window agar dapat digunakan oleh modul lain seperti firebase-rsvp.js
window.showToast = showToast;
window.formatTimestamp = formatTimestamp;
window.escapeHtml = escapeHtml;
window.copyTextToClipboard = copyTextToClipboard;
