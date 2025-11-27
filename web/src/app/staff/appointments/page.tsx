'use client';

import { Calendar, Clock, DollarSign, Phone, Mail, User, CheckCircle, XCircle, AlertCircle, Filter, Search } from 'lucide-react';
import { mockStaffAppointments, updateAppointmentStatus } from '@/lib/mockData';
import type { StaffAppointment } from '@/lib/mockData';
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
            return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
    }
};

const formatCurrency = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
};

const getStatusColor = (status: StaffAppointment['status']): string => {
    switch (status) {
        case 'upcoming':
            return 'bg-blue-100 text-blue-700';
        case 'completed':
            return 'bg-green-100 text-green-700';
        case 'cancelled':
            return 'bg-red-100 text-red-700';
        case 'no-show':
            return 'bg-orange-100 text-orange-700';
        default:
            return 'bg-gray-100 text-gray-700';
    }
};

const getStatusIcon = (status: StaffAppointment['status']) => {
    switch (status) {
        case 'upcoming':
            return <Clock className="w-4 h-4" />;
        case 'completed':
            return <CheckCircle className="w-4 h-4" />;
        case 'cancelled':
            return <XCircle className="w-4 h-4" />;
        case 'no-show':
            return <AlertCircle className="w-4 h-4" />;
        default:
            return <Clock className="w-4 h-4" />;
    }
};

export default function StaffAppointments() {
    const [appointments, setAppointments] = useState(mockStaffAppointments);
    const [filterStatus, setFilterStatus] = useState<'all' | StaffAppointment['status']>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const handleStatusChange = (appointmentId: number, newStatus: StaffAppointment['status']) => {
        updateAppointmentStatus(appointmentId, newStatus);
        setAppointments([...mockStaffAppointments]);
    };

    const filteredAppointments = appointments
        .filter(apt => filterStatus === 'all' || apt.status === filterStatus)
        .filter(apt => 
            searchQuery === '' || 
            apt.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            apt.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const upcomingCount = appointments.filter(apt => apt.status === 'upcoming').length;
    const completedCount = appointments.filter(apt => apt.status === 'completed').length;
    const cancelledCount = appointments.filter(apt => apt.status === 'cancelled').length;
    const noShowCount = appointments.filter(apt => apt.status === 'no-show').length;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">Appointments</h1>
                    <p className="text-lg text-gray-600">Manage and track your appointments</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Clock className="w-5 h-5 text-blue-600" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{upcomingCount}</h3>
                        <p className="text-sm text-gray-600">Upcoming</p>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{completedCount}</h3>
                        <p className="text-sm text-gray-600">Completed</p>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <XCircle className="w-5 h-5 text-red-600" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{cancelledCount}</h3>
                        <p className="text-sm text-gray-600">Cancelled</p>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <AlertCircle className="w-5 h-5 text-orange-600" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{noShowCount}</h3>
                        <p className="text-sm text-gray-600">No Show</p>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by customer name or service..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-gray-400" />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Status</option>
                                <option value="upcoming">Upcoming</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="no-show">No Show</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Appointments List */}
                <div className="space-y-4">
                    {filteredAppointments.length > 0 ? (
                        filteredAppointments.map((appointment) => (
                            <div key={appointment.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="p-6">
                                    <div className="flex items-start gap-6">
                                        {/* Customer Image */}
                                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                                            <img 
                                                src={appointment.customerImage} 
                                                alt={appointment.customerName}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Appointment Details */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{appointment.customerName}</h3>
                                                    <p className="text-gray-600 mb-2">{appointment.serviceName}</p>
                                                    <div className="flex items-center gap-1">
                                                        {getStatusIcon(appointment.status)}
                                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                                                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-gray-900 mb-1">{formatCurrency(appointment.price)}</p>
                                                    <p className="text-sm text-gray-600">{appointment.duration}</p>
                                                </div>
                                            </div>

                                            {/* Date and Time */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Calendar className="w-4 h-4 text-gray-400" />
                                                    <span>{formatDate(appointment.date)} at {appointment.time}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Phone className="w-4 h-4 text-gray-400" />
                                                    <span>{appointment.customerPhone}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Mail className="w-4 h-4 text-gray-400" />
                                                    <span>{appointment.customerEmail}</span>
                                                </div>
                                            </div>

                                            {/* Notes */}
                                            {appointment.notes && (
                                                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                                    <p className="text-sm text-gray-700">
                                                        <span className="font-medium">Notes:</span> {appointment.notes}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Actions */}
                                            {appointment.status === 'upcoming' && (
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => handleStatusChange(appointment.id, 'completed')}
                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                                                    >
                                                        <CheckCircle className="w-4 h-4" />
                                                        Mark Completed
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(appointment.id, 'no-show')}
                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors"
                                                    >
                                                        <AlertCircle className="w-4 h-4" />
                                                        No Show
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
                            <p className="text-gray-600">No appointments match your current filters</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


