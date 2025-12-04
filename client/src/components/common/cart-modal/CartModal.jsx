import { motion } from 'framer-motion';
import { Heading } from '../../ui/heading/Heading';
import { Button } from '../../ui/button/Button';

export const CartModal = ({ items, onClose }) => {
    return (
        <motion.div className="absolute inset-0 z-50 flex items-center justify-center bg-[#00000080]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} onClick={onClose}>
            <motion.section className="bg-surface flex h-86 w-140 flex-col rounded-lg shadow-lg" initial={{ y: '-100%' }} animate={{ y: 0 }} transition={{ duration: 0.3, delay: 0.3 }} onClick={(event) => event.stopPropagation()}>
                <Heading className="border-border border-b-2 px-8 py-4 text-3xl!" text="Cart" variant="secondary" />
                <section className="flex flex-col items-center justify-center gap-4 p-4">
                    {items &&
                        items.map((item, index) => (
                            <div key={item.id || index} className="bg-background flex w-full items-center justify-between rounded-xl p-4">
                                <span>
                                    {item.name} ({item.quantity})
                                </span>
                                <section className="flex items-center gap-4">
                                    <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                                    <Button className="text-sm!" text="X" variant="secondary" />
                                </section>
                            </div>
                        ))}
                </section>

                <section className="border-border border-t-2 px-8 py-4">
                    <Heading className="text-3xl!" text={`Total: ₱${items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}`} variant="primary" />
                    <Button text="Checkout" variant="animated" />
                </section>
            </motion.section>
        </motion.div>
    );
};
