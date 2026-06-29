import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function PricingBang() {
    const plans = [
        {
            name: "বেসিক",
            price: "১৫০০",
            features: ["আনলিমিটেড প্রোডাক্ট", "ডেইলি সেলস রিপোর্ট", "অফলাইন সাপোর্ট", "১টি ইউজার"],
            popular: false
        },
        {
            name: "স্ট্যান্ডার্ড",
            price: "২৫০০",
            features: ["অ্যাডভান্সড ইনভেন্টরি", "মান্থলি অ্যানালাইটিক্স", "কাস্টমার ম্যানেজমেন্ট", "৩টি ইউজার"],
            popular: true
        },
        {
            name: "প্রিমিয়াম",
            price: "৩৫০০",
            features: ["মাল্টি-ব্রাঞ্চ সাপোর্ট", "কাস্টম ডেভেলপমেন্ট", "ডেডিকেটেড একাউন্ট ম্যানেজার", "আনলিমিটেড ইউজার"],
            popular: false
        }
    ];

    return (
        <section className="py-16 sm:py-24 bg-[#F8FAFC]">
            <div className="main-container">
                <motion.div 
                    className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 px-4"
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E293B] mb-4 sm:mb-6 leading-tight">
                        সাশ্রয়ী মূল্যে <span className="text-[#0F766E]">সেরা প্যাকেজ</span>
                    </h2>
                    <p className="text-gray-500 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                        আপনার ব্যবসার ধরণ ও আকার অনুযায়ী আমাদের বিভিন্ন প্যাকেজ থেকে আপনার জন্য উপযুক্তটি বেছে নিন।
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-center">
                    {plans.map((plan, index) => (
                        <motion.div key={index}
                            className={`rounded-3xl p-8 transition-all ${
                                plan.popular 
                                ? 'bg-[#0F766E] text-white shadow-2xl scale-105 z-10 py-12 border-none' 
                                : 'bg-white text-gray-800 border-2 border-gray-100 shadow-md hover:border-[#0F766E]'
                            }`}
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.15 }}>
                            
                            <h3 className={`text-xl font-bold mb-4 ${plan.popular ? 'text-white' : 'text-gray-800'}`}>{plan.name}</h3>
                            <div className="flex items-end gap-1 mb-8 pb-8 border-b border-gray-200/30">
                                <span className={`text-4xl font-extrabold ${plan.popular ? 'text-white' : 'text-[#0F766E]'}`}>৳{plan.price}</span>
                                <span className={`text-sm mb-1 ${plan.popular ? 'text-#99F6E4' : 'text-gray-500'}`}>/ মাস</span>
                            </div>

                            <div className="space-y-4 mb-8">
                                {plan.features.map((feature, fIndex) => (
                                    <div key={fIndex} className={`flex items-start gap-3 text-sm font-medium ${plan.popular ? 'text-#99F6E4' : 'text-gray-600'}`}>
                                        <div className={`mt-0.5 ${plan.popular ? 'text-white' : 'text-[#0F766E]'}`}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </div>
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            <button className={`w-full py-3.5 rounded-full text-sm font-bold transition-all ${
                                plan.popular 
                                ? 'bg-white text-[#0F766E] hover:bg-gray-50 shadow-md' 
                                : 'bg-white text-[#0F766E] border-2 border-[#0F766E] hover:bg-[#0F766E] hover:text-white'
                            }`}>
                                শুরু করুন
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
