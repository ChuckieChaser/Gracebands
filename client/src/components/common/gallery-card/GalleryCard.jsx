import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import placeholder from '../../../assets/placeholder.png';
import react from '../../../assets/react.svg';
import vite from '/vite.svg';

export const GalleryCard = ({ images, className, ...rest }) => {
    const GalleryColumn = ({ images, direction = 'up', duration = 20, ease = 'linear', repeat = Infinity, repeatType = 'loop' }) => {
        const columnRef = useRef(null);
        const [height, setHeight] = useState(0);
        useEffect(() => {
            if (columnRef.current) {
                const totalHeight = columnRef.current.clientHeight;
                setHeight(totalHeight / 2);
            }
        }, [images]);

        const scrollTarget = -height;
        const scrollVariant = {
            initial: { y: 0 },
            scroll: {
                y: scrollTarget,
                transition: { duration, ease, repeat, repeatType },
            },
        };

        const rotationStyle = direction === 'down' ? { transform: 'rotate(180deg)', direction: 'rtl' } : {};

        const allImages = [...images, ...images];
        return (
            <div className="h-136 w-40 overflow-hidden" style={rotationStyle}>
                <motion.div ref={columnRef} variants={scrollVariant} initial="initial" animate="scroll">
                    {allImages.map((image, index) => (
                        <img key={index} className="mb-8 block w-full transform object-cover opacity-50 transition-all duration-300 hover:scale-105 hover:opacity-100" style={direction === 'down' ? { transform: 'rotate(180deg)' } : {}} src={image} alt={`Gallery Image ${index}`} />
                    ))}
                </motion.div>
            </div>
        );
    };

    return (
        <motion.div className={`bg-surface flex items-center justify-center gap-8 rounded-lg p-4 shadow-sm`} {...rest}>
            <GalleryColumn images={images} duration={33} />
            <GalleryColumn images={images} direction="down" duration={26} />
            <GalleryColumn images={images} duration={49} />
        </motion.div>
    );
};
