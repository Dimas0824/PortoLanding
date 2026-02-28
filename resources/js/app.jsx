import './bootstrap';

import { createRoot } from 'react-dom/client';
import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = document.getElementsByTagName('title')[0]?.innerText || 'Personal Portfolio';

createInertiaApp({
    title: (title) => (title ? `${title} · ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx')
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);

        const sendPageView = (url) => {
            if (window.gtag) {
                window.gtag('event', 'page_view', {
                    send_to: 'G-V8REYLFVXT',
                    page_path: url,
                });
            }
        };

        sendPageView(props.initialPage.url);
        router.on('navigate', (event) => sendPageView(event.detail.page.url));
    },
});
