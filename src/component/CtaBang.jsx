import React from 'react';
import { motion } from 'framer-motion';

export default function CtaBang() {
    return (
        <section className="py-12 sm:py-20 bg-white px-4">
            <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#0F766E] to-[#14B8A6] rounded-[32px] overflow-hidden relative shadow-2xl">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[80px]"></div>

                <div className="relative z-10 px-6 py-16 sm:py-20 text-center flex flex-col items-center">
                    <motion.h2 
                        className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight max-w-3xl"
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                    >
                        আপনার ব্যবসা আরও সহজ করতে আজই আমাদের সাথে যুক্ত হোন
                    </motion.h2>

                    <motion.p 
                        className="text-#99F6E4 font-medium text-sm sm:text-base md:text-lg mb-10 max-w-2xl"
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        আমাদের সাথে যোগাযোগ করে জেনে নিন কিভাবে আমাদের সফটওয়্যার আপনার ব্যবসার প্রসারে সাহায্য করতে পারে। কোনো বাধ্যবাধকতা নেই।
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <button className="bg-white text-[#0F766E] px-8 sm:px-12 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-3">
                            যোগাযোগ করুন
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}