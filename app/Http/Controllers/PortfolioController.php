<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PortfolioController extends Controller
{
    public function index()
    {
        $profile = [
            'name' => 'Muhammad Irsyad Dimas Abdillah',
            'title' => 'Backend Developer | Data Enthusiast | IoT & ML Enthusiast',
            'bio' => 'Mahasiswa Teknik Informatika di Politeknik Negeri Malang dengan fokus pada pengembangan backend, optimasi database, serta integrasi IoT dan Machine Learning.',
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
                'email' => '2341720088@student.polinema.ac.id',
                'instagram' => '@not.samiddd',
                'linkedin' => 'https://www.linkedin.com/in/muhammad-irsyad-dimas-abdillah-46424738a/',
                'github' => 'https://github.com/Dimas0824'
            ]
        ];

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

        return view('portfolio.index', compact('profile', 'skills', 'portfolios'));
    }
}
