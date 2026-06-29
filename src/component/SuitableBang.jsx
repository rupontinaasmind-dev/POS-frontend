import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SuitableBang() {
    const [active, setActive] = useState(0);

    const businesses = [
        { 
            name: "সুপারশপ", 
            description: "বড় ইনভেন্টরি ও একাধিক ক্যাশ কাউন্টার দক্ষতার সাথে পরিচালনা করুন।",
            image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&fit=crop" 
        },
        { 
            name: "রেস্টুরেন্ট", 
            description: "অর্ডার, কিচেন ও বিলিং সিস্টেম একই প্ল্যাটফর্মে পরিচালনা করুন।",
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&fit=crop" 
        },
        { 
            name: "ফার্মেসি", 
            description: "ওষুধের স্টক, মেয়াদ ও বিক্রয় রেকর্ড সহজে ট্র্যাক করুন।",
            image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&fit=crop" 
        },
        { 
            name: "ফ্যাশন স্টোর", 
            description: "পোশাক, সাইজ ও কালারভিত্তিক স্টক ম্যানেজ করুন এবং বিক্রয় কার্যক্রম সহজে পরিচালনা করুন।",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&fit=crop" 
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setActive((prev) => (prev + 1) % businesses.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [active, businesses.length]);

    return (
        <section className="py-16 sm:py-24 bg-white">
            <div className="main-container">
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 px-4">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E293B] mb-4 sm:mb-6 leading-tight">
                        আপনার ব্যবসার জন্য <span className="text-[#0F766E]">উপযুক্ত</span>
                    </h2>
                    <p className="text-gray-500 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                        যেকোনো ধরনের খুচরা কিংবা পাইকারি ব্যবসার হিসাব রাখতে আমাদের সফটওয়্যারটি সম্পূর্ণ প্রস্তুত।
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12">
                    {/* Left: List */}
                    <div className="w-full lg:w-5/12 flex flex-col gap-4">
                        {businesses.map((biz, index) => (
                            <button 
                                key={index} 
                                onClick={() => setActive(index)}
                                className={`text-left px-6 py-6 rounded-2xl transition-all relative overflow-hidden ${
                                    active === index 
                                        ? 'bg-[#1E293B] text-white shadow-xl scale-[1.02]' 
                                        : 'bg-white text-gray-800 border border-gray-100 hover:border-gray-300 shadow-sm hover:shadow-md'
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    {active === index && (
                                        <span className="text-white font-bold">→</span>
                                    )}
                                    <h3 className={`font-bold text-xl sm:text-2xl ${active === index ? 'text-white' : 'text-gray-900'}`}>
                                        {biz.name}
                                    </h3>
                                </div>
                                <p className={`text-sm sm:text-base leading-relaxed ${active === index ? 'text-gray-300' : 'text-gray-500'}`}>
                                    {biz.description}
                                </p>
                                
                                {active === index && (
                                    <div className="mt-5 h-1 w-full bg-gray-700/50 rounded-full overflow-hidden">
                                        <motion.div 
                                            className="h-full bg-white rounded-full"
                                            initial={{ width: "0%" }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 5, ease: "linear" }}
                                            key={`progress-${active}`}
                                        />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Right: Image */}
                    <div className="w-full lg:w-7/12 h-[300px] sm:h-[400px] lg:h-auto min-h-[400px]">
                        <div className="relative w-full h-full rounded-[32px] overflow-hidden shadow-xl bg-gray-100">
                            <AnimatePresence mode="wait">
                                <motion.img 
                                    key={active}
                                    src={businesses[active].image} 
                                    alt={businesses[active].name}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute inset-0 w-full h-full object-cover" 
                                />
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
