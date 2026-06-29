import React from 'react';
import { motion } from 'framer-motion';

export default function FaqBang() {
    const faqs = [
        { question: "মুদি দোকানের POS সিস্টেম সাধারণ POS থেকে আলাদা কেন?", answer: "মুদি দোকানের POS সিস্টেমগুলো বিশেষভাবে প্রচুর ট্রানজেকশন এবং স্টক ম্যানেজ করার জন্য তৈরি।" },
        { question: "স্মার্ট POS কি আমার বর্তমান হার্ডওয়্যারের সাথে চলবে?", answer: "হ্যাঁ, স্মার্ট POS বেশিরভাগ স্ট্যান্ডার্ড হার্ডওয়্যারের সাথে সহজেই ইন্টিগ্রেট হয়।" },
        { question: "ইন্টারনেট না থাকলে কি হবে?", answer: "অফলাইন মোডে আপনি পেমেন্ট নিতে পারবেন, এবং ইন্টারনেট আসলে ডাটা সিঙ্ক হয়ে যাবে।" },
        { question: "সেটআপ করতে কত সময় লাগবে?", answer: "আমাদের টিম আপনার পুরো সিস্টেম ৪৮ ঘণ্টার মধ্যেই সম্পূর্ণ সেটআপ করে দেবে।" },
        { question: "সফটওয়্যারের সাথে ট্রেনিং দেওয়া হয় কি?", answer: "হ্যাঁ, আপনার স্টাফদের জন্য আমরা ফ্রি ট্রেনিং এবং গাইডলাইন প্রোভাইড করি।" },
        { question: "কোনো মাসিক মেইনটেইনেন্স চার্জ আছে কি?", answer: "না, আমাদের প্যাকেজগুলোর বাইরে কোনো ধরনের হিডেন বা মেইনটেইনেন্স চার্জ নেই।" },
        { question: "অনলাইন অর্ডারিং এর সুবিধা কি পাবো?", answer: "হ্যাঁ, স্ট্যান্ডার্ড এবং প্রিমিয়াম প্যাকেজে আপনি আপনার স্টোরের অনলাইন অর্ডার ম্যানেজ করতে পারবেন।" },
        { question: "যেকোনো সমস্যায় সাপোর্ট পাবো কিভাবে?", answer: "আমাদের ডেডিকেটেড সাপোর্ট টিম ২৪/৭ আপনাকে ফোন বা ইমেইলের মাধ্যমে সাহায্য করবে।" },
    ];

    return (
        <section className="py-16 sm:py-24 bg-white">
            <div className="main-container">
                <motion.div 
                    className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 px-4"
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] mb-4 sm:mb-6 leading-tight">
                        সচরাচর জিজ্ঞাসিত <span className="text-[#00A859]">প্রশ্নাবলী</span>
                    </h2>
                    <p className="text-gray-500 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                        আমাদের সফটওয়্যার সম্পর্কে আপনার যেকোনো সাধারণ প্রশ্নের উত্তর এখানে পেয়ে যাবেন খুব সহজেই।
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {faqs.map((faq, index) => (
                        <motion.div key={index}
                            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3"
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }}>
                            
                            <div className="w-8 h-8 rounded-full bg-[#e6f8ef] text-[#00A859] flex items-center justify-center font-bold">
                                ?
                            </div>
                            <h3 className="font-bold text-gray-800 text-sm">{faq.question}</h3>
                            <p className="text-xs text-gray-500 leading-relaxed mt-auto">{faq.answer}</p>
                            
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
