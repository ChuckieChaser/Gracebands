import { motion } from 'framer-motion';
import { Heading } from '../../ui/heading/Heading';
import { Button } from '../../ui/button/Button';
import { useState } from 'react';

export const CartModal = ({ items, onClose, onRemove, clearCart }) => {
    // NEW: State to track the email input value
    const [email, setEmail] = useState('');

    // NEW: Function to handle form submission/checkout
    const handleCheckout = (event) => {
        // Stop the default browser form submission behavior
        event.preventDefault();

        // Basic Client-Side Validation Check
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            alert('❌ Please enter a valid email address before proceeding.');
            return;
        }

        const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

        clearCart();
        // Successful alert after passing validation
        alert(`🎉 Success! Checkout initiated for ₱${total}. Email: ${email}`);

        onClose();
        setEmail(''); // Reset email after successful checkout
    };

    const isCartEmpty = items.length === 0;

    return (
        <motion.div className="absolute inset-0 z-50 flex items-center justify-center bg-[#00000080]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} onClick={onClose}>
            <motion.section className="bg-surface flex h-fit w-140 flex-col rounded-lg shadow-lg" initial={{ y: '-100%' }} animate={{ y: 0 }} transition={{ duration: 0.3 }} onClick={(event) => event.stopPropagation()}>
                <Heading className="border-border border-b-2 px-8 py-4 text-3xl!" text="Cart" variant="secondary" />
                <section className="flex flex-col items-center justify-center gap-4 p-4">
                    {isCartEmpty ? (
                        <div className="flex h-40 flex-col items-center justify-center">
                            <p className="text-text-muted text-xl">🥺 You haven't added any items yet.</p>
                            <p className="mt-2 text-sm text-gray-500">Time to fill that cart!</p>
                        </div>
                    ) : (
                        items.map((item, index) => (
                            <div key={item.id || index} className="bg-background flex w-full items-center justify-between rounded-xl p-4">
                                <span>
                                    {item.name} (x{item.quantity})
                                </span>
                                <section className="flex items-center gap-4">
                                    <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                                    <Button className="text-sm!" text="X" variant="secondary" onClick={() => onRemove(item.id)} />
                                </section>
                            </div>
                        ))
                    )}
                </section>

                {!isCartEmpty && (
                    <form onSubmit={handleCheckout}>
                        <section className="border-border border-t-2 px-8 py-4">
                            <input className="bg-background border-border h-12 w-full rounded-lg border-2 p-4 outline-none" type="email" placeholder="Email" required name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </section>

                        <section className="border-border flex items-center justify-between border-t-2 px-8 py-4">
                            <Heading className="text-3xl!" text={`Total: ₱${items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}`} variant="primary" type="submit" />
                            <Button text="Checkout" variant="primary" />
                        </section>
                    </form>
                )}
            </motion.section>
        </motion.div>
    );
};
