'use client';

import { useState, useEffect } from 'react';

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
                ? 'bg-white shadow-lg'
                : 'bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="/">
                            <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                                isScrolled ? 'text-blue-600' : 'text-white'
                            }`} style={{ color: isScrolled ? '#3e92cc' : '#ffffff' }}>Taku.al</h1>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <a href="/#home" className={`hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                            }`}>
                                Home
                            </a>
                            <a href="/#services" className={`hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                            }`}>
                                Services
                            </a>
                            <a href="/#about" className={`hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                            }`}>
                                About
                            </a>
                            <a href="/#contact" className={`hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                            }`}>
                                Contact
                            </a>
                        </div>
                    </div>

                    {/* Auth & CTA Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <a href="/auth" className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:opacity-90 ${
                            isScrolled
                                ? 'text-gray-700 hover:text-blue-600'
                                : 'text-white hover:text-blue-200'
                        }`}>
                            Sign In
                        </a>
                        <button className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:opacity-90 ${
                            isScrolled
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-white text-blue-600 hover:bg-gray-100'
                        }`} style={{
                            backgroundColor: isScrolled ? '#3e92cc' : '#ffffff',
                            color: isScrolled ? '#ffffff' : '#3e92cc'
                        }}>
                            Book Now
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`hover:opacity-80 focus:outline-none transition-colors duration-300 ${
                                isScrolled ? 'text-gray-700' : 'text-white'
                            }`}
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t transition-all duration-300 ${
                            isScrolled
                                ? 'bg-white border-gray-200'
                                : 'bg-black bg-opacity-20 backdrop-blur-sm border-white border-opacity-20'
                        }`}>
                            <a href="/#home" className={`block px-3 py-2 rounded-md text-base font-medium hover:opacity-80 transition-colors ${
                                isScrolled ? 'text-gray-700' : 'text-white'
                            }`}>
                                Home
                            </a>
                            <a href="/#services" className={`block px-3 py-2 rounded-md text-base font-medium hover:opacity-80 transition-colors ${
                                isScrolled ? 'text-gray-700' : 'text-white'
                            }`}>
                                Services
                            </a>
                            <a href="/#about" className={`block px-3 py-2 rounded-md text-base font-medium hover:opacity-80 transition-colors ${
                                isScrolled ? 'text-gray-700' : 'text-white'
                            }`}>
                                About
                            </a>
                            <a href="/#contact" className={`block px-3 py-2 rounded-md text-base font-medium hover:opacity-80 transition-colors ${
                                isScrolled ? 'text-gray-700' : 'text-white'
                            }`}>
                                Contact
                            </a>
                            <a href="/auth" className={`block px-3 py-2 rounded-md text-base font-medium hover:opacity-80 transition-colors ${
                                isScrolled ? 'text-gray-700' : 'text-white'
                            }`}>
                                Sign In
                            </a>
                            <div className="pt-4">
                                <button className={`w-full px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:opacity-90 ${
                                    isScrolled
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-white text-blue-600 hover:bg-gray-100'
                                }`} style={{
                                    backgroundColor: isScrolled ? '#3e92cc' : '#ffffff',
                                    color: isScrolled ? '#ffffff' : '#3e92cc'
                                }}>
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



