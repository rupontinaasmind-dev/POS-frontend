import { motion } from 'framer-motion';
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { isValidPhoneNumber } from "libphonenumber-js";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function ContactUs() {
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
            await axios.post("http://localhost:5000/api/contact", formData);
            toast.success("Contact request submitted successfully!", {
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
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                country: "BD",
                message: "",
            });
            setErrors({});
        } catch (error) {
            toast.error("Failed to submit contact request.");
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
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-color)] text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[var(--primary-color)] mb-8 bg-white/50 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary-color)]"></span>
                        CONTACT US
                    </div>

                    <h1 className="text-6xl sm:text-7xl lg:text-[80px] font-black uppercase leading-[0.95] tracking-tighter mb-8">
                        <span className="text-[var(--primary-color)] block">Start A</span>
                        <span className="text-[var(--secondary-color)] block">Project</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-12 font-medium leading-relaxed max-w-md">
                        Ready to build something iconic together?
                        <br />
                        Drop a line and let's craft excellence.
                    </p>

                    <div className="space-y-8">
                        <div>
                            <p className="text-[10px] sm:text-xs font-bold text-[var(--primary-color)]/70 uppercase tracking-[0.2em] mb-2">Electronic Mail</p>
                            <a href="mailto:hello.naasmind@gmail.com" className="text-2xl sm:text-3xl font-extrabold text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors">
                                hello.naasmind@gmail.com
                            </a>
                        </div>

                        <div>
                            <p className="text-[10px] sm:text-xs font-bold text-[var(--primary-color)]/70 uppercase tracking-[0.2em] mb-2">Direct Line</p>
                            <a href="tel:+8801681149497" className="text-2xl sm:text-3xl font-extrabold text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors">
                                +880 16811 49497
                            </a>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-12">
                        <a href="#" className="w-12 h-12 rounded-xl border border-[var(--border-color)] bg-white shadow-sm flex items-center justify-center text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-all">
                            <FontAwesomeIcon icon={faLinkedinIn} className="text-lg" />
                        </a>
                        <a href="#" className="w-12 h-12 rounded-xl border border-[var(--border-color)] bg-white shadow-sm flex items-center justify-center text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-all">
                            <FontAwesomeIcon icon={faInstagram} className="text-lg" />
                        </a>
                        <a href="#" className="w-12 h-12 rounded-xl border border-[var(--border-color)] bg-white shadow-sm flex items-center justify-center text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-all">
                            <FontAwesomeIcon icon={faTwitter} className="text-lg" />
                        </a>
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
                                GET IN TOUCH
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--primary-color)] mb-3">Contact our team</h2>
                            <p className="text-sm text-[var(--text-secondary)] mb-8 font-medium leading-relaxed">
                                We're here to help and answer any question you might have.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-5">
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

                                <div>
                                    <label className="block text-[10px] sm:text-xs font-bold text-[var(--primary-color)] uppercase tracking-wider mb-2">Message <span className="text-[var(--secondary-color)]">*</span></label>
                                    <textarea name="message" value={formData.message} onChange={handleChange} required rows="4" className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--secondary-color)] focus:ring-1 focus:ring-[var(--secondary-color)] transition-colors bg-white shadow-sm resize-none"></textarea>
                                </div>


                                <div className="pt-4">
                                    <button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-center gap-2 bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] text-white font-bold text-base py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed">
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
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
