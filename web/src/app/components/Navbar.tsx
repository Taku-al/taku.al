'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-lg'
                : 'bg-transparent backdrop-blur-md'
        }`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                            isScrolled ? 'text-blue-600' : 'text-white'
                        }`}>Taku.al</h1>
                    </div>

                    {/* Desktop Navigation - Perfectly Centered */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <a href="#home" className={`px-4 py-2 text-sm font-medium transition-all duration-300 relative hover-underline ${
                            isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                        }`}>
                            Home
                        </a>
                        <a href="#services" className={`px-4 py-2 text-sm font-medium transition-all duration-300 relative hover-underline ${
                            isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                        }`}>
                            Services
                        </a>
                        <a href="#near-me" className={`px-4 py-2 text-sm font-medium transition-all duration-300 relative hover-underline ${
                            isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                        }`}>
                            Near Me
                        </a>
                        <a href="#contact" className={`px-4 py-2 text-sm font-medium transition-all duration-300 relative hover-underline ${
                            isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                        }`}>
                            Contact
                        </a>
                    </div>

                    {/* Right side - Book Now */}
                    <div className="hidden lg:flex items-center">
                        <button className="cursor-pointer bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                            Book Now
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`p-2 rounded-lg transition-colors duration-300 ${
                                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                            }`}
                        >
                            {isMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="lg:hidden">
                        <div className={`px-4 py-4 space-y-2 border-t transition-all duration-300 ${
                            isScrolled
                                ? 'bg-white/95 border-gray-200'
                                : 'bg-black/20 backdrop-blur-md border-white/20'
                        }`}>
                            <a href="#home" className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                            }`}>
                                Home
                            </a>
                            <a href="#services" className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                            }`}>
                                Services
                            </a>
                            <a href="#near-me" className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                            }`}>
                                Near Me
                            </a>
                            <a href="#contact" className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                            }`}>
                                Contact
                            </a>
                            
                            <div className="pt-4">
                                <button className="cursor-pointer w-full bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 shadow-lg">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
