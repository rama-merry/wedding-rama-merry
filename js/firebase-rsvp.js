/**
 * ====================================================================
 * FIREBASE REALTIME DATABASE - RSVP & BUKU TAMU DIGITAL
 * ====================================================================
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// 1. Ambil Konfigurasi Firebase dari config.js
const defaultFirebaseConfig = {
  apiKey: "AIzaSyDSEe5SitVsOQjd9APHkliIeXgFnRn3gIw",
  authDomain: "undangan-digital-b92fe.firebaseapp.com",
  databaseURL: "https://undangan-digital-b92fe-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "undangan-digital-b92fe",
  storageBucket: "undangan-digital-b92fe.firebasestorage.app",
  messagingSenderId: "504706015457",
  appId: "1:504706015457:web:a6b9d0043f973b7b2917a0",
  measurementId: "G-9YLLWQ9Y0M"
};

const firebaseConfig = (window.WEDDING_CONFIG && window.WEDDING_CONFIG.firebase) 
  ? window.WEDDING_CONFIG.firebase 
  : defaultFirebaseConfig;

const rtdbPath = (firebaseConfig && firebaseConfig.rtdbPath) || 'ucapan_rsvp';

// 2. Inisialisasi Firebase App & Realtime Database
let app;
let database;
let rsvpRef;

try {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
  rsvpRef = ref(database, rtdbPath);
  console.log("Firebase Realtime Database connected successfully to path:", rtdbPath);
} catch (err) {
  console.error("Gagal menginisialisasi Firebase:", err);
}

// 3. Listener Real-Time: Tampilkan Seluruh Ucapan dari Cloud
function initRealtimeWishes() {
  const rsvpContainer = document.getElementById("wishes-stream-container");
  const countBadge = document.getElementById("wishes-count-badge");

  if (!rsvpContainer || !rsvpRef) return;

  onValue(rsvpRef, (snapshot) => {
    const data = snapshot.val();
    rsvpContainer.innerHTML = "";

    if (data) {
      const keys = Object.keys(data);
      const totalCount = keys.length;

      if (countBadge) {
        countBadge.textContent = `${totalCount} Doa & Ucapan`;
      }

      // Reverse agar ucapan terbaru berada paling atas
      keys.reverse().forEach((key) => {
        const item = data[key];
        const nama = item.nama || item.name || "Tamu Undangan";
        const kehadiran = item.kehadiran || item.attendance || "Hadir";
        const ucapan = item.ucapan || item.message || "";
        const rawTime = item.timestamp || item.waktu || "";
        const waktuFormatted = window.formatTimestamp ? window.formatTimestamp(rawTime) : (item.waktu || rawTime);
        const isAttending = kehadiran === "Hadir";

        // Inisial untuk avatar
        const initials = nama.split(" ").map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase() || "T";

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
                <h4 class="font-semibold text-base text-[#2C2623] truncate">${escapeHtml(nama)}</h4>
                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${isAttending ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-700'}">
                  <span class="w-1.5 h-1.5 rounded-full ${isAttending ? 'bg-emerald-600' : 'bg-stone-500'}"></span>
                  ${escapeHtml(kehadiran)}
                </span>
              </div>

              <p class="text-xs text-[#6B625B] mb-3">${waktuFormatted}</p>

              <p class="text-sm text-[#3D352E] leading-relaxed whitespace-pre-line bg-[#F5EFEB]/50 p-3.5 rounded-xl border border-[#C5A880]/20">
                ${escapeHtml(ucapan)}
              </p>
            </div>
          </div>
        `;
        rsvpContainer.appendChild(card);
      });
    } else {
      if (countBadge) {
        countBadge.textContent = "0 Doa & Ucapan";
      }
      rsvpContainer.innerHTML = `
        <div class="text-center py-12 text-[#6B625B]">
          <p>Belum ada ucapan di Firebase. Jadilah yang pertama memberikan doa restu!</p>
        </div>
      `;
    }
  }, (error) => {
    console.error("Firebase onValue Error:", error);
    if (countBadge) countBadge.textContent = "Gagal memuat";
    if (rsvpContainer) {
      rsvpContainer.innerHTML = `
        <div class="text-center py-8 text-amber-900 bg-amber-50 rounded-2xl border border-amber-300 p-6">
          <p class="font-bold text-base mb-1">Periksa Aturan (Rules) Firebase Realtime Database Anda</p>
          <p class="text-xs text-amber-800 leading-relaxed mb-3">
            Pesan error: ${error.message}
          </p>
          <p class="text-[11px] text-[#6B625B]">
            Pastikan pada tab <strong>Firebase Console &gt; Realtime Database &gt; Rules</strong> sudah diatur:
            <code class="block mt-1 p-2 bg-white rounded border border-amber-200 font-mono text-[11px]">
              { "rules": { ".read": true, ".write": true } }
            </code>
          </p>
        </div>
      `;
    }
  });
}

// 4. Handler Pengiriman Form RSVP ke Firebase
function initRsvpForm() {
  const formRSVP = document.getElementById("rsvp-form");
  const submitBtn = document.getElementById("rsvp-submit-btn");

  if (!formRSVP || !rsvpRef) return;

  formRSVP.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("rsvp-name");
    const guestsInput = document.getElementById("rsvp-guests");
    const attendanceInput = document.querySelector('input[name="attendance"]:checked');
    const messageInput = document.getElementById("rsvp-message");

    const nama = nameInput ? nameInput.value.trim() : "";
    const jumlah = guestsInput ? parseInt(guestsInput.value, 10) || 1 : 1;
    const kehadiran = attendanceInput ? attendanceInput.value : "Hadir";
    const ucapan = messageInput ? messageInput.value.trim() : "";

    if (!nama || !ucapan) {
      if (typeof window.showToast === "function") {
        window.showToast("Mohon lengkapi nama dan ucapan Anda.");
      } else {
        alert("Mohon lengkapi nama dan ucapan Anda.");
      }
      return;
    }

    // Loading state pada tombol submit
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      <span>Menyimpan ke Cloud...</span>
    `;

    try {
      const now = new Date();
      const payload = {
        nama: nama,
        name: nama,
        kehadiran: kehadiran,
        attendance: kehadiran,
        jumlah: jumlah,
        guestsCount: jumlah,
        ucapan: ucapan,
        message: ucapan,
        timestamp: now.toISOString(),
        waktu: now.toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" })
      };

      // Push data ke Firebase Realtime Database
      await push(rsvpRef, payload);

      // Kosongkan pesan ucapan (nama tamu tetap dipertahankan)
      if (messageInput) {
        messageInput.value = "";
      }

      // Efek konfeti
      if (typeof confetti === "function") {
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.7 },
          colors: ["#C5A880", "#D8BE96", "#785A33"]
        });
      }

      // Notifikasi Toast
      if (typeof window.showToast === "function") {
        window.showToast("Terima kasih! Konfirmasi & doa Anda telah tersimpan secara real-time di Firebase.");
      } else {
        alert("Terima kasih atas ucapan dan konfirmasinya!");
      }

      // Gulir ke section ucapan
      const wishesSection = document.getElementById("wishes");
      if (wishesSection) {
        wishesSection.scrollIntoView({ behavior: "smooth" });
      }

    } catch (error) {
      console.error("Gagal mengirim data ke Firebase:", error);
      if (typeof window.showToast === "function") {
        window.showToast("Gagal menyimpan ke Firebase. Periksa Rules Database Anda.");
      } else {
        alert("Gagal menyimpan ke Firebase: " + error.message);
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
    }
  });
}

// Helper Sanitasi HTML
function escapeHtml(string) {
  if (typeof window.escapeHtml === "function") {
    return window.escapeHtml(string);
  }
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

// Jalankan saat DOM telah siap
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initRealtimeWishes();
    initRsvpForm();
  });
} else {
  initRealtimeWishes();
  initRsvpForm();
}
