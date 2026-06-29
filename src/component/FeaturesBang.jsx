import React from 'react';
import { motion } from 'framer-motion';

export default function FeaturesBang() {
    const features = [
        { title: "ড্যাশবোর্ড", description: "আপনার ব্যবসার সকল তথ্য এক নজরে দেখুন।", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&fit=crop" },
        { title: "ইনভেন্টরি", description: "সহজেই স্টক ম্যানেজ করুন এবং অ্যালার্ট পান।", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&fit=crop" },
        { title: "রিপোর্ট", description: "বিস্তারিত রিপোর্ট দেখুন এবং ব্যবসা অ্যানালাইজ করুন।", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&fit=crop" },
    ];

    return (
        <section className="py-16 sm:py-24 bg-[#F8FAFC]">
            <div className="main-container">
                <motion.div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 px-4"
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E293B] mb-4 sm:mb-6 leading-tight">
                        আপনার ব্যবসা পরিচালনা <span className="text-[#0F766E]">আরও সহজ করুন</span>
                    </h2>
                    <p className="text-gray-500 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                        আমাদের সফটওয়্যারে রয়েছে আপনার ব্যবসা পরিচালনার জন্য প্রয়োজনীয় সকল আধুনিক ফিচারসমূহ।
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    {features.map((feature, index) => (
                        <motion.div key={index}
                            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#99F6E4] transition-all group"
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.15 }}>
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-gray-50">
                                <img src={feature.image} alt={feature.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                            <p className="text-gray-500 text-sm font-medium">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
