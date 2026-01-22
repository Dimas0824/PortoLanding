import { Head, usePage } from '@inertiajs/react';
import PortfolioApp from '../portfolio/PortfolioApp';
import { PortfolioItem, Profile, Skills } from '../portfolio/types';

type PortfolioPageProps = {
    profile: Profile;
    skills: Skills;
    portfolios: PortfolioItem[];
};

const Portfolio = () => {
    const { profile, skills, portfolios } = usePage<PortfolioPageProps>().props;

    const displayName = 'irsyad dimas';
    const pageTitle = `${displayName} · ${profile.title ?? 'Portfolio'}`;
    const description = profile.bio ?? `Portfolio of ${displayName}`;
    const canonical = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const ogImage = profile.images && profile.images.length > 0
        ? (profile.images[0].startsWith('http') ? profile.images[0] : (typeof window !== 'undefined' ? window.location.origin + profile.images[0] : profile.images[0]))
        : '';

    return (
        <>
            <Head title={pageTitle}>
                <meta name="description" content={description} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={currentUrl} />
                {ogImage && <meta property="og:image" content={ogImage} />}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={description} />
                {ogImage && <meta name="twitter:image" content={ogImage} />}
                <link rel="canonical" href={canonical} />
                {/* Performance hints: preload LCP image and preconnect to common origins */}
                {ogImage && <link rel="preload" as="image" href={ogImage} />}
                {/* Preconnect to common image hosts (Unsplash) and Google fonts */}
                {ogImage && ogImage.includes('images.unsplash.com') && <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />}
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                {/* JSON-LD structured data for Person and Portfolio */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "Person",
                                "name": displayName,
                                "description": description,
                                "url": currentUrl || canonical || (typeof window !== 'undefined' ? window.location.origin + '/' : ''),
                                ...(ogImage ? { image: ogImage } : {}),
                                ...(profile.contacts ? { sameAs: Object.values(profile.contacts) } : {})
                            },
                            {
                                "@type": "WebPage",
                                "name": pageTitle,
                                "description": description,
                                "url": currentUrl || canonical || (typeof window !== 'undefined' ? window.location.origin + '/' : ''),
                                "mainEntity": {
                                    "@type": "ItemList",
                                    "itemListElement": portfolios.map((p: PortfolioItem, i: number) => ({
                                        "@type": "ListItem",
                                        "position": i + 1,
                                        "url": p.link || (currentUrl || canonical)
                                    }))
                                }
                            }
                        ]
                    })}
                </script>
            </Head>
            <PortfolioApp profile={profile} skills={skills} portfolios={portfolios} />
        </>
    );
};

export default Portfolio;
