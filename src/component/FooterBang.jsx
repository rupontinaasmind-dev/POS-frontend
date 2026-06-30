import React from 'react';
import { Link } from 'react-router-dom';

export default function FooterBang() {
    return (
        <footer className="bg-[#115E59]">
            <div className="main-container">
                <div className="pt-6 pb-6 sm:pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-white/50 text-xs sm:text-sm">&copy; {new Date().getFullYear()} Smart POS. সর্বস্বত্ব সংরক্ষিত।</p>
                    <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
                        <Link to="/bn/privacy-policy" className="text-white/50 hover:text-white transition-colors">গোপনীয়তা নীতি</Link>
                        <Link to="/bn/terms-of-service" className="text-white/50 hover:text-white transition-colors">শর্তাবলী</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
