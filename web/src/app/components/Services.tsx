import { Scissors, Brush, Sparkles, Heart, Hand, Grid3x3, Waves, Users } from 'lucide-react';
import Link from 'next/link';

export default function Services() {
    // Simplified to 5 core business types
    const businessTypes = [
        {
            id: 1,
            title: "Hair & Beauty",
            description: "Professional hair styling, cutting, coloring, and beauty treatments from top-rated salons",
            icon: Brush,
            category: "beauty",
        },
        {
            id: 2,
            title: "Men's Grooming",
            description: "Classic and modern barbering services for men's grooming and styling needs",
            icon: Users,
            category: "grooming",
        },
        {
            id: 3,
            title: "Spa & Wellness",
            description: "Relaxing spa treatments, massages, and wellness therapies for ultimate relaxation",
            icon: Waves,
            category: "wellness",
        },
        {
            id: 4,
            title: "Nail Care",
            description: "Professional manicures, pedicures, and nail art from skilled technicians",
            icon: Hand,
            category: "beauty",
        },
        {
            id: 5,
            title: "Massage Therapy",
            description: "Professional massage and therapeutic services from licensed therapists",
            icon: Heart,
            category: "wellness",
        }
    ];

    const categories = [
        { id: "all", name: "All Services", icon: Grid3x3, count: businessTypes.length },
        { id: "beauty", name: "Beauty & Hair", icon: Sparkles, count: businessTypes.filter(b => b.category === "beauty").length },
        { id: "grooming", name: "Men's Grooming", icon: Scissors, count: businessTypes.filter(b => b.category === "grooming").length },
        { id: "wellness", name: "Wellness & Spa", icon: Waves, count: businessTypes.filter(b => b.category === "wellness").length }
    ];

    return (
        <section id="services" className="py-16 md:py-24" style={{ backgroundColor: '#f2f2f2' }}>
            {/* Hero Section */}
            <div className="text-center mb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ color: '#1E1E1E' }}>
                        Discover Amazing Businesses
                    </h2>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#9a9696' }}>
                        Book appointments with the best hair salons, barbershops, spas, and wellness centers in your area.
                    </p>
                </div>
            </div>

            {/* Category Filter */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
                <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/dashboard/providers?category=${encodeURIComponent(category.name.replace('& ', ''))}`}
                            className="flex flex-col md:flex-row items-center gap-2 md:gap-3 p-4 md:px-6 md:py-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-colors"
                        >
                            <category.icon className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                            <div className="text-center md:text-left">
                                <div className="font-semibold text-sm md:text-base text-gray-900">{category.name}</div>
                                <div className="text-xs md:text-sm text-gray-600">{category.count} categories</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Business Types Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {businessTypes.map((business) => (
                        <div
                            key={business.id}
                            className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all p-8"
                        >
                            <div className="w-16 h-16 mb-6 bg-blue-100 rounded-lg flex items-center justify-center">
                                <business.icon className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">
                                {business.title}
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {business.description}
                            </p>
                            <Link 
                                href="/dashboard/providers"
                                className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Explore Services
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <div className="text-center">
                    <div className="bg-white rounded-lg border border-gray-200 p-12">
                        <h3 className="text-3xl font-bold mb-6 text-gray-900">
                            Ready to Book Your Appointment?
                        </h3>
                        <p className="text-lg mb-8 leading-relaxed text-gray-600">
                            Discover amazing local businesses and book with trusted professionals.
                        </p>
                        <Link 
                            href="/dashboard/providers"
                            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-base font-medium rounded-md transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
