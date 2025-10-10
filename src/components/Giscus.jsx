import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Giscus = ({ blogTitle }) => {
    const giscusRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        // Remove existing Giscus iframe if present
        if (giscusRef.current) {
            giscusRef.current.innerHTML = '';
        }

        // Create script element
        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.setAttribute('data-repo', 'soumyajiitdas/soumyajiitdas.github.io');
        script.setAttribute('data-repo-id', 'R_kgDOP0NgZg');
        script.setAttribute('data-category', 'Blog Comments');
        script.setAttribute('data-category-id', 'DIC_kwDOP0NgZs4CwfAW');
        script.setAttribute('data-mapping', 'specific');
        script.setAttribute('data-term', blogTitle || 'General Discussion');
        script.setAttribute('data-strict', '0');
        script.setAttribute('data-reactions-enabled', '1');
        script.setAttribute('data-emit-metadata', '0');
        script.setAttribute('data-input-position', 'bottom');
        script.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
        script.setAttribute('data-lang', 'en');
        script.setAttribute('crossorigin', 'anonymous');
        script.async = true;

        // Append script to the div
        if (giscusRef.current) {
            giscusRef.current.appendChild(script);
        }

        return () => {
            // Cleanup
            if (giscusRef.current) {
                giscusRef.current.innerHTML = '';
            }
        };
    }, [blogTitle, theme]);

    return (
        <div className="giscus-container">
            <div ref={giscusRef} />
        </div>
    );
};

export default Giscus;