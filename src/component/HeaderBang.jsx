import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

export default function HeaderBang() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    
    const isSpecialPage = location.pathname === '/bn/demo' || location.pathname === '/bn/contact';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'সফটওয়্যার', href: '#' },
        { label: 'হার্ডওয়্যার', href: '#' },
        { label: 'মূল্য নির্ধারণ', href: '#' },
        { label: 'রিসোর্স', href: '#' },
    ];

    return (
        <div className="w-full sticky top-0 z-50">
            <header className={`w-full transition-all duration-300  ${scrolled ? 'bg-[var(--bg-color)] shadow-lg border-none' : 'shadow-none bg-[var(--bg-color)] border-b border-[var(--border-color)] '}`}>
                <div className="main-container h-16 sm:h-20 flex items-center justify-between">
                    <Link to="/bn" className="text-[26px] font-black tracking-tight flex items-center z-50">
                        <span className="text-[var(--secondary-color)]">Markt</span>&nbsp;<span className="text-[var(--primary-color)]">POS</span>
                    </Link>

                    <div className="flex items-center gap-3 sm:gap-4">
                        {isSpecialPage ? (
                            <div className="flex items-center gap-4">
                                <div>
                                    <FontAwesomeIcon icon={faArrowLeftLong} className="text-[var(--secondary-color)] group-hover:-translate-x-1 transition-transform" />
                                </div>
                                <Link to="/bn" className="flex items-center gap-2 bg-[var(--secondary-color)] hover:bg-[var(--secondary-dark)] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group">
                                    হোমে ফিরে যান
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">

                                <Link to="/bn/demo" className="flex items-center gap-2 bg-[var(--secondary-color)] hover:bg-[var(--secondary-dark)] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group">
                                    ডেমো নিন
                                </Link>
                                <div>
                                    <FontAwesomeIcon icon={faArrowRightLong} className="text-[var(--secondary-color)] text-xs" />
                                </div>
                            </div>
                        )}
                    </div>
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
                        className="md:hidden bg-[var(--bg-color)] border-b border-[var(--border-color)] shadow-xl"
                    >
                        <nav className="main-container py-4 flex flex-col gap-1">
                            {navLinks.map((link, i) => (
                                <a key={i} href={link.href} className="text-base font-bold text-[var(--text-primary)] hover:text-[var(--secondary-color)] hover:bg-[var(--secondary-color)]/5 px-4 py-3 rounded-xl transition-colors">
                                    {link.label}
                                </a>
                            ))}
                            <hr className="my-2 border-[var(--border-color)]" />
                            <a href="#" className="text-base font-bold text-[var(--text-primary)] hover:text-[var(--secondary-color)] px-4 py-3 rounded-xl transition-colors">লগ ইন</a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
