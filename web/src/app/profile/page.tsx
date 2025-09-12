'use client';

import {useState} from 'react';
import {
    User,
    Mail,
    Phone,
    Camera,
    Edit3,
    Save,
    X,
    Calendar,
    CheckCircle,
    XCircle,
    Bell,
    Settings,
    Heart,
    Star,
} from 'lucide-react';

// Dummy data for customer profile
const dummyCustomerData = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@email.com',
    phone: '+1 (555) 123-4567',
    profilePicture: null,
    preferences: {
        preferredServices: ['Haircut & Styling', 'Manicure', 'Facial Treatment'],
        preferredStaff: ['Emma Wilson', 'Lisa Chen'],
        specialRequests: 'Please use organic products when possible',
        allergies: 'None',
        notes: 'Prefers morning appointments'
    },
    bookingHistory: {
        pastAppointments: [
            {
                id: '1',
                service: 'Haircut & Styling',
                staff: 'Emma Wilson',
                date: '2024-01-15',
                time: '10:00 AM',
                status: 'completed',
                rating: 5,
                notes: 'Great service, very satisfied!'
            },
            {
                id: '2',
                service: 'Manicure',
                staff: 'Lisa Chen',
                date: '2024-01-08',
                time: '2:00 PM',
                status: 'completed',
                rating: 4,
                notes: 'Beautiful nail art!'
            },
            {
                id: '3',
                service: 'Facial Treatment',
                staff: 'Emma Wilson',
                date: '2023-12-20',
                time: '11:00 AM',
                status: 'completed',
                rating: 5,
                notes: 'Skin felt amazing after treatment'
            }
        ],
        upcomingAppointments: [
            {
                id: '4',
                service: 'Hair Color & Highlights',
                staff: 'Emma Wilson',
                date: '2024-02-10',
                time: '9:00 AM',
                status: 'confirmed',
                notes: 'First time trying highlights'
            },
            {
                id: '5',
                service: 'Pedicure',
                staff: 'Lisa Chen',
                date: '2024-02-15',
                time: '3:00 PM',
                status: 'confirmed',
                notes: 'Valentine\'s Day special'
            }
        ],
        cancellations: [
            {
                id: '6',
                service: 'Eyebrow Shaping',
                staff: 'Emma Wilson',
                date: '2024-01-20',
                time: '1:00 PM',
                status: 'cancelled',
                reason: 'Emergency came up'
            }
        ]
    },
    notifications: {
        email: true,
        sms: true,
        push: false,
        marketing: true,
        reminders: {
            appointmentReminder: 24, // hours before
            birthdayReminder: true,
            specialOffers: true
        }
    },
    paymentMethods: [
        {
            id: '1',
            type: 'card',
            last4: '4242',
            brand: 'Visa',
            expiryMonth: 12,
            expiryYear: 2025,
            isDefault: true
        },
        {
            id: '2',
            type: 'card',
            last4: '5555',
            brand: 'Mastercard',
            expiryMonth: 8,
            expiryYear: 2026,
            isDefault: false
        }
    ]
};

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [formData, setFormData] = useState(dummyCustomerData);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        console.log('Saving profile data:', formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData(dummyCustomerData);
        setIsEditing(false);
    };

    const tabs = [
        {id: 'overview', label: 'Overview', icon: User},
        {id: 'bookings', label: 'Bookings', icon: Calendar},
        {id: 'preferences', label: 'Preferences', icon: Settings},
        {id: 'notifications', label: 'Notifications', icon: Bell},
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <div
                                    className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                    {formData.firstName[0]}{formData.lastName[0]}
                                </div>
                                {isEditing && (
                                    <button
                                        className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-1 hover:bg-blue-700 transition-colors">
                                        <Camera className="w-3 h-3"/>
                                    </button>
                                )}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {formData.firstName} {formData.lastName}
                                </h1>
                                <p className="text-gray-600">{formData.email}</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        <Save className="w-4 h-4 mr-2"/>
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        <X className="w-4 h-4 mr-2"/>
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Edit3 className="w-4 h-4 mr-2"/>
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="flex gap-6">
                    {/* Left Sidebar - Navigation Tabs */}
                    <div className="w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg shadow-sm">
                            <nav className="p-4 space-y-2">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                                                activeTab === tab.id
                                                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                            }`}
                                        >
                                            <Icon className="w-5 h-5 mr-3"/>
                                            {tab.label}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Right Content - Tab Content */}
                    <div className="flex-1">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            {activeTab === 'overview' && (
                                <div className="space-y-6">
                                    {/* Basic Information */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    First Name
                                                </label>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={formData.firstName}
                                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                ) : (
                                                    <p className="text-gray-900">{formData.firstName}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Last Name
                                                </label>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={formData.lastName}
                                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                ) : (
                                                    <p className="text-gray-900">{formData.lastName}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email Address
                                                </label>
                                                {isEditing ? (
                                                    <input
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                ) : (
                                                    <div className="flex items-center">
                                                        <Mail className="w-4 h-4 text-gray-400 mr-2"/>
                                                        <p className="text-gray-900">{formData.email}</p>
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Phone Number
                                                </label>
                                                {isEditing ? (
                                                    <input
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                ) : (
                                                    <div className="flex items-center">
                                                        <Phone className="w-4 h-4 text-gray-400 mr-2"/>
                                                        <p className="text-gray-900">{formData.phone}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )}

                            {activeTab === 'bookings' && (
                                <div className="space-y-6">
                                    {/* Upcoming Appointments */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming
                                            Appointments</h3>
                                        <div className="space-y-4">
                                            {formData.bookingHistory.upcomingAppointments.map((appointment) => (
                                                <div key={appointment.id}
                                                     className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-4">
                                                            <div
                                                                className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                                <Calendar className="w-6 h-6 text-blue-600"/>
                                                            </div>
                                                            <div>
                                                                <h4 className="font-medium text-gray-900">{appointment.service}</h4>
                                                                <p className="text-sm text-gray-600">with {appointment.staff}</p>
                                                                <p className="text-sm text-gray-500">
                                                                    {new Date(appointment.date).toLocaleDateString('en-US', {
                                                                        weekday: 'long',
                                                                        year: 'numeric',
                                                                        month: 'long',
                                                                        day: 'numeric'
                                                                    })} at {appointment.time}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                          <span
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {appointment.status}
                          </span>
                                                            <button
                                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                                Reschedule
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Past Appointments */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Past Appointments</h3>
                                        <div className="space-y-4">
                                            {formData.bookingHistory.pastAppointments.map((appointment) => (
                                                <div key={appointment.id}
                                                     className="border border-gray-200 rounded-lg p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-4">
                                                            <div
                                                                className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                                                <CheckCircle className="w-6 h-6 text-gray-600"/>
                                                            </div>
                                                            <div>
                                                                <h4 className="font-medium text-gray-900">{appointment.service}</h4>
                                                                <p className="text-sm text-gray-600">with {appointment.staff}</p>
                                                                <p className="text-sm text-gray-500">
                                                                    {new Date(appointment.date).toLocaleDateString('en-US', {
                                                                        weekday: 'long',
                                                                        year: 'numeric',
                                                                        month: 'long',
                                                                        day: 'numeric'
                                                                    })} at {appointment.time}
                                                                </p>
                                                                {appointment.notes && (
                                                                    <p className="text-sm text-gray-500 mt-1 italic">"{appointment.notes}"</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <div className="flex items-center">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        className={`w-4 h-4 ${
                                                                            i < appointment.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                                        }`}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <button
                                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                                Book Again
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Cancellations */}
                                    {formData.bookingHistory.cancellations.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cancellations</h3>
                                            <div className="space-y-4">
                                                {formData.bookingHistory.cancellations.map((appointment) => (
                                                    <div key={appointment.id}
                                                         className="border border-red-200 rounded-lg p-4 bg-red-50">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center space-x-4">
                                                                <div
                                                                    className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                                                    <XCircle className="w-6 h-6 text-red-600"/>
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-medium text-gray-900">{appointment.service}</h4>
                                                                    <p className="text-sm text-gray-600">with {appointment.staff}</p>
                                                                    <p className="text-sm text-gray-500">
                                                                        {new Date(appointment.date).toLocaleDateString('en-US', {
                                                                            weekday: 'long',
                                                                            year: 'numeric',
                                                                            month: 'long',
                                                                            day: 'numeric'
                                                                        })} at {appointment.time}
                                                                    </p>
                                                                    <p className="text-sm text-red-600 mt-1">Reason: {appointment.reason}</p>
                                                                </div>
                                                            </div>
                                                            <span
                                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {appointment.status}
                          </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'preferences' && (
                                <div className="space-y-6">
                                    {/* Preferred Services */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferred Services</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.preferences.preferredServices.map((service, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                                                >
                      {service}
                    </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Preferred Staff */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferred Staff</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.preferences.preferredStaff.map((staff, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                                                >
                      {staff}
                    </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Special Requests */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Special Requests &
                                            Notes</h3>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-gray-700">{formData.preferences.specialRequests}</p>
                                        </div>
                                    </div>

                                    {/* Allergies */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Allergies &
                                            Sensitivities</h3>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-gray-700">{formData.preferences.allergies}</p>
                                        </div>
                                    </div>

                                    {/* Additional Notes */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h3>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-gray-700">{formData.preferences.notes}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="space-y-6">
                                    {/* Notification Preferences */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification
                                            Preferences</h3>
                                        <div className="space-y-4">
                                            <div
                                                className="flex items-center justify-between py-3 border-b border-gray-200">
                                                <div className="flex items-center">
                                                    <Mail className="w-5 h-5 text-gray-400 mr-3"/>
                                                    <div>
                                                        <p className="font-medium text-gray-900">Email Notifications</p>
                                                        <p className="text-sm text-gray-500">Receive updates via
                                                            email</p>
                                                    </div>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.notifications.email}
                                                        className="sr-only peer"
                                                    />
                                                    <div
                                                        className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>

                                            <div
                                                className="flex items-center justify-between py-3 border-b border-gray-200">
                                                <div className="flex items-center">
                                                    <Phone className="w-5 h-5 text-gray-400 mr-3"/>
                                                    <div>
                                                        <p className="font-medium text-gray-900">SMS Notifications</p>
                                                        <p className="text-sm text-gray-500">Receive updates via text
                                                            message</p>
                                                    </div>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.notifications.sms}
                                                        className="sr-only peer"
                                                    />
                                                    <div
                                                        className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>

                                            <div
                                                className="flex items-center justify-between py-3 border-b border-gray-200">
                                                <div className="flex items-center">
                                                    <Bell className="w-5 h-5 text-gray-400 mr-3"/>
                                                    <div>
                                                        <p className="font-medium text-gray-900">Push Notifications</p>
                                                        <p className="text-sm text-gray-500">Receive push notifications
                                                            on your device</p>
                                                    </div>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.notifications.push}
                                                        className="sr-only peer"
                                                    />
                                                    <div
                                                        className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>

                                            <div className="flex items-center justify-between py-3">
                                                <div className="flex items-center">
                                                    <Heart className="w-5 h-5 text-gray-400 mr-3"/>
                                                    <div>
                                                        <p className="font-medium text-gray-900">Marketing
                                                            Communications</p>
                                                        <p className="text-sm text-gray-500">Receive special offers and
                                                            promotions</p>
                                                    </div>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.notifications.marketing}
                                                        className="sr-only peer"
                                                    />
                                                    <div
                                                        className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Reminder Settings */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Reminder Settings</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Appointment Reminder
                                                </label>
                                                <select
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                                    <option value="1">1 hour before</option>
                                                    <option value="24" selected>24 hours before</option>
                                                    <option value="48">48 hours before</option>
                                                    <option value="168">1 week before</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
