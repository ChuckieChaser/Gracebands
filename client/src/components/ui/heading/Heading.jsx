import { motion } from 'framer-motion';
import './Heading.css';

export const Heading = ({ className, description = '', text, variant = 'default', ...rest }) => {
    return (
        <motion.h1 className={`heading ${className}`} {...rest}>
            {`${description} `}
            <span className={`heading-${variant}`}>{text}</span>
        </motion.h1>
    );
};
