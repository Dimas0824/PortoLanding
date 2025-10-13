import './bootstrap';
import './hero-graphic.js';
import './portfolio.js';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",

    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#f53003',
                    dark: '#FF4433',
                },
                accent: {
                    light: '#F8B803',
                    dark: '#F8B803',
                },
            },
            animation: {
                'bounce': 'bounce 3s ease-in-out infinite',
                'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    plugins: [],
}
