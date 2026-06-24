import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faBoxesStacked, faDesktop, faCartShopping, faUsers } from '@fortawesome/free-solid-svg-icons';

export default function FeaturesBang() {
    const [activeTab, setActiveTab] = useState(0);

    const features = [
        { title: "ইনভেন্টরি ম্যানেজমেন্ট", description: "রিয়েল-টাইমে আপনার সমস্ত লোকালয়ে স্টক লেভেল ট্র্যাক করুন। আইটেম কমে গেলে স্বয়ংক্রিয়ভাবে পার্চেজ অর্ডার তৈরি করুন।", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800", icon: faBoxesStacked },
        { title: "হার্ডওয়্যার ইন্টিগ্রেশন", description: "বারকোড স্ক্যানার, রসিদ প্রিন্টার, ক্যাশ ড্রয়ার এবং ওয়েট স্কেলের সাথে নির্বিঘ্নে কানেক্ট করুন।", image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800", icon: faDesktop },
        { title: "অনলাইন অর্ডারিং", description: "কয়েক মিনিটের মধ্যে আপনার অনলাইন মুদি দোকান চালু করুন। আপনার ইন-স্টোর এবং অনলাইন ইনভেন্টরি স্বয়ংক্রিয়ভাবে সিঙ্ক করুন।", image: "https://images.unsplash.com/photo-1588820462211-133cd34b12aa?auto=format&fit=crop&q=80&w=800", icon: faCartShopping },
        { title: "কর্মী ব্যবস্থাপনা", description: "কর্মীদের সময় ট্র্যাক করুন, রোল-ভিত্তিক পারমিশন সেট করুন এবং ক্যাশিয়ার পারফরম্যান্স মনিটর করুন।", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800", icon: faUsers },
    ];

    return (
        <section className="py-16 sm:py-24 bg-[var(--bg-color)]">
            <div className="main-container">
                <motion.div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 px-4"
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--primary-color)] mb-4 sm:mb-6">
                        গ্রোসারি স্টোরের জন্য সম্পূর্ণ পস সলিউশন
                    </h2>
                    <p className="text-base sm:text-lg text-[var(--text-secondary)] font-medium">
                        আপনার গ্রোসারি ব্যবসা দক্ষতার সাথে চালানোর জন্য যা কিছু প্রয়োজন।
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-stretch">
                    {/* Tabs */}
                    <motion.div className="w-full lg:w-1/3 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 snap-x snap-mandatory"
                        initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        {features.map((feature, index) => (
                            <button key={index} onClick={() => setActiveTab(index)}
                                className={`text-left px-4 sm:px-6 py-4 sm:py-5 rounded-xl sm:rounded-2xl transition-all duration-300 border-2 flex-shrink-0 snap-start min-w-[200px] lg:min-w-0 ${
                                    activeTab === index
                                    ? 'border-[var(--secondary-color)] bg-[var(--secondary-color)]/5 shadow-md'
                                    : 'border-transparent hover:bg-black/5 text-[var(--text-secondary)]'
                                }`}>
                                <div className="flex items-center gap-3 mb-1">
                                    <FontAwesomeIcon icon={feature.icon} className={activeTab === index ? 'text-[var(--secondary-color)]' : 'text-gray-400'} />
                                    <h3 className={`text-sm sm:text-lg font-bold ${activeTab === index ? 'text-[var(--secondary-color)]' : 'text-[var(--primary-color)]'}`}>
                                        {feature.title}
                                    </h3>
                                </div>
                                {activeTab === index && (
                                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium leading-relaxed mt-2 hidden sm:block">
                                        {feature.description}
                                    </motion.p>
                                )}
                            </button>
                        ))}
                    </motion.div>

                    {/* Image Display */}
                    <motion.div className="w-full lg:w-2/3"
                        initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
                        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-[#F8FAFC] border border-gray-100 aspect-[4/3] sm:aspect-video group">
                            <div className="absolute top-0 w-full h-10 sm:h-12 bg-gray-100 flex items-center px-4 gap-2 border-b border-gray-200 z-10">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400"></div>
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="mx-auto bg-white px-8 sm:px-32 py-1 rounded-md shadow-sm text-[10px] sm:text-xs text-gray-400">marktpos.app</div>
                            </div>
                            <AnimatePresence mode="wait">
                                <motion.img key={activeTab} src={features[activeTab].image} alt={features[activeTab].title}
                                    initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="w-full h-full object-cover pt-10 sm:pt-12" />
                            </AnimatePresence>
                            {/* POS sidebar overlay */}
                            <div className="absolute top-10 sm:top-12 left-0 w-48 sm:w-64 h-full bg-[var(--primary-color)]/95 backdrop-blur-md hidden md:flex flex-col p-4 text-white">
                                <div className="text-[var(--secondary-color)] font-bold text-lg sm:text-xl mb-6 sm:mb-8 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faStore} className="text-white" /> MarktPOS
                                </div>
                                <div className="space-y-2 sm:space-y-4">
                                    {['চেকআউট', 'অর্ডার', 'ইনভেন্টরি', 'কাস্টমার', 'রিপোর্ট'].map((item, i) => (
                                        <div key={i} className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium ${i === 0 ? 'bg-[var(--secondary-color)] text-white' : 'text-white/60 hover:text-white hover:bg-white/10'} transition-colors`}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
