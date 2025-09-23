'use client';

import { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, Star, MoreVertical, X, Edit, RefreshCw } from 'lucide-react';
import Link from 'next/link';

// Mock booking data
const mockBookings = [
    {
        id: 1,
        provider: "Bella's Spa & Wellness",
        service: "Deep Cleansing Facial",
        date: new Date(2024, 2, 15, 14, 0), // March 15, 2024, 2:00 PM
        duration: "60 min",
        price: 85,
        status: "upcoming",
        providerPhone: "(555) 123-4567",
        location: "123 Main St, Downtown",
        canCancel: true,
        canReschedule: true
    },
    {
        id: 2,
        provider: "Mike's Modern Barbershop",
        service: "Haircut & Beard Trim",
        date: new Date(2024, 2, 20, 10, 30), // March 20, 2024, 10:30 AM
        duration: "45 min",
        price: 45,
        status: "upcoming",
        providerPhone: "(555) 234-5678",
        location: "456 Oak Ave, Midtown",
        canCancel: true,
        canReschedule: true
    },
    {
        id: 3,
        provider: "Sarah's Hair Studio",
        service: "Cut & Color",
        date: new Date(2024, 1, 28, 16, 0), // February 28, 2024, 4:00 PM
        duration: "120 min",
        price: 150,
        status: "completed",
        providerPhone: "(555) 345-6789",
        location: "789 Pine St, Uptown",
        canCancel: false,
        canReschedule: false,
        rating: 5,
        review: "Absolutely amazing! Sarah did an incredible job with my highlights."
    },
    {
        id: 4,
        provider: "Zen Nail Lounge",
        service: "Manicure & Pedicure",
        date: new Date(2024, 1, 15, 13, 0), // February 15, 2024, 1:00 PM
        duration: "75 min",
        price: 65,
        status: "completed",
        providerPhone: "(555) 456-7890",
        location: "321 Elm St, East Side",
        canCancel: false,
        canReschedule: false,
        rating: 4
    },
    {
        id: 5,
        provider: "Bella's Spa & Wellness",
        service: "Swedish Massage",
        date: new Date(2024, 1, 10, 11, 0), // February 10, 2024, 11:00 AM
        duration: "90 min",
        price: 120,
        status: "cancelled",
        providerPhone: "(555) 123-4567",
        location: "123 Main St, Downtown",
        canCancel: false,
        canReschedule: false
    }
];

