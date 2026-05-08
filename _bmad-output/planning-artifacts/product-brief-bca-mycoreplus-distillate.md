---
title: 'Product Brief Distillate: BCA MyCore+'
type: llm-distillate
source: 'product-brief-bca-mycoreplus.md'
created: '2026-05-08'
purpose: 'Token-efficient context for downstream PRD creation'
---

# Product Brief Distillate: BCA MyCore+

## Rejected Ideas (with Rationale)

- **Web Fonts** → Rejected: Memperlambat performa loading, tidak esensial untuk MVP (Brainstorming Session)
- **Upload Server** → Rejected: Melanggar prinsip Zero-Server Architecture, risiko privasi data nasabah (Brainstorming Session)
- **Download Konvensional** → Rejected: Tidak mendukung siklus media sosial yang cepat, diganti Clipboard-First (Brainstorming Session)
- **AI-Generated Images** → Rejected: MVP fokus pada editor manual, bukan generate otomatis dari prompt (Scope Decision)
- **User Accounts/Login System** → Rejected: Aplikasi publik tanpa autentikasi, menyederhanakan akses (Scope Decision)
- **Integrasi CRM/Database Nasabah** → Rejected: Diluar scope MVP, fokus pada generator gambar mandiri (Scope Decision)
- **Channel Lain (IG, TikTok, Email)** → Rejected: Fokus WhatsApp saja untuk MVP, ekspansi nanti (User Decision)

## Requirements Hints

- **Mobile Browser Access**: Harus 100% fungsional di browser mobile (Chrome, Safari, Firefox) - target pengguna staf lapangan
- **WhatsApp Integration**: Menggunakan wa.me link + Clipboard-First (copy image → paste ke WhatsApp)
- **< 30 Detik Workflow**: Dari buka browser hingga gambar siap kirim (< 30 detik)
- **Brand Colors Compliance**: Gold #C8A96A, Deep Navy #0B1F3A, Sapphire Blue #1E3A5F (Glassmorphism UI)
- **Zero-Server Verification**: 0% data nasabah meninggalkan browser (privacy guarantee)
- **Template Library**: Template resmi BCA (KTA, Deposito, Kartu Kredit) disediakan tim Brand
- **Fabric.js v6**: Wajib gunakan v6.4.3+ (ESM modules, TypeScript native, tactile text manipulation)

## Technical Context

- **Stack**: React 19 + Vite 8.0.10 + TypeScript 6.0.3 + Tailwind CSS 4.2.4
- **Canvas Engine**: Fabric.js v6.4.3 (ESM modules, `useRef` pattern untuk React integration, `canvas.dispose()` untuk cleanup)
- **Color Extraction**: ColorThief.js v3.3.1 (OKLCH color space, semantic swatches, Web Workers support dengan `worker: true`)
- **Hosting**: GitHub Pages (static hosting gratis, output dari `vite build` → `dist/`)
- **Clipboard API**: `navigator.clipboard.write()` untuk copy image blob, memerlukan HTTPS atau localhost
- **FileReader API**: `reader.readAsDataURL(file)` untuk load gambar lokal ke Fabric.js Image
- **Invisible UI**: Contextual toolbar dengan Glassmorphism (Tailwind: `backdrop-blur`, `bg-opacity`) muncul saat objek dipilih
- **No Backend**: Zero-Server Architecture, semua pemrosesan di browser (Canvas API, Blob/DataURL)

## Detailed User Scenarios

1. **Staf Frontline (Relationship Manager)**:
   - Buka browser mobile → Pilih template "KTA BCA" → Ganti teks "Ajukan sekarang!" → Copy ke clipboard → Paste ke chat WhatsApp nasabah → Selesai dalam 25 detik

2. **Customer Service Staf**:
   - Terima pertanyaan nasabah tentang deposito → Buat gambar ilustrasi dengan background rate deposito → Extract warna otomatis dari gambar (ColorThief.js) → Share ke WhatsApp → Nasabah menerima info visual dalam 30 detik

3. **Non-Desainer Staf**:
   - Tidak punya skill Canva → Pilih template BCA → Double-click teks untuk edit langsung di kanvas (tactile manipulation) → Drag/resize teks → Copy → Paste ke WhatsApp → Tidak perlu bantuan tim kreatif

## Competitive Intelligence

| Kompetitor       | Pendekatan                                      | Kekurangan vs BCA MyCore+                                                        |
| ---------------- | ----------------------------------------------- | -------------------------------------------------------------------------------- |
| **Canva**        | Server-side, template kreatif luas              | $12-30/user/bulan, butuh skill desain, tidak privasi 100% (data di server Canva) |
| **Pictify.io**   | Server-side API, template + JSON in → image out | Butuh infrastruktur server ($), tidak client-side, butuh API integration         |
| **Wafrow**       | Dynamic image API + Zapier integration          | Server-based, biaya langganan, tidak cocok untuk privasi bank                    |
| **Pixelixe**     | Image personalization untuk CRM/email campaigns | Server-based, data nasabah harus dikirim ke server Pixelixe                      |
| **DynaPictures** | SDK untuk embed image generator                 | Server-side API, model SDK, biaya langganan                                      |

