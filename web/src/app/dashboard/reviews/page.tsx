'use client';

import { useState } from 'react';
import { Star, Edit, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';

// Mock reviews data
const mockReviews = [
    {
        id: 1,
        provider: "Bella's Spa & Wellness",
        service: "Deep Cleansing Facial",
        rating: 5,
        date: "February 28, 2024",
        review: "Absolutely amazing experience! The facial was incredible and the staff was so professional. My skin feels rejuvenated and glowing. I'll definitely be back for more treatments!",
        helpful: 12,
        location: "Downtown"
    },
    {
        id: 2,
        provider: "Mike's Modern Barbershop",
        service: "Haircut & Beard Trim",
        rating: 5,
        date: "February 20, 2024",
        review: "Mike is a true artist! Best haircut I've had in years. He really listened to what I wanted and delivered perfectly. The atmosphere is great too - will be coming back regularly.",
        helpful: 8,
        location: "Midtown"
    },
    {
        id: 3,
        provider: "Zen Nail Lounge",
        service: "Manicure & Pedicure",
        rating: 4,
        date: "February 15, 2024",
        review: "Really nice experience overall. The nail art was beautiful and the staff was friendly. Only complaint is that it took a bit longer than expected, but the quality was worth it.",
        helpful: 5,
        location: "East Side"
    },
    {
        id: 4,
        provider: "Sarah's Hair Studio",
        service: "Cut & Color",
        rating: 5,
        date: "January 30, 2024",
        review: "Sarah is amazing! She completely transformed my hair with the most beautiful highlights. The color is exactly what I wanted and the cut is perfect. Highly recommend!",
        helpful: 15,
        location: "Uptown"
    },
    {
        id: 5,
        provider: "The Beauty Bar",
        service: "Eyebrow Threading",
        rating: 4,
        date: "January 22, 2024",
        review: "Good service and clean facility. The eyebrow threading was well done and the shape looks great. Pricing is reasonable too. Would recommend to others.",
        helpful: 3,
        location: "City Center"
    }
];

export default function ReviewsPage() {
    const [reviews, setReviews] = useState(mockReviews);
    const [sortBy, setSortBy] = useState('recent');

    const sortedReviews = [...reviews].sort((a, b) => {
        switch (sortBy) {
            case 'rating':
                return b.rating - a.rating;
            case 'helpful':
                return b.helpful - a.helpful;
            case 'oldest':
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            default: // recent
                return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
    });

    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    const totalHelpful = reviews.reduce((sum, review) => sum + review.helpful, 0);

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Reviews</h1>
                <p className="text-gray-600">Your reviews and ratings for providers</p>
            </div>

            {reviews.length > 0 && (
                <>
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white border border-gray-200 rounded-lg p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-amber-100 text-sm">Total Reviews</p>
                                    <p className="text-2xl font-bold">{reviews.length}</p>
                                </div>
                                <Star className="w-8 h-8 text-amber-200" />
                            </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100 text-sm">Average Rating</p>
                                    <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
                                </div>
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-6 h-6 ${
                                                i < Math.round(averageRating) ? 'text-blue-200 fill-current' : 'text-blue-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-100 text-sm">Helpful Votes</p>
                                    <p className="text-2xl font-bold">{totalHelpful}</p>
                                </div>
                                <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                                    <span className="text-green-700 font-bold text-sm">👍</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sort Options and Write Review Button */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600 font-medium">Sort by:</span>
                            <select 
                                value={sortBy} 
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white"
                            >
                                <option value="recent">Most Recent</option>
                                <option value="oldest">Oldest First</option>
                                <option value="rating">Highest Rated</option>
                                <option value="helpful">Most Helpful</option>
                            </select>
                        </div>
                        <Link 
                            href="/dashboard/bookings"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                            <Star className="w-5 h-5" />
                            Write New Review
                        </Link>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-6">
                        {sortedReviews.map((review) => (
                            <div key={review.id} className="bg-white rounded-lg shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{review.provider}</h3>
                                        <div className="flex items-center gap-4 mb-2">
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-5 h-5 ${
                                                            i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-gray-600">•</span>
                                            <span className="text-gray-600">{review.service}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{review.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                <span>{review.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                        <Edit className="w-5 h-5 text-gray-400" />
                                    </button>
                                </div>

                                {/* Review Text */}
                                <div className="mb-6">
                                    <p className="text-gray-700 leading-relaxed">{review.review}</p>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-gray-600">
                                            {review.helpful} people found this helpful
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Link 
                                            href={`/dashboard/providers/${review.id}`}
                                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                        >
                                            View Provider
                                        </Link>
                                        <button className="text-sm text-gray-600 hover:text-gray-800 font-medium">
                                            Edit Review
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {reviews.length === 0 && (
                <div className="text-center py-16">
                    <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Star className="w-10 h-10 text-amber-500" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No reviews yet</h3>
                    <p className="text-gray-600 mb-6">
                        Complete your first appointment to leave a review
                    </p>
                    <Link 
                        href="/dashboard/bookings"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        <Calendar className="w-5 h-5" />
                        View My Bookings
                    </Link>
                </div>
            )}
        </div>
    );
}