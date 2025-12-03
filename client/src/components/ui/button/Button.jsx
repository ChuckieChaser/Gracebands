import { motion } from 'framer-motion';
import './Button.css';

export const Button = ({ className, text, variant = 'default', ...rest }) => {
    return (
        <motion.button className={`button button-${variant} ${className}`} {...rest}>
            <span>{text}</span>
        </motion.button>
    );
};
