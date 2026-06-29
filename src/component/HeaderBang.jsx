import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

export default function HeaderBang() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    const isSpecialPage = location.pathname === '/bn/demo';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'সফটওয়্যার', href: '#' },
        { label: 'হার্ডওয়্যার', href: '#' },
        { label: 'মূল্য', href: '#' },
        { label: 'রিসোর্স', href: '#' },
    ];

    return (
        <div className="w-full sticky top-0 z-50">
            <header className={`w-full transition-all duration-300  ${scrolled ? 'bg-white shadow-lg border-none' : 'shadow-none bg-white border-b border-gray-200 '}`}>
                <div className="main-container py-8 flex items-center justify-between">

                    <Link to="/bn" className="text-[26px] font-black tracking-tight flex items-center z-50">
                        <span className="text-[#0F766E]">Markt</span>&nbsp;<span className="text-[#1E293B]">POS</span>
                    </Link>

                    {isSpecialPage ? (
                        <div className="flex items-center gap-4">
                            <div>
                                <FontAwesomeIcon icon={faArrowLeftLong} className="text-[#0F766E] group-hover:-translate-x-1 transition-transform" />
                            </div>
                            <div>
                                <Link to="/bn" className="flex items-center gap-2 bg-[#0F766E] hover:bg-[#115E59] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group">
                                    হোমে ফিরুন
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4 justify-end">
                            <div>
                                <Link to="/bn/demo" className="flex items-center gap-2 bg-[#0F766E] hover:bg-[#115E59] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group">
                                    ডেমো নিন
                                </Link>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faArrowRightLong} className="text-[#0F766E] text-xs" />
                            </div>
                        </div>
                    )}

                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden bg-white border-b border-gray-200 shadow-xl"
                    >
                        <nav className="main-container py-4 flex flex-col gap-1">
                            {navLinks.map((link, i) => (
                                <Link key={i} to={link.href} className="text-base font-bold text-[#1E293B] hover:text-[#0F766E] hover:bg-[#0F766E]/5 px-4 py-3 rounded-xl transition-colors">
                                    {link.label}
                                </Link>
                            ))}
                            <hr className="my-2 border-gray-200" />
                            <Link to="/login" className="text-base font-bold text-[#1E293B] hover:text-[#0F766E] px-4 py-3 rounded-xl transition-colors">লগ ইন</Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}