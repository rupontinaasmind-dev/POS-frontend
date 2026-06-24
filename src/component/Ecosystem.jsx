import React from 'react';
import { motion } from 'framer-motion';

export default function Ecosystem() {
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] } }),
    };

    return (
        <section className="py-16 sm:py-24 lg:py-32  overflow-hidden border-b border-[var(--border-color)]">
            <div className="main-container">
                <motion.div className="text-center mb-12 sm:mb-16 lg:mb-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
                    <motion.h2 variants={fadeUp} custom={0} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--primary-color)] mb-4 sm:mb-6">
                        One platform for your entire business
                    </motion.h2>
                    <motion.p variants={fadeUp} custom={1} className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto px-4 font-medium">
                        Manage your in-store sales, back-office operations, and e-commerce from a single, unified system.
                    </motion.p>
                </motion.div>

                <div className="relative flex flex-col md:flex-row items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[600px] w-full max-w-[1000px] mx-auto gap-6 md:gap-0">

                    {/* Left: Back office */}
                    <motion.div className="md:absolute left-0 z-10 w-full md:w-[45%] transform md:-translate-y-8 md:-translate-x-8"
                        initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                        <div className="relative">
                            <div className="absolute -top-3 -left-2 sm:-top-4 sm:-left-4 z-20 bg-[var(--secondary-color)] text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 sm:gap-3">
                                Back office
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                            </div>
                            <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=600" alt="Back office laptop" className="w-full h-auto object-cover rounded-xl shadow-2xl border border-gray-100" />
                        </div>
                    </motion.div>

                    {/* Center: POS system */}
                    <motion.div className="md:absolute left-1/2 transform md:-translate-x-1/2 z-0 w-full md:w-[45%] h-[250px] sm:h-[350px] md:h-[500px]"
                        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
                        <div className="relative w-full h-full">
                            <div className="absolute -bottom-3 -left-4 sm:-bottom-4 sm:-left-8 md:left-8 z-20 bg-[var(--secondary-color)] text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 sm:gap-3">
                                POS system
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                            </div>
                            <img src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=600" alt="POS terminal" className="w-full h-full object-cover rounded-xl shadow-xl" />
                        </div>
                    </motion.div>

                    {/* Right: Online sales */}
                    <motion.div className="md:absolute right-0 z-20 w-full md:w-[35%] transform md:translate-y-12 md:translate-x-8"
                        initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }}>
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-8 md:-left-16 z-20 bg-[var(--secondary-color)] text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 sm:gap-3">
                                Online sales
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                            </div>
                            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400" alt="Online sales mobile" className="w-full h-auto object-cover rounded-xl shadow-2xl border-4 border-white" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
