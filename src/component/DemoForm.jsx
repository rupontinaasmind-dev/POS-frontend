import { motion } from 'framer-motion';
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { isValidPhoneNumber } from "libphonenumber-js";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useNavigate } from 'react-router-dom';

export default function DemoForm() {
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
                errorMsg = "Invalid email address";
            }
        } else if (name === "phone") {
            try {
                if (value && !isValidPhoneNumber(value, currentCountry)) {
                    errorMsg = "Invalid phone number for the selected country";
                }
            } catch (e) {
                errorMsg = "Invalid phone number format";
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
            toast.error("Please fix the validation errors before submitting.");
            return;
        }

        setIsSubmitting(true);

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/demo`, formData);
            toast.success("Demo request submitted successfully!", {
                style: {
                    border: '1px solid var(--border-color)',
                    padding: '16px',
                    color: 'var(--primary-color)',
                    backgroundColor: '#ffffff',
                    fontWeight: 'bold',
                },
                iconTheme: {
                    primary: '#E8FAAA',
                    secondary: 'var(--primary-color)',
                },
            });
            setTimeout(() => {
                navigate('/thank-you');
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
            toast.error("Failed to submit demo request.");
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
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-color)] text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[var(--primary-color)] mb-8 bg-white/50 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary-color)]"></span>
                        THE ALL-PURPOSE POS FOR YOUR BUSINESS
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-[60px] font-extrabold text-[var(--primary-color)] leading-[1.05] mb-8 tracking-tight">
                        POS software<br className="hidden lg:block" />
                        built for the<br className="hidden lg:block" />
                        next generation<br className="hidden lg:block" />
                        of businesses.
                    </h1>

                    <p className="text-base sm:text-lg text-[var(--text-secondary)] mb-10 font-medium leading-relaxed max-w-lg">
                        A 30-minute walkthrough, custom to your shop. We'll show you cut-to-order, sold-by-weight, EBT, scale integration, and the Saturday-morning rush.
                    </p>

                    <div className="space-y-8 sm:space-y-10">
                        {[
                            {
                                title: "Fill out the form",
                                desc: "Tell us about your shop — takes under a minute."
                            },
                            {
                                title: "Have your phone nearby",
                                desc: "A Smart POS expert reaches out to schedule within 5 minutes."
                            },
                            {
                                title: "Meet with an expert",
                                desc: "30 minutes. Custom to your operation. Real, not scripted."
                            }
                        ].map((step, index) => (
                            <div key={index} className="flex gap-4 sm:gap-5">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--primary-color)] text-white font-bold flex items-center justify-center flex-shrink-0 shadow-md">
                                    {index + 1}
                                </div>
                                <div>
                                    <h4 className="text-base sm:text-lg font-bold text-[var(--primary-color)] mb-1">{step.title}</h4>
                                    <p className="text-sm text-[var(--text-secondary)] font-medium">{step.desc}</p>
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
                    <div className="rounded-[24px] overflow-hidden border border-[var(--border-color)]">
                        <div className="p-8 sm:p-10 lg:p-12">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8FAAA] text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--primary-color)] mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary-color)]"></span>
                                75% OFF HARDWARE*
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--primary-color)] mb-3">Get a free demo</h2>
                            <p className="text-sm text-[var(--text-secondary)] mb-8 font-medium leading-relaxed">
                                Walk through Smart POS with a specialist who knows your industry.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-[10px] sm:text-xs font-bold text-[var(--primary-color)] uppercase tracking-wider mb-2">Company Name <span className="text-[var(--secondary-color)]">*</span></label>
                                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--secondary-color)] focus:ring-1 focus:ring-[var(--secondary-color)] transition-colors bg-white shadow-sm" />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-[10px] sm:text-xs font-bold text-[var(--primary-color)] uppercase tracking-wider mb-2">First Name <span className="text-[var(--secondary-color)]">*</span></label>
                                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--secondary-color)] focus:ring-1 focus:ring-[var(--secondary-color)] transition-colors bg-white shadow-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] sm:text-xs font-bold text-[var(--primary-color)] uppercase tracking-wider mb-2">Last Name <span className="text-[var(--secondary-color)]">*</span></label>
                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--secondary-color)] focus:ring-1 focus:ring-[var(--secondary-color)] transition-colors bg-white shadow-sm" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] sm:text-xs font-bold text-[var(--primary-color)] uppercase tracking-wider mb-2">Email <span className="text-[var(--secondary-color)]">*</span></label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--secondary-color)] focus:ring-1 focus:ring-[var(--secondary-color)] transition-colors bg-white shadow-sm`} />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-[10px] sm:text-xs font-bold text-[var(--primary-color)] uppercase tracking-wider mb-2">Phone Number <span className="text-[var(--secondary-color)]">*</span></label>
                                    <PhoneInput
                                        international
                                        withCountryCallingCode
                                        defaultCountry="BD"
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                        onCountryChange={(country) => setFormData({ ...formData, country: country || "BD" })}
                                        className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3.5 text-sm bg-white shadow-sm focus-within:ring-1 focus-within:ring-[var(--secondary-color)] focus-within:border-[var(--secondary-color)] transition-colors`}
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                </div>

                                <div className="pt-4">
                                    <button type="submit" disabled={isSubmitting} className="w-full bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] text-white font-bold text-base py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed">
                                        {isSubmitting ? 'Sending...' : 'Get a Demo'}
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