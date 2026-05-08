---
stepsCompleted:
  - step-01-init'
  - step-02-discovery'
  - step-02b-vision'
  - step-02c-executive-summary'
  - step-03-success'
  - step-04-journeys'
  - step-05-domain'
  - step-06-innovation'
  - step-07-project-type'
  - step-08-scoping'
  - step-09-functional'
  - step-10-nonfunctional'
  - step-11-polish'
  - step-11-polish'
inputDocuments:
  - /Users/ianrizky/Sites/bca-mycoreplus/_bmad-output/planning-artifacts/product-brief-bca-mycoreplus.md
  - /Users/ianrizky/Sites/bca-mycoreplus/_bmad-output/planning-artifacts/product-brief-bca-mycoreplus-distillate.md
  - /Users/ianrizky/Sites/bca-mycoreplus/_bmad-output/planning-artifacts/research/technical-text-to-image-generation-client-side-react-vite-research-2026-05-08.md
workflowType: 'prd'
briefCount: 2
researchCount: 1
brainstormingCount: 0
projectDocsCount: 0
classification:
  projectType: web_app
  domain: fintech
  complexity: high
  projectContext: brownfield
releaseMode: single-release
---

# Product Requirements Document - bca-mycoreplus

**Author:** Ian
**Date:** 2026-05-08

## Executive Summary

BCA MyCore+ adalah aplikasi web generator gambar berbasis _client-side_ (100% di browser) yang dirancang khusus untuk staf Bank BCA dalam membuat gambar profesional untuk dikirimkan kepada nasabah. Aplikasi ini mengatasi masalah efisiensi dan privasi: staf BCA saat ini menghabiskan **5-10 menit per gambar** menggunakan Canva (biaya Enterprise $12-30/user/bulan) atau alat pihak ketiga yang berisiko kebocoran data nasabah.

Mengusung arsitektur _Zero-Server_, BCA MyCore+ menjamin privasi data nasabah secara absolut karena seluruh proses pembuatan gambar terjadi di perangkat staf bank tanpa ada data yang meninggalkan browser. Dengan kombinasi _Invisible UI_ (Glassmorphism) yang elegan dan fitur _Clipboard-First_ untuk berbagi instan ke WhatsApp, staf BCA dapat membuat dan mengirim gambar dalam waktu kurang dari **30 detik** — penghematan **70% waktu** tanpa memerlukan keahlian desain grafis.

**Momen "aha"** terjadi saat staf BCA menyadari dapat membuat dan mengirim gambar profesional ke nasabah dalam < 30 detik langsung dari browser mobile, tanpa risiko privasi dan tanpa ketergantungan pada tim kreatif.

### What Makes This Special

**1. Zero-Server Architecture** — Privasi data nasabah 100% terjamin. Tidak ada data yang meninggalkan browser staf bank. Kompetitor (Pictify, Wafrow, Pixelixe) semuanya berbasis _server-side API_ yang memerlukan infrastruktur mahal dan menimbulkan risiko kebocoran data.

**2. Clipboard-First Sharing** — Tidak perlu download/upload manual. Copy gambar langsung ke clipboard → paste ke WhatsApp (menggunakan _wa.me_ link) dalam 3 klik. Kompetitor memerlukan download → upload manual atau integrasi API yang kompleks.

