import { motion } from 'framer-motion';

import { Heading } from '../../ui/heading/Heading';
import { Button } from '../../ui/button/Button';

export const HeroSection = () => {
    return (
        <div className="absolute top-1/2 left-1/6 flex w-lg -translate-y-1/2 flex-col gap-4">
            <section>
                <Heading className="text-5xl!" description="It's not just an" text="ACCESSORY" variant="secondary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 1 }}></Heading>
                <Heading className="text-5xl!" description=", but also your" text="IDENTITY" variant="secondary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 3 }}></Heading>
            </section>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 5 }}>
                Forget the mundane definition of an accessory. These are the artifacts of your journey, the tangible reflections of your ambition, creativity, and unique worldview.
            </motion.p>

            <Button className="mt-4 h-18 w-54 text-lg" text="Shop Now" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 5 }} />
        </div>
    );
};
