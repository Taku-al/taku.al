'use client';

import { useLanguage } from './LanguageProvider';
import { Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function LanguageModal() {
    const { showLanguageModal, setShowLanguageModal, setLanguage, language: currentLanguage } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    const languages = [
        { code: 'EN', name: 'English' },
        { code: 'AL', name: 'Shqip' }
    ];

    useEffect(() => {
        if (showLanguageModal) {
            setIsVisible(true);
        }
    }, [showLanguageModal]);

    const handleSelect = (langCode: string) => {
        setLanguage(langCode);
        handleClose();
    };

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => setShowLanguageModal(false), 100);
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    if (!showLanguageModal) return null;

    return (
        <div 
            className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-100 ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={handleBackdropClick}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80" />
            
            {/* Modal */}
            <div className={`relative bg-white border border-gray-200 rounded-2xl shadow-2xl mx-4 min-w-[300px] transform transition-all duration-100 ease-out ${
                isVisible ? 'scale-100' : 'scale-95'
            }`}>
                
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Globe className="w-4 h-4 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Choose Language</h3>
                    </div>
                </div>

                {/* Language Options */}
                <div className="p-3">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleSelect(lang.code)}
                            className={`cursor-pointer w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-75 ${
                                currentLanguage === lang.code
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                            }`}
                        >
                            {lang.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
