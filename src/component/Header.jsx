import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from "../assets/images/logo-eng.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { admin, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isSpecialPage = location.pathname === '/demo' || location.pathname === '/contact';

    let targetBanglaUrl = '/bn';
    if (location.pathname === '/demo') targetBanglaUrl = '/bn/demo';
    else if (location.pathname === '/thank-you') targetBanglaUrl = '/bn/thank-you';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Software', href: '#' },
        { label: 'Hardware', href: '#' },
        { label: 'Pricing', href: '#' },
        { label: 'Resources', href: '#' },
    ];

    return (
        <div className="w-full sticky top-0 z-50">
            <header className={`w-full transition-all duration-300  ${scrolled ? 'bg-[var(--bg-color)] shadow-lg border-none' : 'shadow-none bg-[var(--bg-color)] border-b border-[var(--border-color)] '}`}>
                <div className="main-container py-4 sm:py-6 md:py-8 flex items-center justify-between">

                    <Link to="/" className="text-[26px] font-black tracking-tight flex items-center z-50">
                        <img className='w-24 sm:w-32 h-auto' src={logo} alt="SmartPOS Logo" />
                    </Link>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex">
                        {isSpecialPage ? (
                            <div className="flex items-center gap-4">
                                <Link to={targetBanglaUrl} className="flex items-center justify-center font-bold text-sm text-[var(--secondary-color)] border-2 border-[var(--secondary-color)] hover:bg-[var(--secondary-color)] hover:text-white px-4 py-1.5 sm:py-2 rounded-full transition-all shadow-sm">
                                    বাংলা
                                </Link>
                                <div className="hidden sm:block">
                                    <FontAwesomeIcon icon={faArrowLeftLong} className="text-[var(--secondary-color)] group-hover:-translate-x-1 transition-transform" />
                                </div>
                                <div>
                                    <Link to="/" className="flex items-center gap-2 bg-[var(--secondary-color)] hover:bg-[var(--secondary-dark)] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group">
                                        Back to Home
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4 justify-end">
                                {admin ? (
                                    <button onClick={handleLogout} className="flex items-center justify-center font-bold text-sm text-[var(--secondary-color)] border-2 border-[var(--secondary-color)] hover:bg-[var(--secondary-color)] hover:text-white px-4 py-1.5 sm:py-2 rounded-full transition-all shadow-sm">
                                        Logout
                                    </button>
                                ) : (
                                    <Link to="/login" className="flex items-center justify-center font-bold text-sm text-[var(--secondary-color)] border-2 border-[var(--secondary-color)] hover:bg-[var(--secondary-color)] hover:text-white px-4 py-1.5 sm:py-2 rounded-full transition-all shadow-sm">
                                        Login
                                    </Link>
                                )}
                                <Link to={targetBanglaUrl} className="flex items-center justify-center font-bold text-sm text-[var(--secondary-color)] border-2 border-[var(--secondary-color)] hover:bg-[var(--secondary-color)] hover:text-white px-4 py-1.5 sm:py-2 rounded-full transition-all shadow-sm">
                                    বাংলা
                                </Link>
                                <div>
                                    <Link to="/demo" className="flex items-center gap-2 bg-[var(--secondary-color)] hover:bg-[var(--secondary-dark)] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group">
                                        Get a demo
                                    </Link>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faArrowRightLong} className="text-[var(--secondary-color)] text-xs" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-[var(--text-primary)] p-2 focus:outline-none"
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
                            className="md:hidden fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[var(--bg-color)] shadow-2xl z-[70] overflow-y-auto flex flex-col"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
                                <span className="font-bold text-lg text-[var(--text-color)]">Menu</span>
                                <button onClick={() => setMobileOpen(false)} className="text-[var(--text-primary)] p-2">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <nav className="flex flex-col gap-2 p-6 flex-grow">
                                {admin ? (
                                    <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="text-lg font-bold text-[var(--secondary-color)] hover:opacity-80 px-4 py-3 rounded-xl transition-colors text-left">Logout</button>
                                ) : (
                                    <Link to="/login" onClick={() => setMobileOpen(false)} className="text-lg font-bold text-[var(--text-primary)] hover:text-[var(--secondary-color)] px-4 py-3 rounded-xl transition-colors">Log in</Link>
                                )}
                                <hr className="my-4 border-[var(--border-color)]" />

                                <div className="flex flex-col gap-4 mt-8">
                                    <Link to={targetBanglaUrl} onClick={() => setMobileOpen(false)} className="flex items-center justify-center font-bold text-sm text-[var(--secondary-color)] border-2 border-[var(--secondary-color)] hover:bg-[var(--secondary-color)] hover:text-white px-4 py-3 rounded-full transition-all shadow-sm">
                                        বাংলা
                                    </Link>
                                    {!isSpecialPage ? (
                                        <Link to="/demo" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 bg-[var(--secondary-color)] text-white px-4 py-3 rounded-full text-sm font-bold transition-all shadow-md">
                                            Get a demo
                                        </Link>
                                    ) : (
                                        <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 bg-[var(--secondary-color)] text-white px-4 py-3 rounded-full text-sm font-bold transition-all shadow-md">
                                            Back to Home
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
