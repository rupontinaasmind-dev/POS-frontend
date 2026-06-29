import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function HeroBang() {
    const col1 = [
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&fit=crop",
        "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&fit=crop",
        "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&fit=crop",
    ];
    
    const col2 = [
        "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=400&fit=crop",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&fit=crop",
        "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=400&fit=crop",
    ];

    const col3 = [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&fit=crop",
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&fit=crop",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&fit=crop",
    ];

    // Double arrays for seamless infinite loop
    const repeatedCol1 = [...col1, ...col1, ...col1];
    const repeatedCol2 = [...col2, ...col2, ...col2];
    const repeatedCol3 = [...col3, ...col3, ...col3];

    return (
        <section className="relative pt-16 pb-24 overflow-hidden bg-gradient-to-br from-[#F8FAFC] via-[#F8FAFC] to-white min-h-[90vh] flex items-center">
            {/* Decorative background blur */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-[#0F766E]/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-[#14B8A6]/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="main-container relative z-10 w-full">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

                    {/* Left: Content */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-xs font-bold text-gray-600 shadow-sm border border-indigo-100 mb-6"
                        >
                            <span className="w-2 h-2 rounded-full bg-[#0F766E]"></span>
                            স্মার্ট সল্যুশন
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1E293B] leading-[1.2] mb-6"
                        >
                            স্মার্ট POS সফটওয়্যার <br className="hidden sm:block" />
                            দিয়ে আপনার <span className="text-[#0F766E]">ব্যবসা পরিচালনা</span> <br className="hidden sm:block" />
                            করুন আরও সহজে
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-base sm:text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 font-medium"
                        >
                            আপনার দৈনন্দিন বিক্রি, ইনভেন্টরি, এবং কাস্টমার ম্যানেজমেন্টকে সহজ ও কার্যকরী করুন একটি আধুনিক সিস্টেমের মাধ্যমে।
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <button className="bg-[#0F766E] hover:bg-[#14B8A6] text-white px-8 py-3.5 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                                কেনার জন্য <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                            <button className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-8 py-3.5 rounded-full text-sm font-bold transition-all shadow-sm">
                                যোগাযোগ
                            </button>
                        </motion.div>
                    </div>

                    {/* Right: Vertical Sliders */}
                    <motion.div 
                        className="w-full lg:w-1/2 flex justify-center lg:justify-end h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden relative"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {/* Gradient masks for smooth top/bottom fading */}
                        <div className="absolute top-0 left-0 w-full h-16 sm:h-24 bg-gradient-to-b from-[#F8FAFC] lg:from-[#F8FAFC] to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-full h-16 sm:h-24 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>

                        <div className="flex gap-3 sm:gap-4 w-full max-w-[550px]">
                            {/* Column 1 - Slide Up */}
                            <motion.div 
                                className="w-1/3 flex flex-col gap-3 sm:gap-4"
                                animate={{ y: ["0%", "-50%"] }}
                                transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                            >
                                {repeatedCol1.map((img, i) => (
                                    <div key={`col1-${i}`} className="pb-0">
                                        <img src={img} alt="App UI" className="w-full aspect-[4/3] object-cover rounded-xl sm:rounded-2xl shadow-sm border-2 border-white/80" />
                                    </div>
                                ))}
                            </motion.div>

                            {/* Column 2 - Slide Down */}
                            <motion.div 
                                className="w-1/3 flex flex-col gap-3 sm:gap-4 -mt-16 sm:-mt-24"
                                animate={{ y: ["-50%", "0%"] }}
                                transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
                            >
                                {repeatedCol2.map((img, i) => (
                                    <div key={`col2-${i}`} className="pb-0">
                                        <img src={img} alt="App UI" className="w-full aspect-[4/3] object-cover rounded-xl sm:rounded-2xl shadow-sm border-2 border-white/80" />
                                    </div>
                                ))}
                            </motion.div>

                            {/* Column 3 - Slide Up */}
                            <motion.div 
                                className="w-1/3 flex flex-col gap-3 sm:gap-4"
                                animate={{ y: ["0%", "-50%"] }}
                                transition={{ repeat: Infinity, ease: "linear", duration: 28 }}
                            >
                                {repeatedCol3.map((img, i) => (
                                    <div key={`col3-${i}`} className="pb-0">
                                        <img src={img} alt="App UI" className="w-full aspect-[4/3] object-cover rounded-xl sm:rounded-2xl shadow-sm border-2 border-white/80" />
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </div>
            
            {/* Bottom gradient fade to white */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
        </section>
    );
}