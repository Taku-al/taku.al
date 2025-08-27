import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

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
            <body>
                <Navbar />
                    {children}
            </body>
        </html>
    );
}
