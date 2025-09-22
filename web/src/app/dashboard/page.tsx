'use client';

import { Calendar, Users, Star, Clock, Heart, ArrowRight, MapPin, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { getUpcomingBookings, getRecentBookings, getFavoriteProviders, getPopularProviders, toggleFavorite, mockProviders } from '@/lib/mockData';
import { useState, useEffect } from 'react';

// Format date helper
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow';
    } else {
        const diffTime = date.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays > 0 && diffDays <= 7) {
            return date.toLocaleDateString('en-US', { weekday: 'long' });
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    }
};

const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        return 'Today';
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else if (diffDays < 14) {
        return 'Last week';
    } else if (diffDays < 21) {
        return '2 weeks ago';
    } else if (diffDays < 30) {
        return '3 weeks ago';
    } else {
        return 'Last month';
    }
};

export default function Dashboard() {
    const [upcomingAppointments, setUpcomingAppointments] = useState(getUpcomingBookings());
    const [recentBookings, setRecentBookings] = useState(getRecentBookings());
    const [favoriteProviders, setFavoriteProviders] = useState(getFavoriteProviders());
    const [exploreProviders, setExploreProviders] = useState(mockProviders.slice(2, 5)); // Show different providers

    const handleBookAgain = (booking: any) => {
        // Navigate to booking page with pre-filled service
        window.location.href = `/dashboard/book/${booking.providerId}?service=${encodeURIComponent(booking.serviceName)}`;
    };

    const handleToggleFavorite = (providerId: number) => {
        toggleFavorite(providerId);
        setFavoriteProviders(getFavoriteProviders());
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                {/* Welcome Header */}
                <div className="mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">Welcome back!</h1>
                    <p className="text-lg text-gray-600">Here's what's happening with your appointments and favorites</p>
                </div>

                {/* Coming Soon Section */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
                            <p className="text-gray-600">Your upcoming appointments</p>
                        </div>
                        <Link 
                            href="/dashboard/bookings"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                            View all
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {upcomingAppointments.map((appointment) => (
                            <div key={appointment.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="flex">
                                    <div className="w-24 h-24 relative overflow-hidden">
                                        <img 
                                            src={appointment.image} 
                                            alt={appointment.serviceName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 p-6">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{appointment.serviceName}</h3>
                                                <p className="text-sm text-gray-600">{appointment.providerName}</p>
                                            </div>
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                                {appointment.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{formatDate(appointment.date)}, {appointment.time}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                <span>{appointment.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {upcomingAppointments.length === 0 && (
                            <div className="col-span-2 text-center py-12">
                                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming appointments</h3>
                                <p className="text-gray-600 mb-4">Book your next service to see it here</p>
                                <Link 
                                    href="/dashboard/providers"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                                >
                                    Browse Services
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recently Booked Section */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Recently Booked</h2>
                            <p className="text-gray-600">Services you've enjoyed recently</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {recentBookings.map((booking) => (
                            <div key={booking.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="flex">
                                    <div className="w-24 h-24 relative overflow-hidden">
                                        <img 
                                            src={booking.image} 
                                            alt={booking.serviceName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 p-6">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{booking.serviceName}</h3>
                                                <p className="text-sm text-gray-600">{booking.providerName}</p>
                                            </div>
                                            {booking.rating && (
                                                <div className="flex items-center gap-1">
                                                    {[...Array(booking.rating)].map((_, i) => (
                                                        <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">{formatTimeAgo(booking.date)}</span>
                                            {booking.canRebook && (
                                                <button 
                                                    onClick={() => handleBookAgain(booking)}
                                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                                                >
                                                    Book Again
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {recentBookings.length === 0 && (
                            <div className="col-span-2 text-center py-12">
                                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No recent bookings</h3>
                                <p className="text-gray-600">Your completed appointments will appear here</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Favourites Section */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Favourites</h2>
                            <p className="text-gray-600">Your saved providers and go-to places</p>
                        </div>
                        <Link 
                            href="/dashboard/favorites"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                            View all
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {favoriteProviders.map((provider) => (
                            <div key={provider.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="flex">
                                    <Link 
                                        href={`/dashboard/providers/${provider.id}`}
                                        className="w-24 h-24 relative overflow-hidden block"
                                    >
                                        <img 
                                            src={provider.images[0].url} 
                                            alt={provider.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </Link>
                                    <div className="flex-1 p-6">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <Link 
                                                    href={`/dashboard/providers/${provider.id}`}
                                                    className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                                                >
                                                    {provider.name}
                                                </Link>
                                                <p className="text-sm text-gray-600">{provider.category}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                    <span className="text-sm font-medium text-gray-900">{provider.rating}</span>
                                                </div>
                                                <button
                                                    onClick={() => handleToggleFavorite(provider.id)}
                                                    className="p-1 text-red-500 hover:text-red-600 transition-colors"
                                                >
                                                    <Heart className="w-4 h-4 fill-current" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">{provider.distance}</span>
                                            <span className="text-green-600 font-medium">{provider.availability}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {favoriteProviders.length === 0 && (
                            <div className="col-span-2 text-center py-12">
                                <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
                                <p className="text-gray-600 mb-4">Save providers you love to see them here</p>
                                <Link 
                                    href="/dashboard/providers"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                                >
                                    Discover Providers
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Explore Providers Section */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Explore Providers</h2>
                            <p className="text-gray-600">Discover new services and local professionals</p>
                        </div>
                        <Link 
                            href="/dashboard/providers"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            View all providers
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {exploreProviders.map((provider) => (
                            <Link 
                                key={provider.id}
                                href={`/dashboard/providers/${provider.id}`}
                                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 block"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src={provider.images[0].url} 
                                        alt={provider.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {provider.isPopular && (
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                                <Sparkles className="w-3 h-3" />
                                                Popular
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute bottom-4 left-4">
                                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                                            {provider.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                                            {provider.name}
                                        </h3>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                            <span className="text-sm font-medium text-gray-900">{provider.rating}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">{provider.distance}</span>
                                        <span className="font-medium text-gray-900">From ${provider.minPrice}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}