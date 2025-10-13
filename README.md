# Personal Portfolio Website

Landing page portfolio pribadi yang dibangun dengan Laravel 11 dan Tailwind CSS, terinspirasi dari desain Laravel welcome page.

## Features

- 🎨 Modern & Responsive Design
- 🌓 Dark Mode Support
- ⚡ Fast & Optimized
- 📱 Mobile Friendly
- 🎭 Smooth Animations
- 📧 Contact Form
- 💼 Project Showcase
- 🛠️ Skills Section

## Tech Stack

- **Backend**: Laravel 11
- **Frontend**: Blade Templates
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **JavaScript**: Vanilla JS

## Installation

1. **Clone repository**
```bash
git clone <repository-url>
cd portfolio
```

2. **Install dependencies**
```bash
composer install
npm install
```

3. **Setup environment**
```bash
cp .env.example .env
php artisan key:generate
```

4. **Build assets**
```bash
npm run dev
# atau untuk production
npm run build
```

5. **Run server**
```bash
php artisan serve
```

Buka browser dan akses `http://localhost:8000`

## File Structure

```
portfolio/
├── app/
│   └── Http/
│       └── Controllers/
│           └── PortfolioController.php
├── resources/
│   ├── css/
│   │   └── app.css
│   ├── js/
│   │   └── app.js
│   └── views/
│       ├── layouts/
│       │   └── app.blade.php
│       ├── partials/
│       │   ├── header.blade.php
│       │   └── footer.blade.php
│       └── portfolio/
│           ├── index.blade.php
│           ├── components/
│           │   ├── project-card.blade.php
│           │   └── hero-graphic.blade.php
│           └── sections/
│               ├── hero.blade.php
│               ├── about.blade.php
│               ├── portfolio.blade.php
│               ├── skills.blade.php
│               └── contact.blade.php
├── routes/
│   └── web.php
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Customization

### 1. Update Profile Information

Edit `app/Http/Controllers/PortfolioController.php`:

```php
$profile = [
    'name' => 'Your Name',
    'title' => 'Your Title',
    'bio' => 'Your Bio',
];
```

### 2. Add Projects

Edit array `$portfolios` di controller:

```php
$portfolios = [
    [
        'title' => 'Project Name',
        'description' => 'Project Description',
        'tech' => ['Tech1', 'Tech2'],
        'link' => 'https://...',
    ],
];
```

### 3. Update Skills

Edit array `$skills` di controller:

```php
$skills = [
    'Category' => ['Skill1', 'Skill2'],
];
```

### 4. Customize Colors

Edit `tailwind.config.js`:

```javascript
colors: {
    primary: {
        light: '#f53003',
        dark: '#FF4433',
    },
}
```

### 5. Update Social Links

Edit `resources/views/partials/footer.blade.php` untuk mengubah link GitHub, LinkedIn, dan Email.

## Dark Mode

Dark mode diaktifkan secara otomatis berdasarkan preferensi sistem atau manual melalui toggle button yang ada di header.

## Deployment

### Production Build

```bash
npm run build
```

### Deploy ke Shared Hosting

1. Upload semua file ke server
2. Set document root ke folder `public`
3. Run `composer install --optimize-autoloader --no-dev`
4. Run `php artisan config:cache`
5. Run `php artisan route:cache`
6. Run `php artisan view:cache`

### Deploy ke VPS (dengan Nginx)

Contoh konfigurasi Nginx:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/portfolio/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

## Contributing

Pull requests are welcome! Untuk perubahan besar, silakan buka issue terlebih dahulu.

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Credits

Design inspired by Laravel Welcome Page
