'use client';

import { useState } from 'react';
import { Heart, Star, MapPin, Calendar, Phone, Trash2 } from 'lucide-react';
import Link from 'next/link';

// Mock favorites data
const mockFavorites = [
    {
        id: 2,
        name: "Mike's Modern Barbershop",
        category: "Barbershop",
        rating: 4.8,
        reviews: 189,
        location: "Midtown",
        distance: "0.8 miles",
        image: "/api/placeholder/300/200",
        price: "$",
        services: ["Haircut", "Beard Trim", "Hot Towel"],
        phone: "(555) 234-5678",
        lastVisit: "2 weeks ago",
        totalVisits: 5
    },
    {
        id: 5,
        name: "Elite Fitness & Wellness",
        category: "Fitness",
        rating: 4.8,
        reviews: 312,
        location: "West End",
        distance: "1.5 miles",
        image: "/api/placeholder/300/200",
        price: "$$$",
        services: ["Personal Training", "Massage", "Nutrition"],
        phone: "(555) 567-8901",
        lastVisit: "1 month ago",
        totalVisits: 3
    },
    {
        id: 7,
        name: "Luxe Day Spa",
        category: "Spa",
        rating: 4.9,
        reviews: 156,
        location: "Downtown",
        distance: "0.4 miles",
        image: "/api/placeholder/300/200",
        price: "$$$",
        services: ["Facial", "Body Wrap", "Aromatherapy"],
        phone: "(555) 678-9012",
        lastVisit: "Never visited",
        totalVisits: 0
    },
    {
        id: 8,
        name: "The Style Studio",
        category: "Hair Salon",
        rating: 4.7,
        reviews: 234,
        location: "Uptown",
        distance: "1.1 miles",
        image: "/api/placeholder/300/200",
        price: "$$",
        services: ["Color", "Extensions", "Styling"],
        phone: "(555) 789-0123",
        lastVisit: "3 months ago",
        totalVisits: 2
    },
    {
        id: 9,
        name: "Wellness Center Plus",
        category: "Wellness",
        rating: 4.6,
        reviews: 98,
        location: "East Side",
        distance: "2.2 miles",
        image: "/api/placeholder/300/200",
        price: "$$",
        services: ["Massage", "Acupuncture", "Yoga"],
        phone: "(555) 890-1234",
        lastVisit: "6 months ago",
        totalVisits: 1
    }
];

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState(mockFavorites);
    const [sortBy, setSortBy] = useState('recent');

    const removeFavorite = (id: number) => {
        setFavorites(prev => prev.filter(fav => fav.id !== id));
    };

    const sortedFavorites = [...favorites].sort((a, b) => {
        switch (sortBy) {
            case 'rating':
                return b.rating - a.rating;
            case 'distance':
                return parseFloat(a.distance) - parseFloat(b.distance);
            case 'name':
                return a.name.localeCompare(b.name);
            case 'visits':
                return b.totalVisits - a.totalVisits;
            default: // recent
                return b.id - a.id;
        }
    });

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Favorites</h1>
                <p className="text-gray-600">Your saved providers for quick access</p>
            </div>

            {favorites.length > 0 && (
                <>
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white border border-gray-200 rounded-lg p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-pink-100 text-sm">Total Favorites</p>
                                    <p className="text-2xl font-bold">{favorites.length}</p>
                                </div>
                                <Heart className="w-8 h-8 text-pink-200" />
                            </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-100 text-sm">Total Visits</p>
                                    <p className="text-2xl font-bold">
                                        {favorites.reduce((sum, fav) => sum + fav.totalVisits, 0)}
                                    </p>
                                </div>
                                <Calendar className="w-8 h-8 text-purple-200" />
                            </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-amber-100 text-sm">Avg. Rating</p>
                                    <p className="text-2xl font-bold">
                                        {(favorites.reduce((sum, fav) => sum + fav.rating, 0) / favorites.length).toFixed(1)}
                                    </p>
                                </div>
                                <Star className="w-8 h-8 text-amber-200" />
                            </div>
                        </div>
                    </div>

                    {/* Sort Options */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600 font-medium">Sort by:</span>
                            <select 
                                value={sortBy} 
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white"
                            >
                                <option value="recent">Recently Added</option>
                                <option value="rating">Highest Rated</option>
                                <option value="distance">Closest</option>
                                <option value="name">Name A-Z</option>
                                <option value="visits">Most Visited</option>
                            </select>
                        </div>
                    </div>

                    {/* Favorites Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedFavorites.map((favorite) => (
                            <div key={favorite.id} className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group  border border-gray-100">
                                {/* Image */}
                                <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    <button
                                        onClick={() => removeFavorite(favorite.id)}
                                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-red-50 transition-colors group"
                                    >
                                        <Heart className="w-5 h-5 text-red-500 fill-current group-hover:hidden" />
                                        <Trash2 className="w-5 h-5 text-red-500 hidden group-hover:block" />
                                    </button>
                                    <div className="absolute bottom-4 left-4">
                                        <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                                            {favorite.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {/* Header */}
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                            {favorite.name}
                                        </h3>
                                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                <span className="font-medium">{favorite.rating}</span>
                                                <span>({favorite.reviews})</span>
                                            </div>
                                            <span className="text-blue-600 font-medium">{favorite.price}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-600 text-sm">
                                            <MapPin className="w-4 h-4" />
                                            <span>{favorite.location} • {favorite.distance}</span>
                                        </div>
                                    </div>

                                    {/* Services */}
                                    <div className="mb-4">
                                        <div className="flex flex-wrap gap-2">
                                            {favorite.services.slice(0, 3).map((service, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                                >
                                                    {service}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Visit History */}
                                    <div className="mb-6">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Last visit:</span>
                                            <span className="font-medium text-gray-900">{favorite.lastVisit}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Total visits:</span>
                                            <span className="font-medium text-gray-900">{favorite.totalVisits}</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3">
                                        <Link 
                                            href={`/dashboard/providers/${favorite.id}`}
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 text-center "
                                        >
                                            View Profile
                                        </Link>
                                        <Link 
                                            href={`/dashboard/book/${favorite.id}`}
                                            className="flex items-center justify-center px-4 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <Calendar className="w-5 h-5" />
                                        </Link>
                                        <a 
                                            href={`tel:${favorite.phone}`}
                                            className="flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                        >
                                            <Phone className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {favorites.length === 0 && (
                <div className="text-center py-16">
                    <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-10 h-10 text-pink-500" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No favorites yet</h3>
                    <p className="text-gray-600 mb-6">
                        Start adding providers to your favorites for quick access
                    </p>
                    <Link 
                        href="/dashboard/providers"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        <Heart className="w-5 h-5" />
                        Browse Local Services
                    </Link>
                </div>
            )}
        </div>
    );
}