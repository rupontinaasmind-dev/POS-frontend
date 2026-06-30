import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGoogle, faFacebook, faInstagram, faWhatsapp, faTelegram,
    faLinkedin, faYoutube, faShopify, faWordpress, faStripe,
    faPaypal, faSlack, faDropbox, faMailchimp, faGithub, faFigma
} from '@fortawesome/free-brands-svg-icons';

export default function IntegrationsBang() {
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1200
    );

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const apps = [
        { icon: faGoogle, color: "text-[#DB4437]" },
        { icon: faFacebook, color: "text-[#1877F2]" },
        { icon: faInstagram, color: "text-[#E4405F]" },
        { icon: faWhatsapp, color: "text-[#25D366]" },
        { icon: faTelegram, color: "text-[#0088cc]" },
        { icon: faLinkedin, color: "text-[#0A66C2]" },
        { icon: faYoutube, color: "text-[#FF0000]" },
        { icon: faShopify, color: "text-[#95BF47]" },
        { icon: faWordpress, color: "text-[#21759b]" },
        { icon: faStripe, color: "text-[#008CDD]" },
        { icon: faPaypal, color: "text-[#00457C]" },
        { icon: faSlack, color: "text-[#4A154B]" },
        { icon: faDropbox, color: "text-[#0061FF]" },
        { icon: faMailchimp, color: "text-[#241C15]" },
        { icon: faGithub, color: "text-[#181717]" },
        { icon: faFigma, color: "text-[#F24E1E]" }
    ];

    return (
        <section className="py-16 sm:py-24 bg-white overflow-hidden relative">
            <div className="main-container text-center relative z-10">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 px-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E293B] mb-4 sm:mb-6 leading-tight">
                        পছন্দের টুলের সাথে <span className="text-[#0F766E]">সহজ কানেকশন</span>
                    </h2>
                    <p className="text-gray-500 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                        আপনার দৈনন্দিন কাজের জন্য ব্যবহৃত জনপ্রিয় সব সফটওয়্যার ও টুলের সাথে সহজেই যুক্ত করুন।
                    </p>
                </motion.div>

                {/* Floating Icons Container */}
                <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full max-w-5xl mx-auto flex items-center justify-center mt-8">
                    {/* Center Element */}
                    <div className="element-size sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-[#0F766E] rounded-3xl shadow-2xl flex flex-col items-center justify-center z-20 text-white font-black text-sm sm:text-base md:text-lg lg:text-xl transform hover:scale-105 transition-transform duration-300">
                        <span>Smart</span>
                        <span>POS</span>
                    </div>

                    {/* Orbiting Icons */}
                    {apps.map((app, index) => {
                        // Distribute into 2 orbits
                        const isOuter = index % 2 === 0;
                        const groupTotal = Math.ceil(apps.length / 2);
                        const groupIndex = Math.floor(index / 2);

                        // Offset inner ring so they don't align perfectly
                        const angleOffset = isOuter ? 0 : (Math.PI * 2) / (groupTotal * 2);
                        const angle = (groupIndex / groupTotal) * Math.PI * 2 + angleOffset;

                        const getRadii = (isOuter, width) => {
                            if (width < 400) return { radiusX: isOuter ? 130 : 70, radiusY: isOuter ? 100 : 55 };
                            if (width < 640) return { radiusX: isOuter ? 170 : 90, radiusY: isOuter ? 120 : 65 };
                            if (width < 768) return { radiusX: isOuter ? 260 : 140, radiusY: isOuter ? 160 : 90 };
                            if (width < 1024) return { radiusX: isOuter ? 350 : 190, radiusY: isOuter ? 200 : 110 };
                            return { radiusX: isOuter ? 440 : 240, radiusY: isOuter ? 240 : 130 };
                        };

                        const { radiusX, radiusY } = getRadii(isOuter, windowWidth);

                        return (
                            <motion.div
                                key={index}
                                className={`absolute bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center p-2 sm:p-3 overflow-hidden ${isOuter ? 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16' : 'w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12'} ${app.class || ''}`}
                                initial={{
                                    opacity: 0,
                                    scale: 0,
                                    x: 0,
                                    y: 0
                                }}
                                whileInView={{
                                    opacity: 1,
                                    scale: 1,
                                    x: Math.cos(angle) * radiusX,
                                    y: Math.sin(angle) * radiusY
                                }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.05,
                                    type: "spring",
                                    stiffness: 40,
                                    damping: 15
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={app.icon}
                                    className={`${app.color} ${isOuter ? 'text-xl sm:text-2xl md:text-3xl lg:text-4xl' : 'text-lg sm:text-xl md:text-2xl lg:text-3xl'}`}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[1000px] h-[300px] sm:h-[500px] bg-[#99F6E4]/30 rounded-[100%] blur-[60px] sm:blur-[100px] -z-10 pointer-events-none"></div>
        </section>
    );
}
