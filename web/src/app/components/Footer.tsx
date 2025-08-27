export default function Footer() {
    return (
        <footer style={{ backgroundColor: '#16324f' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold mb-4" style={{ color: '#3e92cc' }}>Taku.al</h3>
                        <p className="mb-4 max-w-md" style={{ color: '#f2f2f2' }}>
                            Your premier destination for beauty and wellness services. We're committed to providing exceptional experiences
                            that help you look and feel your best.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:opacity-80 transition-colors" style={{ color: '#9a9696' }}>
                                <span className="sr-only">Facebook</span>
                                📘
                            </a>
                            <a href="#" className="hover:opacity-80 transition-colors" style={{ color: '#9a9696' }}>
                                <span className="sr-only">Instagram</span>
                                📷
                            </a>
                            <a href="#" className="hover:opacity-80 transition-colors" style={{ color: '#9a9696' }}>
                                <span className="sr-only">Twitter</span>
                                🐦
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4" style={{ color: '#ffffff' }}>Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#home" className="hover:opacity-80 transition-colors" style={{ color: '#f2f2f2' }}>Home</a></li>
                            <li><a href="#services" className="hover:opacity-80 transition-colors" style={{ color: '#f2f2f2' }}>Services</a></li>
                            <li><a href="#about" className="hover:opacity-80 transition-colors" style={{ color: '#f2f2f2' }}>About</a></li>
                            <li><a href="#contact" className="hover:opacity-80 transition-colors" style={{ color: '#f2f2f2' }}>Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4" style={{ color: '#ffffff' }}>Contact Us</h4>
                        <div className="space-y-2" style={{ color: '#f2f2f2' }}>
                            <p>📍 123 Beauty Street</p>
                            <p>Tirana, Albania</p>
                            <p>📞 +355 123 456 789</p>
                            <p>✉️ info@taku.al</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t mt-8 pt-8 text-center" style={{ borderColor: '#18435a' }}>
                    <p style={{ color: '#9a9696' }}>
                        © 2024 Taku.al. All rights reserved. | Privacy Policy | Terms of Service
                    </p>
                </div>
            </div>
        </footer>
    );
}



