import React from 'react';
import { motion } from 'framer-motion';

export default function TestimonialBang() {
    const testimonials = [
        {
            text: "ড্যাশবোর্ড আমাকে রিয়েল-টাইম ইনসাইট দেয়। আমি যেখান থেকে আমার মোবাইল ফোন দিয়ে বিজনেস চালাতে পারি।",
            name: "মেহেদী হাসান",
            role: "ওনার, ElectroMart",
            initial: "ম"
        },
        {
            text: "DeshiPOS আমাদের স্টোর ম্যানেজ করার ধরন পুরো বদলে দিয়েছে। বিলিং অনেক ফাস্ট আর রিপোর্ট খুব হেল্পফুল।",
            name: "রফিকুল ইসলাম",
            role: "ওনার, DailyShop",
            initial: "র"
        },
        {
            text: "এখন ইনভেন্টরি ট্র্যাকিং অনেক ইজি। আমাদের স্টক কখনো শেষ হয় না আর কাস্টমাররা বেশি খুশি।",
            name: "নজরুল জাহান",
            role: "ম্যানেজার, HealthPlus Pharmacy",
            initial: "ন"
        },
        {
            text: "সিস্টেমটি ব্যবহার করা খুবই সহজ। আমার স্টাফরা মাত্র ১ দিনেই এটি চালানো শিখে গেছে।",
            name: "শফিকুল আলম",
            role: "মালিক, আলম সুপারশপ",
            initial: "শ"
        },
        {
            text: "কাস্টমার ম্যানেজমেন্ট আর পয়েন্ট সিস্টেমের কারণে আমাদের রিপিট সেলস অনেক বেড়েছে।",
            name: "ফাতেমা বেগম",
            role: "ফাউন্ডার, স্টাইল বিডি",
            initial: "ফা"
        }
    ];

    const row1 = [...testimonials, ...testimonials];
    const row2 = [...row1].reverse();

    const repeatedRow1 = [...row1, ...row1, ...row1, ...row1];
    const repeatedRow2 = [...row2, ...row2, ...row2, ...row2];

    const StarRating = () => (
        <div className="flex gap-1 text-[#0F766E]">
            {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );

    return (
        <section className="py-16 sm:py-24 bg-white overflow-hidden relative">
            <div className="main-container relative z-10  ">
                <div className="text-center max-w-3xl mx-auto px-4 mb-[80px] sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E293B] mb-4 sm:mb-6 leading-tight">
                        আমাদের গ্রাহকদের <span className="text-[#0F766E]">মতামত</span>
                    </h2>
                    <p className="text-gray-500 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                        সারাদেশের অসংখ্য ব্যবসায়ী আমাদের সফটওয়্যার ব্যবহার করে তাদের ব্যবসার উন্নতি করেছেন।
                    </p>
                </div>
            </div>

            <div className="relative flex flex-col gap-6 max-w-[100vw] group">
                <div className="fading-style absolute top-0 left-0 w-24 sm:w-48 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
                <div className="fading-style absolute top-0 right-0 w-24 sm:w-48 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

                {/* Top Row: sliding left */}
                <motion.div
                    className="flex items-center gap-6 sm:gap-8 pr-6 sm:pr-8 w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 80 }}
                >
                    {repeatedRow1.map((testi, index) => (
                        <div key={`row1-${index}`} className="w-[320px] sm:w-[400px] h-[220px] bg-white border border-gray-100 shadow-sm rounded-2xl p-6 flex flex-col shrink-0 transition-all duration-300 hover:border-[#0F766E] hover:shadow-[0_8px_30px_rgba(79,70,229,0.12)] hover:-translate-y-1">
                            <div className="text-[#0F766E] text-4xl font-serif leading-none opacity-50 mb-2">“</div>
                            <p className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed flex-grow">
                                {testi.text}
                            </p>
                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#0F766E] text-white flex items-center justify-center font-bold text-lg shrink-0">
                                        {testi.initial}
                                    </div>
                                    <div>
                                        <h4 className="text-gray-800 font-bold text-sm sm:text-base">{testi.name}</h4>
                                        <p className="text-gray-400 text-xs sm:text-sm font-medium">{testi.role}</p>
                                    </div>
                                </div>
                                <StarRating />
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Bottom Row: sliding right */}
                <motion.div
                    className="flex items-center gap-6 sm:gap-8 pr-6 sm:pr-8 w-max"
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 80 }}
                >
                    {repeatedRow2.map((testi, index) => (
                        <div key={`row2-${index}`} className="w-[320px] sm:w-[400px] h-[220px] bg-white border border-gray-100 shadow-sm rounded-2xl p-6 flex flex-col shrink-0 transition-all duration-300 hover:border-[#0F766E] hover:shadow-[0_8px_30px_rgba(79,70,229,0.12)] hover:-translate-y-1">
                            <div className="text-[#0F766E] text-4xl font-serif leading-none opacity-50 mb-2">“</div>
                            <p className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed flex-grow">
                                {testi.text}
                            </p>
                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#0F766E] text-white flex items-center justify-center font-bold text-lg shrink-0">
                                        {testi.initial}
                                    </div>
                                    <div>
                                        <h4 className="text-gray-800 font-bold text-sm sm:text-base">{testi.name}</h4>
                                        <p className="text-gray-400 text-xs sm:text-sm font-medium">{testi.role}</p>
                                    </div>
                                </div>
                                <StarRating />
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