export default function BookingsPage() {
    const [bookings, setBookings] = useState(mockBookings);
    const [selectedTab, setSelectedTab] = useState('all');
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [bookingToCancel, setBookingToCancel] = useState<number | null>(null);
    const [showRescheduleModal, setShowRescheduleModal] = useState(false);
    const [bookingToReschedule, setBookingToReschedule] = useState<number | null>(null);

    const filteredBookings = bookings.filter(booking => {
        if (selectedTab === 'all') return true;
        return booking.status === selectedTab;
    });

    const upcomingBookings = bookings.filter(b => b.status === 'upcoming').length;
    const completedBookings = bookings.filter(b => b.status === 'completed').length;
    const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;

    const handleCancelBooking = (bookingId: number) => {
        setBookings(prev => prev.map(booking => 
            booking.id === bookingId ? { ...booking, status: 'cancelled' as const } : booking
        ));
        setShowCancelModal(false);
        setBookingToCancel(null);
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'upcoming': return 'bg-blue-100 text-blue-600';
            case 'completed': return 'bg-green-100 text-green-600';
            case 'cancelled': return 'bg-red-100 text-red-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const isUpcoming = (date: Date) => {
        return date > new Date();
    };

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
                <p className="text-gray-600">Manage your appointments and view booking history</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Upcoming</p>
                            <p className="text-2xl font-bold text-gray-900">{upcomingBookings}</p>
                        </div>
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Completed</p>
                            <p className="text-2xl font-bold text-gray-900">{completedBookings}</p>
                        </div>
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Clock className="w-5 h-5 text-green-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Cancelled</p>
                            <p className="text-2xl font-bold text-gray-900">{cancelledBookings}</p>
                        </div>
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <X className="w-5 h-5 text-red-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="mb-8">
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                    {[
                        { key: 'all', label: 'All Bookings' },
                        { key: 'upcoming', label: 'Upcoming' },
                        { key: 'completed', label: 'Completed' },
                        { key: 'cancelled', label: 'Cancelled' }
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setSelectedTab(tab.key)}
                            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                                selectedTab === tab.key
                                    ? 'bg-white text-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
                {filteredBookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-xl font-bold text-gray-900">{booking.provider}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                    {booking.status === 'upcoming' && (
                                        <div className="relative">
                                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Service & Time */}
                                <div className="grid md:grid-cols-2 gap-6 mb-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">{booking.service}</h4>
                                        <div className="space-y-2 text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span className="text-sm">{formatDate(booking.date)}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                <span className="text-sm">{formatTime(booking.date)} • {booking.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                <span className="text-sm">{booking.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">Total Price</span>
                                            <span className="font-bold text-blue-600 text-lg">${booking.price}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Phone className="w-4 h-4" />
                                            <span className="text-sm">{booking.providerPhone}</span>
                                        </div>

                                        {/* Rating for completed bookings */}
                                        {booking.status === 'completed' && booking.rating && (
                                            <div className="flex items-center gap-1 mt-3">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${
                                                            i < booking.rating! ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                                        }`}
                                                    />
                                                ))}
                                                <span className="text-sm text-gray-600 ml-2">{booking.rating}/5</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Review for completed bookings */}
                                {booking.status === 'completed' && booking.review && (
                                    <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                                        <p className="text-sm text-gray-600 italic">"{booking.review}"</p>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4 border-t border-gray-100">
                                    {booking.status === 'upcoming' && (
                                        <>
                                            {booking.canReschedule && (
                                                <button 
                                                    onClick={() => {
                                                        setBookingToReschedule(booking.id);
                                                        setShowRescheduleModal(true);
                                                    }}
                                                    className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                                                >
                                                    <RefreshCw className="w-4 h-4" />
                                                    Reschedule
                                                </button>
                                            )}
                                            {booking.canCancel && (
                                                <button 
                                                    onClick={() => {
                                                        setBookingToCancel(booking.id);
                                                        setShowCancelModal(true);
                                                    }}
                                                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                    Cancel
                                                </button>
                                            )}
                                        </>
                                    )}
                                    {booking.status === 'completed' && !booking.rating && (
                                        <Link 
                                            href={`/dashboard/reviews/new?booking=${booking.id}`}
                                            className="flex items-center gap-2 px-4 py-2 text-yellow-600 hover:bg-yellow-50 rounded-xl transition-colors"
                                        >
                                            <Star className="w-4 h-4" />
                                            Leave Review
                                        </Link>
                                    )}
                                    <Link 
                                        href={`/dashboard/providers/${booking.id}`}
                                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
                                    >
                                        View Provider
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredBookings.length === 0 && (
                <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No bookings found</h3>
                    <p className="text-gray-600 mb-6">
                        {selectedTab === 'all' 
                            ? "You haven't made any bookings yet"
                            : `No ${selectedTab} bookings`
                        }
                    </p>
                    <Link 
                        href="/dashboard/providers"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-medium transition-colors"
                    >
                        <Calendar className="w-5 h-5" />
                        Book Your First Appointment
                    </Link>
                </div>
            )}

            {/* Cancel Confirmation Modal */}
            {showCancelModal && bookingToCancel && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Cancel Booking</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to cancel this booking? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowCancelModal(false);
                                    setBookingToCancel(null);
                                }}
                                className="flex-1 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-2xl font-medium transition-colors"
                            >
                                Keep Booking
                            </button>
                            <button
                                onClick={() => handleCancelBooking(bookingToCancel)}
                                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-medium transition-colors"
                            >
                                Cancel Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reschedule Modal */}
            {showRescheduleModal && bookingToReschedule && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Reschedule Booking</h3>
                        <p className="text-gray-600 mb-6">
                            Would you like to reschedule this booking to a different date or time?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowRescheduleModal(false);
                                    setBookingToReschedule(null);
                                }}
                                className="flex-1 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-2xl font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <Link
                                href={`/dashboard/book/${bookingToReschedule}?reschedule=true`}
                                onClick={() => {
                                    setShowRescheduleModal(false);
                                    setBookingToReschedule(null);
                                }}
                                className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-medium transition-colors text-center"
                            >
                                Reschedule
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}