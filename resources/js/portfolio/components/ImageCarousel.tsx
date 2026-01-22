import React, { useEffect, useState } from "react";

export type ImageCarouselProps = {
    images: string[];
    intervalMs?: number;
    className?: string;
    altPrefix?: string;
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, intervalMs = 4000, className = "", altPrefix = "Profile image" }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!images || images.length <= 1) return undefined;
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % images.length);
        }, intervalMs);
        return () => clearInterval(id);
    }, [images, intervalMs]);

    if (!images || images.length === 0) {
        return <div className={`w-full h-full bg-gray-200 ${className}`} />;
    }

    return (
        <div className={`w-full h-full relative overflow-hidden ${className}`} aria-live="polite">
            {images.map((src, i) => (
                <picture key={i} className="absolute inset-0 w-full h-full" style={{ top: 0, left: 0 }}>
                    {/\.webp(\?.*)?$/i.test(src) && <source srcSet={src} type="image/webp" />}
                    <img
                        src={src}
                        alt={`${altPrefix} ${i + 1}`}
                        loading="lazy"
                        decoding="async"
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                        width={1200}
                        height={800}
                        style={{ top: 0, left: 0 }}
                    />
                </picture>
            ))}
        </div>
    );
};

export default ImageCarousel;
