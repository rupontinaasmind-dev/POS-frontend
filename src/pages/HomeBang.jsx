import React from 'react';
import { motion } from 'framer-motion';
import FooterBang from "../component/FooterBang";
import HeaderBang from "../component/HeaderBang";
import HeroBang from "../component/HeroBang";
import CtaBang from "../component/CtaBang";
import PartnersBang from "../component/PartnersBang";
import FeaturesBang from "../component/FeaturesBang";
import SuitableBang from "../component/SuitableBang";
import IntegrationsBang from "../component/IntegrationsBang";
import TestimonialBang from "../component/TestimonialBang";
import PricingBang from "../component/PricingBang";
import ContactUsBang from "../component/ContactUsBang";



export default function HomeBang() {
    return (
        <motion.div
            className="bg-white min-h-screen font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <HeaderBang />
            <main>
                <HeroBang />
                <PartnersBang />
                <FeaturesBang />
                <SuitableBang />
                <IntegrationsBang />
                <PricingBang />
                <TestimonialBang />
                <CtaBang />
                <ContactUsBang />
            </main>
            <FooterBang />
        </motion.div>
    );
}