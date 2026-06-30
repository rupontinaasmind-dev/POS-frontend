import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImage from '../assets/images/banner-pos.webp';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

export default function Hero() {
    const container = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
    };
    const item = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
    };

    const stats = [
        { value: '10K+', label: 'Active Stores' },
        { value: '99.9%', label: 'Uptime' },
        { value: '50M+', label: 'Transactions' },
    ];

    return (
        <section className="relative pt-8 sm:pt-[60px] pb-[80px] sm:pb-[120px] flex items-center overflow-hidden bg-[var(--bg-color)]">
            {/* Decorative blurred circles - adjusted for light theme */}
            <div className="absolute top-20 right-10 w-72 h-72 bg-[var(--primary-color)]/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-[var(--secondary-color)]/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="main-container relative z-10 lg:py-0">
                <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-16">

                    {/* Left: Content */}
                    <motion.div className="w-full lg:w-1/2 text-center lg:text-left" variants={container} initial="hidden" animate="visible">
                        <motion.div variants={item} className="inline-flex items-center gap-2 text-[var(--text-primary)] text-xs font-bold uppercase tracking-[0.2em] mb-6">
                            <span className="w-2 h-2 rounded-full bg-[var(--secondary-color)]"></span>
                            THE OPERATORS
                        </motion.div>

                        <motion.h1 variants={item} className="text-[28px] min-[400px]:text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold text-[var(--primary-color)] leading-[1.1] mb-4 sm:mb-6">
                            Over 1,000 businesses & specialty markets{' '}

                            rely on Smart POS.

                        </motion.h1>

                        <motion.p variants={item} className="text-sm sm:text-base md:text-lg lg:text-xl text-[var(--text-secondary)] mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                            See how our all-purpose point of sale solution helps retailers, restaurants, cafes, boutiques, and specialty shops run more efficiently.
                        </motion.p>

                        <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                            <Link to="/demo" className="bg-[var(--secondary-color)] text-white px-8 py-4 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:bg-[var(--secondary-dark)] text-center">
                                Get a demo
                            </Link>
                            <Link to="/build-price" className="bg-transparent hover:bg-[var(--primary-color)]/5 text-[var(--primary-color)] border border-[var(--primary-color)]/20 px-8 py-4 rounded-full text-sm font-bold transition-all text-center">
                                View pricing
                            </Link>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div variants={item} className="mt-8 sm:mt-12 flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 md:gap-10">
                            {stats.map((s, i) => (
                                <div key={i} className="text-center min-w-[80px] sm:min-w-[100px]">
                                    <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--primary-color)]">{s.value}</div>
                                    <div className="text-[10px] sm:text-xs md:text-sm text-[var(--text-secondary)] font-bold mt-1 uppercase tracking-wide">{s.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right: Image */}
                    <motion.div
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: 60, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <div className="relative">
                            {/* Main image */}
                            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                                <img src={heroImage} alt="All Purpose POS System" className="w-full h-[220px] min-[400px]:h-[280px] sm:h-[360px] md:h-[420px] lg:h-[480px] object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                            </div>

                            {/* Floating card 1 */}
                            <motion.div
                                className="absolute -bottom-2 -left-1 min-[400px]:-bottom-4 min-[400px]:-left-4 sm:-bottom-6 sm:-left-6 bg-white rounded-lg min-[400px]:rounded-xl sm:rounded-2xl shadow-xl p-2.5 min-[400px]:p-4 sm:p-5 flex items-center gap-2.5 min-[400px]:gap-4 border border-gray-100"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="w-9 h-9 min-[400px]:w-12 min-[400px]:h-12 sm:w-14 sm:h-14 rounded-lg min-[400px]:rounded-xl bg-[var(--secondary-color)]/10 flex items-center justify-center text-[var(--secondary-color)]">
                                    <FontAwesomeIcon icon={faChartLine} className="text-sm min-[400px]:text-xl sm:text-2xl" />
                                </div>
                                <div>
                                    <div className="text-[10px] min-[400px]:text-xs sm:text-sm font-bold text-[var(--text-secondary)]">Sales Today</div>
                                    <div className="text-sm min-[400px]:text-lg sm:text-xl font-extrabold text-[var(--primary-color)]">$12,847</div>
                                </div>
                            </motion.div>

                            {/* Floating card 2 */}
                            <motion.div
                                className="absolute -top-1 -right-1 min-[400px]:-top-3 min-[400px]:-right-3 sm:-top-5 sm:-right-5 bg-white rounded-lg min-[400px]:rounded-xl sm:rounded-2xl shadow-xl p-2 min-[400px]:p-3 sm:p-4 border border-gray-100"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-2 h-2 rounded-full bg-[var(--secondary-color)] animate-pulse"></div>
                                    <span className="text-[10px] sm:text-xs font-bold text-[var(--secondary-color)]">Live</span>
                                </div>
                                <div className="text-xs sm:text-sm font-bold text-[var(--primary-color)]">142 orders</div>
                                <div className="text-[10px] sm:text-xs text-[var(--text-secondary)]">in last hour</div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Animated Bottom Wave Divider */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                <svg className="relative block w-full h-[60px] sm:h-[100px] lg:h-[140px]" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g className="animate-wave">
                        <use xlinkHref="#gentle-wave" x="48" y="0" fill="var(--border-color)" opacity="0.7" />
                        <use xlinkHref="#gentle-wave" x="48" y="3" fill="var(--border-color)" opacity="0.4" />
                        <use xlinkHref="#gentle-wave" x="48" y="5" fill="var(--bg-light)" opacity="0.8" />
                        <use xlinkHref="#gentle-wave" x="48" y="7" fill="var(--bg-light)" />
                    </g>
                </svg>
            </div>
        </section>
    );
}
