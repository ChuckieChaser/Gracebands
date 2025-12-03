import { useElementSize } from '../../../hooks/useElementSize';
import { useScrollTrigger } from '../../../hooks/useScrollTrigger';
import { motion } from 'framer-motion';

export const AppHeader = ({ children,...rest }) => {
    const [ref, size] = useElementSize();
    const isScrolled = useScrollTrigger(window.innerHeight - size.height);

    return (
        <motion.header ref={ref} className={`fixed top-0 z-10 flex w-full px-8 py-4 transition-all duration-300 ${isScrolled ? 'bg-surface shadow-sm' : 'bg-transparent'}`} {...rest}>
            {children}
        </motion.header>
    );
};
