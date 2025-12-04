import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { AppHeader } from './components/common/app-header/AppHeader';
import { HomeLayout } from './layouts/HomeLayout';
import { ShopLayout } from './layouts/ShopLayout';

import { BackgroundImage } from './components/common/background-image/BackgroundImage';
import { Heading } from './components/ui/heading/Heading';
import { GalleryCard } from './components/common/gallery-card/GalleryCard';
import { HeroSection } from './components/common/hero-section/HeroSection';
import { ImageCard } from './components/common/image-card/ImageCard';
import { ItemCard } from './components/common/item-card/ItemCard';
import { CartModal } from './components/common/cart-modal/CartModal';
import { TextCard } from './components/common/text-card/TextCard';

import { Button } from './components/ui/button/Button';

import { useSectionObserver } from './hooks/useSectionObserver';

import placeholder from './assets/placeholder.png';

export const App = () => {
    const navigationLink = ['Home', 'Products', 'About', 'Team', 'Shop'];

    const [isShopActive, setIsShopActive] = useState(false);
    const [activeLink, setActiveLink] = useState('Home');

    const handleNavigationClick = (event, link) => {
        event.preventDefault();

        if (link === 'Shop') {
            setIsShopActive(true);
            setActiveLink('Shop');
            return;
        }

        if (isShopActive) setIsShopActive(false);

        const section = document.getElementById(link.toLowerCase());
        if (!section) return;

        setTimeout(() => section.scrollIntoView(), isShopActive ? 100 : 0);
        setActiveLink(link);
    };

    useSectionObserver(setActiveLink);
    return (
        <>
            <BackgroundImage initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.3 }} />

            {/* Why [delay: 4.8]? I don't freakin' know */}
            <AppHeader className={isShopActive ? 'bg-surface' : ''} initial={{ opacity: 0, y: -80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
                <section className="flex flex-1 items-center gap-2">
                    <img className="h-12 w-12 rounded-full" src={placeholder} alt="Company Logo" />
                    <Heading text="GRACEBANDS" variant="animated" />
                </section>

                <section className="flex items-stretch gap-8">
                    {navigationLink.map((link, index, list) => (
                        <React.Fragment key={index}>
                            {index === list.length - 1 && <hr className="border-border h-full rounded-full border-2" />}

                            <a className={`border-2 border-transparent px-4 py-2 transition-all duration-300 ${activeLink === link ? 'border-b-text cursor-default' : 'hover:text-secondary'}`} href={`#${link.toLowerCase()}`} onClick={(event) => handleNavigationClick(event, link)}>
                                {link}
                            </a>
                        </React.Fragment>
                    ))}
                </section>

                <section className="flex flex-1 items-center justify-end gap-4">
                    <img className="h-8 w-8 rounded-full" src={placeholder} alt="Company Logo" />
                    <Button text="Contact Us" variant="cta" />
                </section>
            </AppHeader>

            <HomeLayout isShopActive={isShopActive}>
                <div id="home" className="relative h-dvh" data-section="Home">
                    <HeroSection setIsShopActive={setIsShopActive} setActiveLink={setActiveLink} />
                </div>

                <div id="products" className="bg-background flex h-fit flex-col items-center justify-center" data-section="Products">
                    <Heading className="border-text w-full border-y-2 p-8 text-center text-5xl!" text="✦ OUR PRODUCTS ✦" variant="animated" />

                    <section className="flex items-center justify-center gap-30 p-16">
                        <GalleryCard initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }} />

                        <motion.div className="flex h-152 w-138 flex-col" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
                            <section className="hover:bg-secondary flex flex-1 items-center p-8 transition-all duration-300 hover:pl-16">
                                <Heading className="text-6xl!" text="HANDMADE" />
                            </section>
                            <section className="hover:bg-text flex flex-1 items-center p-8 transition-all duration-300 hover:pl-16">
                                <Heading className="text-6xl!" text="AFFORDABLE" variant="primary" />
                            </section>
                            <section className="hover:bg-primary flex flex-1 items-center p-8 transition-all duration-300 hover:pl-16">
                                <Heading className="text-6xl!" text="SUSTAINABLE" variant="secondary" />
                            </section>
                        </motion.div>
                    </section>
                </div>

                <div id="about" className="bg-background flex h-fit flex-col gap-16" data-section="About">
                    <Heading className="border-text w-full border-y-2 p-8 text-center text-5xl!" text="✦ ABOUT US ✦" variant="animated" />

                    <section className="grid-rows-[1fr, 20rem] mb-16 grid grid-cols-2 items-center justify-center gap-16 px-32">
                        <TextCard
                            className="col-span-2 row-span-1"
                            heading="Nature of Business"
                            description={
                                <>
                                    GraceBands operates as an integrated small-scale business with a dual nature, encompassing both Manufacturing and Trading. In the context of a student requirement, our manufacturing component involves the group members personally designing, cutting, sewing, and
                                    assembling all headbands in small batches, largely utilizing basic home-based equipment. This focus on handmade production ensures we maintain a high standard of quality for our initial product line while keeping overhead costs minimal. The Trading aspect involves
                                    the direct retail sale of these finished goods to the end consumer.
                                    <br />
                                    <br />
                                    Our primary sales channels will be confined to direct person-to-person sales within the university campus, leveraging social media groups for orders, and participating in any student bazaars or events organized by the college department. This direct-sales model is
                                    efficient and best suited for our limited logistics and academic time frame.
                                </>
                            }
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                        />

                        <TextCard
                            className="col-span-1 row-span-1"
                            heading="Vision"
                            description="The firm's Vision is to successfully complete and manage a profitable, small-scale student enterprise that satisfies all academic requirements, demonstrating practical competency in product development, market execution, and financial accountability within the required semester period."
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                        />

                        <TextCard
                            className="col-span-1 col-start-2 row-span-1"
                            heading="Misson"
                            description="The Mission of GraceBands is to efficiently produce and sell exquisitely crafted, comfortable, and durable headbands that offer our fellow students and local community members a stylish, high-quality hair accessory option, while ensuring the entire project is financially sustainable and a valuable learning experience for every partner."
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                        />

                        <ImageCard
                            className="col-span-2 row-span-1"
                            src={placeholder}
                            description="GraceBands offers stylish, durable headbands that combine minimalistic flair with eye-catching designs, delivering high-quality, custom-made pieces that let you express your personality effortlessly during summer adventures."
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                        />

                        <ImageCard
                            className="col-span-2 row-span-1"
                            src={placeholder}
                            description="GraceBands are handmade headbands that combine comfort with contemporary style, offering a rotating selection of bold and trendy fabrics. Perfect for everyday wear or summer statements, they effortlessly elevate your look with chic, versatile elegance."
                            end={true}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                        />
                    </section>
                </div>

                <div id="team" className="bg-background flex h-fit flex-col items-center justify-center" data-section="Team">
                    <Heading className="border-text w-full border-y-2 p-8 text-center text-5xl!" text="✦ MEET THE TEAM ✦" variant="animated" />

                    <section className="flex flex-col items-center gap-8 px-32 py-16">
                        <motion.img className="transitio-all h-[50vh] w-[50vw] rounded-lg object-cover duration-300 hover:scale-105" src={placeholder} alt="The Team" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }} />
                        <Heading className="text-center text-5xl!" text="GRACE BAND" variant="primary" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }} />

                        <motion.p className="w-[75vh]" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
                            GraceBands is the passion project of a small team of artisans and fashion enthusiasts who believe in the power of handmade accessories to define personal style. The creators are driven by a commitment to quality and individuality, meticulously selecting custom fabrics and
                            ensuring every headband is crafted to be comfortable, durable, and chic. Drawing inspiration from modern trends and classic elegance, their goal is to translate simple textile artistry into functional, attractive pieces that empower wearers to express themselves
                            effortlessly, making GraceBands a true labor of love born from creativity and attention to detail.
                        </motion.p>
                    </section>
                </div>
            </HomeLayout>

            {/* I left the shop checkout, the email address for the ticket and the cart items not fully implement */}
            <ShopLayout isShopActive={isShopActive}>
                <motion.section className="flex w-full justify-between" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
                    <Heading className="text-5xl!" text="✦ THE SHOP ✦" variant="animated" />
                    <Button className="h-12 w-28" text="Cart" variant="primary" />
                </motion.section>

                <motion.section className="flex h-full w-full items-center justify-around rounded-lg shadow-sm" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
                    <ItemCard itemName="Headband 1" itemSrc={placeholder} itemCost="₱100.00" />
                    <ItemCard itemName="Headband 2" itemSrc={placeholder} itemCost="₱120.00" />
                    <ItemCard itemName="Headband 3" itemSrc={placeholder} itemCost="₱140.00" />
                </motion.section>

                <CartModal />
            </ShopLayout>
        </>
    );
};
