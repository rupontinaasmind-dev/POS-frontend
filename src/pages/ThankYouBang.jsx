import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import SEO from '../component/SEO';


export default function ThankYouBang() {
    return (
        <>
            <SEO 
                title="ধন্যবাদ | Markt POS" 
                description="Markt POS-এ যোগাযোগ করার জন্য ধন্যবাদ। আমরা খুব শীঘ্রই আপনার সাথে যোগাযোগ করবো।" 
            />
            <div className="flex items-center justify-center px-4 min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md w-full bg-white rounded-3xl p-10 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-20 h-20 bg-[#CCFBF1] rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle size={40} className="text-[#0F766E]" />
                    </motion.div>
                    <h1 className="text-3xl font-extrabold text-[#0F766E] mb-4 tracking-tight">ধন্যবাদ!</h1>
                    <p className="text-gray-500 text-base font-medium mb-8 leading-relaxed">
                        আপনার মেসেজ সফলভাবে পাঠানো হয়েছে। আমাদের টিম খুব শীঘ্রই আপনার সাথে যোগাযোগ করবে।
                    </p>
                    <Link
                        to="/bn"
                        className="inline-flex items-center justify-center w-full py-4 px-6 bg-[#0F766E] text-white rounded-xl font-bold text-[15px] hover:bg-[#115E59] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    >
                        হোমপেজে ফিরে যান
                    </Link>
                </motion.div>
            </div>
        </>
    );
}
