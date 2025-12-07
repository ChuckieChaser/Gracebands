import { motion } from 'framer-motion';
import { Heading } from '../../ui/heading/Heading';
import { Button } from '../../ui/button/Button';
import { useState } from 'react';

// --- COMPONENTS (Unchanged) ---
const PaymentOption = ({ name, icon, isSelected, onSelect }) => (
    <div className={`flex cursor-pointer items-center gap-2 rounded-lg border-2 p-3 transition-all duration-200 ${isSelected ? 'bg-primary border-primary text-white shadow-md' : 'bg-background text-text-default border-border hover:border-primary-light hover:bg-surface-light'}`} onClick={onSelect}>
        <span className="text-xl">{icon}</span>
        <span className="text-sm font-medium">{name}</span>
    </div>
);

const OrderStatus = ({ total }) => (
    <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Order Status 📝</h3>
        <p className="text-sm">
            **Items in Cart:** <span className="text-primary font-medium">Ready for Checkout</span>
        </p>
        <p className="text-text-muted text-sm">**Estimated Tax:** ₱{(total * 0.12).toFixed(2)}</p>
    </div>
);

// CRITICAL: Added handleCheckout prop
export const CartModal = ({ items, onClose, onRemove, clearCart, handleCheckout }) => {
    // State (Unchanged)
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [selectedPayment, setSelectedPayment] = useState('');

    const paymentOptions = [
        { id: 'cash', name: 'Cash on Delivery', icon: '💵' },
        { id: 'gcash', name: 'GCash', icon: '📱' },
    ];

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const formattedTotal = total.toFixed(2);
    const isCartEmpty = items.length === 0;

    const isFormComplete = email.trim() !== '' && address.trim() !== '' && selectedPayment !== '';

    // UPDATED: Now calls the handleCheckout prop
    const handleLocalCheckout = () => {
        // We rely on the disabled state of the button and the validation in App.jsx
        if (!isFormComplete) {
            alert('🛑 Please fill out all required fields.');
            return;
        }

        // Call the parent function and pass the local state data
        const success = handleCheckout(email, address, selectedPayment);

        // If the prop function returned true (success), reset local form state
        if (success) {
            // Reset local form fields
            setEmail('');
            setAddress('');
            setSelectedPayment('');
        }
    };

    return (
        <motion.div className="absolute inset-0 z-50 flex items-center justify-center bg-[#00000080]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} onClick={onClose}>
            {/* 💡 CHANGE 1: Swapped 'h-[500px]' for 'max-h-[85vh]' to allow height to fit content, but constrain it to the screen. */}
            <div className={`flex gap-4 p-4 ${isCartEmpty ? 'h-fit w-140' : 'h-fit max-h-[85vh] w-[75rem] max-w-7xl'}`} onClick={(event) => event.stopPropagation()}>
                {/* 1. Cart Items Column (Left) */}
                <motion.section className={`bg-surface flex ${isCartEmpty ? 'h-fit w-full' : 'max-h-full w-1/2'} flex-col rounded-lg shadow-xl`} initial={{ x: '-100%' }} animate={{ x: 0 }} transition={{ duration: 0.3 }}>
                    <Heading className="border-border border-b-2 px-8 py-4 text-3xl!" text="Shopping Cart" variant="secondary" />
                    {/* 💡 CHANGE 2: Ensures the content area (items) fills the available space and scrolls */}
                    <section className="flex flex-grow flex-col items-center justify-start gap-4 overflow-y-auto p-4">
                        {isCartEmpty ? (
                            <div className="flex h-full flex-col items-center justify-center">
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

                    {/* Checkout button moved inside the cart container, below the items list */}
                    {!isCartEmpty && (
                        <section className="border-border flex items-center justify-between border-t-2 px-8 py-4">
                            <Heading className="text-3xl!" text={`Total: ₱${formattedTotal}`} variant="primary" />
                            {/* CRITICAL FIX: The button now calls handleLocalCheckout */}
                            <Button text="Pay & Checkout" variant={isFormComplete ? 'primary' : 'secondary'} onClick={handleLocalCheckout} disabled={!isFormComplete} className={`${!isFormComplete ? 'cursor-not-allowed opacity-50' : ''} transition-opacity`} />
                        </section>
                    )}
                </motion.section>

                {/* 2. Billing/Checkout Summary Column (Right) */}
                {!isCartEmpty && (
                    <motion.div
                        // 💡 CHANGE 3: Changed 'h-full' to 'max-h-full' to match the height of the left column without causing overflow
                        className="bg-surface flex max-h-full w-1/2 flex-col rounded-lg shadow-xl"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Heading className="border-border border-b-2 px-8 py-4 text-3xl!" text="Checkout Details" variant="secondary" />

                        <section className="flex h-full flex-col">
                            {/* 💡 CHANGE 4: Added 'overflow-y-auto' to the main input section to allow this side to scroll if inputs exceed available space. */}
                            <section className="flex flex-grow flex-col gap-6 overflow-y-auto p-6">
                                {/* All Inputs (Email, Address, Payment Selection) are inside this scrollable section */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email-input" className="text-lg font-semibold">
                                        1. Receipt Email
                                    </label>
                                    <input
                                        id="email-input"
                                        className="bg-background border-border focus:border-primary h-12 w-full rounded-lg border-2 p-4 transition-colors outline-none"
                                        type="email"
                                        placeholder="Enter your email for receipt"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <hr className="border-border border-t" />

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="address-input" className="text-lg font-semibold">
                                        2. Shipping Address
                                    </label>
                                    <textarea
                                        id="address-input"
                                        className="bg-background border-border focus:border-primary h-24 w-full resize-none rounded-lg border-2 p-4 transition-colors outline-none"
                                        placeholder="Street Address, City, Zip/Postal Code"
                                        required
                                        name="address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>

                                <hr className="border-border border-t" />

                                <div className="flex flex-col gap-3">
                                    <h3 className="text-lg font-semibold">3. Select Payment Option</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {paymentOptions.map((option) => (
                                            <PaymentOption key={option.id} name={option.name} icon={option.icon} isSelected={selectedPayment === option.id} onSelect={() => setSelectedPayment(option.id)} />
                                        ))}
                                    </div>
                                    {selectedPayment && <p className="mt-1 text-sm text-green-600">Selected: **{paymentOptions.find((opt) => opt.id === selectedPayment)?.name}**</p>}
                                </div>

                                <hr className="border-border border-t" />

                                {/* 🚀 Status/Order Summary */}
                                <OrderStatus total={total} />
                            </section>

                            {/* Empty section to ensure flex layout works correctly */}
                            <section className="mt-auto"></section>
                        </section>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};
