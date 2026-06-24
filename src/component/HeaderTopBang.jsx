import React from 'react';
import { Link } from 'react-router-dom';

export default function HeaderTopBang() {
    return (
        <div className="bg-[var(--primary-color)] py-2 text-sm z-50 relative">
            <div className="main-container flex justify-center items-center text-center underline decoration-white">
                <Link to="/build-price" className="text-white font-medium py-[20px] text-[16px]">
                    সীমিত সময়ের অফার: আমাদের Build & Price সম্পূর্ণ করলে হার্ডওয়্যারে ৭৫% ছাড় পান*
                </Link>
            </div>
        </div>
    );
}
