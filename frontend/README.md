# Trip-Mind - Frontend (FE)

Selamat datang di repositori frontend **Trip-Mind**. Folder ini berisi seluruh logika antarmuka pengguna yang dibangun menggunakan **Expo SDK 54**. Dokumentasi ini dirancang agar tim FE dapat memahami _stack_ teknologi yang digunakan dan menjaga konsistensi kualitas sesuai standar proyek.

## Tech Stack & Dependencies

Berikut adalah daftar library utama yang telah diinstal. Anggota tim wajib memahami fungsi masing-masing untuk menjaga kualitas pengembangan:

### 1. Styling: NativeWind v5

Proyek ini menggunakan **NativeWind v5 (Nitroglycerine)** yang mendukung **React Compiler**.

- **Keunggulan**: Menghasilkan performa styling yang lebih cepat karena proses kompilasi yang lebih efisien.
- **Catatan Penting**: Gunakan komponen standar `Text` dan `View` dari `react-native` agar gaya Tailwind tidak ditimpa oleh logika internal komponen "Themed" bawaan Expo.

### 2. Navigasi: Expo Router

Menggunakan sistem **File-based Routing**.

- **Implementasi**: Seluruh alur navigasi aplikasi dikelola secara otomatis melalui struktur direktori di dalam folder `/app`.

### 3. Backend & Auth: Supabase

Layanan _backend-as-a-service_ utama untuk platform ini.

- **Fungsi**: Menangani autentikasi pengguna, manajemen profil, dan sinkronisasi database secara _real-time_.

### 4. Maps & Geolocation: React Native Maps & Expo Location

Fitur inti untuk visualisasi perjalanan:

- **react-native-maps**: Digunakan untuk menampilkan peta interaktif dan penanda (_marker_) destinasi.
- **expo-location**: Digunakan untuk manajemen izin GPS dan pengambilan koordinat akurat perangkat.

### 5. Security: Expo Secure Store

- **Fungsi**: Mengenkripsi dan menyimpan _auth token_ dari Supabase di tingkat sistem operasi (Keychain/Keystore).
- **Alasan**: Sesuai standar keamanan, data sensitif tidak diperbolehkan disimpan dalam bentuk teks mentah pada penyimpanan lokal biasa.

### 6. Komunikasi Data: Axios

- **Fungsi**: Digunakan untuk melakukan _request_ data ke API pihak ketiga, seperti layanan cuaca atau informasi publik lainnya.

### 7. UI Assets: @expo/vector-icons

- Library standar untuk penyediaan ikon antarmuka yang konsisten di seluruh aplikasi.

## Struktur Direktori Utama

- **/app**: Berisi file rute aplikasi (Expo Router).
- **/components**: Tempat penyimpanan komponen UI yang bersifat _reusable_.
- **/assets**: Media, font, dan ikon proyek.
- **/constants**: Pengaturan global seperti warna tema dan konfigurasi API.
- **global.css**: Titik masuk utama untuk konfigurasi Tailwind/NativeWind.

## Referensi Pembelajaran Tim

Harap pelajari dokumentasi resmi berikut sebelum mulai berkontribusi:

1. [NativeWind v5 Documentation](https://www.nativewind.dev)
2. [Expo Router Guide](https://docs.expo.dev/router/introduction/)
3. [React Native Maps API](https://github.com/react-native-maps/react-native-maps)
4. [Supabase Auth & Storage](https://supabase.com/docs/guides/auth/quickstarts/react-native)
5. [Expo Secure Store Security](https://docs.expo.dev/versions/latest/sdk/secure-store/)
