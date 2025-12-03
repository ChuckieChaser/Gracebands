import { motion } from 'framer-motion';
import { Heading } from '../../ui/heading/Heading';

export const TextCard = ({ className, heading, description, ...rest }) => {
    return (
        <motion.div className={`bg-surface flex h-full flex-col rounded-lg shadow-sm transition-all duration-300 hover:scale-105 ${className}`} {...rest}>
            <Heading className="border-border border-b-2 p-8 text-center text-5xl!" text={heading} variant="primary" />
            <section className="h-fit p-8">{description}</section>
        </motion.div>
    );
};
