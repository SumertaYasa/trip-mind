# Trip-Mind

**Trip-Mind** adalah aplikasi mobile yang dirancang untuk membantu pengguna merencanakan perjalanan mereka dengan cara yang cerdas dan personal. Menggunakan teknologi AI terbaru (Google Vertex AI/Gemini), aplikasi ini menghasilkan jadwal perjalanan yang disesuaikan dengan preferensi dan ketersediaan waktu pengguna.

## Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Struktur Proyek](#struktur-proyek)
- [Tech Stack](#tech-stack)
- [Persyaratan Sistem](#persyaratan-sistem)
- [Instalasi & Setup](#instalasi--setup)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
  - [Prerequisites](#prerequisites-sebelum-menjalankan)
  - [Opsi 1: Root Scripts](#opsi-1-menggunakan-root-scripts-direkomendasikan-)
  - [Opsi 2: Manual](#opsi-2-jalankan-secara-manual)
  - [Mengakses Aplikasi](#-mengakses-aplikasi)
  - [Development Workflow](#-development-workflow)
  - [Verifikasi](#-verifikasi-aplikasi-berjalan-dengan-baik)
  - [Troubleshooting](#-troubleshooting-common-issues)
- [Dokumentasi Lebih Lanjut](#-dokumentasi-lebih-lanjut)
- [Kontribusi](#-kontribusi)

## Tentang Proyek

Trip-Mind adalah solusi end-to-end untuk perencanaan perjalanan yang cerdas. Aplikasi ini menggabungkan:

- **Backend AI-Powered**: Mengorkestra Google Vertex AI (Gemini) untuk menghasilkan jadwal perjalanan yang logis dan naratif
- **Maps Integration**: Memanfaatkan Google Maps SDK untuk data jarak real-time dan estimasi waktu tempuh
- **Frontend Mobile**: Aplikasi React Native berbasis Expo yang user-friendly dan responsif
- **Authentication & Database**: Supabase untuk manajemen pengguna dan penyimpanan data

## Struktur Proyek

Proyek ini menggunakan struktur **monorepo** dengan dua folder utama:

```
trip-mind/
├── backend/              # Backend API (FastAPI)
│   ├── app/
│   │   └── main.py       # Entry point aplikasi
│   ├── trip-mind/        # Virtual Environment Python
│   └── README.md         # Dokumentasi Backend
├── frontend/             # Frontend Mobile (React Native/Expo)
│   ├── app/              # File rute (Expo Router)
│   ├── components/       # Komponen React
│   └── README.md         # Dokumentasi Frontend
├── package.json          # Scripts untuk menjalankan proyek
└── README.md            # File ini
```

## Tech Stack

### Backend

- **Framework**: FastAPI (Python)
- **AI/ML**: Google Vertex AI (Gemini 1.5 Pro)
- **Maps**: Google Maps SDK
- **Database & Auth**: Supabase
- **Validation**: Pydantic v2
- **Server**: Uvicorn

Lihat [backend/README.md](backend/README.md) untuk dokumentasi lengkap

### Frontend

- **Runtime**: Expo SDK 54
- **UI Framework**: React Native
- **Styling**: NativeWind v5
- **Navigation**: Expo Router (File-based Routing)
- **Maps**: React Native Maps + Expo Location
- **Auth & Database**: Supabase Client SDK
- **Storage**: Expo Secure Store
- **HTTP Client**: Axios
- **Icons**: @expo/vector-icons

Lihat [frontend/README.md](frontend/README.md) untuk dokumentasi lengkap

## Persyaratan Sistem

### Untuk Backend

- Python 3.8+
- pip (Python package manager)

### Untuk Frontend

- Node.js 16+ dan npm (atau yarn)
- Expo CLI (`npm install -g expo-cli`)

### Tools Opsional

- Postman atau tool API testing lainnya
- Android Studio atau Xcode (untuk testing lokal)

## Instalasi & Setup

### 1. Clone & Instalasi Backend

```bash
cd backend
python -m venv trip-mind
source trip-mind/Scripts/activate   # Windows
# atau
source trip-mind/bin/activate       # macOS/Linux

pip install -r requirements.txt
```

### 2. Instalasi Frontend

```bash
cd frontend
npm install
# atau
yarn install
```

### 3. Konfigurasi Environment Variables

Buat file `.env` di folder **backend** dan **frontend** dengan konfigurasi yang sesuai:

**Backend (.env)**

```env
GOOGLE_CLOUD_PROJECT_ID=your_project_id
GOOGLE_MAPS_API_KEY=your_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

**Frontend (.env atau .env.local)**

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Menjalankan Aplikasi

### Prerequisites Sebelum Menjalankan

Pastikan semua ini sudah selesai sebelum menjalankan aplikasi:

- Instalasi backend dan frontend sudah selesai (lihat [Instalasi & Setup](#instalasi--setup))
- Virtual environment backend sudah diaktifkan (untuk run manual)
- File `.env` sudah dikonfigurasi dengan semua API keys yang diperlukan
- Internet stabil (diperlukan untuk koneksi ke Google APIs dan Supabase)
- Port `8000` (backend) dan `19000` (frontend) tidak digunakan oleh aplikasi lain

---

### Opsi 1: Menggunakan Root Scripts (Direkomendasikan)

Metode paling mudah - jalankan kedua server dengan satu perintah dari setiap terminal:

**Terminal 1 - Backend API:**

```bash
npm run backend
```

**Pada Terminal terpisah - Frontend App:**

```bash
npm run frontend
```

**Apa yang terjadi:**

- Backend akan start di `http://localhost:8000`
- Frontend akan start dengan Expo dan menampilkan QR code
- Hot reload otomatis ketika ada perubahan kode

---

### Opsi 2: Jalankan Secara Manual

Jika npm scripts tidak bekerja, jalankan secara manual:

#### A. Menjalankan Backend

```bash
# Buka terminal baru
cd backend

# Aktivasi virtual environment
# Windows:
.\trip-mind\Scripts\activate

# macOS/Linux:
source trip-mind/bin/activate

# Jalankan server
uvicorn app.main:app --reload
```

**Output yang diharapkan:**

```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

#### B. Menjalankan Frontend

```bash
# Buka terminal baru di folder root
cd frontend

# Jalankan Expo development server
npx expo start --lan
```

**Output yang diharapkan:**

```
› Metro waiting on exp://192.168.x.x:19000
› Scan the QR code above with Expo Go or your device camera
```

---

#### Mengakses Aplikasi

#### Backend API

Setelah backend running, akses di:

- **API Root**: [http://localhost:8000](http://localhost:8000)
- **Swagger UI (Interactive Docs)**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc (Alternative Docs)**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

**Testing Backend dengan Postman:**

1. Buka Postman
2. Buat request baru ke `http://localhost:8000/api/v1/...` (sesuaikan endpoint)
3. Pastikan headers include `Authorization: Bearer <token>` jika diperlukan

#### Frontend App

Setelah frontend running, pilih salah satu:

**Opsi A: Gunakan Expo Go (Rekomendasi Pemula)**

1. Download aplikasi **Expo Go** di Play Store / App Store
2. Buka Expo Go
3. Scan QR code yang muncul di terminal
4. Aplikasi akan loading dan terbuka otomatis

**Opsi B: Gunakan Android Emulator**

1. Buka Android Studio → Open Device Manager
2. Launch emulator Android
3. Di terminal frontend, tekan `a` lalu Enter
4. Aplikasi akan install dan run di emulator

**Opsi C: Gunakan iOS Simulator (macOS Only)**

1. Pastikan Xcode sudah terinstal
2. Di terminal frontend, tekan `i` lalu Enter
3. Simulator akan membuka aplikasi secara otomatis

---

#### Development Workflow

#### Hot Reload

Saat development, perubahan kode akan otomatis di-reload:

**Backend:**

- Ubah file di folder `/backend/app`
- Server akan auto-restart (tunggu 1-2 detik)

**Frontend:**

- Ubah file di folder `/frontend/app` atau `/frontend/components`
- Tekan `r` di terminal untuk hard reload
- Atau tekan `w` untuk watch mode

#### Debugging

**Backend - Print logs:**

```python
# Di app/main.py atau services
import logging
logger = logging.getLogger(__name__)
logger.info("Debug message here")
```

**Frontend - Console logs:**

```javascript
// Di app/ atau components/
console.log("Debug message here");
```

Lihat logs di terminal atau Expo dev tools.

---

#### Verifikasi Aplikasi Berjalan dengan Baik

Cek list ini untuk memastikan semuanya berjalan lancar:

**Backend:**

- Terminal backend menampilkan `Application startup complete`
- Swagger UI dapat diakses di http://localhost:8000/docs
- Tidak ada error merah di terminal backend

**Frontend:**

- Terminal frontend menampilkan QR code
- Expo Go (atau emulator) menampilkan splash screen aplikasi
- Tidak ada error merah di terminal frontend
- Aplikasi dapat di-navigate (jika sudah ada halaman)

---

#### Troubleshooting Common Issues

#### Port sudah digunakan

**Error:** `Address already in use`

**Solusi:**

```bash
# Windows - Cari proses yang menggunakan port 8000
netstat -ano | findstr :8000

# macOS/Linux
lsof -i :8000

# Kill proses (ganti PID dengan nomor proses)
kill -9 <PID>
```

#### Virtual environment tidak activate

**Error:** `uvicorn: command not found`

**Solusi:**

```bash
cd backend
# Windows:
.\trip-mind\Scripts\activate

# macOS/Linux:
source trip-mind/bin/activate

# Verify:
python --version  # Harus show Python dari venv, bukan sistem
```

#### Module not found error

**Error:** `ModuleNotFoundError: No module named 'fastapi'`

**Solusi:**

```bash
cd backend
pip install -r requirements.txt  # Reinstall dependencies
```

#### Expo QR code tidak muncul

**Solusi:**

- Pastikan internet stabil
- Coba `npx expo start --localhost` jika `--lan` tidak bekerja
- Bersihkan cache: `npm cache clean --force`

#### API tidak terhubung dari frontend

**Solusi:**

1. Pastikan backend running (cek http://localhost:8000/docs)
2. Cek file `.env` di frontend, pastikan base URL API benar
3. Untuk device fisik, gunakan IP lokal (bukan localhost): `http://192.168.x.x:8000`

---

### Terminal Harus Tetap Berjalan

**PENTING:** Jangan tutup atau stop terminal backend dan frontend selama development!

Jika ingin stop:

1. Tekan `Ctrl + C` di terminal masing-masing
2. Untuk jalankan lagi, ulangi langkah di atas

## Dokumentasi Lebih Lanjut

- **[Backend README](backend/README.md)** - Dokumentasi lengkap backend, API endpoints, dan struktur kode
- **[Frontend README](frontend/README.md)** - Dokumentasi lengkap frontend, komponen, dan fitur

## Kontribusi

Sebelum berkontribusi, pastikan untuk:

1. Membaca dokumentasi backend dan frontend masing-masing
2. Mengikuti konvensi kode yang sudah ditetapkan
3. Membuat branch baru untuk setiap fitur
4. Menulis test untuk kode baru

## Lisensi

ISC

---

**Selamat mengembangkan Trip-Mind!**
