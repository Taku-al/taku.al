'use client';

import { useState } from 'react';
import { 
    Search, Filter, MapPin, Star, Clock, Heart, Calendar, 
    Grid3X3, List, Map, Zap, Verified, TrendingUp, ChevronDown,
    Users, Sparkles, Award, Navigation, SortAsc,
    Car, Footprints, Quote, Timer, Quote as QuoteIcon, Flame,
    Eye, Camera, Phone
} from 'lucide-react';
import Link from 'next/link';

import { mockProviders, toggleFavorite } from '@/lib/mockData';
import type { Provider } from '@/lib/mockData';


const categories = ["All", "Spa", "Barbershop", "Hair Salon", "Nail Salon", "Fitness", "Beauty Salon"];
const quickFilters = ["Available Now", "Highly Rated", "Walking Distance", "< 1 mile", "< 3 miles", "Popular", "Verified"];
const sortOptions = ["Distance", "Rating", "Price: Low to High", "Price: High to Low", "Availability"];
const distanceFilters = ["Walking Distance", "< 1 mile", "< 3 miles", "< 5 miles"];

export default function ProvidersPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedQuickFilters, setSelectedQuickFilters] = useState<string[]>([]);
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
    const [sortBy, setSortBy] = useState("Distance");
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [showDistanceMenu, setShowDistanceMenu] = useState(false);
    const [selectedDistance, setSelectedDistance] = useState("< 5 miles");
    const [showMap, setShowMap] = useState(false);
    const [providers, setProviders] = useState<Provider[]>(mockProviders);

    const filteredProviders = providers.filter(provider => {
        const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            provider.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === "All" || provider.category === selectedCategory;
        
        let matchesQuickFilters = true;
        if (selectedQuickFilters.length > 0) {
            matchesQuickFilters = selectedQuickFilters.every(filter => {
                switch(filter) {
                    case "Available Now": 
                        return provider.availability.includes("today") || provider.availability.includes("Available");
                    case "Highly Rated": 
                        return provider.rating >= 4.7;
                    case "Walking Distance": 
                        return parseFloat(provider.distance) <= 0.5;
                    case "< 1 mile": 
                        return parseFloat(provider.distance) <= 1.0;
                    case "< 3 miles": 
                        return parseFloat(provider.distance) <= 3.0;
                    case "Popular": 
                        return provider.isPopular;
                    case "Verified": 
                        return provider.isVerified;
                    default: return true;
                }
            });
        }
        
        return matchesSearch && matchesCategory && matchesQuickFilters;
    });

    const handleToggleFavorite = (id: number) => {
        toggleFavorite(id);
        setProviders([...mockProviders]); // Refresh providers to show updated favorite status
    };

    const toggleQuickFilter = (filter: string) => {
        setSelectedQuickFilters(prev => 
            prev.includes(filter) 
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        );
    };

    const getAvailabilityColor = (availability: string) => {
        if (availability.includes("today") || availability.includes("Available")) {
            return "text-green-700 bg-green-100 border border-green-200";
        } else if (availability.includes("tomorrow")) {
            return "text-amber-700 bg-amber-100 border border-amber-200";
        } else {
            return "text-red-700 bg-red-100 border border-red-200";
        }
    };


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                        <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">Providers</span>
                    </nav>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Local Service Providers
                            </h1>
                            <p className="text-gray-600">Find and book appointments with verified professionals</p>
                        </div>
                        <div className="hidden lg:flex items-center space-x-3">
                            <div className="relative">
                                <button
                                    onClick={() => setShowDistanceMenu(!showDistanceMenu)}
                                    className="flex items-center space-x-2 bg-white px-3 py-2 border border-gray-300 rounded-lg hover:border-gray-400"
                                >
                                    <span className="text-sm text-gray-700">{selectedDistance}</span>
                                    <ChevronDown className="w-4 h-4 text-gray-500" />
                                </button>
                                {showDistanceMenu && (
                                    <div className="absolute top-10 right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-[140px]">
                                        {distanceFilters.map((distance) => (
                                            <button
                                                key={distance}
                                                onClick={() => {
                                                    setSelectedDistance(distance);
                                                    setShowDistanceMenu(false);
                                                }}
                                                className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
                                            >
                                                {distance}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search providers or services..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>
                        )}
                    </div>

                    {/* Category Filters */}
                    <div className="mb-4">
                        <div className="flex items-center gap-2 overflow-x-auto">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                                        selectedCategory === category
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Filters */}
                    <div className="mb-4">
                        <div className="flex items-center gap-2 flex-wrap">
                            {quickFilters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => toggleQuickFilter(filter)}
                                    className={`px-3 py-1 rounded text-sm ${
                                        selectedQuickFilters.includes(filter)
                                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                            : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* View Controls and Sort */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center bg-gray-100 rounded-lg">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg ${
                                        viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
                                    }`}
                                >
                                    <Grid3X3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg ${
                                        viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
                                    }`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setShowSortMenu(!showSortMenu)}
                                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:border-gray-400"
                            >
                                <span className="text-sm">Sort: {sortBy}</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            {showSortMenu && (
                                <div className="absolute top-10 right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-[180px]">
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => {
                                                setSortBy(option);
                                                setShowSortMenu(false);
                                            }}
                                            className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="text-lg font-medium text-gray-900">
                            {filteredProviders.length} provider{filteredProviders.length !== 1 ? 's' : ''} found
                        </p>
                        {(selectedCategory !== "All" || selectedQuickFilters.length > 0) && (
                            <p className="text-gray-600 text-sm mt-1">
                                {selectedCategory !== "All" && `in ${selectedCategory}`}
                                {selectedCategory !== "All" && selectedQuickFilters.length > 0 && " • "}
                                {selectedQuickFilters.length > 0 && `Filters: ${selectedQuickFilters.join(', ')}`}
                            </p>
                        )}
                    </div>
                </div>

                {/* Provider Cards */}
                <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
                    {filteredProviders.map((provider) => (
                        <div 
                            key={provider.id} 
                            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col h-full"
                        >
                            {/* Image Section */}
                            <div className="relative h-52">
                                <img 
                                    src={provider.images[0].url} 
                                    alt={provider.name}
                                    className="w-full h-full object-cover"
                                />
                                
                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex gap-2">
                                    {provider.isVerified && (
                                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                                            Verified
                                        </span>
                                    )}
                                    {provider.isPopular && (
                                        <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                                            Popular
                                        </span>
                                    )}
                                </div>

                                {/* Favorite button */}
                                <button
                                    onClick={() => handleToggleFavorite(provider.id)}
                                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                                >
                                    <Heart 
                                        className={`w-5 h-5 ${
                                            provider.favorite ? 'text-red-500 fill-current' : 'text-gray-600'
                                        }`} 
                                    />
                                </button>

                                {/* Category */}
                                <div className="absolute bottom-4 left-4">
                                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                                        {provider.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-5 flex flex-col h-full">
                                {/* Header */}
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                                        {provider.name}
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                <span className="font-semibold text-gray-900">{provider.rating}</span>
                                            </div>
                                            <span className="text-gray-500 text-sm">({provider.reviews} reviews)</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-gray-900">${provider.minPrice} - ${provider.maxPrice}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-2 text-gray-600 mb-4">
                                    <MapPin className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm">{provider.location} • {provider.distance}</span>
                                </div>

                                {/* Services */}
                                <div className="mb-4 min-h-[60px] flex items-start">
                                    <div className="flex flex-wrap gap-2">
                                        {provider.services.slice(0, 3).map((service, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                                            >
                                                {service}
                                            </span>
                                        ))}
                                        {provider.services.length > 3 && (
                                            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                                                +{provider.services.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Availability */}
                                <div className="mb-6 min-h-[80px] flex flex-col justify-start">
                                    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${getAvailabilityColor(provider.availability)} w-fit`}>
                                        <Clock className="w-4 h-4" />
                                        <span>{provider.availability}</span>
                                    </div>
                                    <div className="text-sm text-gray-600 mt-2 min-h-[20px]">
                                        {provider.nextSlot ? (
                                            <>Next available: <span className="font-medium">{provider.nextSlot}</span></>
                                        ) : (
                                            <span className="opacity-0">Placeholder</span>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons - Always at bottom */}
                                <div className="grid grid-cols-2 gap-3 mt-auto">
                                    <Link 
                                        href={`/dashboard/providers/${provider.id}`}
                                        className="inline-flex items-center justify-center px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-md border border-gray-300 transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                    >
                                        View Profile
                                    </Link>
                                    <Link 
                                        href={`/dashboard/book/${provider.id}`}
                                        className="inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredProviders.length === 0 && (
                    <div className="text-center py-24">
                        <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Search className="w-12 h-12 text-blue-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">No providers found</h3>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                            We couldn't find any providers matching your criteria. Try adjusting your search or filters.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedCategory("All");
                                    setSelectedQuickFilters([]);
                                }}
                                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                            >
                                Clear All Filters
                            </button>
                            <button
                                onClick={() => setShowAdvancedFilters(true)}
                                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                            >
                                Advanced Search
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 