**3. Invisible UI (Glassmorphism)** — Antarmuka elegan dengan brand colors BCA (Gold #C8A96A, Deep Navy #0B1F3A, Sapphire Blue #1E3A5F) yang hanya muncul saat objek dipilih. Kompetitor memiliki UI yang penuh tombol/toolbar yang tidak intuitif untuk staf non-desainer.

**4. $0 Infrastructure Cost** — Hosting gratis di GitHub Pages, tidak ada biaya server atau pemeliharaan backend. Canva Enterprise: $12-30/user/bulan untuk 1.000 staf = $12.000-30.000/bulan vs $0 untuk BCA MyCore+.

**5. Fokus MVP yang Disiplin** — Tidak ada _feature creep_. Fokus pada kebutuhan staf bank saat ini (< 30 detik) dengan 11 pilar fitur yang telah dirumuskan via metode SCAMPER.

## Project Classification

| Kategori            | Detail                                                                                                      |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Project Type**    | Web Application (SPA) — React 19 + Vite 8 + TypeScript 6                                                    |
| **Domain**          | Fintech (Banking) — BCA internal application                                                                |
| **Complexity**      | High — Zero-Server Architecture, banking privacy, brand compliance                                          |
| **Project Context** | Brownfield — Foundation exists (React+Vite+Tailwind+TanStack Router), core MVP features not yet implemented |

### Current Codebase State:

- ✅ React 19.2.5 + Vite 8.0.10 + TypeScript 6.0.3 initialized
- ✅ Tailwind CSS 4.2.4 configured
- ✅ TanStack Router with file-based routing
- ✅ Basic project structure (main.tsx, \_\_root.tsx, index.tsx, about.tsx)
- ❌ Fabric.js NOT installed (core dependency missing)
- ❌ ColorThief.js NOT installed
- ❌ Canvas editor NOT implemented
- ❌ Clipboard-First sharing NOT implemented
- ❌ Invisible UI / Glassmorphism NOT implemented
- ❌ Brand colors (Gold #C8A96A, Deep Navy #0B1F3A) NOT applied

## Success Criteria

### User Success

1. **Waktu Pembuatan Gambar** — < 30 detik dari buka browser hingga gambar siap kirim (subject to user testing)
2. **Akses Mobile Browser** — 100% fungsional di browser mobile (Chrome, Safari, Firefox) di perangkat staf BCA
3. **Clipboard-First Success Rate** — > 95% berhasil copy-paste ke WhatsApp tanpa error
4. **Privasi Data** — 0% data nasabah meninggalkan browser (Zero-Server verified)
5. **Adoption Rate** — Target 60% staf target aktif menggunakan MyCore+ dalam 3 bulan pertama

### Business Success

- **Pilot Success**: > 80% staf di cabang pilot melanjutkan penggunaan setelah 1 bulan trial
- **Customer Satisfaction** — Feedback nasabah terhadap kualitas dan kecepatan komunikasi visual
- **Efisiensi Waktu**: Penghematan 70% waktu pembuatan gambar vs menggunakan Canva (5-10 menit → < 30 detik)
- **Cost Savings**: $12.000-30.000/bulan vs Canva Enterprise untuk 1.000+ staf (BCA MyCore+ $0 infrastruktur)

### Technical Success

- **Performance**: Aplikasi berjalan smooth tanpa error di browser mobile staf
- **Memory Management**: Peak memory < 500MB (browser tab limit), cleanup `canvas.dispose()`, `URL.revokeObjectURL()`, `bitmap.close()`
- **Security**: 100% HTTPS/localhost untuk Clipboard API, `img.crossOrigin = 'anonymous'` untuk CORS images, tainted canvas prevention
- **Zero-Server Verification**: 0% data nasabah meninggalkan browser, tidak ada server calls

### Measurable Outcomes

| Metric                            | Target               | Timeline           |
| --------------------------------- | -------------------- | ------------------ |
| Waktu pembuatan gambar            | < 30 detik           | MVP Launch         |
| Clipboard-First success rate      | > 95%                | MVP Launch         |
| Staf pilot melanjutkan penggunaan | > 80%                | 1 bulan post-pilot |
| Adoption rate staf target         | 60%                  | 3 bulan pertama    |
| Cost savings vs Canva             | $12.000-30.000/bulan | Rollout nasional   |

## Product Scope

### MVP - Minimum Viable Product

- ✅ Text-to-Image generator dengan Fabric.js v6 (drag & drop background, tactile text manipulation)
- ✅ ColorThief.js v3+ untuk ekstraksi palet warna dinamis dari gambar
- ✅ Invisible UI dengan Glassmorphism (brand colors: Gold #C8A96A, Deep Navy #0B1F3A, Sapphire Blue #1E3A5F)
- ✅ Clipboard-First sharing (copy image langsung ke clipboard → paste ke WhatsApp)
- ✅ Zero-Server Architecture (100% client-side, hosting di GitHub Pages)
- ✅ Akses via mobile browser (responsive design)
- ✅ Template library untuk produk BCA (KTA, Deposito, Kartu Kredit, Ucapan Selamat) — disediakan tim Brand
- ✅ Pilot Program: Uji coba di 1-2 cabang BCA selama 1 bulan sebelum rollout nasional

### Growth Features (Post-MVP)

- Ekspansi ke channel lain (Instagram, TikTok, Email)
- Integrasi dengan kontak nasabah (CSV upload)
- AI-powered design suggestions
- Referral program antar staf

### Vision (Future)

Dalam 2-3 tahun ke depan, **BCA MyCore+ akan menjadi standar komunikasi visual internal bagi seluruh staf Bank BCA** — alat praktis yang menjembatani staf bank dan nasabah dengan cepat, aman, dan profesional.

Fokus saat ini adalah memenuhi kebutuhan MVP bagi staf BCA: generator gambar sederhana namun powerful untuk komunikasi WhatsApp dengan nasabah. Ekspansi ke fitur atau channel lain **tidak menjadi prioritas** hingga MVP ini terbukti sukses dan stabil.

## User Journeys

### Journey 1: Staf Frontline (Relationship Manager) — "Quick KTA Promotion"

**Persona**: Relationship Manager BCA yang mobile, sering di lapangan, memerlukan alat komunikasi visual cepat untuk nasabah.

**Opening Scene**: Andi (32 thn) ada di cabang BCA, baru selesai meeting dengan nasabah yang tertarik dengan KTA (Kredit Tanpa Agunan). Nasabah minta info detail, tapi Andi tidak punya waktu untuk buat desain manual di Canva.

**Rising Action**:

1. Andi buka browser mobile (Chrome di Android)
2. Masuk ke URL BCA MyCore+ (GitHub Pages)
3. Pilih template "KTA BCA" dari library
4. Double-tap teks "Ajukan sekarang!" → langsung edit di kanvas (tactile manipulation)
5. ColorThief.js otomatis ekstrak palet warna dari gambar background
6. Invisible UI (Glassmorphism) muncul saat Andi pilih teks → ganti warna ke brand Gold

**Climax**: Andi klik "Copy to Clipboard" → buka WhatsApp → paste ke chat nasabah → gambar profesional terkirim dalam 25 detik.

**Resolution**: Nasabah menerima info visual yang profesional dan merespons positif. Andi hemat 5-10 menit vs pakai Canva. Privasi data nasabah terjamin 100% karena semua diproses di browser.

---

### Journey 2: Customer Service Staf — "Deposito Rate Illustration"

**Persona**: Customer Service staf BCA yang menerima pertanyaan via WhatsApp, memerlukan ilustrasi visual rate deposito dengan cepat.

**Opening Scene**: Sari (28 thn) sedang piket CS, menerima WhatsApp dari nasabah yang tanya rate deposito terbaru. Sari butuh kirim gambar ilustrasi, tapi tim kreatif sedang sibuk.

**Rising Action**:

1. Sari buka BCA MyCore+ di browser mobile
2. Pilih template "Deposito BCA"
3. Upload gambar background rate deposito terbaru (drag & drop)
4. ColorThief.js ekstrak 5 warna dominan dari gambar (Vibrant, Muted, dll.)
5. Sari sesuaikan teks "Rate Terbaru 2026!" dengan warna kontras otomatis
6. Preview di kanvas → sempurna

**Climax**: Sari klik "Copy to Clipboard" → paste ke WhatsApp nasabah → nasabah mendapat informasi visual dalam 30 detik.

**Resolution**: Nasabah puas dengan respon cepat dan visual yang jelas. Sari tidak perlu tunggu tim kreatif, tidak perlu skill desain, dan privasi data nasabah tetap terjaga.

---

### Journey 3: Non-Desainer Staf — "No Design Skills Needed"

**Persona**: Staf administratif BCA yang tidak punya skill Canva/desain, sering kesulitan membuat gambar promosi.

**Opening Scene**: Budi (35 thn) staf opsional, diminta buat gambar promosi Kartu Kredit untuk dikirim ke 50+ nasabah. Budi tidak bisa pakai Canva, dan tidak bisa minta bantuan desainer karena antrean panjang.

**Rising Action**:

1. Budi buka BCA MyCore+ (link dari internal BCA)
2. Pilih template "Kartu Kredit BCA" (sudah tervalidasi tim Brand)
3. Double-click teks di kanvas → langsung ketik "Promo Spesial Ramadhan!"
4. Drag/resize teks dengan tactile manipulation (drag & drop intuitif)
5. Tidak perlu atur warna — brand colors (Gold, Deep Navy) otomatis diterapkan
6. Invisible UI muncul saat Budi pilih objek → klik "Reset to BCA Brand" untuk pastikan compliance

**Climax**: Budi klik "Copy to Clipboard" → paste ke WhatsApp Web → kirim ke 50+ nasabah dalam 1 jam (vs 5-10 menit per gambar jika pakai Canva manual = 5-10 jam total).

**Resolution**: Budi sukses kirim promosi ke semua nasabah tanpa bantuan desainer. Efisiensi waktu: 70% lebih cepat. Brand compliance 100% karena template resmi BCA.

---

### Journey 4: Staf Frontline — "Ucapan Selamat untuk Nasabah"

**Persona**: Staf BCA yang ingin mengirim ucapan selamat personal kepada nasabah (ulang tahun, wisuda, toko/usaha baru, atau pencapaian lainnya).

**Opening Scene**: Rina (30 thn) Relationship Manager, ingin mengirim ucapan selamat atas ulang tahun nasabah setianya. Rina ingin kirim gambar personal yang elegan, tapi tidak punya waktu buat desain manual dan tidak ingin melanggar brand guidelines BCA.

**Rising Action**:

1. Rina buka BCA MyCore+ di browser mobile
2. Pilih template "Ucapan Selamat" (birthday, graduation, new business, dll.)
3. Ganti teks default dengan "Selamat Ulang Tahun ke-45, Pak Budi!"
4. Tambahkan foto nasabah atau logo bisnisnya via drag & drop (ColorThief.js ekstrak warna otomatis)
5. Invisible UI muncul → Rina pilih warna teks yang kontras dengan background (Gold #C8A96A atau Deep Navy #0B1F3A)
6. Klik "Safe Zone Indicator" untuk pastikan teks tidak keluar dari area aman (brand compliance)

**Climax**: Rina klik "Copy to Clipboard" → paste ke WhatsApp → nasabah menerima ucapan personal yang profesional dalam 28 detik. Nasabah merasa spesial dan dihargai.

**Resolution**: Nasabah merasa lebih dekat dan loyal dengan BCA karena perhatian personal. Rina hemat waktu dan tetap patuh pada brand guidelines. Privasi data nasabah 100% terjamin (tidak ada data yang dikirim ke server).

**Variasi Ucapan Selamat yang Didukung**:

- 🎂 **Ulang Tahun** — "Selamat Ulang Tahun ke-{age}!"
- 🎓 **Wisuda** — "Selamat Wisuda, {name}! Sukses selalu!"
- 🏪 **Toko/Usaha Baru** — "Selamat atas pembukaan {business_name}!"
- 🏆 **Pencapaian** — "Selamat atas pencapaian {achievement}!"

---

### Journey Requirements Summary

| Capability Area              | Requirements Revealed                                                              |
| ---------------------------- | ---------------------------------------------------------------------------------- |
| **Canvas Editor**            | Fabric.js v6 drag & drop, tactile text manipulation, inline editing                |
| **Template Library**         | BCA resmi templates (KTA, Deposito, Kartu Kredit, Ucapan Selamat), brand-validated |
| **Color Extraction**         | ColorThief.js v3+ untuk ekstraksi palet dinamis, semantic swatches                 |
| **Clipboard-First**          | `navigator.clipboard.write()` → copy image blob → paste ke WhatsApp                |
| **Invisible UI**             | Glassmorphism toolbar muncul saat objek dipilih, hilang saat tidak dipakai         |
| **Brand Compliance**         | Reset to BCA Brand button, Safe Zone Indicator, template-only mode opsional        |
| **Mobile Browser**           | 100% fungsional di Chrome/Safari/Firefox mobile                                    |
| **Zero-Server**              | Semua proses di browser, 0% data meninggalkan perangkat                            |
| **Performance**              | < 30 detik dari buka browser hingga gambar terkirim                                |
| **Ucapan Selamat Templates** | Birthday, graduation, new business, achievements - customizable text               |

## Functional Requirements

### Canvas Editor Core

- **FR1**: Staf BCA dapat memuat gambar latar belakang ke kanvas melalui drag & drop
- **FR2**: Staf BCA dapat menambah teks ke kanvas dengan double-click (inline editing)
- **FR3**: Staf BCA dapat melakukan drag, resize, dan rotate teks secara langsung di kanvas (tactile manipulation)
- **FR4**: Staf BCA dapat memilih objek di kanvas untuk menampilkan opsi editan
- **FR5**: Staf BCA dapat menghapus objek di kanvas (teks/gambar)
- **FR6**: Staf BCA dapat mengubah ukuran dan font teks melalui toolbar yang muncul saat objek dipilih

### Template Library

- **FR7**: Staf BCA dapat memilih template resmi BCA (KTA, Deposito, Kartu Kredit, Ucapan Selamat)
- **FR8**: Staf BCA dapat melihat preview template sebelum memilihnya
- **FR9**: Staf BCA yang memiliki akses khusus dapat upload gambar latar sendiri (dengan peringatan brand compliance)
- **FR10**: Staf BCA dapat memilih mode "Template-Only" yang membatasi pada template resmi BCA saja

### Color Extraction & Management

- **FR11**: Aplikasi otomatis mengekstrak palet warna (5 warna) dari gambar latar yang dimuat
- **FR12**: Staf BCA dapat melihat palet warna yang diekstrak (Vibrant, Muted, DarkVibrant, dll.)
- **FR13**: Staf BCA dapat menggunaknan warna hasil ekstraksi untuk teks di kanvas
- **FR14**: Staf BCA dapat mengklik "Reset to BCA Brand" untuk mengembalikan warna ke Gold #C8A96A, Deep Navy #0B1F3A, Sapphire Blue #1E3A5F

### Clipboard-First Sharing

- **FR15**: Staf BCA dapat menyalin gambar dari kanvas langsung ke clipboard (copy image blob)
- **FR16**: Staf BCA dapat membuka WhatsApp Web/mobile dengan klik link `wa.me` yang terisi otomatis
- **FR17**: Aplikasi menampilkan konfirmasi saat gambar berhasil disalin ke clipboard
- **FR18**: Aplikasi memberikan fallback download link jika Clipboard API tidak didukung browser

### Invisible UI (Glassmorphism)

- **FR19**: Toolbar dan opsi editan hanya muncul saat objek di kanvas dipilih (invisible by default)
- **FR20**: UI memiliki efek Glassmorphism (backdrop-blur, bg-opacity) dengan brand colors BCA
- **FR21**: Staf BCA dapat menyembunyikan toolbar dengan mengklik di luar objek
- **FR22**: Staf BCA dapat melihat "Safe Zone Indicator" yang menunjukkan area aman untuk teks (mencegah brand violation)

### Brand Compliance

- **FR23**: Template resmi BCA tervalidasi oleh tim Brand sebelum masuk ke aplikasi
- **FR24**: Staf BCA menerima peringatan "Pastikan sesuai brand guidelines BCA" jika upload gambar latar sendiri
- **FR25**: Teks di kanvas memiliki kontras warna yang memenuhi WCAG AA ratio (menggunakan ColorThief.js `.contrast`)
- **FR26**: Aplikasi mencatat penggunaan template (opsional) untuk audit internal BCA

### Zero-Server Architecture

- **FR27**: Semua pemrosesan gambar terjadi di browser staf (100% client-side)
- **FR28**: Tidak ada data nasabah yang dikirim ke server eksternal
- **FR29**: Gambar hasil editan disimpan sementara di memori browser (Blob/DataURL)
- **FR30**: Aplikasi dapat berjalan sepenuhnya ofline setelah halaman dimuat (PWA-ready)

### Mobile Browser Support

- **FR31**: Aplikasi 100% fungsional di Chrome mobile (Android)
- **FR32**: Aplikasi 100% fungsional di Safari mobile (iOS)
- **FR33**: Aplikasi 100% fungsional di Firefox mobile
- **FR34**: UI responsif dan touch-friendly untuk perangkat mobile staf BCA

### Image Upload & Management

- **FR35**: Staf BCA dapat upload gambar latar dari perangkat (FileReader API, readAsDataURL)
- **FR36**: Aplikasi menghindari CORS issues dengan `img.crossOrigin = 'anonymous'` untuk gambar eksternal
- **FR37**: Aplikasi menangani gambar besar dengan resize preview (25-50% original) untuk mencegah memory crash
- **FR38**: Staf BCA dapat menghapus gambar latar dan menggantinya dengan yang baru

### Export & Output

- **FR39**: Aplikasi mengekspor kanvas sebagai gambar PNG (lossless, alpha transparency)
- **FR40**: Aplikasi mengekspor kanvas sebagai gambar JPEG/WebP (opsional, dengan kompresi)
- **FR41**: Staf BCA dapat mengunduh gambar hasil editan (fallback jika Clipboard gagal)
- **FR42**: Aplikasi melakukan cleanup memory otomatis (`canvas.dispose()`, `URL.revokeObjectURL()`, `bitmap.close()`)

### Pilot & Support

- **FR43**: Staf BCA dapat mengakses FAQ internal untuk troubelshooting umum (clipboard error, image tidak muncul, dll.)
- **FR44**: Staf BCA dapat mengirim feedback melalui form di aplikasi
- **FR45**: Staf BCA dapat menghubungi Helpdesk internal BCA (ext. 1234) untuk laporan bug atau kendala teknis

## Non-Functional Requirements

### Performance

- **NFR1**: Aplikasi harus memproses dan menghasilkan gambar dalam waktu < 30 detik (dari buka browser hingga gambar siap dikirim)
- **NFR2**: Time to Interactive (TTI) < 2 detik setelah halaman dimuat di browser mobile
- **NFR3**: Initial bundle size < 200KB gzipped (Fabric.js ~150KB + React + app code)
- **NFR4**: Peak memory usage < 500MB di browser mobile (mencegah tab crash)
- **NFR5**: Clipboard-First success rate > 95% berhasil copy-paste ke WhatsApp tanpa error
- **NFR6**: Canvas rendering responsive (< 100ms delay untuk drag/resize/rotate teks)

### Security

- **NFR7**: 0% data nasabah meninggalkan browser staf (Zero-Server verified)
- **NFR8**: 100% HTTPS/localhost untuk Clipboard API (GitHub Pages menyediakan HTTPS)
- **NFR9**: CORS handling: `img.crossOrigin = 'anonymous'` untuk gambar eksternal, restrict ke local uploads sebagai default
- **NFR10**: Tainted canvas prevention: Validasi gambar sebelum `toBlob()`/ `toDataURL()`
- **NFR11**: Tidak ada log aktivitas di server (semua di browser - zero server calls)
- **NFR12**: `localStorage` hanya untuk preferensi UI (tidak menyimpan data nasabah)

### Accessibility

- **NFR13**: Target WCAG 2.1 Level A (Minimum) untuk aksesibilitas staf BCA
- **NFR14**: Keyboard navigation: Toolbar bisa diakses via keyboard (tab, enter, arrow keys)
- **NFR15**: Focus indicators: Outline terlihat saat elemen difokus
- **NFR16**: Color contrast: WCAG AA ratio (4.5:1) untuk teks vs background (menggunakan ColorThief.js `.contrast`)
- **NFR17**: Alt text: Gambar template memiliki `alt` description untuk screen readers

### Scalability

- **NFR18**: Aplikasi mendukung 1,270+ cabang BCA (~27,000 staf) secara bertahap (pilot → rollout nasional)
- **NFR19**: Static hosting (GitHub Pages) dapat menangani traffic internal BCA tanpa degradasi performa
- **NFR20**: Browser support: 100% fungsional di Chrome, Safari, Firefox (tidak perlu dukungan IE11 atau browser lama)
- **NFR21**: Peak concurrent users: Maksimal 200 staf (1 cabang pilot) → 27,000 staf (rollout nasional) tanpa backend scaling

### Reliability

- **NFR22**: Clipboard-First fallback: Jika Clipboard API tidak didukung → `document.execCommand("copy")` + download link
- **NFR23**: ColorThief.js fallback: Jika ekstraksi gagal → default BCA brand palette (Gold #C8A96A, Deep Navy #0B1F3A)
- **NFR24**: Fabric.js v6 fallback: Lock ke versi exact `"fabric": "6.4.3"` untuk menghindari breaking changes
- **NFR25**: Memory cleanup: `canvas.dispose()`, `URL.revokeObjectURL()`, `bitmap.close()` untuk mencegah memory leaks
- **NFR26**: Aplikasi tetap berfungsi ofline setelah halaman dimuat pertama kali (PWA-ready, service worker opsional)

## Innovation & Novel Patterns

### Detected Innovation Areas

**1. Zero-Server Architecture untuk Banking:**

- 100% client-side processing — tidak ada kompetitor yang menawarkan privasi 100% untuk perbankan
- Kompetitor (Pictify, Wafrow, Pixelixe, DynaPictures) semuanya berbasis server-side API
- $0 infrastruktur vs Canva Enterprise $12-30/user/bulan untuk 1.000+ staf = $12.000-30.000/bulan

**2. Clipboard-First Workflow:**

- Copy image langsung ke clipboard → paste ke WhatsApp dalam 3 klik
- Tidak perlu download manual → upload ulang (workflow konvensional)
- Mono `wa.me` link untuk sharing instan ke WhatsApp

**3. Invisible UI (Glassmorphism):**

- UI elegan dengan brand colors BCA (Gold #C8A96A, Deep Navy #0B1F3A, Sapphire Blue #1E3A5F) dengan efek kaca
- Toolbar hanya muncul saat objek dipilih — "Zero chrome" approach
- Berbeda dengan Canva yang penuh tombol/toolbar yang membingungkan untuk staf non-desainer

**4. Novel Combination:**

- Zero-Server + Clipboard-First + WhatsApp integration = kombinasi unik yang belum pernah ada
- Fabric.js v6 (ESM modules) + ColorThief.js v3+ (OKLCH color space) + React/Vite
- < 30 detik workflow vs 5-10 menit dengan Canva manual

### Market Context & Competitive Landscape

| Kompetitor       | Pendekatan                                      | Kelemahan vs BCA MyCore+                                      |
| ---------------- | ----------------------------------------------- | ------------------------------------------------------------- |
| **Canva**        | Server-side, template kreatif luas              | $12-30/user/bulan, butuh skill desain, tidak privasi 100%     |
| **Pictify.io**   | Server-side API, template + JSON in → image out | Butuh infrastruktur server, tidak client-side                 |
| **Wafrow**       | Dynamic image API + Zapier integration          | Server-based, biaya langganan, tidak cocok untuk privasi bank |
| **Pixelixe**     | Image personalization untuk CRM/email campaigns | Server-based, data nasabah harus dikirim ke server            |
| **DynaPictures** | SDK untuk embed image generator                 | Server-side API, model SDK, biaya langganan                   |

**Why BCA MyCore+ Wins:**

- 100% Client-Side = Privasi absolut (data tidak meninggalkan browser staf)
- $0 Infrastructure (GitHub Pages gratis vs Canva $12-30/user/bulan)
- < 30 Detik vs 5-10 Menit (Canva manual)
- Brand compliance otomatis (template resmi BCA)

### Validation Approach

**Innovation Validation:**

1. **User Testing**: Apakah < 30 detik workflow benar-benar achievable oleh staf non-desainer?
2. **Privacy Verification**: Penetrasi test untuk memastikan 0% data meninggalkan browser
3. **Clipboard-First Success Rate**: > 95% berhasil copy-paste ke WhatsApp tanpa error
4. **Performance Testing**: Peak memory < 500MB, Time to Interactive < 2 detik di mobile browser

**Fallback if Innovation Fails:**

- Jika Clipboard API tidak didukung browser lama → Fallback: `document.execCommand("copy")` + download link
- Jika ColorThief.js gagal ekstrak warna → Default palette (Brand Colors BCA)
- Jika Fabric.js v6 ada bug → Lock ke versi exact `"fabric": "6.4.3"`

### Risk Mitigation

| Risiko Inovasi                              | Dampak                     | Mitigasi                                     |
| ------------------------------------------- | -------------------------- | -------------------------------------------- |
| Zero-Server belum teruji di lingkungan bank | Skeptisisme IT BCA         | Pilot 1-2 cabang, buktikan privasi 100%      |
| Clipboard-First belum umum di Indonesia     | User bingung cara pakainya | Workshop 30 menit + FAQ internal             |
| Invisible UI terlalu minimalis              | User tidak tahu cara edit  | Onboarding tooltip + Help button di aplikasi |

## Web Application (SPA) Specific Requirements

### Project-Type Overview

BCA MyCore+ adalah **Single Page Application (SPA)** yang dibangun dengan React 19 + Vite 8 + TypeScript 6. Aplikasi ini menggunakan TanStack Router untuk file-based routing dan berjalan 100% di browser (Zero-Server Architecture).

**Key Characteristics:**

- **SPA Architecture**: Single HTML page dengan dynamic updates via React
- **No Server**: Tidak ada backend, tidak ada API calls ke server
- **Client-Side Only**: Semua logic di browser (Fabric.js canvas, ColorThief.js, Clipboard API)
- **Static Hosting**: GitHub Pages (gratis), output dari `vite build` → `dist/`

### Technical Architecture Considerations

**SPA Routing (TanStack Router):**

- File-based routing: `__root.tsx` (nav + outlet), `index.tsx` (home), `about.tsx`
- Tidak ada server-side rendering (SSR) — pure client-side SPA
- Deep linking: `https://bca-mycoreplus.github.io/bca-mycoreplus/` (base path disesuaikan)

**Browser Support:**

- ✅ Chrome (Android) — utama untuk staf lapangan
- ✅ Safari (iOS) — untuk iPhone staf BCA
- ✅ Firefox — alternatif
- ❌ IE11 — tidak didukung (modern browsers only)

**Performance Targets:**

- **Initial Bundle**: < 200KB gzipped (Fabric.js ~150KB + React + app code)
- **Time to Interactive**: < 2 detik (Vite fast refresh)
- **Memory**: < 500MB peak (mobile browser limit)
- **Lighthouse Score**: > 90 (performance, accessibility, best practices)

### Implementation Considerations

**React + Vite Integration:**

- **Fabric.js v6.4.3**: ESM modules, import `import { Canvas, Image } from 'fabric'`
- **useRef Pattern**: `const canvasRef = useRef<fabric.Canvas>(null)` — bukan `useState`
- **Cleanup**: `canvas.dispose()` di `useEffect` cleanup function
- **ColorThief.js v3.3.1**: `getColorSync()`, `getPaletteSync()` untuk browser

**Zero-Server Patterns:**

- **Clipboard API**: `navigator.clipboard.write()` → copy image blob ke clipboard
- **FileReader API**: `reader.readAsDataURL(file)` → load gambar lokal ke Fabric.js Image
- **Canvas API**: `canvas.toBlob(callback, 'image/png', quality)` → export ke Blob
- **Tidak ada**: `fetch()`, `axios`, `WebSocket`, atau server communication lainnya

**Mobile Browser Optimization:**

- **Touch Events**: Fabric.js v6 mendukung touch untuk drag/resize/rotate
- **Responsive Design**: Tailwind CSS 4.2.4 utility classes
- **Glassmorphism**: `backdrop-blur`, `bg-opacity` untuk Invisible UI
- **Viewport**: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

### Accessibility (Aksesibilitas)

**Target: WCAG 2.1 Level A (Minimum):**

- **Keyboard Navigation**: Toolbar bisa diakses via keyboard (tab, enter, arrow keys)
- **Focus Indicators**: Outline terlihat saat elemen difokus
- **Alt Text**: Gambar template memiliki `alt` description
- **Color Contrast**: WCAG AA ratio (4.5:1) untuk teks vs background (menggunakan ColorThief.js `.contrast`)

**Mengapa Level A (bukan AA/AAA)?**

- Aplikasi internal BCA (bukan publik)
- Fokus utama: fungsionalitas dan kecepatan untuk staf
- Staf BCA adalah user yang terlatih (bukan general public)

### SEO Considerations

**Tidak perlu SEO:**

- ✅ Aplikasi internal BCA (bukan untuk publik)
- ✅ URL hanya diketahui staf BCA (GitHub Pages, akses via link internal)
- ✅ Tidak ada crawling oleh Google/Bing (robots.txt bisa diset untuk block)

**Schema & Meta Tags (Minimal):**

- `<title>BCA MyCore+ - Generator Gambar</title>`
- `<meta name="description" content="Generator gambar profesional untuk staf BCA">`
- Open Graph tags tidak diperlukan (tidak untuk social sharing publik)

## Domain-Specific Requirements (Fintech - High Complexity)

### Compliance & Regulatory

**Regional Compliance (Indonesia):**

- Aplikasi internal BCA untuk staf — tunduk pada regulasi perbankan Indonesia (OJK - Otoritas Jasa Keuangan)
- Privasi data nasabah: **0% data meninggalkan browser** (Zero-Server Architecture) — memenuhi standar perlindungan data

**Security Standards:**

- Tidak ada server = tidak ada server vulnerabilities
- Clipboard API memerlukan HTTPS/localhost (GitHub Pages menyediakan HTTPS)
- CORS handling untuk gambar eksternal (`img.crossOrigin = 'anonymous'`)

**Audit Requirements:**

- Karena Zero-Server, audit difokuskan pada:
  - Template compliance (brand validation oleh tim Brand)
  - Penggunaan internal staf BCA (tidak untuk publik)
  - Tidak ada log aktivitas di server (semua di browser)

### Technical Constraints

**Data Protection:**

- ✅ **Sudah teratasi**: Zero-Server Architecture menjamin 100% data nasabah tetap di perangkat staf
- Tidak ada penyimpanan gambar di server (semua di memori browser)
- `localStorage` opsional untuk preferensi UI saja (tidak menyimpan data nasabah)

**Fraud Prevention:**

- Template-only mode (opsional) — staf hanya bisa pilih template resmi BCA
- Safe Zone Indicator — mencegah teks keluar dari area aman (brand violation)
- "Reset to BCA Brand" button — memastikan warna selalu sesuai brand guidelines

**Performance untuk Mobile:**

- Browser staf BCA: Chrome, Safari, Firefox di perangkat mobile
- Peak memory < 500MB (mencegah tab crash di mobile)
- Time to Interactive < 2 detik (Vite fast refresh)

### Integration Requirements

**WhatsApp Integration:**

- Mono `wa.me` link + Clipboard-First (copy image → paste ke WhatsApp)
- Tidak menggunakan WhatsApp Business API (tidak perlu backend)
- Semua terjadi di sisi klien (client-side)

**Template Library:**

- Integrasi dengan tim Brand BCA untuk template resmi (KTA, Deposito, Kartu Kredit, Ucapan Selamat)
- Template tervalidasi sebelum masuk ke aplikasi
- Safe Zone Indicators disesuaikan dengan standar brand BCA

### Risk Mitigations

| Risiko                                    | Dampak                             | Mitigasi                                                                       |
| ----------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------ |
| Brand violation (warna/teks tidak sesuai) | Reputasi BCA terganggu             | Reset to BCA Brand button, Safe Zone Indicator, template-only mode             |
| Clipboard API tidak didukung browser lama | Fitur "Copy" gagal                 | Fallback: `document.execCommand("copy")` + download link                       |
| Gambar besar menyebabkan memory crash     | Tab browser crash di mobile        | Tiled processing, resize preview (25-50% original), `canvas.dispose()` cleanup |
| CORS images membuat canvas tainted        | Export gagal (`toBlob()` error)    | `img.crossOrigin = 'anonymous'`, restrict ke local uploads                     |
| Staf tidak punya skill desain             | Tidak bisa buat gambar profesional | Invisible UI, drag & drop, tactile text manipulation                           |

## Project Scoping

### Strategy & Philosophy

**Approach:** Single Release dengan MVP Focus
**Resource Requirements:** 1 Frontend Developer (Fabric.js + React), 1 UI/UX Designer (Glassmorphism + Brand), 1 QA/Testing (Manual + Vitest)

### Complete Feature Set

**Core User Journeys Supported:**

- Staf Frontline (Relationship Manager) — KTA Promotion (< 30 detik)
- Customer Service Staf — Deposito Rate Illustration (30 detik)
- Non-Desainer Staf — No Design Skills Needed (70% efisiensi)
- Staf Frontline — Ucapan Selamat (ulang tahun, wisuda, toko baru, dll.)

### Must-Have Capabilities (MVP - Single Release)

**Core Generator:**

- ✅ Text-to-Image generator dengan Fabric.js v6.4.3 (drag & drop background, tactile text manipulation)
- ✅ ColorThief.js v3.3.1 untuk ekstraksi palet warna dinamis (OKLCH, semantic swatches)
- ✅ Invisible UI dengan Glassmorphism (brand colors: Gold #C8A96A, Deep Navy #0B1F3A, Sapphire Blue #1E3A5F)
- ✅ Clipboard-First sharing (`navigator.clipboard.write()` → paste ke WhatsApp via `wa.me`)
- ✅ Zero-Server Architecture (100% client-side, hosting GitHub Pages)

**Compliance & Access:**

- ✅ Akses via mobile browser (Chrome, Safari, Firefox) — responsive design
- ✅ Template library produk BCA (KTA, Deposito, Kartu Kredit, Ucapan Selamat)
- ✅ Brand compliance otomatis (Safe Zone Indicator, Reset to BCA Brand, template-only mode opsional)

**Pilot & Adoption:**

- ✅ Pilot Program: 1-2 cabang BCA (100-200 staf) selama 1 bulan
- ✅ Training & Onboarding: Workshop 30 menit untuk staf frontline
- ✅ Support Plan: FAQ internal + Helpdesk ext.1234 + Feedback form

### Nice-to-Have Capabilities (Post-MVP)

**Channel Expansion:**

- Ekspansi ke channel lain (Instagram, TikTok, Email)
- Multi-channel export (auto-resize untuk aspect ratio berbeda)

**Advanced Features:**

- Integrasi dengan kontak nasabah (CSV upload)
- AI-powered design suggestions (menggunakan model AI lokal di browser)
- Referral program antar staf

**Performance Enhancements:**

- Web Workers untuk parallel image processing
- Tiled processing untuk gambar besar (mengurangi peak memory 60%)
- Progressive Web App (PWA) support untuk offline access

### Risk Mitigation Strategy

**Technical Risks:**

| Risiko                                 | Mitigasi                                                              |
| -------------------------------------- | --------------------------------------------------------------------- |
| Fabric.js v6 bugs/API changes          | Lock ke versi exact `"fabric": "6.4.3"`                               |
| Browser CORS untuk cross-origin images | `img.crossOrigin = 'anonymous'` atau restrict ke local uploads        |
| Large image memory crashes             | Tiled processing, resize preview (25-50%), `canvas.dispose()` cleanup |
| Clipboard API not supported            | Fallback: `document.execCommand("copy")` + download link              |
| ColorThief.js fails                    | `try/catch`, default BCA brand palette                                |

**Market Risks:**

- Staf tidak terbiasa dengan Clipboard-First workflow → Workshop 30 menit + FAQ
- Skeptisisme IT BCA terhadap Zero-Server → Pilot 1-2 cabang buktikan privasi 100%
- Kompetitor (Canva) masih dominan → Highlight $0 infrastruktur + 70% efisiensi waktu

**Resource Risks:**

- Jika tim kurang dari 3 orang (1 Dev, 1 UI/UX, 1 QA) → Fokus MVP saja, defer Post-MVP features
- Jika waktu terbatas → Prioritas: Fabric.js canvas + Clipboard-First + 3 template utama (KTA, Deposito, Kartu Kredit)
