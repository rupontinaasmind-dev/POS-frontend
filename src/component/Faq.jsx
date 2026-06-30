import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        { question: "What makes an all-purpose POS system different from a generic retail system?", answer: "Our all-purpose POS systems are specifically designed to handle high-volume transactions, thousands of SKUs, integrated scales for weighted items, SNAP/EBT payments, and complex inventory management including perishables and expiry dates." },
        { question: "Will Smart POS integrate with my existing hardware?", answer: "Yes, Smart POS integrates with 95% of standard retail hardware including barcode scanners, receipt printers, cash drawers, and scales. We also provide a compatibility checker before you sign up." },
        { question: "What hardware is included with Smart POS?", answer: "We offer various hardware bundles depending on your needs. A typical bundle includes a touch-screen terminal, customer-facing display, receipt printer, cash drawer, and barcode scanner." },
        { question: "Does Smart POS support EBT/SNAP payments?", answer: "Yes, fully. Our system is certified to process EBT/SNAP transactions, automatically separating eligible and non-eligible items during checkout." },
        { question: "What happens to my data if my internet goes down?", answer: "Smart POS features a robust offline mode. You can continue ringing up customers, accepting cash, and processing offline credit card transactions. Once the internet is restored, all data automatically syncs to the cloud." },
        { question: "How long does it take to get setup?", answer: "Most businesses are up and running within 48 hours. Our onboarding team handles your initial inventory import and provides comprehensive training for your staff." },
    ];

    return (
        <section className="py-16 sm:py-24 ">
            <div className="main-container max-w-[800px]">
                <motion.div className="mb-8 sm:mb-12 text-center sm:text-left"
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--primary-color)]">FAQs: All-purpose POS solutions</h2>
                </motion.div>

                <div className="space-y-3 sm:space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div key={index}
                            className={`bg-white rounded-xl sm:rounded-2xl border ${openIndex === index ? 'border-[var(--primary-color)] shadow-md' : 'border-gray-200'} overflow-hidden transition-all duration-300`}
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }}>
                            <button className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-center focus:outline-none gap-3"
                                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}>
                                <span className={`text-sm sm:text-lg font-bold ${openIndex === index ? 'text-[var(--secondary-color)]' : 'text-[var(--primary-color)]'}`}>
                                    {faq.question}
                                </span>
                                <div className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${openIndex === index ? 'bg-[var(--secondary-color)]/10 text-[var(--secondary-color)] rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                                    <FontAwesomeIcon icon={faChevronDown} className="text-xs sm:text-sm" />
                                </div>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                                        className="overflow-hidden">
                                        <p className="px-4 sm:px-6 pb-4 sm:pb-5 text-xs sm:text-base text-[var(--text-secondary)] leading-relaxed font-medium">{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
