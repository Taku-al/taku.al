import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock, Shield } from 'lucide-react';

export default function Footer() {
    return (
        <footer style={{ backgroundColor: '#16324f' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold mb-4" style={{ color: '#3e92cc' }}>Taku.al</h3>
                        <p className="mb-4 max-w-md" style={{ color: '#f2f2f2' }}>
                            Your premier destination for beauty and wellness services. We connect you with the best 
                            local professionals for all your beauty and wellness needs.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:opacity-80 transition-colors text-gray-400 hover:text-blue-400">
                                <span className="sr-only">Facebook</span>
                                <Facebook className="w-6 h-6" />
                            </a>
                            <a href="#" className="hover:opacity-80 transition-colors text-gray-400 hover:text-blue-400">
                                <span className="sr-only">Instagram</span>
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="#" className="hover:opacity-80 transition-colors text-gray-400 hover:text-blue-400">
                                <span className="sr-only">Twitter</span>
                                <Twitter className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    {/* Support & Features */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4" style={{ color: '#ffffff' }}>Why Choose Us</h4>
                        <ul className="space-y-3" style={{ color: '#f2f2f2' }}>
                            <li className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-blue-400" />
                                <span>24/7 Booking</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-blue-400" />
                                <span>Verified Professionals</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-blue-400" />
                                <span>Local Businesses</span>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4" style={{ color: '#ffffff' }}>Contact Us</h4>
                        <div className="space-y-3" style={{ color: '#f2f2f2' }}>
                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-blue-400" />
                                <div>
                                    <p>123 Beauty Street</p>
                                    <p>Tirana, Albania</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-blue-400" />
                                <p>+355 123 456 789</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-blue-400" />
                                <p>info@taku.al</p>
                            </div>
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
