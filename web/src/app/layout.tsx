import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { LanguageProvider } from "./components/LanguageProvider";
import LanguageModal from "./components/LanguageModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taku.al - Beauty & Wellness Booking",
  description: "Book your perfect haircut, salon treatment, or spa experience with our professional beauty experts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <LanguageProvider>
                    <Navbar />
                    {children}
                    <LanguageModalWrapper />
                </LanguageProvider>
            </body>
        </html>
    );
}

// Client component wrapper for the modal
function LanguageModalWrapper() {
    return (
        <div className="language-modal-wrapper">
            <LanguageModal />
        </div>
    );
}
