import { useEffect, useRef, useState } from 'react';

export const useElementSize = () => {
    const ref = useRef(null);
    const [size, setSize] = useState({ height: 0, width: 0 });
    useEffect(() => {
        if (!ref.current) return;

        const handleResize = () => setSize({ height: ref.current.offsetHeight, width: ref.current.offsetWidth });
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return [ref, size];
};
