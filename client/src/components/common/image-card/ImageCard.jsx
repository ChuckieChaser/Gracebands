import { motion } from 'framer-motion';
import React from 'react';

export const ImageCard = ({ className, src, description, end = false, ...rest }) => {
    return (
        <motion.div className={`hover:border-primary flex h-full items-center justify-center gap-16 rounded-lg border-2 border-transparent bg-transparent px-16 py-8 transition-all duration-300 hover:scale-105 hover:shadow-sm ${className}`} {...rest}>
            {end && (
                <React.Fragment>
                    <span className="px-16">{description}</span>
                    <img className="h-60 w-60" src={src} alt={`${src} image`} />
                </React.Fragment>
            )}

            {!end && (
                <React.Fragment>
                    <img className="h-60 w-60" src={src} alt={`${src} image`} />
                    <span className="px-16">{description}</span>
                </React.Fragment>
            )}
        </motion.div>
    );
};
