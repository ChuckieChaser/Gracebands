import { motion } from 'framer-motion';

export const HomeLayout = ({ isShopActive, children }) => {
    return (
        <motion.section className="absolute top-0 flex w-full flex-col overflow-hidden" initial={false} animate={{ opacity: isShopActive ? 0 : 1, pointerEvents: isShopActive ? 'none' : 'all', display: isShopActive ? 'none' : 'flex' }} transition={{ duration: 0.5 }}>
            {children}
        </motion.section>
    );
};
