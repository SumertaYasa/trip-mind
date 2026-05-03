# Trip-Mind - Backend (BE)

Selamat datang di repositori backend **Trip-Mind**. Folder ini merupakan otak dari aplikasi yang bertanggung jawab atas orkestrasi AI, perhitungan logistik perjalanan, dan manajemen data. Dibangun menggunakan **FastAPI**, repositori ini dirancang untuk performa tinggi dan skalabilitas sistem.

## Tech Stack & Dependencies

Berikut adalah daftar library utama yang digunakan. Anggota tim BE wajib memahami alur kerja _asynchronous_ pada library berikut:

### 1. Framework: FastAPI

Proyek ini menggunakan **FastAPI**, framework Python modern untuk membangun API dengan performa tinggi.

- **Fungsi**: Menangani _routing_, validasi data otomatis, dan dokumentasi API interaktif (Swagger).
- **Catatan Penting**: Manfaatkan fitur `async/await` untuk setiap operasi I/O (seperti panggil API Google atau database) agar server tidak _blocking_.

### 2. AI Orchestration: Google Vertex AI (Gemini)

Mesin utama yang menghasilkan jadwal perjalanan cerdas.

- **Fungsi**: Memproses data **Persona** (hobi/selera) dan **Konteks** (waktu/lokasi) menjadi _itinerary_ yang naratif dan logis.
- **Implementasi**: Menggunakan model `gemini-1.5-pro` untuk akurasi penalaran jadwal yang lebih baik.

### 3. Maps Platform: Google Maps SDK

- **Fungsi**: Digunakan untuk mendapatkan data _Distance Matrix_ (estimasi waktu tempuh antar spot) dan _Places Details_.
- **Alasan**: AI membutuhkan data jarak nyata di Bali agar jadwal yang disusun tidak mustahil dilakukan secara fisik.

### 4. Database & Auth: Supabase Python SDK

- **Fungsi**: Menangani operasi CRUD pada tabel profil dan riwayat perjalanan, serta memvalidasi token JWT dari frontend.
- **Catatan**: Gunakan `service_role_key` dengan bijak hanya pada operasi tingkat admin di backend.

### 5. Data Validation: Pydantic v2

- **Fungsi**: Memastikan setiap data yang masuk dari frontend (request body) sesuai dengan skema yang ditentukan.
- **Keunggulan**: Memberikan pesan error yang jelas jika format data (seperti jam atau koordinat) tidak sesuai.

### 6. Web Server: Uvicorn [Standard]

- **Fungsi**: Server ASGI yang menjalankan aplikasi FastAPI.
- **Keunggulan**: Dilengkapi dengan `uvloop` untuk eksekusi _event loop_ yang jauh lebih cepat dibandingkan server Python standar.

## Struktur Direktori Utama

- **/app/api**: Tempat pendefinisian _endpoint_ API (v1).
- **/app/core**: Konfigurasi global, keamanan, dan pengaturan `.env`.
- **/app/schemas**: Definisi model Pydantic untuk request dan response.
- **/app/services**: Logika khusus untuk integrasi pihak ketiga (Google Maps, Gemini).
- **/trip-mind**: Folder _Virtual Environment_ lokal (Python Venv).

## Referensi Pembelajaran Tim

Harap pelajari dokumentasi resmi berikut sebelum mulai melakukan _push_ kode:

1. [FastAPI Documentation](https://fastapi.tiangolo.com)
2. [Google Vertex AI Python Guide](https://cloud.google.com/vertex-ai/docs/python-sdk/reference)
3. [Pydantic v2 Models](https://docs.pydantic.dev/latest/)
4. [Supabase Python Database Guide](https://supabase.com/docs/reference/python/introduction)
5. [Uvicorn Deployment Settings](https://www.uvicorn.org)