import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function Cta() {
    const images = [
        { src: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400", alt: "Produce" },
        { src: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=400", alt: "Checkout" },
        { src: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=400", alt: "Shopping" },
        { src: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=400", alt: "Customer" },
    ];

    return (
        <section className="smartpos-action relative overflow-hidden bg-[var(--primary-color)]">
            <div className="absolute inset-0 bg-black/10"></div>

            <div className="main-container relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-10 sm:gap-12 lg:gap-24">
                    {/* Left */}
                    <motion.div className="w-full lg:w-1/2 text-white text-center lg:text-left"
                        initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight">
                            See Smart POS <br className="hidden lg:block" />in action
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
                            Get a free, personalized demo to see how Smart POS can streamline your business operations.
                        </p>
                        <Link to="/demo" className="inline-block bg-[var(--secondary-color)] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-bold transition-all shadow-xl hover:shadow-2xl hover:scale-105 hover:bg-[var(--secondary-dark)]">
                            Get a free demo
                        </Link>
                        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-white/80 text-xs sm:text-sm">
                            <span><FontAwesomeIcon icon={faCheckCircle} className="text-white mr-1" /> No credit card required</span>
                            <span>•</span>
                            <span><FontAwesomeIcon icon={faCheckCircle} className="text-white mr-1" /> Setup in 48 hours</span>
                        </div>
                    </motion.div>

                    {/* Right */}
                    <motion.div className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
                        <div className="grid grid-cols-2 gap-3 sm:gap-6 h-[350px] sm:h-[450px] md:h-[600px] overflow-hidden  duration-500">
                            {/* Column 1 - Sliding Down */}
                            <motion.div
                                className="flex flex-col"
                                animate={{ y: ["-50%", "0%"] }}
                                transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
                            >
                                {[0, 1, 2, 3].map((i) => (
                                    <React.Fragment key={`col1-${i}`}>
                                        <div className="pb-3 sm:pb-6">
                                            <img src={images[0].src} alt={images[0].alt} className="w-full h-36 sm:h-48 md:h-64 object-cover rounded-xl sm:rounded-3xl shadow-lg border-2 sm:border-4 border-white/10 shrink-0" />
                                        </div>
                                        <div className="pb-3 sm:pb-6">
                                            <img src={images[1].src} alt={images[1].alt} className="w-full h-28 sm:h-40 md:h-56 object-cover rounded-xl sm:rounded-3xl shadow-lg border-2 sm:border-4 border-white/10 shrink-0" />
                                        </div>
                                    </React.Fragment>
                                ))}
                            </motion.div>

                            {/* Column 2 - Sliding Up */}
                            <motion.div
                                className="flex flex-col"
                                animate={{ y: ["0%", "-50%"] }}
                                transition={{ repeat: Infinity, ease: "linear", duration: 18 }}
                            >
                                {[0, 1, 2, 3].map((i) => (
                                    <React.Fragment key={`col2-${i}`}>
                                        <div className="pb-3 sm:pb-6">
                                            <img src={images[2].src} alt={images[2].alt} className="w-full h-28 sm:h-40 md:h-56 object-cover rounded-xl sm:rounded-3xl shadow-lg border-2 sm:border-4 border-white/10 shrink-0" />
                                        </div>
                                        <div className="pb-3 sm:pb-6">
                                            <img src={images[3].src} alt={images[3].alt} className="w-full h-36 sm:h-48 md:h-64 object-cover rounded-xl sm:rounded-3xl shadow-lg border-2 sm:border-4 border-white/10 shrink-0" />
                                        </div>
                                    </React.Fragment>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
