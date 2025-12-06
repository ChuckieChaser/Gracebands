import { motion } from 'framer-motion';
import { Heading } from '../../ui/heading/Heading';
import { Button } from '../../ui/button/Button';

export const ItemCard = ({ itemName, itemSrc, itemCost, addToCart }) => {
    return (
        <motion.div className="bg-surface flex h-fit w-80 flex-col gap-4 rounded-lg p-4 shadow-lg">
            <img className="h-full w-full rounded-md object-cover" src={itemSrc} alt={`${itemName} image`} />

            <section className="flex items-center justify-between">
                <Heading text={itemName} />
                <span className="text-secondary">{itemCost}</span>
            </section>

            <Button className="mt-4 w-full" text="Add to Cart" variant="primary" onClick={addToCart} />
        </motion.div>
    );
};
