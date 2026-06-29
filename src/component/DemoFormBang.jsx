import { motion } from 'framer-motion';
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { isValidPhoneNumber } from "libphonenumber-js";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useNavigate } from 'react-router-dom';

export default function DemoFormBang() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        companyName: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "BD",
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
            await axios.post(`${import.meta.env.VITE_API_URL}/demo`, formData);
            toast.success("ডেমো রিকোয়েস্ট সফলভাবে পাঠানো হয়েছে!", {
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
                companyName: "",
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                country: "BD",
            });
            setErrors({});
        } catch (error) {
            toast.error("ডেমো রিকোয়েস্ট পাঠাতে সমস্যা হয়েছে।");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="main-container max-w-7xl">
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
                        বিশেষায়িত স্টোরের জন্য গ্রোসারি পস
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1E293B] leading-[1.15] mb-8 tracking-tight">
                        পরবর্তী প্রজন্মের<br className="hidden lg:block" />
                        বিক্রেতাদের জন্য তৈরি<br className="hidden lg:block" />
                        <span className="text-[#0F766E]">পস সফটওয়্যার।</span>
                    </h1>

                    <p className="text-base sm:text-lg text-gray-500 mb-10 font-medium leading-relaxed max-w-lg">
                        আপনার দোকানের জন্য উপযুক্ত ৩০-মিনিটের একটি ডেমো। আমরা আপনাকে দেখাবো কীভাবে ওজনভিত্তিক বিক্রয়, স্কেল ইন্টিগ্রেশন এবং ব্যস্ত সময়ের চাপ সামলাতে হয়।
                    </p>

                    <div className="space-y-8 sm:space-y-10">
                        {[
                            {
                                title: "ফর্মটি পূরণ করুন",
                                desc: "আপনার দোকান সম্পর্কে আমাদের জানান - এতে এক মিনিটেরও কম সময় লাগবে।"
                            },
                            {
                                title: "ফোনটি কাছে রাখুন",
                                desc: "আমাদের একজন বিশেষজ্ঞ ৫ মিনিটের মধ্যে আপনার সাথে যোগাযোগ করবেন।"
                            },
                            {
                                title: "বিশেষজ্ঞের সাথে কথা বলুন",
                                desc: "৩০ মিনিট। আপনার ব্যবসা অনুযায়ী কাস্টমাইজড সমাধান। কোনো স্ক্রিপ্টেড কথা নয়।"
                            }
                        ].map((step, index) => (
                            <div key={index} className="flex gap-4 sm:gap-5">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0F766E] text-white font-bold flex items-center justify-center flex-shrink-0 shadow-md">
                                    {index + 1}
                                </div>
                                <div>
                                    <h4 className="text-base sm:text-lg font-bold text-[#1E293B] mb-1">{step.title}</h4>
                                    <p className="text-sm text-gray-500 font-medium">{step.desc}</p>
                                </div>
                            </div>
                        ))}
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
                                হার্ডওয়্যারে ৭৫% ছাড়*
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F766E] mb-3">ফ্রি ডেমো নিন</h2>
                            <p className="text-sm text-gray-500 mb-8 font-medium leading-relaxed">
                                আমাদের বিশেষজ্ঞের সাথে Markt POS এর সব সুবিধাগুলো জেনে নিন।
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-[10px] sm:text-xs font-bold text-[#0F766E] uppercase tracking-wider mb-2">কোম্পানির নাম <span className="text-red-500">*</span></label>
                                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] transition-colors bg-white shadow-sm" />
                                </div>

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

                                <div className="pt-4">
                                    <button type="submit" disabled={isSubmitting} className="w-full bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-base py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed">
                                        {isSubmitting ? 'পাঠানো হচ্ছে...' : 'ডেমো বুক করুন'}
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
