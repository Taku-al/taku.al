'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const onDashboard = pathname?.startsWith('/dashboard');

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const solid = onDashboard || isScrolled;

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            solid
                ? 'bg-white/95 backdrop-blur-md shadow-lg'
                : 'bg-transparent backdrop-blur-md'
        }`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                            solid ? 'text-blue-600' : 'text-white'
                        }`}>Taku.al</h1>
                    </div>

                    {/* Desktop Navigation - Only show on non-dashboard pages */}
                    {!onDashboard && (
                        <div className="hidden lg:flex items-center space-x-8">
                            <a href="#home" className={`px-4 py-2 text-sm font-medium transition-all duration-300 relative hover-underline ${
                                solid ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                            }`}>
                                Home
                            </a>
                            <a href="#services" className={`px-4 py-2 text-sm font-medium transition-all duration-300 relative hover-underline ${
                                solid ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                            }`}>
                                Services
                            </a>
                            <a href="#near-me" className={`px-4 py-2 text-sm font-medium transition-all duration-300 relative hover-underline ${
                                solid ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                            }`}>
                                Near Me
                            </a>
                            <a href="#contact" className={`px-4 py-2 text-sm font-medium transition-all duration-300 relative hover-underline ${
                                solid ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                            }`}>
                                Contact
                            </a>
                        </div>
                    )}

                    {/* Right side - Different content based on page */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {onDashboard ? (
                            <>
                                <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Home
                                </Link>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <User className="w-5 h-5" />
                                    <span className="text-sm font-medium">My Account</span>
                                </div>
                            </>
                        ) : (
                            <Link href="/dashboard/providers" className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                Book Now
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`p-2 rounded-lg transition-colors duration-300 ${
                                solid ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
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
                            solid
                                ? 'bg-white/95 border-gray-200'
                                : 'bg-black/20 backdrop-blur-md border-white/20'
                        }`}>
                            {!onDashboard ? (
                                <>
                                    <a href="#home" className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                                        solid ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                                    }`}>
                                        Home
                                    </a>
                                    <a href="#services" className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                                        solid ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                                    }`}>
                                        Services
                                    </a>
                                    <a href="#near-me" className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                                        solid ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                                    }`}>
                                        Near Me
                                    </a>
                                    <a href="#contact" className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                                        solid ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                                    }`}>
                                        Contact
                                    </a>
                                    
                                    <div className="pt-4">
                                        <Link href="/dashboard/providers" className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                            Book Now
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link href="/" className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                                        solid ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                                    }`}>
                                        <div className="flex items-center gap-2">
                                            <ArrowLeft className="w-4 h-4" />
                                            Back to Home
                                        </div>
                                    </Link>
                                    <div className={`block px-4 py-3 rounded-lg text-base font-medium ${
                                        solid ? 'text-gray-700' : 'text-white'
                                    }`}>
                                        <div className="flex items-center gap-2">
                                            <User className="w-5 h-5" />
                                            My Account
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
