import { motion } from 'framer-motion';

export const ShopLayout = ({ className, isShopActive, children }) => {
    return (
        <motion.section
            className={`bg-background absolute top-0 flex h-fit w-full flex-col items-center gap-12 overflow-hidden px-12 pt-32 pb-12 ${className}`}
            initial={false}
            animate={{ opacity: isShopActive ? 1 : 0, pointerEvents: isShopActive ? 'all' : 'none', display: isShopActive ? 'flex' : 'none' }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.section>
    );
};
