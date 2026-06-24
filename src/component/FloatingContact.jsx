import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { faPlus, faCommentDots } from '@fortawesome/free-solid-svg-icons';

export default function FloatingContact() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    if (location.pathname === '/admin') {
        return null;
    }

    return (
        <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[100] flex flex-col items-center gap-3">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-3"
                    >
                        {/* WhatsApp */}
                        <a 
                            href="https://wa.me/8801681149497" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center text-2xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                            title="Message on WhatsApp"
                        >
                            <FontAwesomeIcon icon={faWhatsapp} />
                        </a>

                        {/* Messenger */}
                        <a 
                            href="https://m.me/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-[#00B2FF] text-white flex items-center justify-center text-2xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                            title="Message on Messenger"
                        >
                            <FontAwesomeIcon icon={faFacebookMessenger} />
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full text-white flex items-center justify-center text-2xl sm:text-3xl shadow-2xl transition-all duration-300 z-10 ${
                    isOpen 
                        ? 'bg-[var(--primary-color)] rotate-[135deg] shadow-lg' 
                        : 'bg-[var(--secondary-color)] hover:bg-[#e03d0b] hover:scale-105 hover:-translate-y-1'
                }`}
                title="Contact Us"
            >
                <FontAwesomeIcon icon={isOpen ? faPlus : faCommentDots} />
            </button>
        </div>
    );
}
