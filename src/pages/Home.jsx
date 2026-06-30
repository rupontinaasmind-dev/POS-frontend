import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../component/SEO';
import HeaderTop from '../component/HeaderTop';
import Header from '../component/Header';
import Hero from '../component/Hero';
import Ecosystem from '../component/Ecosystem';
import Features from '../component/Features';
import Comparison from '../component/Comparison';
import Testimonials from '../component/Testimonials';
import Expert from '../component/Expert';
import Faq from '../component/Faq';
import Cta from '../component/Cta';
import Footer from '../component/Footer';
import ContactUs from '../component/ContactUs';

export default function Home() {
    return (
        <motion.div
            className="bg-[var(--bg-color)] min-h-screen font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <SEO
                title="Home"
                description="Smart POS is the leading all-purpose point of sale system designed specifically for businesses of all sizes."
                keywords="POS, Point of Sale, All Purpose POS, Retail Software, Smart POS, Cash Register"
            />
            <HeaderTop />
            <Header />
            <main>
                <Hero />
                <Ecosystem />
                <Features />
                <Comparison />
                <Testimonials />
                <Expert />
                <Faq />
                <Cta />
                <ContactUs />
            </main>
            <Footer />
        </motion.div>
    );
}