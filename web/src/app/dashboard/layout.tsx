'use client';

import { ReactNode } from 'react';
import Navbar from '@/app/components/Navbar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-16">
                {children}
            </div>
        </div>
    );
}