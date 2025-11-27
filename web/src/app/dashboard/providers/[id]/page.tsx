'use client';

import { useState, useEffect } from 'react';
import {
    ArrowLeft, MapPin, Star, Phone, Clock, Heart, Calendar, Check, Award, Users,
    Share2, Instagram, Facebook, Twitter, ExternalLink, ChevronLeft, ChevronRight,
    X, Zap, Shield, MapPin as Map, Car, Footprints, CreditCard, Info, AlertCircle,
    Filter, SortAsc, Camera, Play, Navigation, Building, Globe, Verified,
    TrendingUp, Timer, MessageCircle, ThumbsUp, Eye, Sparkles, Gift, Package
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProviderById } from '@/lib/mockData';
import type { Provider } from '@/lib/mockData';

export default function ProviderProfile() {
    const params = useParams();
    const [provider, setProvider] = useState<Provider | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [favorite, setFavorite] = useState(false);
    const [showLightbox, setShowLightbox] = useState(false);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [reviewFilter, setReviewFilter] = useState("Most Recent");
    const [showShareModal, setShowShareModal] = useState(false);
    const [selectedServiceCategory, setSelectedServiceCategory] = useState(0);
    const [showFloatingBooking, setShowFloatingBooking] = useState(false);
    const [showAllServices, setShowAllServices] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
    const [isBookingLoading, setIsBookingLoading] = useState(false);
    const [showAllAvailability, setShowAllAvailability] = useState(false);

    // Consolidate all useEffects to maintain hook order
    useEffect(() => {
        // Load provider data
        if (params.id) {
            const providerId = parseInt(params.id as string);
            const foundProvider = getProviderById(providerId);
            setProvider(foundProvider ?? null);
            if (foundProvider) {
                setFavorite(foundProvider.favorite);
            }
        }

        // Setup scroll handler
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            setShowFloatingBooking(scrollY > viewportHeight * 0.5);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [params.id]);

    const reviewFilters = ["Most Recent", "Highest Rated", "With Photos", "Verified Only"];

    if (!provider) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Provider not found</h1>
                    <Link 
                        href="/dashboard/providers"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Providers
                    </Link>
                </div>
            </div>
        );
    }

    const filteredReviews = provider.reviewsData.filter(review => {
        switch (reviewFilter) {
            case "Highest Rated": return review.rating === 5;
            case "With Photos": return review.photos;
            case "Verified Only": return review.verified;
            default: return true;
        }
    }).sort((a, b) => {
        if (reviewFilter === "Highest Rated") {
            return b.rating - a.rating;
        }
        return 0; // Keep original order for "Most Recent"
    });

    const nextImage = () => {
        setSelectedImage((prev) => (prev + 1) % provider.images.length);
    };

    const previousImage = () => {
        setSelectedImage((prev) => (prev - 1 + provider.images.length) % provider.images.length);
    };

    const shareUrl = () => {
        if (navigator.share) {
            navigator.share({
                title: provider.name,
                text: `Check out ${provider.name} - ${provider.tagline}`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            setShowShareModal(true);
            setTimeout(() => setShowShareModal(false), 2000);
        }
    };

    const handleBookService = (serviceName: string) => {
        window.location.href = `/dashboard/book/${params.id}?service=${encodeURIComponent(serviceName)}`;
    };

    const handleTimeSlotSelect = (slot: string) => {
        setSelectedTimeSlot(slot);
        setIsBookingLoading(true);
        
        // Simulate booking process
        setTimeout(() => {
            window.location.href = `/dashboard/book/${params.id}?time=${encodeURIComponent(slot)}`;
        }, 800);
    };

    const handleGetDirections = () => {
        const address = encodeURIComponent(provider.fullAddress);
        window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
    };

    // Generate some mock previous services for variety
    const previousServices = provider.serviceCategories.length > 0 ? [
        {
            name: provider.serviceCategories[0].services[0]?.name || "Service",
            duration: provider.serviceCategories[0].services[0]?.duration || "60 min",
            price: provider.serviceCategories[0].services[0]?.price || 100,
            lastVisit: "2 weeks ago",
            category: provider.serviceCategories[0].name
        }
    ] : [];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8">
                {/* Enhanced Breadcrumb Navigation */}
                <div className="mb-8">
                    <nav className="flex items-center space-x-2 text-sm text-gray-500">
                        <Link href="/dashboard" className="hover:text-gray-700 transition-colors font-medium">
                            Dashboard
                        </Link>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        <Link href="/dashboard/providers" className="hover:text-gray-700 transition-colors font-medium">
                            Providers
                        </Link>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900 font-medium">{provider.name}</span>
                    </nav>
                    <Link
                        href="/dashboard/providers"
                        className="inline-flex items-center gap-2 mt-3 text-gray-600 hover:text-gray-900 transition-all duration-200 text-sm font-medium hover:gap-3"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Providers
                    </Link>
                </div>

                {/* Hero Section with Full-Width Image and Grid Layout */}
                <div className="relative mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 lg:items-start">
                        {/* Hero Image - Full Width */}
                        <div className="lg:col-span-8">
                            <div className="relative h-[60vh] lg:h-[70vh] rounded-lg overflow-hidden group shadow-lg">
                                <img
                                    src={provider.images[selectedImage].url}
                                    alt={provider.images[selectedImage].title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                                {/* Navigation Arrows */}
                                {provider.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={previousImage}
                                            className="absolute left-6 top-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                                            style={{ transform: 'translateY(-50%)' }}
                                        >
                                            <ChevronLeft className="w-5 h-5 text-gray-700" />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-6 top-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                                            style={{ transform: 'translateY(-50%)' }}
                                        >
                                            <ChevronRight className="w-5 h-5 text-gray-700" />
                                        </button>
                                    </>
                                )}

                                {/* View Photos Button */}
                                <button
                                    onClick={() => setShowLightbox(true)}
                                    className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-white transition-colors shadow-sm"
                                >
                                    <Camera className="w-4 h-4 text-gray-700" />
                                    <span className="text-sm font-medium text-gray-700">{provider.images.length} photos</span>
                                </button>

                                {/* Image Indicators */}
                                {provider.images.length > 1 && (
                                    <div className="absolute bottom-6 left-1/2 flex gap-2"
                                        style={{ transform: 'translateX(-50%)' }}>
                                        {provider.images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedImage(index)}
                                                className={`w-2 h-2 rounded-full transition-colors ${
                                                    index === selectedImage 
                                                        ? 'bg-white' 
                                                        : 'bg-white/50 hover:bg-white/75'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Status Badges */}
                                <div className="absolute top-6 left-6">
                                    <div className="flex flex-col gap-2">
                                        {/* Rating Badge */}
                                        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 shadow-sm">
                                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                            <span className="font-semibold text-gray-900">{provider.rating}</span>
                                        </div>
                                        
                                        {/* Availability Badge */}
                                        <div className="bg-green-600 text-white rounded-lg px-3 py-2 flex items-center gap-2 shadow-sm">
                                            <span className="font-medium text-sm">Available Today</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Hero Content Overlay - Direct on Image */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                                    <div className="max-w-4xl">
                                        <div className="flex items-start justify-between gap-6 mb-6">
                                            <div className="flex-1">
                                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-tight drop-shadow-lg">
                                                    {provider.name}
                                                </h1>
                                                <p className="text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-md mb-6">
                                                    {provider.tagline}
                                                </p>
                                            </div>
                                            <div className="flex gap-2 flex-shrink-0">
                                                <button
                                                    onClick={shareUrl}
                                                    className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 flex items-center justify-center transition-colors"
                                                >
                                                    <Share2 className="w-4 h-4 text-white" />
                                                </button>
                                                <button
                                                    onClick={() => setFavorite(!favorite)}
                                                    className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 flex items-center justify-center transition-colors"
                                                >
                                                    <Heart
                                                        className={`w-4 h-4 transition-colors ${
                                                            favorite ? 'text-red-400 fill-current' : 'text-white'
                                                        }`}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                        {/* Stats */}
                                        <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4 text-white" />
                                                <span className="text-white text-sm font-medium">{provider.stats.bookedThisWeek} booked this week</span>
                                            </div>
                                            <div className="w-px h-4 bg-white/30"></div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-white text-sm font-medium">{provider.stats.ranking}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Streamlined Booking Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="bg-white rounded-xl shadow-lg border border-gray-200 lg:sticky lg:top-8 overflow-hidden">
                                {/* Header */}
                                <div className="p-6 bg-blue-600 text-white">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                                <span className="text-xl font-bold">{provider.rating}</span>
                                            </div>
                                        </div>
                                        <div className="bg-white/20 rounded-lg px-3 py-1">
                                            <span className="text-white text-xs font-medium">Verified</span>
                                        </div>
                                    </div>
                                    
                                    {/* Availability Notice */}
                                    <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-white" />
                                            <div>
                                                <p className="text-white font-semibold">{provider.urgencyMessage}</p>
                                                <p className="text-blue-100 text-sm">Next available: {provider.nextSlot}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Time Slot Selection */}
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-gray-900">Available Today</h3>
                                    </div>
                                    
                                    {/* Time Slots */}
                                    <div className="mb-6">
                                        <div className="grid grid-cols-2 gap-3">
                                            {provider.todaySlots.slice(0, 4).map((slot, index) => (
                                                <button
                                                    key={index}
                                                    className={`px-4 py-3 text-center rounded-lg border-2 transition-colors ${
                                                        selectedTimeSlot === slot
                                                            ? 'bg-blue-600 border-blue-600 text-white'
                                                            : 'bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-900'
                                                    }`}
                                                    onClick={() => handleTimeSlotSelect(slot)}
                                                >
                                                    <div className="font-semibold">{slot}</div>
                                                    <div className="text-xs text-gray-500">Available</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Alternative Booking Option */}
                                    <div className="border-t border-gray-100 pt-6">
                                        <Link
                                            href={`/dashboard/book/${params.id}`}
                                            className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 hover:bg-gray-200 text-sm"
                                        >
                                            <Calendar className="w-4 h-4" />
                                            View All Available Times
                                        </Link>
                                    </div>
                                </div>

                                {/* Essential Info */}
                                <div className="border-t border-gray-100">
                                    <details className="group">
                                        <summary className="p-6 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors">
                                            <span className="font-medium text-gray-900">Location & Details</span>
                                            <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform" />
                                        </summary>
                                        <div className="px-6 pb-6">
                                            <div className="space-y-3 text-sm">
                                                <div className="flex items-center gap-3">
                                                    <MapPin className="w-4 h-4 text-gray-500" />
                                                    <span className="text-gray-700">{provider.distance} away</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Car className="w-4 h-4 text-gray-500" />
                                                    <span className="text-gray-700">{provider.parking.cost}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Phone className="w-4 h-4 text-gray-500" />
                                                    <button 
                                                        onClick={() => window.open(`tel:${provider.phone}`, '_self')}
                                                        className="text-emerald-600 hover:text-emerald-700 font-medium"
                                                    >
                                                        {provider.phone}
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={handleGetDirections}
                                                    className="w-full mt-4 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 shadow-sm hover:shadow-md"
                                                >
                                                    <Navigation className="w-4 h-4" />
                                                    Get Directions
                                                </button>
                                            </div>
                                        </div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services Section */}
                {provider.serviceCategories.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="mb-16 bg-white rounded-lg shadow-lg border border-slate-200 p-8 lg:p-12">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-semibold text-slate-900 mb-4">{category.name}</h2>
                            <p className="text-lg text-gray-500">{category.description}</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
                            {category.services.map((service, serviceIndex) => (
                                <div key={serviceIndex} className="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-500 flex flex-col h-full border-0 shadow-md">
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={service.image}
                                            alt={service.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                        {service.popular && (
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-orange-500 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                                                    <Sparkles className="w-3 h-3" />
                                                    POPULAR
                                                </span>
                                            </div>
                                        )}
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h4 className="text-white font-bold text-lg mb-1">{service.name}</h4>
                                            <div className="flex items-center gap-2 text-white text-opacity-90 text-sm">
                                                <Clock className="w-4 h-4" />
                                                <span>{service.duration}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-1">
                                        <p className="text-gray-600 mb-4 leading-relaxed text-base">{service.description}</p>

                                        <div className="mb-4">
                                            {service.benefits && (
                                                <div className="grid grid-cols-1 gap-2">
                                                    {service.benefits.slice(0, 3).map((benefit, idx) => (
                                                        <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                                                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                                            <span className="text-sm text-gray-700 font-medium truncate">{benefit}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-auto border-t border-gray-100 pt-6">
                                            <div className="flex items-center justify-between mb-6">
                                                <div>
                                                    <span className="text-3xl font-light text-gray-900">
                                                        ${service.variations ? service.variations[0].price : service.price}
                                                    </span>
                                                    {service.variations && service.variations.length > 1 && (
                                                        <span className="text-gray-400 text-base ml-2">
                                                            - ${service.variations[service.variations.length - 1].price}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleBookService(service.name)}
                                                className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* About & Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16 lg:mt-20">
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-lg border border-slate-200 p-8 lg:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">About {provider.name}</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">{provider.description}</p>

                        {/* Specialties */}
                        <div className="mb-6">
                            <h3 className="font-semibold text-gray-900 mb-3">Specialties</h3>
                            <div className="flex flex-wrap gap-2">
                                {provider.specialties.map((specialty, index) => (
                                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium">
                                        {specialty}
                                    </span>
                                ))}
                                <span className="bg-green-100 text-green-700 px-3 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                                    <Verified className="w-3 h-3" />
                                    Verified
                                </span>
                            </div>
                        </div>

                        {/* Hours */}
                        <div className="mb-6">
                            <h3 className="font-semibold text-gray-900 mb-3">Hours</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {Object.entries(provider.hours).map(([day, hours]) => {
                                    const isToday = day.toLowerCase() === new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
                                    return (
                                        <div key={day} className={`flex justify-between text-sm p-2 rounded-lg ${isToday ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                                            }`}>
                                            <span className={`capitalize font-medium ${isToday ? 'text-blue-900' : 'text-gray-900'
                                                }`}>
                                                {day}{isToday && <span className="ml-1 text-blue-600 text-xs">(Today)</span>}
                                            </span>
                                            <span className={isToday ? 'text-blue-700 font-medium' : 'text-gray-600'}>
                                                {hours}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-8">
                        <h3 className="font-semibold text-gray-900 mb-4">Location & Info</h3>
                        <div className="space-y-4 text-sm">
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin className="w-4 h-4 text-gray-600" />
                                    <span className="font-medium text-gray-900">Address</span>
                                </div>
                                <p className="text-gray-700">{provider.fullAddress}</p>
                                <p className="text-gray-500 text-xs mt-1">{provider.driveTime} • {provider.walkTime}</p>
                            </div>

                            <div className="p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Car className="w-4 h-4 text-gray-600" />
                                    <span className="font-medium text-gray-900">Parking</span>
                                </div>
                                <p className="text-gray-700">{provider.parking.type}</p>
                                <p className="text-green-600 text-xs font-medium mt-1">{provider.parking.cost}</p>
                            </div>

                            <div className="p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Users className="w-4 h-4 text-gray-600" />
                                    <span className="font-medium text-gray-900">This Week</span>
                                </div>
                                <p className="text-gray-700">{provider.stats.bookedThisWeek} bookings</p>
                                <p className="text-blue-600 text-xs mt-1">{provider.stats.ranking}</p>
                            </div>

                            <Link
                                href={`/dashboard/book/${params.id}`}
                                className="inline-flex items-center justify-center w-full gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
                            >
                                <Calendar className="w-4 h-4" />
                                Book Appointment
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl z-50">
                    <p className="text-sm">Link copied to clipboard!</p>
                </div>
            )}

            {/* Enhanced Mobile Floating Booking */}
            {showFloatingBooking && (
                <div className="fixed bottom-4 left-4 right-4 lg:bottom-6 lg:left-auto lg:right-6 lg:max-w-sm z-40 transform transition-all duration-500 animate-in slide-in-from-bottom-4">
                    <div className="bg-white rounded-lg lg:rounded-lg shadow-lg border-0 p-4 lg:p-6">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                                    <img
                                        src={provider.images[0].url}
                                        alt={provider.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 text-sm">{provider.name}</h4>
                                    <p className="text-xs text-orange-600 font-medium">{provider.urgencyMessage}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowFloatingBooking(false)}
                                className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            >
                                <X className="w-3 h-3 text-gray-600" />
                            </button>
                        </div>
                        
                        <Link
                            href={`/dashboard/book/${params.id}`}
                            className="inline-flex items-center justify-center w-full gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <Calendar className="w-4 h-4" />
                            View All Times
                        </Link>
                    </div>
                </div>
            )}

            {/* Lightbox Modal */}
            {showLightbox && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="relative max-w-4xl w-full">
                        <button
                            onClick={() => setShowLightbox(false)}
                            className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200 z-10"
                        >
                            <X className="w-5 h-5 text-gray-800" />
                        </button>
                        <img
                            src={provider.images[selectedImage].url}
                            alt={provider.images[selectedImage].title}
                            className="w-full h-auto object-contain rounded-lg"
                            style={{ maxHeight: '80vh' }}
                        />
                        <div className="absolute bottom-4 left-1/2 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg px-6 py-3"
                            style={{ transform: 'translateX(-50%)' }}>
                            <p className="font-semibold text-gray-900">{provider.images[selectedImage].title}</p>
                            <p className="text-sm text-gray-600">{provider.images[selectedImage].description}</p>
                        </div>
                        {provider.images.length > 1 && (
                            <>
                                <div className="absolute top-1/2 left-4" style={{ transform: 'translateY(-50%)' }}>
                                    <button
                                        onClick={previousImage}
                                        className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-slate-800" />
                                    </button>
                                </div>
                                <div className="absolute top-1/2 right-4" style={{ transform: 'translateY(-50%)' }}>
                                    <button
                                        onClick={nextImage}
                                        className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200"
                                    >
                                        <ChevronRight className="w-5 h-5 text-slate-800" />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}