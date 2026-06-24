import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function FaqBang() {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        { question: "একটি গ্রোসারি স্টোর পস সিস্টেম সাধারণ রিটেইল সিস্টেম থেকে কীভাবে আলাদা?", answer: "গ্রোসারি স্টোর পস সিস্টেম বিশেষভাবে ডিজাইন করা হয়েছে উচ্চ-পরিমাণ লেনদেন, হাজার হাজার SKU, ওজনযুক্ত আইটেমের জন্য ইন্টিগ্রেটেড স্কেল, SNAP/EBT পেমেন্ট এবং পচনশীল পণ্য ও মেয়াদ উত্তীর্ণের তারিখ সহ জটিল ইনভেন্টরি ম্যানেজমেন্ট পরিচালনা করতে।" },
        { question: "Markt POS কি আমার বিদ্যমান হার্ডওয়্যারের সাথে কাজ করবে?", answer: "হ্যাঁ, Markt POS বারকোড স্ক্যানার, রিসিট প্রিন্টার, ক্যাশ ড্রয়ার এবং স্কেল সহ ৯৫% স্ট্যান্ডার্ড রিটেইল হার্ডওয়্যারের সাথে ইন্টিগ্রেট করে। সাইন আপ করার আগে আমরা একটি কম্প্যাটিবিলিটি চেকারও প্রদান করি।" },
        { question: "Markt POS এর সাথে কী কী হার্ডওয়্যার অন্তর্ভুক্ত?", answer: "আমরা আপনার প্রয়োজন অনুযায়ী বিভিন্ন হার্ডওয়্যার বান্ডেল অফার করি। একটি সাধারণ বান্ডেলে টাচ-স্ক্রিন টার্মিনাল, কাস্টমার-ফেসিং ডিসপ্লে, রিসিট প্রিন্টার, ক্যাশ ড্রয়ার এবং বারকোড স্ক্যানার অন্তর্ভুক্ত।" },
        { question: "Markt POS কি EBT/SNAP পেমেন্ট সাপোর্ট করে?", answer: "হ্যাঁ, সম্পূর্ণভাবে। আমাদের সিস্টেম EBT/SNAP লেনদেন প্রসেস করার জন্য সার্টিফাইড, চেকআউটের সময় যোগ্য এবং অযোগ্য আইটেম স্বয়ংক্রিয়ভাবে আলাদা করে।" },
        { question: "আমার ইন্টারনেট বন্ধ হলে আমার ডেটার কী হবে?", answer: "Markt POS এ একটি শক্তিশালী অফলাইন মোড রয়েছে। আপনি কাস্টমারদের বিল করা, ক্যাশ গ্রহণ এবং অফলাইন ক্রেডিট কার্ড লেনদেন প্রসেস করা চালিয়ে যেতে পারবেন। ইন্টারনেট ফিরে আসলে, সমস্ত ডেটা স্বয়ংক্রিয়ভাবে ক্লাউডে সিঙ্ক হয়।" },
        { question: "সেটআপ করতে কতক্ষণ সময় লাগে?", answer: "বেশিরভাগ গ্রোসারি স্টোর ৪৮ ঘণ্টার মধ্যে চালু হয়ে যায়। আমাদের অনবোর্ডিং টিম আপনার প্রাথমিক ইনভেন্টরি ইমপোর্ট পরিচালনা করে এবং আপনার কর্মীদের জন্য ব্যাপক প্রশিক্ষণ প্রদান করে।" },
    ];

    return (
        <section className="py-16 sm:py-24 ">
            <div className="main-container max-w-[800px]">
                <motion.div className="mb-8 sm:mb-12 text-center sm:text-left"
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--primary-color)]">সচরাচর জিজ্ঞাসা: গ্রোসারি স্টোর পস সলিউশন</h2>
                </motion.div>

                <div className="space-y-3 sm:space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div key={index}
                            className={`bg-white rounded-xl sm:rounded-2xl border ${openIndex === index ? 'border-[var(--primary-color)] shadow-md' : 'border-gray-200'} overflow-hidden transition-all duration-300`}
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }}>
                            <button className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-center focus:outline-none gap-3"
                                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}>
                                <span className={`text-sm sm:text-lg font-bold ${openIndex === index ? 'text-[var(--secondary-color)]' : 'text-[var(--primary-color)]'}`}>
                                    {faq.question}
                                </span>
                                <div className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${openIndex === index ? 'bg-[var(--secondary-color)]/10 text-[var(--secondary-color)] rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                                    <FontAwesomeIcon icon={faChevronDown} className="text-xs sm:text-sm" />
                                </div>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                                        className="overflow-hidden">
                                        <p className="px-4 sm:px-6 pb-4 sm:pb-5 text-xs sm:text-base text-[var(--text-secondary)] leading-relaxed font-medium">{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
