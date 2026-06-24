import React from 'react';
import { motion } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

export default function Testimonials() {
    const cards = [
        { name: "The Market & Produce", location: "Seattle, WA", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" },
        { name: "El Rancho Supermarket", location: "Austin, TX", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" },
    ];

    return (
        <section className="py-16 sm:py-24 bg-[var(--primary-color)] text-white overflow-hidden">
            <div className="main-container">
                <div className="flex flex-col lg:flex-row gap-10 sm:gap-12 lg:gap-16 items-center">
                    {/* Left */}
                    <motion.div className="w-full lg:w-1/3 text-center lg:text-left"
                        initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8 text-xs sm:text-sm text-gray-400 font-medium">
                            <span className="text-white font-bold">Featured on:</span>
                            <span>Forbes</span><span>TechCrunch</span><span>RetailDive</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight">
                            Trusted by more than <span className="text-[var(--secondary-color)] italic">10,000</span> customers
                        </h2>
                        <p className="text-sm sm:text-base lg:text-lg text-white/70 mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
                            Hear from grocery store owners about how Markt POS transformed their daily operations.
                        </p>
                        <button className="bg-[var(--secondary-color)] hover:bg-[var(--secondary-dark)] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-[var(--secondary-color)]/20 transform hover:-translate-y-1">
                            Read more stories
                        </button>
                    </motion.div>

                    {/* Right */}
                    <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {cards.map((card, i) => (
                            <motion.div key={i}
                                className={`relative group rounded-2xl sm:rounded-3xl overflow-hidden aspect-[3/4] sm:aspect-[4/5] shadow-2xl cursor-pointer ${i === 1 ? 'sm:mt-12' : ''}`}
                                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.2 }}>
                                <img src={card.image} alt={card.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-[var(--secondary-color)]">
                                    <FontAwesomeIcon icon={faPlay} className="text-white text-base sm:text-xl ml-0.5 sm:ml-1" />
                                </div>
                                <div className="absolute bottom-0 left-0 w-full p-5 sm:p-8">
                                    <h3 className="text-base sm:text-xl font-bold text-white mb-1">{card.name}</h3>
                                    <p className="text-gray-300 text-xs sm:text-sm">{card.location}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
