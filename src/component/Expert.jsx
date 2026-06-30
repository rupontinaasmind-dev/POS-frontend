import React from 'react';
import { motion } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

export default function Expert() {
    return (
        <section className="py-16 sm:py-24 bg-[var(--bg-color)]">
            <div className="main-container">
                <motion.div className="text-center mb-10 sm:mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--primary-color)]">Meet the expert behind Smart POS</h2>
                </motion.div>

                <motion.div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16  rounded-2xl sm:rounded-[40px] p-5 sm:p-8 md:p-12 border border-[var(--border-color)]"
                    initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                    <div className="w-full lg:w-1/2">
                        <div className="relative rounded-2xl sm:rounded-[32px] overflow-hidden shadow-2xl aspect-square sm:aspect-[4/3] lg:aspect-square">
                            <img src="https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=1000" alt="POS Expert" className="w-full h-full object-cover" />
                            <motion.div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl flex items-center gap-3"
                                animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--secondary-color)]/10 flex items-center justify-center text-[var(--secondary-color)] text-base sm:text-xl">
                                    <FontAwesomeIcon icon={faLeaf} />
                                </div>
                                <div>
                                    <div className="font-bold text-sm sm:text-base text-[var(--primary-color)]">20+ Years</div>
                                    <div className="text-xs sm:text-sm text-[var(--text-secondary)]">Retail Experience</div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <FontAwesomeIcon icon={faQuoteLeft} className="text-3xl sm:text-5xl text-[var(--secondary-color)]/20 mb-4 sm:mb-6" />
                        <p className="text-base sm:text-xl md:text-2xl text-[var(--primary-color)] font-medium leading-relaxed mb-6 sm:mb-8">
                            "I built Smart POS because I was tired of using software that wasn't built as an all-purpose POS. Since switching, our checkout times are down 30% and our inventory is perfectly synced."
                        </p>
                        <div>
                            <h4 className="text-lg sm:text-xl font-bold text-[var(--primary-color)]">Michael Chen</h4>
                            <p className="text-sm sm:text-base text-[var(--text-secondary)] font-medium">Founder & CEO, Smart POS</p>
                            <p className="text-xs sm:text-sm text-gray-400 mt-1">Former Owner of Chen's Fresh Market</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
