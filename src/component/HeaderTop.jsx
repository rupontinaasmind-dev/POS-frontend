import React from 'react';
import { Link } from 'react-router-dom';

export default function HeaderTop() {
    return (
        <div className="bg-[var(--primary-color)] py-2 text-sm z-50 relative">
            <div className="main-container flex justify-center items-center text-center underline decoration-white">
                <Link to="/build-price" className="text-white font-medium py-2.5 sm:py-[20px] text-xs sm:text-sm md:text-[16px] leading-snug">
                    Limited-time offer: Get 75% off hardware* when you complete our Build & Price.
                </Link>
            </div>
        </div>
    );
}
