import React from 'react';
import { motion } from 'framer-motion';

export default function PartnersBang() {
    const row1 = [
        "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
        "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/3/30/Square_Inc_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
        "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg"
    ];

    // Reverse array for the second row so they don't look identically aligned
    const row2 = [...row1].reverse();

    // Multiply arrays by 4 to ensure there is enough content to completely fill wide screens 
    // and provide a seamless 50% translation loop without white space.
    const repeatedRow1 = [...row1, ...row1, ...row1, ...row1];
    const repeatedRow2 = [...row2, ...row2, ...row2, ...row2];

    return (
        <section className="py-16 sm:py-24 bg-gradient-to-b from-[#F8FAFC] to-white overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F766E]/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="main-container relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 px-4">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E293B] mb-4 sm:mb-6 leading-tight">
                        বাংলাদেশের স্বনামধন্য ব্যবসায়ীগণ <span className="text-[#0F766E]">আমাদের সাথে</span>
                    </h2>
                    <p className="text-gray-500 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                        দেশের শীর্ষস্থানীয় অসংখ্য ব্যবসাপ্রতিষ্ঠান তাদের দৈনন্দিন কার্যক্রমে আমাদের সফটওয়্যারের ওপর আস্থা রেখেছেন।
                    </p>
                </div>
            </div>

            <div className="relative flex flex-col gap-6 max-w-[100vw] group">
                {/* Gradient edges for seamless fade effect */}
                <div className="fading-style absolute top-0 left-0 w-24 sm:w-48 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
                <div className="fading-style absolute top-0 right-0 w-24 sm:w-48 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

                {/* Top Row: sliding left */}
                <motion.div
                    className="flex items-center gap-6 sm:gap-10 pr-6 sm:pr-10 w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                >
                    {repeatedRow1.map((logo, index) => (
                        <div key={`row1-${index}`} className="w-36 sm:w-48 h-16 sm:h-20 bg-white border border-gray-100 shadow-sm rounded-xl p-4 flex items-center justify-center shrink-0 transition-all duration-300 hover:border-[#0F766E] hover:shadow-[0_8px_30px_rgba(79,70,229,0.12)] hover:-translate-y-1">
                            <img src={logo} alt="Partner Logo" className="w-full h-full object-contain" />
                        </div>
                    ))}
                </motion.div>

                {/* Bottom Row: sliding right */}
                <motion.div
                    className="flex items-center gap-6 sm:gap-10 pr-6 sm:pr-10 w-max"
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                >
                    {repeatedRow2.map((logo, index) => (
                        <div key={`row2-${index}`} className="w-36 sm:w-48 h-16 sm:h-20 bg-white border border-gray-100 shadow-sm rounded-xl p-4 flex items-center justify-center shrink-0 transition-all duration-300 hover:border-[#0F766E] hover:shadow-[0_8px_30px_rgba(79,70,229,0.12)] hover:-translate-y-1">
                            <img src={logo} alt="Partner Logo" className="w-full h-full object-contain" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
