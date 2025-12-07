import { motion } from 'framer-motion';

export const ShopLayout = ({ className, isShopActive, children }) => {
    return (
        <motion.section
            // Removed 'overflow-hidden' and changed 'h-dvh' to 'min-h-dvh'
            // to allow the content (including the new status bar) to extend
            // the full viewport height and scroll if necessary.
            className={`bg-background absolute top-0 flex min-h-dvh w-full flex-col items-center gap-12 px-12 pt-32 pb-12 ${className}`}
            initial={false}
            animate={{ opacity: isShopActive ? 1 : 0, pointerEvents: isShopActive ? 'all' : 'none', display: isShopActive ? 'flex' : 'none' }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.section>
    );
};
