<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Services\SeoService;

class PortfolioController extends Controller
{
    public function index()
    {
        $profile = [
            'name' => 'Muhammad Irsyad Dimas Abdillah',
            'title' => 'Fullstack Developer | Data Enthusiast | IoT & ML Enthusiast',
            'bio' => 'Mahasiswa Teknik Informatika di Politeknik Negeri Malang dengan fokus pada pengembangan Web, optimasi database, serta integrasi IoT dan Machine Learning.',
            'education' => 'Teknik Informatika - Politeknik Negeri Malang',
            'passion' => [
                'Backend Development',
                'Database Optimization',
                'IoT Integration',
                'Machine Learning',
                'Web Development',
                'Mobile App Development'
            ],
            'philosophy' => 'First, solve the problem. Then, write the code.',
            'contacts' => [
                'email' => 'dimassmadapas@gmail.com',
                'instagram' => 'https://www.instagram.com/not.samiddd?igsh=dnIwZ3gyN2dhZjV3',
                'linkedin' => 'https://www.linkedin.com/in/muhammad-irsyad-dimas-abdillah-46424738a/',
                'github' => 'https://github.com/Dimas0824'
            ]
        ];

        // Auto-discover profile images from storage/app/public/img
        // We serve them via a Laravel route to avoid symlink issues on shared hosting.
        $images = [];
        $imgDir = storage_path('app/public/img');
        if (is_dir($imgDir)) {
            foreach (glob($imgDir . '/*.{jpg,jpeg,png,webp}', GLOB_BRACE) as $file) {
                // URL-encode the filename to avoid issues with spaces or special chars
                $encoded = rawurlencode(basename($file));
                $images[] = '/media/profile/' . $encoded;
            }
        }

        if (!empty($images)) {
            $profile['images'] = $images;
        }

        $skills = [
            'Languages & Frameworks' => [
                'PHP',
                'Python',
                'JavaScript',
                'Java',
                'Dart',
                'Laravel',
                'TensorFlow',
                'Keras',
                'Flutter'
            ],
            'Database Management' => [
                'MySQL',
                'SQL Server'
            ],
            'Machine Learning & Data Science' => [
                'TensorFlow',
                'Keras',
                'Scikit-learn',
                'PyTorch',
                'NumPy',
                'Pandas',
                'Matplotlib',
                'Seaborn',
                'Plotly',
                'Optuna',
                'SciPy',
                'Statsmodels'
            ],
            'Tools & Platforms' => [
                'Git',
                'GitHub',
                'VS Code',
                'Postman',
                'Arduino',
                'Kaggle',
                'Google Colab'
            ],
        ];

        $portfolios = [
            [
                'title' => 'MAGNET — Sistem Informasi Magang',
                'description' => 'Sistem informasi manajemen magang berbasis web yang dilengkapi algoritma rekomendasi cerdas untuk penempatan mahasiswa secara optimal. '
                    . 'Mengimplementasikan metode ROC dan MULTIMOORA untuk optimasi multi-kriteria, sehingga proses pemetaan peserta magang menjadi lebih objektif dan efisien.',
                'tech' => ['Laravel 10', 'Livewire', 'Flux UI', 'Livewire Volt', 'MySQL'],
                'link' => 'https://github.com/Dimas0824/MAGNET-Magang-Network-And-Tracking',
            ],
            [
                'title' => 'IHSG LSTM Forecasting',
                'description' => 'Model deep learning time series forecasting untuk memprediksi pergerakan Indeks Harga Saham Gabungan (IHSG) menggunakan arsitektur LSTM. '
                    . 'Model dioptimalkan hingga mencapai akurasi tinggi dengan nilai MAPE 1.33%, dilengkapi pipeline preprocessing, visualisasi hasil, dan evaluasi performa.',
                'tech' => ['Python', 'TensorFlow', 'Keras'],
                'link' => 'https://github.com/Dimas0824/IHSG-LSTM_Forecasting',
            ],
            [
                'title' => 'Streamlytics Netflix — User Segmentation',
                'description' => 'Proyek unsupervised machine learning untuk menganalisis dan mengelompokkan perilaku pengguna Netflix berdasarkan data tontonan dan preferensi genre. '
                    . 'Menggunakan algoritma K-Means dan DBSCAN untuk menemukan pola tersembunyi yang mendukung strategi rekomendasi konten.',
                'tech' => ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
                'link' => 'https://github.com/Dimas0824/streamlytics-netflix',
            ],
            [
                'title' => 'DiscipLink — Sistem Informasi Tata Tertib',
                'description' => 'Sistem informasi berbasis web untuk digitalisasi tata tertib dan regulasi kampus di Politeknik Negeri Malang. '
                    . 'Berperan sebagai Database Engineer & Administrator (merancang dan mengelola skema database), Backend Developer (secondary), serta Project Manager '
                    . 'yang memastikan alur kolaborasi dan integrasi fitur berjalan efektif.',
                'tech' => ['PHP Native', 'MySQL', 'Git', 'Project Management'],
                'link' => 'https://github.com/VarizkyNaldiba/TataTertibMhs',
            ],
            [
                'title' => 'DiscipLink V2 — Secure MVC Refactor',
                'description' => 'Refactor arsitektur DiscipLink dengan pola MVC + Request Handler + Central Router untuk memisahkan alur halaman, aksi, dan akses data. '
                    . 'Fokus pada hardening keamanan melalui tokenisasi ID sensitif, token crypto dengan session binding, idle session timeout, upload/download whitelist, '
                    . 'serta standarisasi feedback UI, error handling HTML/JSON, dan SEO header management.',
                'tech' => ['PHP Native', 'PDO', 'MySQL', 'MVC', 'Vanilla JS', 'Security'],
                'link' => 'https://github.com/Dimas0824/TataTertibMhsV2.git',
            ],
            [
                'title' => 'Oi!Kerjain — Daily Task Scheduler',
                'description' => 'Aplikasi task scheduler harian dengan UI neuromorphic untuk membantu pengguna tetap terorganisir dan konsisten menyelesaikan tugas. '
                    . 'Menyediakan manajemen tugas cepat (work/personal, prioritas, repeat), history 14 hari dengan filter mingguan/custom range, '
                    . 'serta local notification dengan escalation reminder dan quick actions seperti DONE dan SNOOZE.',
                'tech' => ['Flutter', 'Dart', 'Local Notification', 'Task Management', 'Neuromorphic UI'],
                'link' => 'https://github.com/Dimas0824/Oi-Kerjain.git',
            ],
            [
                'title' => 'Sistem Kasir Cafe (CASS)',
                'description' => 'Aplikasi Point of Sale (POS) berbasis Command-Line Interface (CLI) untuk membantu operasional kafe, '
                    . 'meliputi manajemen menu, stok inventori, dan laporan penjualan secara terstruktur.',
                'tech' => ['Java', 'CLI'],
                'link' => 'https://github.com/HaikalMuhammadRafli/Sistem-Kasir_kel01',
            ],
            [
                'title' => 'Simple TikTok Post Text Mining',
                'description' => 'Analisis sentimen publik terhadap kebijakan pemerintah Indonesia mengenai diskon listrik 50% menggunakan pendekatan lexicon-based sentiment analysis. '
                    . 'Melibatkan preprocessing teks (tokenization, stemming, stopword removal) dan representasi fitur TF-IDF untuk klasifikasi opini positif dan negatif.',
                'tech' => ['Python', 'Scikit-learn', 'NLTK', 'TF-IDF', 'WordCloud'],
                'link' => 'https://github.com/FarrelAD/Simple-TikTok-Post-Text-Mining',
            ],
            [
                'title' => 'Uninformed Search Algorithms Comparison',
                'description' => 'Eksperimen implementasi dan analisis performa berbagai algoritma pencarian uninformed seperti BFS, DFS, UCS, dan DLS. '
                    . 'Berfokus pada evaluasi efisiensi dan kompleksitas waktu untuk menemukan solusi pada ruang pencarian tanpa heuristik.',
                'tech' => ['Python', 'Algorithms', 'BFS', 'DFS', 'UCS', 'DLS'],
                'link' => 'https://github.com/FarrelAD/Uninformed-Search-Algorithms-Comparison',
            ],
        ];

        // Build SEO meta using SeoService
        $seo = new SeoService();
        $meta = $seo->meta([
            'title' => 'irsyad dimas' . ' · ' . ($profile['title'] ?? 'Portfolio'),
            'description' => $profile['bio'] ?? null,
            'og' => [
                'image' => $profile['images'][0] ?? null,
            ],
            'canonical' => rtrim(config('app.url', url('/')), '/') . '/',
        ]);

        $jsonLd = $seo->jsonLd([
            'name' => 'irsyad dimas',
            'description' => $profile['bio'] ?? null,
            'url' => rtrim(config('app.url', url('/')), '/') . '/',
            'image' => $profile['images'][0] ?? null,
            'sameAs' => array_values($profile['contacts'] ?? []),
        ]);

        return Inertia::render('Portfolio', array_merge(compact('profile', 'skills', 'portfolios'), [
            'seo' => [
                'meta' => $meta,
                'jsonLd' => $jsonLd,
            ],
        ]));
    }

    public function profileImage(string $filename)
    {
        $filename = basename(rawurldecode($filename));
        $path = storage_path('app/public/img/' . $filename);

        if (!is_file($path)) {
            abort(404);
        }

        return response()->file($path, [
            'Cache-Control' => 'public, max-age=604800',
        ]);
    }
}
