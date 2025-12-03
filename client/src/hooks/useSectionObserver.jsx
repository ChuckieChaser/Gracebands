import { useEffect } from 'react';

export const useSectionObserver = (setActiveLink) => {
    useEffect(() => {
        const sections = document.querySelectorAll('[data-section]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.getAttribute('data-section');
                        setActiveLink(sectionId);
                    }
                });
            },
            { threshold: 0.5 }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, [setActiveLink]);
};
