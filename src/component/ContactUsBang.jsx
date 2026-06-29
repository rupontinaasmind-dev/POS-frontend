import { motion } from 'framer-motion';
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { isValidPhoneNumber } from "libphonenumber-js";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function ContactUsBang() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "BD",
        message: ""
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateField = (name, value, currentCountry) => {
        let errorMsg = "";
        if (name === "email") {
            const re = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
            if (value && !re.test(String(value).toLowerCase())) {
                errorMsg = "সঠিক ইমেইল ঠিকানা দিন";
            }
        } else if (name === "phone") {
            try {
                if (value && !isValidPhoneNumber(value, currentCountry)) {
                    errorMsg = "সঠিক ফোন নম্বর দিন";
                }
            } catch (e) {
                errorMsg = "ফোন নম্বর সঠিক নয়";
            }
        }
        return errorMsg;
    };

    const handlePhoneChange = (value) => {
        setFormData({ ...formData, phone: value || "" });

        const errorMsg = validateField("phone", value, formData.country);
        setErrors(prev => ({ ...prev, phone: errorMsg }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (name === 'email' || name === 'country') {
            const fieldToValidate = name === 'country' ? 'phone' : name;
            const valueToValidate = name === 'country' ? formData.phone : value;
            const countryToUse = name === 'country' ? value : formData.country;

            setErrors(prev => ({
                ...prev,
                [fieldToValidate]: validateField(fieldToValidate, valueToValidate, countryToUse)
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailError = validateField("email", formData.email, formData.country);
        const phoneError = validateField("phone", formData.phone, formData.country);

        if (emailError || phoneError) {
            setErrors({ email: emailError, phone: phoneError });
            toast.error("দয়া করে সাবমিট করার আগে ভুলগুলো সংশোধন করুন।");
            return;
        }

        setIsSubmitting(true);

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/contact`, formData);
            toast.success("আপনার মেসেজ সফলভাবে পাঠানো হয়েছে!", {
                style: {
                    border: '1px solid #0F766E',
                    padding: '16px',
                    color: '#0F766E',
                    backgroundColor: '#ffffff',
                    fontWeight: 'bold',
                },
                iconTheme: {
                    primary: '#CCFBF1',
                    secondary: '#0F766E',
                },
            });
            setTimeout(() => {
                navigate('/bn/thank-you');
            }, 2000);
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                country: "BD",
                message: "",
            });
            setErrors({});
        } catch (error) {
            toast.error("মেসেজ পাঠাতে সমস্যা হয়েছে।");
        } finally {
            setIsSubmitting(false);
        }
    };
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
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#0F766E] mb-8 bg-white/50 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#115E59]"></span>
                        যোগাযোগ করুন
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-[1.1] tracking-tighter mb-8 text-[#1E293B]">
                        একটি প্রোজেক্ট<br />
                        <span className="text-[#0F766E] block mt-2">শুরু করুন</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-500 mb-12 font-medium leading-relaxed max-w-md">
                        একসাথে দারুণ কিছু তৈরি করতে প্রস্তুত? আমাদের জানান, আমরা আপনার সাথে আছি।
                    </p>

                    <div className="space-y-8">
                        <div>
                            <p className="text-[10px] sm:text-xs font-bold text-[#0F766E]/70 uppercase tracking-[0.2em] mb-2">ইমেইল</p>
                            <Link to={"mailto:hello.naasmind@gmail.com"} className="text-2xl sm:text-3xl font-extrabold text-[#0F766E] hover:text-[#115E59] transition-colors">
                                hello.naasmind@gmail.com
                            </Link>
                        </div>

                        <div>
                            <p className="text-[10px] sm:text-xs font-bold text-[#0F766E]/70 uppercase tracking-[0.2em] mb-2">ফোন নম্বর</p>
                            <a href="tel:+8801681149497" className="text-2xl sm:text-3xl font-extrabold text-[#0F766E] hover:text-[#115E59] transition-colors">
                                +880 16811 49497
                            </a>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-12">
                        <Link to={"#"} className="w-12 h-12 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center justify-center text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition-all">
                            <FontAwesomeIcon icon={faLinkedinIn} className="text-lg" />
                        </Link>
                        <Link to={"https://www.instagram.com/naasmind/"} className="w-12 h-12 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center justify-center text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition-all">
                            <FontAwesomeIcon icon={faInstagram} className="text-lg" />
                        </Link>
                        <Link to={"https://x.com/naasmind"} className="w-12 h-12 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center justify-center text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition-all">
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
                    <div className="rounded-[24px] overflow-hidden border border-gray-200 bg-white shadow-xl">
                        <div className="p-8 sm:p-10 lg:p-12">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#CCFBF1] text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#0F766E] mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#115E59]"></span>
                                বার্তা পাঠান
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F766E] mb-3">আমাদের টিমের সাথে যোগাযোগ করুন</h2>
                            <p className="text-sm text-gray-500 mb-8 font-medium leading-relaxed">
                                আমরা আপনাকে সাহায্য করতে এবং আপনার যেকোনো প্রশ্নের উত্তর দিতে এখানে আছি।
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-[10px] sm:text-xs font-bold text-[#0F766E] uppercase tracking-wider mb-2">নামের প্রথম অংশ <span className="text-red-500">*</span></label>
                                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] transition-colors bg-white shadow-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] sm:text-xs font-bold text-[#0F766E] uppercase tracking-wider mb-2">নামের শেষ অংশ <span className="text-red-500">*</span></label>
                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] transition-colors bg-white shadow-sm" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] sm:text-xs font-bold text-[#0F766E] uppercase tracking-wider mb-2">ইমেইল <span className="text-red-500">*</span></label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] transition-colors bg-white shadow-sm`} />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-[10px] sm:text-xs font-bold text-[#0F766E] uppercase tracking-wider mb-2">ফোন নম্বর <span className="text-red-500">*</span></label>
                                    <PhoneInput
                                        international
                                        withCountryCallingCode
                                        defaultCountry="BD"
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                        onCountryChange={(country) => setFormData({ ...formData, country: country || "BD" })}
                                        className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3.5 text-sm bg-white shadow-sm focus-within:ring-1 focus-within:ring-[#0F766E] focus-within:border-[#0F766E] transition-colors`}
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                </div>

                                <div>
                                    <label className="block text-[10px] sm:text-xs font-bold text-[#0F766E] uppercase tracking-wider mb-2">মেসেজ <span className="text-red-500">*</span></label>
                                    <textarea name="message" value={formData.message} onChange={handleChange} required rows="4" className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] transition-colors bg-white shadow-sm resize-none"></textarea>
                                </div>


                                <div className="pt-4">
                                    <button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-center gap-2 bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-base py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed">
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                        {isSubmitting ? 'পাঠানো হচ্ছে...' : 'মেসেজ পাঠান'}
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
