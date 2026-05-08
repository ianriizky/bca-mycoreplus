---
title: 'Product Brief: BCA MyCore+'
status: 'complete'
created: '2026-05-08'
updated: '2026-05-08Tfinal'
inputs:
  - /Users/ianrizky/Sites/bca-mycoreplus/_bmad-output/brainstorming/brainstorming-session-2026-05-01-143000.md
  - /Users/ianrizky/Sites/bca-mycoreplus/_bmad-output/planning-artifacts/research/technical-text-to-image-generation-client-side-react-vite-research-2026-05-08.md
---

# Product Brief: BCA MyCore+

## Executive Summary

BCA MyCore+ adalah aplikasi web generator gambar berbasis _client-side_ (100% di browser) yang dirancang khusus untuk staf Bank BCA dalam membuat gambar profesional untuk dikirimkan kepada nasabah. Mengusung arsitektur _Zero-Server_, aplikasi ini menjamin privasi data nasabah secara absolut karena seluruh proses pembuatan gambar terjadi di perangkat staf bank tanpa ada data yang meninggalkan browser.

**Mengapa sekarang?** Di tengah momentum BCA yang meraih _Gallup Global Customer Engagement Award_ 5 tahun berturut-turut (2022-2026) dan melayani **43 juta nasabah**, BCA MyCore+ menjadi jawaban atas urgensi transformasi digital komunikasi visual. Saat ini, staf BCA menghabiskan **5-10 menit per gambar** menggunakan Canva (biaya Enterprise $12-30/user/bulan) atau alat pihak ketiga yang berisiko kebocoran data nasabah.

Dengan kombinasi _Invisible UI_ (Glassmorphism) yang elegan dan fitur _Clipboard-First_ untuk berbagi instan ke WhatsApp, staf BCA dapat membuat dan mengirim gambar dalam waktu kurang dari **30 detik** — penghematan **70% waktu** tanpa memerlukan keahlian desain grafis. Menggunakan teknologi modern (Fabric.js v6, ColorThief.js v3+, React/Vite) yang dihosting **GRATIS** di GitHub Pages, BCA MyCore+ memberikan solusi efisien **$0 infrastruktur** vs Canva Enterprise yang memerlukan biaya langganan per user — sambil tetap mempertahankan standar privasi perbankan yang ketat.

## The Problem

Staf Bank BCA memerlukan alat untuk membuat gambar komunikasi yang profesional bagi nasabah — baik untuk promosi, edukasi, maupun pemberitahuan layanan. Namun, cara mereka bekerja **saat ini sangat manual dan tidak efisien**:

- **Menggunakan Canva atau alat serupa secara manual** — memerlukan waktu lama dan keahlian desain
- **Privasi data nasabah berisiko** — gambar yang memuat informasi sensitif nasabah diproses di platform pihak ketiga
- **Workflow tidak optimal** — harus mendownload gambar, lalu upload ke WhatsApp secara terpisah
- **Ketergantungan pada tim kreatif** — untuk kebutuhan gambar sederhana, staf harus menunggu bantuan desainer

**Biaya status quo:** Waktu yang terbuang, risiko kebocoran data nasabah, dan ketergantungan pada skill desain yang tidak semua staf miliki.

## The Solution

BCA MyCore+ adalah generator gambar _client-side_ yang memungkinkan staf BCA untuk:

1. **Membuat gambar dengan cepat** — drag & drop latar belakang, tambahkan teks dengan manipulasi langsung (_tactile text manipulation_)
2. **Privasi 100%** — seluruh pemrosesan terjadi di browser (Zero-Server Architecture), tidak ada data nasabah yang dikirim ke server
3. **Berbagi instan ke WhatsApp** — fitur _Clipboard-First_ memungkinkan copy gambar langsung ke clipboard, lalu paste ke chat WhatsApp (menggunakan _wa.me_ link)
4. **Tanpa skill desain** — _Invisible UI_ dengan _Glassmorphism_ hanya muncul saat objek dipilih, memberikan pengalaman pengguna yang intuitif
5. **Ekstraksi warna otomatis** — ColorThief.js mengekstrak palet warna dari gambar latar untuk keselarasan visual