**Why BCA MyCore+ Wins:**

- 100% Client-Side = Privasi absolut (data tidak meninggalkan browser staf)
- $0 Infrastructure (GitHub Pages gratis vs Canva $12-30/user/bulan untuk 1.000+ staf = $12.000-30.000/bulan)
- < 30 Detik vs 5-10 Menit (Canva manual)
- Brand compliance otomatis (template resmi BCA)

## Open Questions

1. **Adoption Rate Target**: Berapa persentase staf yang harus aktif dalam 3 bulan? (Saran: 60%)
2. **Pilot Program Details**: Cabang mana yang jadi pilot? Berapa staf yang terlibat? (Belum ditentukan)
3. **Support Channel**: Helpdesk ext. berapa untuk laporan bug? (Belum divalidasi dengan tim IT BCA)
4. **Template Expansion**: Kapan template non-finansial (edukasi,CSR) akan ditambah? (Di luar scope MVP)
5. **Device Readiness**: Apakah 100% staf BCA memiliki smartphone dengan browser modern? (Perlu survei internal)

## Scope Signals

**IN (MVP - Confirmed):**

- Text-to-Image generator dengan Fabric.js v6 (drag & drop background, tactile text manipulation)
- ColorThief.js v3+ untuk ekstraksi palet warna dinamis
- Invisible UI dengan Glassmorphism (brand colors BCA)
- Clipboard-First sharing (copy → paste WhatsApp)
- Zero-Server Architecture (100% client-side)
- Mobile browser akses (responsive)
- Template library produk BCA (KTA, Deposito, Kartu Kredit)
- Pilot Program (1-2 cabang, 1 bulan)
- Training & Onboarding (workshop 30 menit)
- Support Plan (FAQ + helpdesk internal)

**OUT (Explicitly Excluded):**

- Integrasi CRM/database nasabah
- Channel lain: Instagram, TikTok, Email (fokus WhatsApp)
- AI-generated images (model AI) - murni editor manual
- User accounts/login system
- Penyimpanan gambar di server

**MAYBE (Post-MVP):**

- Ekspansi ke channel lain (IG, TikTok, Email)
- Integrasi dengan kontak nasabah (CSV upload)
- AI-powered design suggestions
- Referral program antar staf

## Brainstorming Highlights

- **11 Pilar Fitur MVP** dirumuskan via SCAMPER Method (Brainstorming Session 2026-05-01)
- **Key Breakthrough**: "Invisible UI" + "Clipboard-First" dari penolakan download konvensional
- **User Creative Strengths**: Pragmatisme arsitektur (menolak feature creep), fokus pada MVP
- **Energy Level**: Fokus dan sangat teknis/pragmatis

## Technical Research Insights

- **Fabric.js v6 vs v5**: v6 mendukung ESM modules (kompatibel Vite), TypeScript native, Promise-based API
- **ColorThief.js v3+ (2026)**: OKLCH color space (perceptually uniform), semantic swatches (Vibrant, Muted, dll.), Web Workers support
- **React Integration**: `useRef` pattern (bukan `useState`) untuk Fabric.js Canvas instance - menghindari unnecessary re-renders
- **CDN for Libraries**: Fabric.js dari `cdn.jsdelivr.net` - mengurangi bundle size
- **Memory Management**: `canvas.dispose()`, `URL.revokeObjectURL()`, `bitmap.close()` untuk mencegah memory leaks
- **Security**: HTTPS/localhost untuk Clipboard API, `img.crossOrigin = 'anonymous'` untuk CORS images, tainted canvas prevention

## Success Metrics (Detailed)

**Primary (MVP):**

1. Waktu Pembuatan Gambar: < 30 detik (dari buka browser hingga siap kirim)
2. Akses Mobile Browser: 100% fungsional (Chrome, Safari, Firefox)
3. Clipboard-First Success Rate: > 95% berhasil copy-paste ke WhatsApp
4. Privasi Data: 0% data meninggalkan browser (Zero-Server verified)
5. Adoption Rate: 60% staf target aktif dalam 3 bulan pertama

**Secondary (Business):**

- Pilot Success: > 80% staf pilot melanjutkan penggunaan setelah 1 bulan
- Customer Satisfaction: Feedback nasabah terhadap kualitas dan kecepatan
- Efisiensi Waktu: Penghematan 70% vs Canva (5-10 menit → < 30 detik)
- Cost Savings: $12.000-30.000/bulan (vs Canva Enterprise untuk 1.000+ staf)

## Brand Guidelines Context

**Primary Colors (Utama):**

- Gold (Luxury) → #C8A96A
- Deep Navy (Background utama) → #0B1F3A

**Secondary Colors:**

- Sapphire Blue (Accent premium) → #1E3A5F
- Carbon Black (Text/depth) → #1A1A1A
- Quartz White (Clean/background) → #F4F1EC

**Optional Gradient:**

- Gold Gradient: #D9B97A → #B8965A → #8C6B3E

**UI Approach**: Invisible UI dengan Glassmorphism - elegan, premium, hanya muncul saat objek dipilih
