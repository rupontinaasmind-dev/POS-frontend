import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../component/SEO';
import HeaderBang from '../component/HeaderBang';
import FooterBang from '../component/FooterBang';

export default function TermsOfServiceBang() {
    return (
        <motion.div 
            className="bg-white min-h-screen font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <SEO 
                title="শর্তাবলী | Smart POS" 
                description="Smart POS-এর ব্যবহারের শর্তাবলী।" 
            />
            <HeaderBang />
            <main className="pt-32 pb-16">
                <div className="main-container max-w-4xl">
                    <h1 className="text-4xl font-bold mb-8 text-gray-900">ব্যবহারের শর্তাবলী</h1>
                    <div className="prose prose-lg text-gray-600">
                        <p>সর্বশেষ আপডেট: {new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">১. শর্তাবলীর স্বীকৃতি</h2>
                        <p>Smart POS অ্যাক্সেস এবং ব্যবহার করার মাধ্যমে, আপনি এই চুক্তির শর্তাবলী এবং বিধানগুলির সাথে আবদ্ধ হতে সম্মত হচ্ছেন।</p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">২. পরিষেবার বিবরণ</h2>
                        <p>Smart POS খুচরা ব্যবসার জন্য পয়েন্ট-অফ-সেল সফ্টওয়্যার, হার্ডওয়্যার ইন্টিগ্রেশন এবং সম্পর্কিত পরিষেবা প্রদান করে। আপনাকে নোটিশ দিয়ে বা না দিয়ে পরিষেবা পরিবর্তন বা বন্ধ করার অধিকার আমরা সংরক্ষণ করি।</p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">৩. ব্যবহারকারীর দায়িত্ব</h2>
                        <p>আপনি আপনার অ্যাকাউন্টের তথ্যের গোপনীয়তা বজায় রাখার জন্য এবং আপনার অ্যাকাউন্টের অধীনে ঘটে যাওয়া সমস্ত কার্যকলাপের জন্য দায়ী। আপনি আপনার অ্যাকাউন্টের কোনো অননুমোদিত ব্যবহারের বিষয়ে অবিলম্বে আমাদের অবহিত করতে সম্মত হচ্ছেন।</p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">৪. পেমেন্ট এবং সাবস্ক্রিপশন</h2>
                        <p>পরিষেবাগুলি সাবস্ক্রিপশনের ভিত্তিতে বিল করা হয়। আপনি পরিষেবাগুলি ব্যবহারের সাথে সম্পর্কিত সমস্ত প্রযোজ্য ফি প্রদান করতে সম্মত হচ্ছেন। সমস্ত ফি অফেরতযোগ্য।</p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">৫. দায়বদ্ধতার সীমাবদ্ধতা</h2>
                        <p>Smart POS কোনো অবস্থাতেই কোনো পরোক্ষ, আনুষঙ্গিক, বিশেষ, ফলস্বরূপ বা শাস্তিমূলক ক্ষতির জন্য, অথবা লাভ বা রাজস্বের কোনো ক্ষতির জন্য দায়ী থাকবে না, তা প্রত্যক্ষ বা পরোক্ষভাবে যাই ঘটুক না কেন।</p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">৬. যোগাযোগের তথ্য</h2>
                        <p>এই শর্তাবলী সম্পর্কে আপনার যদি কোনো প্রশ্ন থাকে, তাহলে অনুগ্রহ করে support@smartpos.com এ আমাদের সাথে যোগাযোগ করুন।</p>
                    </div>
                </div>
            </main>
            <FooterBang />
        </motion.div>
    );
}
