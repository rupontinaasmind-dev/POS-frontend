import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../component/SEO';
import HeaderTop from '../component/HeaderTop';
import Header from '../component/Header';
import Footer from '../component/Footer';

export default function TermsOfService() {
    return (
        <motion.div 
            className="bg-[var(--bg-color)] min-h-screen font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <SEO 
                title="Terms of Service | Smart POS" 
                description="Terms of Service for Smart POS." 
            />
            <HeaderTop />
            <Header />
            <main className="pt-32 pb-16">
                <div className="main-container max-w-4xl">
                    <h1 className="text-4xl font-bold mb-8 text-[var(--text-color)]">Terms of Service</h1>
                    <div className="prose prose-lg text-[var(--text-color-muted)]">
                        <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[var(--text-color)]">1. Acceptance of Terms</h2>
                        <p>By accessing and using Smart POS, you accept and agree to be bound by the terms and provision of this agreement.</p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[var(--text-color)]">2. Description of Service</h2>
                        <p>Smart POS provides point-of-sale software, hardware integrations, and related services for retail businesses. We reserve the right to modify or discontinue the service with or without notice to you.</p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[var(--text-color)]">3. User Responsibilities</h2>
                        <p>You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[var(--text-color)]">4. Payments and Subscriptions</h2>
                        <p>Services are billed on a subscription basis. You agree to pay all applicable fees associated with your use of the services. All fees are non-refundable.</p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[var(--text-color)]">5. Limitation of Liability</h2>
                        <p>In no event shall Smart POS be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.</p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[var(--text-color)]">6. Contact Information</h2>
                        <p>If you have any questions about these Terms, please contact us at support@smartpos.com.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </motion.div>
    );
}
