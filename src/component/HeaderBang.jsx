import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from "../assets/images/logo.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

export default function HeaderBang() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { admin, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/bn');
    };

    const isSpecialPage = location.pathname === '/bn/demo';

    let targetEnglishUrl = '/';
    if (location.pathname === '/bn/demo') targetEnglishUrl = '/demo';
    else if (location.pathname === '/bn/thank-you') targetEnglishUrl = '/thank-you';

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
                        <img className='w-32 h-auto' src={logo} alt="" />
                    </Link>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex">
                        {isSpecialPage ? (
                            <div className="flex items-center gap-4">
                                <Link to={targetEnglishUrl} className="flex items-center justify-center font-bold text-sm text-[#0F766E] border-2 border-[#0F766E] hover:bg-[#0F766E] hover:text-white px-4 py-1.5 sm:py-2 rounded-full transition-all shadow-sm">
                                    English
                                </Link>
                                <div className="hidden sm:block">
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
                                {admin ? (
                                    <button onClick={handleLogout} className="flex items-center justify-center font-bold text-sm text-[#0F766E] border-2 border-[#0F766E] hover:bg-[#0F766E] hover:text-white px-4 py-1.5 sm:py-2 rounded-full transition-all shadow-sm">
                                        লগ আউট
                                    </button>
                                ) : (
                                    <Link to="/bn/login" className="flex items-center justify-center font-bold text-sm text-[#0F766E] border-2 border-[#0F766E] hover:bg-[#0F766E] hover:text-white px-4 py-1.5 sm:py-2 rounded-full transition-all shadow-sm">
                                        লগ ইন
                                    </Link>
                                )}
                                <Link to={targetEnglishUrl} className="flex items-center justify-center font-bold text-sm text-[#0F766E] border-2 border-[#0F766E] hover:bg-[#0F766E] hover:text-white px-4 py-1.5 sm:py-2 rounded-full transition-all shadow-sm">
                                    English
                                </Link>
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

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-[#1E293B] p-2 focus:outline-none"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setMobileOpen(false)}
                            className="md:hidden fixed inset-0 bg-black/50 z-[60]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="md:hidden fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-2xl z-[70] overflow-y-auto flex flex-col"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <span className="font-bold text-lg text-gray-900">মেনু</span>
                                <button onClick={() => setMobileOpen(false)} className="text-[#1E293B] p-2">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <nav className="flex flex-col gap-2 p-6 flex-grow">
                                {admin ? (
                                    <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="text-lg font-bold text-[#0F766E] hover:text-[#115E59] px-4 py-3 rounded-xl transition-colors text-left">লগ আউট</button>
                                ) : (
                                    <Link to="/bn/login" onClick={() => setMobileOpen(false)} className="text-lg font-bold text-[#1E293B] hover:text-[#0F766E] px-4 py-3 rounded-xl transition-colors">লগ ইন</Link>
                                )}
                                <hr className="my-4 border-gray-200" />

                                <div className="flex flex-col gap-4 mt-8">
                                    <Link to={targetEnglishUrl} onClick={() => setMobileOpen(false)} className="flex items-center justify-center font-bold text-sm text-[#0F766E] border-2 border-[#0F766E] hover:bg-[#0F766E] hover:text-white px-4 py-3 rounded-full transition-all shadow-sm">
                                        English
                                    </Link>
                                    {!isSpecialPage ? (
                                        <Link to="/bn/demo" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 bg-[#0F766E] text-white px-4 py-3 rounded-full text-sm font-bold transition-all shadow-md">
                                            ডেমো নিন
                                        </Link>
                                    ) : (
                                        <Link to="/bn" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 bg-[#0F766E] text-white px-4 py-3 rounded-full text-sm font-bold transition-all shadow-md">
                                            হোমে ফিরুন
                                        </Link>
                                    )}
                                </div>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}