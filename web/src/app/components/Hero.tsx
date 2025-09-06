'use client';

import { Calendar, Users, MapPin, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        // Start animation after a small delay
        const timeout = setTimeout(() => {
            animationFrame = requestAnimationFrame(animate);
        }, 500);

        return () => {
            clearTimeout(timeout);
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [end, duration]);

    return <span>{count.toLocaleString()}+</span>;
}

export default function Hero() {
    return (
        <section id="home" className="relative text-white pt-16 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900">
            {/* Background pattern overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-blue-600/20"></div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 lg:py-32">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                        <span className="text-white">Beauty & Wellness</span>
                        <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                            at Your Fingertips
                        </span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed text-gray-300">
                        Book your perfect haircut, salon treatment, or spa experience with our professional beauty experts.
                    </p>

                    {/* Single Primary CTA */}
                    <div className="flex justify-center mb-16">
                        <button className="cursor-pointer group bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-10 py-5 rounded-full text-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3">
                            <Calendar className="w-6 h-6" />
                            Book Your Appointment
                        </button>
                    </div>

                    {/* Trust Badges - Now with 3 badges including animated counter */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center">
                                <Users className="w-10 h-10 text-blue-400" />
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-blue-400">
                                    <AnimatedCounter end={1000} />
                                </div>
                                <div className="text-gray-300 text-lg">Happy Clients</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center">
                                <MapPin className="w-10 h-10 text-blue-400" />
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-blue-400">
                                    <AnimatedCounter end={50} />
                                </div>
                                <div className="text-gray-300 text-lg">Local Businesses</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-10 h-10 text-blue-400" />
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-blue-400">
                                    <AnimatedCounter end={2500} duration={2500} />
                                </div>
                                <div className="text-gray-300 text-lg">Services Completed</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modern wave decoration */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg className="w-full h-24 md:h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: '#f9fafb', stopOpacity: 0.3 }} />
                            <stop offset="50%" style={{ stopColor: '#f9fafb', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#f9fafb', stopOpacity: 0.3 }} />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0,60 C300,140 900,-20 1200,60 L1200,120 L0,120 Z"
                        fill="url(#wave-gradient)"
                    ></path>
                    <path
                        d="M0,80 C300,160 900,20 1200,80 L1200,120 L0,120 Z"
                        fill="#f9fafb"
                    ></path>
                </svg>
            </div>
        </section>
    );
}
