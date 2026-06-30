import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../component/SEO';
import HeaderBang from '../component/HeaderBang';
import FooterBang from '../component/FooterBang';

export default function PrivacyPolicyBang() {
    return (
        <motion.div 
            className="bg-white min-h-screen font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <SEO 
                title="গোপনীয়তা নীতি | Smart POS" 
                description="Smart POS-এর গোপনীয়তা নীতি।" 
            />
            <HeaderBang />
            <main className="pt-32 pb-16">
                <div className="main-container max-w-4xl">
                    <h1 className="text-4xl font-bold mb-8 text-gray-900">গোপনীয়তা নীতি</h1>
                    <div className="prose prose-lg text-gray-600">
                        <p>সর্বশেষ আপডেট: {new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        
                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">১. আমরা যে তথ্য সংগ্রহ করি</h2>
                        <p>আপনি যখন Smart POS ব্যবহার করেন তখন আমরা সরাসরি আপনার দেওয়া তথ্য সংগ্রহ করি, যার মধ্যে রয়েছে তবে এতেই সীমাবদ্ধ নয়:</p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>অ্যাকাউন্টের তথ্য (নাম, ইমেইল, ফোন নম্বর, স্টোরের বিবরণ)</li>
                            <li>সাবস্ক্রিপশনের জন্য পেমেন্ট সংক্রান্ত তথ্য</li>
                            <li>আমাদের POS-এর মাধ্যমে প্রক্রিয়াকৃত লেনদেনের ডেটা</li>
                            <li>গ্রাহক সহায়তার জন্য অনুসন্ধানসমূহ</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">২. আমরা কিভাবে আপনার তথ্য ব্যবহার করি</h2>
                        <p>সংগৃহীত তথ্য আমরা বিভিন্ন উদ্দেশ্যে ব্যবহার করি:</p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>আমাদের POS পরিষেবা প্রদান, রক্ষণাবেক্ষণ এবং উন্নত করতে</li>
                            <li>লেনদেন প্রক্রিয়া করতে এবং সংশ্লিষ্ট তথ্য পাঠাতে</li>
                            <li>প্রযুক্তিগত বিজ্ঞপ্তি, আপডেট এবং সহায়তা বার্তা পাঠাতে</li>
                            <li>আপনার মন্তব্য, প্রশ্ন এবং অনুরোধের প্রতিক্রিয়া জানাতে</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">৩. ডেটা নিরাপত্তা</h2>
                        <p>আমরা আপনার ব্যক্তিগত তথ্য দুর্ঘটনাবশত বা বেআইনিভাবে ধ্বংস, ক্ষতি, পরিবর্তন, অননুমোদিত প্রকাশ বা অ্যাক্সেস থেকে সুরক্ষিত রাখার জন্য উপযুক্ত প্রযুক্তিগত এবং কাঠামোগত সুরক্ষা ব্যবস্থা গ্রহণ করি।</p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">৪. যোগাযোগ</h2>
                        <p>এই গোপনীয়তা নীতি সম্পর্কে আপনার কোনো প্রশ্ন থাকলে, অনুগ্রহ করে support@smartpos.com এ আমাদের সাথে যোগাযোগ করুন।</p>
                    </div>
                </div>
            </main>
            <FooterBang />
        </motion.div>
    );
}
