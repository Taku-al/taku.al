import { MapPin, Star, Calendar } from 'lucide-react';

export default function NearMe() {
    const nearbyBusinesses = [
        {
            id: 1,
            name: "Elegant Hair Studio",
            category: "Hair Salon",
            rating: 4.8,
            distance: "0.3 km",
            image: "/api/placeholder/300/200",
            reviews: 124
        },
        {
            id: 2,
            name: "Gentleman's Barber",
            category: "Barbershop",
            rating: 4.9,
            distance: "0.7 km",
            image: "/api/placeholder/300/200",
            reviews: 89
        },
        {
            id: 3,
            name: "Zen Wellness Spa",
            category: "Spa",
            rating: 4.7,
            distance: "1.2 km",
            image: "/api/placeholder/300/200",
            reviews: 156
        },
        {
            id: 4,
            name: "Nail Art Studio",
            category: "Nail Salon",
            rating: 4.6,
            distance: "0.8 km",
            image: "/api/placeholder/300/200",
            reviews: 67
        },
        {
            id: 5,
            name: "Bliss Beauty Center",
            category: "Beauty Clinic",
            rating: 4.8,
            distance: "1.5 km",
            image: "/api/placeholder/300/200",
            reviews: 203
        },
        {
            id: 6,
            name: "Serenity Massage",
            category: "Massage Therapy",
            rating: 4.9,
            distance: "0.9 km",
            image: "/api/placeholder/300/200",
            reviews: 178
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
                            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
                        >
                            {/* Business Image */}
                            <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20"></div>
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                                    <MapPin className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm font-semibold text-gray-700">{business.distance}</span>
                                </div>
                            </div>

                            {/* Business Info */}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{business.name}</h3>
                                        <p className="text-blue-600 font-medium">{business.category}</p>
                                    </div>
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

                                {/* Book Button - Changed from "View" to "Book" */}
                                <button className="cursor-pointer w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Simplified CTA Section - Single button */}
                <div className="text-center mt-12">
                    <p className="text-gray-600 mb-6">Looking for more options in your area?</p>
                    <button className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                        View All Businesses
                    </button>
                </div>
            </div>
        </section>
    );
}
