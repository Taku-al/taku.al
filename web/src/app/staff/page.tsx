'use client';

import { Calendar, DollarSign, Users, TrendingUp, Clock, Star, Phone, Mail, CheckCircle, XCircle, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getStaffStats, getStaffTodayAppointments, getStaffUpcomingAppointments, getStaffCompletedAppointments } from '@/lib/mockData';
import { useState } from 'react';

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

const formatCurrency = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
};

export default function StaffDashboard() {
    const stats = getStaffStats();
    const [todayAppointments] = useState(getStaffTodayAppointments());
    const [upcomingAppointments] = useState(getStaffUpcomingAppointments().slice(0, 5));
    const [recentCompletedAppointments] = useState(getStaffCompletedAppointments().slice(0, 3));

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                {/* Welcome Header */}
                <div className="mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">Welcome back, Provider!</h1>
                    <p className="text-lg text-gray-600">Here's your business overview for today</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {/* Today's Appointments */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                            <span className="text-sm font-medium text-green-600">Today</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.todayAppointments}</h3>
                        <p className="text-sm text-gray-600">Appointments Today</p>
                    </div>

                    {/* Today's Earnings */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <DollarSign className="w-6 h-6 text-green-600" />
                            </div>
                            <span className="text-sm font-medium text-green-600">Today</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{formatCurrency(stats.todayEarnings)}</h3>
                        <p className="text-sm text-gray-600">Today's Earnings</p>
                    </div>

                    {/* Total Clients */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <Users className="w-6 h-6 text-purple-600" />
                            </div>
                            <span className="text-sm font-medium text-purple-600">{stats.repeatClients} repeat</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalClients}</h3>
                        <p className="text-sm text-gray-600">Total Clients</p>
                    </div>

                    {/* Average Rating */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-yellow-100 rounded-lg">
                                <Star className="w-6 h-6 text-yellow-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-600">{stats.totalReviews} reviews</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.averageRating.toFixed(1)}</h3>
                        <p className="text-sm text-gray-600">Average Rating</p>
                    </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-medium text-blue-900">This Week</h4>
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-2xl font-bold text-blue-900 mb-1">{stats.weekAppointments} appointments</p>
                        <p className="text-lg font-semibold text-blue-700">{formatCurrency(stats.weekEarnings)} earned</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-medium text-green-900">This Month</h4>
                            <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-2xl font-bold text-green-900 mb-1">{stats.monthAppointments} appointments</p>
                        <p className="text-lg font-semibold text-green-700">{formatCurrency(stats.monthEarnings)} earned</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-medium text-purple-900">Completion Rate</h4>
                            <CheckCircle className="w-5 h-5 text-purple-600" />
                        </div>
                        <p className="text-2xl font-bold text-purple-900 mb-1">{stats.completionRate}%</p>
                        <p className="text-sm text-purple-700">Appointments completed</p>
                    </div>
                </div>

                {/* Today's Schedule */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Today's Schedule</h2>
                            <p className="text-gray-600">Your appointments for today</p>
                        </div>
                        <Link 
                            href="/staff/appointments"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                            View all
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {todayAppointments.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {todayAppointments.map((appointment) => (
                                <div key={appointment.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="flex items-center p-6">
                                        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                                            <img 
                                                src={appointment.customerImage} 
                                                alt={appointment.customerName}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 text-lg">{appointment.customerName}</h3>
                                                    <p className="text-sm text-gray-600">{appointment.serviceName}</p>
                                                </div>
                                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                                    {appointment.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-6 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{appointment.time} • {appointment.duration}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <DollarSign className="w-4 h-4" />
                                                    <span>{formatCurrency(appointment.price)}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Phone className="w-4 h-4" />
                                                    <span>{appointment.customerPhone}</span>
                                                </div>
                                            </div>
                                            {appointment.notes && (
                                                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                                    <p className="text-sm text-gray-700"><span className="font-medium">Notes:</span> {appointment.notes}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments today</h3>
                            <p className="text-gray-600">Enjoy your free day!</p>
                        </div>
                    )}
                </div>

                {/* Upcoming Appointments */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Upcoming Appointments</h2>
                            <p className="text-gray-600">Next appointments in your calendar</p>
                        </div>
                        <Link 
                            href="/staff/appointments"
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
                                    <div className="w-20 h-20 relative overflow-hidden">
                                        <img 
                                            src={appointment.customerImage} 
                                            alt={appointment.customerName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{appointment.customerName}</h3>
                                                <p className="text-sm text-gray-600">{appointment.serviceName}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-1 text-gray-500">
                                                <Calendar className="w-3 h-3" />
                                                <span>{formatDate(appointment.date)} at {appointment.time}</span>
                                            </div>
                                            <span className="font-medium text-gray-900">{formatCurrency(appointment.price)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Completed */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Recently Completed</h2>
                            <p className="text-gray-600">Your latest completed services</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recentCompletedAppointments.map((appointment) => (
                            <div key={appointment.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                                        <img 
                                            src={appointment.customerImage} 
                                            alt={appointment.customerName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{appointment.customerName}</h3>
                                        <p className="text-sm text-gray-600">{appointment.serviceName}</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Date</span>
                                        <span className="font-medium text-gray-900">{formatDate(appointment.date)}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Amount</span>
                                        <span className="font-medium text-green-600">{formatCurrency(appointment.price)}</span>
                                    </div>
                                    <div className="flex items-center gap-1 pt-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span className="text-sm text-green-600 font-medium">Completed</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link 
                        href="/staff/appointments"
                        className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Appointments</h3>
                        <p className="text-sm text-gray-600">View and manage your schedule</p>
                    </Link>

                    <Link 
                        href="/staff/services"
                        className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                                <Star className="w-6 h-6 text-green-600" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Services</h3>
                        <p className="text-sm text-gray-600">Manage your service offerings</p>
                    </Link>

                    <Link 
                        href="/staff/schedule"
                        className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                                <Clock className="w-6 h-6 text-purple-600" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Set Availability</h3>
                        <p className="text-sm text-gray-600">Manage your working hours</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}


