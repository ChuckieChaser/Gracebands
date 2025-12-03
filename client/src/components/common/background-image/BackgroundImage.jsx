import { motion, useScroll, useTransform } from 'framer-motion';
import './BackgroundImage.css';

export const BackgroundImage = ({ ...rest }) => {
    const { scrollY } = useScroll();
    const zoom = useTransform(scrollY, [0, window.innerHeight], [1, 1.15], { clamp: true });

    return <motion.div className="background-image" style={{ scale: zoom }} {...rest} />;
};
