import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function ContactUsBang() {
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');

    return (
        <div className="main-container max-w-7xl py-10 sm:py-16 lg:py-20">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                {/* Left Column - Content */}
                <motion.div
                    className="w-full lg:w-1/2"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-color)] text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[var(--primary-color)] mb-8 bg-white/50 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary-color)]"></span>
                        আমাদের সাথে যোগাযোগ করুন
                    </div>

                    <h1 className="text-6xl sm:text-7xl lg:text-[80px] font-black uppercase leading-[0.95] tracking-tighter mb-8">
                        <span className="text-[var(--primary-color)] block">একটি প্রজেক্ট</span>
                        <span className="text-[var(--secondary-color)] block">শুরু করুন</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-12 font-medium leading-relaxed max-w-md">
                        একসাথে দারুণ কিছু তৈরি করতে প্রস্তুত?
                        <br />
                        আমাদের জানান, চলুন সেরা কিছু তৈরি করি।
                    </p>

                    <div className="space-y-8">
                        <div>
                            <p className="text-[10px] sm:text-xs font-bold text-[var(--primary-color)]/70 uppercase tracking-[0.2em] mb-2">ইমেইল</p>
                            <Link to="" className="text-2xl sm:text-3xl font-extrabold text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors">
                                rabby0168@gmail.com
                            </Link>
                        </div>

                        <div>
                            <p className="text-[10px] sm:text-xs font-bold text-[var(--primary-color)]/70 uppercase tracking-[0.2em] mb-2">সরাসরি নম্বর</p>
                            <Link to="tel:+8801681149497" className="text-2xl sm:text-3xl font-extrabold text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors">
                                +৮৮০১৬৮১১৪৯৪৯৭
                            </Link>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-12">
                        <Link to="#" className="w-12 h-12 rounded-xl border border-[var(--border-color)] bg-white shadow-sm flex items-center justify-center text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-all">
                            <FontAwesomeIcon icon={faLinkedinIn} className="text-lg" />
                        </Link>
                        <Link to="#" className="w-12 h-12 rounded-xl border border-[var(--border-color)] bg-white shadow-sm flex items-center justify-center text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-all">
                            <FontAwesomeIcon icon={faInstagram} className="text-lg" />
                        </Link>
                        <Link to="#" className="w-12 h-12 rounded-xl border border-[var(--border-color)] bg-white shadow-sm flex items-center justify-center text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-all">
                            <FontAwesomeIcon icon={faTwitter} className="text-lg" />
                        </Link>
                    </div>
                </motion.div>

                {/* Right Column - Form */}
                <motion.div
                    className="w-full lg:w-1/2"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="rounded-[24px] overflow-hidden border border-[var(--border-color)] bg-white shadow-xl">
                        <div className="p-8 sm:p-10 lg:p-12">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8FAAA] text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--primary-color)] mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary-color)]"></span>
                                যোগাযোগ করুন
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--primary-color)] mb-3">আমাদের টিমের সাথে যোগাযোগ করুন</h2>
                            <p className="text-sm text-[var(--text-secondary)] mb-8 font-medium leading-relaxed">
                                আপনাকে সাহায্য করতে এবং আপনার যেকোনো প্রশ্নের উত্তর দিতে আমরা প্রস্তুত।
                            </p>

                            <form className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-[10px] sm:text-xs font-bold text-[var(--primary-color)] uppercase tracking-wider mb-2">নামের প্রথমাংশ <span className="text-[var(--secondary-color)]">*</span></label>
                                        <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--secondary-color)] focus:ring-1 focus:ring-[var(--secondary-color)] transition-colors bg-white shadow-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] sm:text-xs font-bold text-[var(--primary-color)] uppercase tracking-wider mb-2">নামের শেষাংশ <span className="text-[var(--secondary-color)]">*</span></label>
                                        <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--secondary-color)] focus:ring-1 focus:ring-[var(--secondary-color)] transition-colors bg-white shadow-sm" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] sm:text-xs font-bold text-[var(--primary-color)] uppercase tracking-wider mb-2">ইমেইল <span className="text-[var(--secondary-color)]">*</span></label>
                                    <input type="email" className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--secondary-color)] focus:ring-1 focus:ring-[var(--secondary-color)] transition-colors bg-white shadow-sm" />
                                </div>

                                <div>
                                    <label className="block text-[10px] sm:text-xs font-bold text-[var(--primary-color)] uppercase tracking-wider mb-2">ফোন নম্বর <span className="text-[var(--secondary-color)]">*</span></label>
                                    <div className="flex gap-3">
                                        <select className="border border-gray-200 rounded-xl px-3 py-3.5 text-sm bg-white shadow-sm focus:outline-none focus:border-[var(--secondary-color)] focus:ring-1 focus:ring-[var(--secondary-color)] transition-colors w-[130px]">
                                            <option>বাংলাদেশ</option>
                                            <option>যুক্তরাষ্ট্র</option>
                                            <option>যুক্তরাজ্য</option>
                                        </select>
                                        <input type="tel" defaultValue="+880" className="flex-1 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--secondary-color)] focus:ring-1 focus:ring-[var(--secondary-color)] transition-colors bg-white shadow-sm" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] sm:text-xs font-bold text-[var(--primary-color)] uppercase tracking-wider mb-2">বার্তা <span className="text-[var(--secondary-color)]">*</span></label>
                                    <textarea rows="4" className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--secondary-color)] focus:ring-1 focus:ring-[var(--secondary-color)] transition-colors bg-white shadow-sm resize-none"></textarea>
                                </div>


                                <div className="pt-4">
                                    <button type="button" className="w-full bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] text-white font-bold text-base py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                        বার্তা পাঠান
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
