import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../component/SEO';
import HeaderTop from '../component/HeaderTop';
import Header from '../component/Header';
import Footer from '../component/Footer';

export default function PrivacyPolicy() {
    return (
        <motion.div 
            className="bg-[var(--bg-color)] min-h-screen font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <SEO 
                title="Privacy Policy | Smart POS" 
                description="Privacy Policy for Smart POS." 
            />
            <HeaderTop />
            <Header />
            <main className="pt-32 pb-16">
                <div className="main-container max-w-4xl">
                    <h1 className="text-4xl font-bold mb-8 text-[var(--text-color)]">Privacy Policy</h1>
                    <div className="prose prose-lg text-[var(--text-color-muted)]">
                        <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        
                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[var(--text-color)]">1. Information We Collect</h2>
                        <p>We collect information you provide directly to us when you use Smart POS, including but not limited to:</p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>Account information (name, email, phone number, store details)</li>
                            <li>Payment information for subscriptions</li>
                            <li>Transaction data processed through our POS</li>
                            <li>Customer support inquiries</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[var(--text-color)]">2. How We Use Your Information</h2>
                        <p>We use the collected information for various purposes:</p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>To provide, maintain, and improve our POS services</li>
                            <li>To process transactions and send related information</li>
                            <li>To send technical notices, updates, and support messages</li>
                            <li>To respond to your comments, questions, and requests</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[var(--text-color)]">3. Data Security</h2>
                        <p>We implement appropriate technical and organizational security measures designed to protect your personal information against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access.</p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[var(--text-color)]">4. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us at support@smartpos.com.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </motion.div>
    );
}
