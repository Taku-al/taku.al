import { MapPin, Star, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function NearMe() {
    // Use real provider data from dashboard
    const nearbyBusinesses = [
        {
            id: 1,
            name: "Bella's Spa & Wellness",
            category: "Spa",
            rating: 4.9,
            distance: "0.3 miles",
            image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            reviews: 245
        },
        {
            id: 2,
            name: "Mike's Modern Barbershop",
            category: "Barbershop",
            rating: 4.8,
            distance: "0.8 miles",
            image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            reviews: 189
        },
        {
            id: 3,
            name: "Sarah's Hair Studio",
            category: "Hair Salon",
            rating: 4.7,
            distance: "1.2 miles",
            image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            reviews: 156
        },
        {
            id: 4,
            name: "Zen Nail Lounge",
            category: "Nail Salon",
            rating: 4.6,
            distance: "2.1 miles",
            image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            reviews: 203
        },
        {
            id: 5,
            name: "Elite Fitness & Wellness",
            category: "Fitness",
            rating: 4.8,
            distance: "1.5 miles",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            reviews: 312
        },
        {
            id: 6,
            name: "The Beauty Bar",
            category: "Beauty Salon",
            rating: 4.9,
            distance: "0.6 miles",
            image: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            reviews: 278
        }
    ];

    return (
        <section id="near-me" className="py-16 md:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <MapPin className="w-8 h-8 text-blue-600" />
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Discover Services Near You
                        </h2>
                    </div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Find top-rated beauty and wellness businesses in your area
                    </p>
                </div>

                {/* Business Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {nearbyBusinesses.map((business) => (
                        <div
                            key={business.id}
                            className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all overflow-hidden"
                        >
                            {/* Business Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={business.image} 
                                    alt={business.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-1 border border-gray-200">
                                    <MapPin className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm font-semibold text-gray-700">{business.distance}</span>
                                </div>
                            </div>

                            {/* Business Info */}
                            <div className="p-6">
                                <div className="mb-3">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{business.name}</h3>
                                    <p className="text-blue-600 font-medium">{business.category}</p>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${
                                                    i < Math.floor(business.rating)
                                                        ? 'text-yellow-400 fill-current'
                                                        : 'text-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="font-semibold text-gray-700">{business.rating}</span>
                                    <span className="text-gray-500">({business.reviews} reviews)</span>
                                </div>

                                {/* Book Button */}
                                <Link 
                                    href={`/dashboard/book/${business.id}`}
                                    className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 gap-2"
                                >
                                    <Calendar className="w-4 h-4" />
                                    Book Now
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center mt-12">
                    <p className="text-gray-600 mb-6">Looking for more options in your area?</p>
                    <Link 
                        href="/dashboard/providers"
                        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-base font-medium rounded-md transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        View All Businesses
                    </Link>
                </div>
            </div>
        </section>
    );
}
