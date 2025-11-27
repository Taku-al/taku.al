'use client';

import { Plus, Edit, Trash2, DollarSign, Clock, Star, TrendingUp, Users } from 'lucide-react';
import { mockProviders } from '@/lib/mockData';
import { useState } from 'react';

const formatCurrency = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
};

export default function StaffServices() {
    // Using the first provider's data as the logged-in staff member's services
    const [provider] = useState(mockProviders[0]!);
    const allServices = provider.serviceCategories.flatMap(cat => 
        cat.services.map(service => ({
            ...service,
            category: cat.name,
            isActive: true,
            bookingsThisMonth: Math.floor(Math.random() * 30) + 10,
            revenue: service.price * (Math.floor(Math.random() * 30) + 10),
        }))
    );

    const [services, setServices] = useState(allServices);

    const totalRevenue = services.reduce((sum, service) => sum + service.revenue, 0);
    const totalBookings = services.reduce((sum, service) => sum + service.bookingsThisMonth, 0);
    const averagePrice = services.reduce((sum, service) => sum + service.price, 0) / services.length;
    const activeServices = services.filter(s => s.isActive).length;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">Your Services</h1>
                        <p className="text-lg text-gray-600">Manage your service offerings and pricing</p>
                    </div>
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm">
                        <Plus className="w-5 h-5" />
                        Add New Service
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Star className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{activeServices}</h3>
                        <p className="text-sm text-gray-600">Active Services</p>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <DollarSign className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{formatCurrency(totalRevenue)}</h3>
                        <p className="text-sm text-gray-600">Total Revenue (This Month)</p>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <Users className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalBookings}</h3>
                        <p className="text-sm text-gray-600">Total Bookings (This Month)</p>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-orange-100 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{formatCurrency(averagePrice)}</h3>
                        <p className="text-sm text-gray-600">Average Service Price</p>
                    </div>
                </div>

                {/* Services by Category */}
                {provider.serviceCategories.map((category) => (
                    <div key={category.name} className="mb-12">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h2>
                            <p className="text-gray-600">{category.description}</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {category.services.map((service) => {
                                const serviceData = services.find(s => s.name === service.name);
                                return (
                                    <div key={service.name} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                                        <div className="flex">
                                            {/* Service Image */}
                                            <div className="w-32 h-32 flex-shrink-0 relative overflow-hidden">
                                                <img 
                                                    src={service.image} 
                                                    alt={service.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                {service.popular && (
                                                    <div className="absolute top-2 left-2">
                                                        <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                                                            Popular
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Service Details */}
                                            <div className="flex-1 p-6">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{service.name}</h3>
                                                        <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 mb-4">
                                                    <div className="flex items-center gap-2">
                                                        <DollarSign className="w-4 h-4 text-gray-400" />
                                                        <div>
                                                            <p className="text-sm text-gray-600">Price</p>
                                                            <p className="font-semibold text-gray-900">{formatCurrency(service.price)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-gray-400" />
                                                        <div>
                                                            <p className="text-sm text-gray-600">Duration</p>
                                                            <p className="font-semibold text-gray-900">{service.duration}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Performance Stats */}
                                                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-gray-600">Bookings this month:</span>
                                                        <span className="font-medium text-gray-900">{serviceData?.bookingsThisMonth}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-sm mt-1">
                                                        <span className="text-gray-600">Revenue:</span>
                                                        <span className="font-medium text-green-600">{formatCurrency(serviceData?.revenue || 0)}</span>
                                                    </div>
                                                </div>

                                                {/* Benefits */}
                                                <div className="mb-4">
                                                    <p className="text-xs font-medium text-gray-700 mb-2">Benefits:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {service.benefits.map((benefit, idx) => (
                                                            <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                                                {benefit}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex gap-2">
                                                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                                                        <Edit className="w-4 h-4" />
                                                        Edit
                                                    </button>
                                                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors">
                                                        <Trash2 className="w-4 h-4" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Service Packages */}
                {provider.packages.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Packages</h2>
                                <p className="text-gray-600">Bundle services for better value</p>
                            </div>
                            <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                                <Plus className="w-4 h-4" />
                                Add Package
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {provider.packages.map((pkg) => (
                                <div key={pkg.name} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                                            <p className="text-gray-600 mb-3">{pkg.description}</p>
                                        </div>
                                        {pkg.popular && (
                                            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                                                Popular
                                            </span>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-sm font-medium text-gray-700 mb-2">Includes:</p>
                                        <ul className="space-y-1">
                                            {pkg.services.map((service, idx) => (
                                                <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                                    {service}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex items-center gap-2 mb-4">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">{pkg.duration}</span>
                                    </div>

                                    <div className="flex items-end justify-between mb-4 pb-4 border-b border-gray-200">
                                        <div>
                                            <p className="text-sm text-gray-600 line-through">{formatCurrency(pkg.regularPrice)}</p>
                                            <p className="text-2xl font-bold text-gray-900">{formatCurrency(pkg.packagePrice)}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-green-600 font-medium">Save {formatCurrency(pkg.savings)}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </button>
                                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


