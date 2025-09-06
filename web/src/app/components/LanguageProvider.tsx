'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
    language: string;
    setLanguage: (lang: string) => void;
    showLanguageModal: boolean;
    setShowLanguageModal: (show: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState('EN');
    const [showLanguageModal, setShowLanguageModal] = useState(false);

    useEffect(() => {
        // Check if user has visited before
        const hasVisited = localStorage.getItem('taku-language-selected');
        const savedLanguage = localStorage.getItem('taku-language');
        
        if (savedLanguage) {
            setLanguageState(savedLanguage);
        }
        
        if (!hasVisited) {
            // Show modal after page loads - faster for better UX
            setTimeout(() => {
                setShowLanguageModal(true);
            }, 600);
        }
    }, []);

    const setLanguage = (lang: string) => {
        setLanguageState(lang);
        localStorage.setItem('taku-language', lang);
        localStorage.setItem('taku-language-selected', 'true');
    };

    return (
        <LanguageContext.Provider value={{
            language,
            setLanguage,
            showLanguageModal,
            setShowLanguageModal
        }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