**Pengalaman pengguna:** Buka browser mobile → Pilih latar belakang → Tambah teks → Copy ke clipboard → Paste ke WhatsApp → Selesai dalam < 30 detik.

### Brand Compliance & Template Library

BCA MyCore+ memastikan konsistensi brand 100% melalui:

- **Template Library BCA Resmi** — KTA, Deposito, Kartu Kredit, dan produk unggulan lainnya dengan layout yang sudah divalidasi tim Brand
- **Brand Colors Otomatis** — ColorThief.js mengekstrak palet dari gambar latar, namun tombol "Reset to BCA Brand" akan mengembalikan ke: Gold #C8A96A, Deep Navy #0B1F3A, Sapphire Blue #1E3A5F
- **Template-Only Mode (Opsional)** — Staf hanya bisa memilih template resmi, teks bisa diedit tapi layout tetap sesuai panduan brand
- **Safe Zone Indicator** — Guide visual agar teks tidak keluar dari area aman (mencegah brand violation)

**Untuk staf tanpa akses template:** Bisa upload gambar latar sendiri, namun akan mendapat peringatan "Pastikan sesuai brand guidelines BCA".

## What Makes This Different

| Pendekatan                       | Keunggulan BCA MyCore+                                                                                           | Mengapa Tidak Bisa Direplikasi Kompetitor                                                 |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Zero-Server Architecture**     | Privasi data nasabah 100% terjamin — tidak ada data yang meninggalkan browser staf bank                          | Kompetitor (Pictify, Wafrow) harus memroses di server mereka → risiko kebocoran data      |
| **Clipboard-First Sharing**      | Tidak perlu download/upload — copy langsung dari browser ke WhatsApp (wa.me) dalam 3 klik                        | Kompetitor butuh download → upload manual atau integrasi API yang kompleks                |
| **Invisible UI (Glassmorphism)** | Antarmuka yang elegan dengan brand colors BCA (Gold, Deep Navy, Sapphire Blue) yang hanya muncul saat dibutuhkan | Kompetitor memiliki UI yang penuh tombol/toolbar → tidak intuitif untuk staf non-desainer |
| **$0 Infrastructure Cost**       | Hosting gratis di GitHub Pages, tidak ada biaya server atau pemeliharaan backend                                 | Canva Enterprise: $12-30/user/bulan untuk 1.000 staf = $12.000-30.000/bulan vs $0         |
| **Fokus MVP yang Disiplin**      | Tidak ada _feature creep_ — fokus pada kebutuhan staf bank saat ini (< 30 detik)                                 | Kompetitor menawarkan fitur berlebihan yang membingungkan untuk tugas sederhana           |

### Mengapa Sekarang? (Why Now?)

1. **Momentum Gallup Award 2026** — BCA baru saja meraih _Gallup Global Customer Engagement Award_ 5 tahun berturut-turut. BCA MyCore+ memperkuat narasi inovasi dan privasi ini.
2. **43 Juta Nasabah & 115 Juta Transaksi/Hari** — Skala BCA membutuhkan alat komunikasi yang skalabel tanpa beban operasional IT.
3. **Urgensi Transformasi Digital** — Staf BCA saat ini kehilangan 70% waktu hanya untuk membuat gambar manual via Canva. BCA MyCore+ mengembalikan waktu tersebut untuk interaksi nyata dengan nasabah.

**Kompetitor** (Pictify.io, Wafrow, Pixelixe, DynaPictures) semuanya berbasis _server-side API_, memerlukan infrastruktur mahal, dan tidak menjamin privasi data nasabah karena data harus diproses di server mereka.

## Who This Serves

### Primary Users: Staf Bank BCA

- **Profil:** Staf frontline, customer service, atau relationship manager yang memerlukan alat komunikasi visual cepat
- **Kebutuhan:** Membuat gambar profesional dalam hitungan detik tanpa keahlian desain
- **"Aha Moment":** Saat menyadari bisa membuat dan mengirim gambar ke nasabah dalam < 30 detik langsung dari browser mobile
- **Sukses bagi mereka:** Tidak perlu membuang waktu dengan Canva, tidak perlu menunggu tim kreatif, privasi nasabah tetap terjaga

