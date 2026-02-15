<!DOCTYPE html>
<html lang="en" class="transition-colors duration-300">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title inertia>Personal Portfolio</title>
    <script>
        // Prevent flash of unstyled content by rehydrating the theme before CSS loads
        (function() {
            const theme = localStorage.getItem('theme') || 'light';
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        })();
    </script>
    @if (app()->isLocal())
        @viteReactRefresh
    @endif
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @if (!app()->isLocal())
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-V8REYLFVXT"></script>
        <script>
            window.dataLayer = window.dataLayer || [];

            function gtag() {
                dataLayer.push(arguments);
            }
            gtag('js', new Date());

            gtag('config', 'G-V8REYLFVXT');
        </script>
    @endif
    @inertiaHead
</head>

<body
    class="bg-[#FDFDFC] dark:bg-[#0a0a0a] text-[#1b1b18] dark:text-[#EDEDEC] min-h-screen transition-colors duration-300">
    @inertia
</body>

</html>