### Secondary Users: Nasabah Bank BCA (Penerima Gambar)

- **Nilai bagi mereka:** Menerima informasi visual yang profesional, cepat, dan aman (privasi terjaga)
- **Dampak:** Meningkatnya kepuasan nasabah terhadap komunikasi digital BCA

## Success Criteria

### Metrik Utama (MVP):

1. **Waktu Pembuatan Gambar** — < 30 detik dari buka browser hingga gambar siap kirim (subject to user testing)
2. **Akses Mobile Browser** — 100% fungsional di browser mobile modern (Chrome, Safari, Firefox) di perangkat staf BCA
3. **Clipboard-First Success Rate** — > 95% berhasil copy-paste ke WhatsApp tanpa error
4. **Privasi Data** — 0% data nasabah meninggalkan browser (Zero-Server verified)
5. **Adoption Rate** — Target 60% staf target aktif menggunakan MyCore+ dalam 3 bulan pertama

### Metrik Bisnis:

- **Pilot Success**: > 80% staf di cabang pilot melanjutkan penggunaan setelah 1 bulan trial
- **Customer Satisfaction** — Feedback nasabah terhadap kualitas dan kecepatan komunikasi visual
- **Efisiensi Waktu**: Penghematan 70% waktu pembuatan gambar vs menggunakan Canva (5-10 menit → < 30 detik)

## Scope

### Yang Termasuk (MVP):

- ✅ Text-to-Image generator dengan Fabric.js v6 (drag & drop background, tactile text manipulation)
- ✅ ColorThief.js v3+ untuk ekstraksi palet warna dinamis dari gambar
- ✅ Invisible UI dengan Glassmorphism (brand colors: Gold #C8A96A, Deep Navy #0B1F3A, Sapphire Blue #1E3A5F)
- ✅ Clipboard-First sharing (copy image langsung ke clipboard → paste ke WhatsApp)
- ✅ Zero-Server Architecture (100% client-side, hosting di GitHub Pages)
- ✅ Akses via mobile browser (responsive design)
- ✅ Template library untuk produk BCA (KTA, deposito, kartu kredit) — disediakan tim Brand
- ✅ Pilot Program: Uji coba di 1-2 cabang BCA selama 1 bulan sebelum rollout nasional

### Yang Tidak Termasuk (Out of Scope):

- ❌ Integrasi dengan sistem CRM atau database nasabah
- ❌ Fitur untuk channel lain (Instagram, TikTok, Email) — fokus WhatsApp saja
- ❌ AI-generated images (menggunakan model AI) — murni editor manual
- ❌ User accounts atau login system — aplikasi publik tanpa autentikasi
- ❌ Penyimpanan gambar di server — semua diproses di memori browser

### Go-to-Market & Adoption:

- **Training & Onboarding**: Workshop singkat 30 menit untuk staf frontline dan relationship managers
- **Support Plan**:
  - FAQ documentation internal (troubleshooting umum: clipboard error, image tidak muncul, dll.)
  - Helpdesk internal BCA (ext. 1234) untuk laporan bug atau kendala teknis
  - Feedback form di aplikasi untuk saran perbaikan
- **Rollout Strategy**: Pilot di 1-2 cabang (100-200 staf) → evaluasi 1 bulan → rollout nasional ke 1,270+ cabang (~27,000 staf)

## Vision

Dalam 2-3 tahun ke depan, **BCA MyCore+ akan menjadi standar komunikasi visual internal bagi seluruh staf Bank BCA** — alat praktis yang menjembatani staf bank dan nasabah dengan cepat, aman, dan profesional.

**Fokus saat ini** adalah memenuhi kebutuhan MVP bagi staf BCA: generator gambar sederhana namun powerful untuk komunikasi WhatsApp dengan nasabah. Ekspansi ke fitur atau channel lain **tidak menjadi prioritas** hingga MVP ini terbukti sukses dan stabil.

---

_Didraft berdasarkan brainstorming session (2026-05-01), technical research (2026-05-08), dan input langsung dari Ian (Product Owner)._
