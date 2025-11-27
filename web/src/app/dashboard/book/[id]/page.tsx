'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, User, CreditCard, Check, ChevronLeft, ChevronRight, Star, Sparkles, Heart } from 'lucide-react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { getProviderById, createBooking } from '@/lib/mockData';
import type { Provider } from '@/lib/mockData';

// Mock user data (logged in user)
const mockUser = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    preferences: {
        favoriteServices: ["Swedish Relaxation Massage", "Signature Hydrating Facial"],
        lastVisit: "2 weeks ago"
    }
};

// Generate available dates (next 30 days, excluding some random unavailable dates)
const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    const unavailableDates = [5, 12, 18, 25]; // Some random unavailable dates
    
    for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        if (!unavailableDates.includes(date.getDate()) && date.getDay() !== 0) { // Exclude Sundays and specific dates
            dates.push(date);
        }
    }
    return dates;
};

// Generate available time slots based on date
const getAvailableTimeSlots = (date: Date) => {
    const allSlots = [
        "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
        "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
        "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"
    ];
    
    // Simulate some booked slots based on the day
    const dayOfWeek = date.getDay();
    const bookedSlots = dayOfWeek === 6 ? ["10:00 AM", "2:00 PM", "3:00 PM"] : ["11:00 AM", "4:00 PM"];
    
    return allSlots.filter(slot => !bookedSlots.includes(slot));
};

function generateCalendar(currentDate: Date) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const isToday = new Date().toDateString() === date.toDateString();
        const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
        days.push({ day, date, isToday, isPast });
    }
    
    return days;
}

export default function BookingPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const preSelectedService = searchParams.get('service');
    const preSelectedTime = searchParams.get('time');
    
    // Determine initial step based on what's pre-selected
    const getInitialStep = () => {
        if (preSelectedTime && !preSelectedService) return 1; // Time selected, need service
        if (preSelectedService && !preSelectedTime) return 2; // Service selected, need date/time
        if (!preSelectedService && !preSelectedTime) return 1; // Nothing selected, start with service
        return 3; // Both selected, go to confirmation
    };

    // All useState hooks must be declared before any early returns
    const [provider, setProvider] = useState<Provider | null>(null);
    const [currentStep, setCurrentStep] = useState(getInitialStep());
    const [selectedService, setSelectedService] = useState(preSelectedService || '');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState(preSelectedTime || '');
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [availableDates] = useState(generateAvailableDates());
    const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const [bookingId, setBookingId] = useState<string | null>(null);
    const [customerInfo, setCustomerInfo] = useState({
        name: mockUser.name,
        email: mockUser.email,
        phone: mockUser.phone,
        notes: ''
    });

    // All useEffect hooks must be declared before any early returns
    useEffect(() => {
        if (params.id) {
            const providerId = parseInt(params.id as string);
            const foundProvider = getProviderById(providerId);
            setProvider(foundProvider ?? null);
        }
    }, [params.id]);

    useEffect(() => {
        if (selectedDate) {
            setAvailableTimeSlots(getAvailableTimeSlots(selectedDate));
        }
    }, [selectedDate]);

    // Derived values after all hooks
    const service = provider?.serviceCategories.flatMap(cat => cat.services).find(s => s.name === selectedService);
    const calendarDays = generateCalendar(currentMonth);
    
    // Early return after all hooks are declared
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

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleBooking = () => {
        if (!selectedDate || !provider || !service) return;
        
        try {
            const booking = createBooking({
                providerId: provider.id,
                serviceName: selectedService,
                date: selectedDate.toISOString().split('T')[0],
                time: selectedTime,
                customerInfo: customerInfo,
                price: service.variations ? service.variations[0].price : service.price
            });
            
            setBookingId(booking.id.toString());
            setBookingConfirmed(true);
        } catch (error) {
            console.error('Booking failed:', error);
            // Handle error (could show error message to user)
        }
    };

    const canProceed = (step: number) => {
        switch (step) {
            case 1: return selectedService !== '';
            case 2: return selectedDate !== null && selectedTime !== '';
            default: return false;
        }
    };

    // Show booking confirmation if booking is completed
    if (bookingConfirmed) {
        return (
            <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
                <div className="text-center py-16">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Your appointment with {provider.name} has been successfully booked.
                    </p>
                    
                    <div className="bg-gray-50 rounded-lg p-6 mb-8 max-w-md mx-auto">
                        <h3 className="font-semibold text-gray-900 mb-4">Appointment Details</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Service:</span>
                                <span className="font-medium">{selectedService}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Date:</span>
                                <span className="font-medium">
                                    {selectedDate?.toLocaleDateString('en-US', { 
                                        weekday: 'long', 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Time:</span>
                                <span className="font-medium">{selectedTime}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total:</span>
                                <span className="font-medium">${service?.variations ? service.variations[0].price : service?.price}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex gap-4 justify-center">
                        <Link 
                            href="/dashboard"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            Back to Dashboard
                        </Link>
                        <Link 
                            href={`/dashboard/providers/${provider.id}`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-300 transition-colors"
                        >
                            Back to {provider.name}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
            {/* Back Button */}
            <Link 
                href={`/dashboard/providers/${params.id}`} 
                className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Provider
            </Link>

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Appointment</h1>
                <p className="text-gray-600">Book your appointment at {provider.name}</p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
                <div className="flex items-center justify-center space-x-8">
                    {[
                        { step: 1, title: "Service" },
                        { step: 2, title: "Date & Time" },
                        { step: 3, title: "Confirm" }
                    ].map((item, index) => (
                        <div key={item.step} className="flex items-center">
                            <div className="flex items-center">
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                                    currentStep >= item.step
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-600'
                                }`}>
                                    {currentStep > item.step ? (
                                        <Check className="w-4 h-4" />
                                    ) : (
                                        item.step
                                    )}
                                </div>
                                <span className={`ml-2 font-medium ${
                                    currentStep >= item.step ? 'text-blue-600' : 'text-gray-500'
                                }`}>
                                    {item.title}
                                </span>
                            </div>
                            {index < 2 && (
                                <div className={`w-8 h-px mx-4 ${
                                    currentStep > item.step ? 'bg-blue-600' : 'bg-gray-300'
                                }`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-8">
                {/* Step 1: Select Service */}
                {currentStep === 1 && (
                    <div>
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">Choose Your Service</h2>
                            {preSelectedTime && (
                                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                                    <p className="text-blue-800">
                                        <Clock className="w-4 h-4 inline mr-2" />
                                        You've selected {preSelectedTime} - now choose your service
                                    </p>
                                </div>
                            )}
                            <p className="text-gray-600">Select the perfect treatment for your wellness journey</p>
                        </div>

                        {/* Recent Services Section */}
                        {mockUser.preferences.favoriteServices.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recently Booked</h3>
                                <div className="grid gap-3">
                                    {provider.serviceCategories
                                        .flatMap(cat => cat.services)
                                        .filter(service => mockUser.preferences.favoriteServices.includes(service.name))
                                        .map((service) => (
                                            <button
                                                key={service.name}
                                                onClick={() => setSelectedService(service.name)}
                                                className={`p-4 rounded-lg border transition-colors text-left ${
                                                    selectedService === service.name
                                                        ? 'border-blue-600 bg-blue-50'
                                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h3 className="font-medium text-gray-900">{service.name}</h3>
                                                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                                            <span>{service.duration}</span>
                                                            <span>•</span>
                                                            <span>Last booked 2 weeks ago</span>
                                                        </div>
                                                    </div>
                                                    <span className="font-semibold text-gray-900">${service.price}</span>
                                                </div>
                                            </button>
                                        ))}
                                </div>
                            </div>
                        )}

                        {/* All Services by Category */}
                        <div>
                            {provider.serviceCategories.map((category, categoryIndex) => (
                                <div key={categoryIndex} className="mb-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.name}</h3>
                                    <div className="grid gap-3">
                                        {category.services.map((service) => (
                                            <button
                                                key={service.name}
                                                onClick={() => setSelectedService(service.name)}
                                                className={`p-4 rounded-lg border transition-colors text-left ${
                                                    selectedService === service.name
                                                        ? 'border-blue-600 bg-blue-50'
                                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                                }`}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h4 className="font-medium text-gray-900">{service.name}</h4>
                                                            {service.popular && (
                                                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">
                                                                    Popular
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                                                        <div className="flex items-center gap-3 text-sm text-gray-500">
                                                            <span>{service.duration}</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right ml-4">
                                                        <span className="font-semibold text-gray-900">
                                                            ${service.variations ? service.variations[0].price : service.price}
                                                        </span>
                                                        {service.variations && service.variations.length > 1 && (
                                                            <span className="text-gray-400 text-sm block">
                                                                - ${service.variations[service.variations.length - 1].price}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Select Date & Time */}
                {currentStep === 2 && (
                    <div>
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">Pick Your Date & Time</h2>
                            {preSelectedService && (
                                <div className="bg-green-50 rounded-lg p-4 mb-6">
                                    <p className="text-green-800">
                                        <Check className="w-4 h-4 inline mr-2" />
                                        Service: <span className="font-semibold">{preSelectedService}</span>
                                    </p>
                                </div>
                            )}
                            <p className="text-gray-600">Choose your preferred appointment slot</p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6">
                            {/* Available Dates */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Available Dates</h3>
                                <div className="space-y-2 max-h-80 overflow-y-auto">
                                    {availableDates.slice(0, 14).map((date, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedDate(date)}
                                            className={`w-full p-3 rounded-lg border transition-colors text-left ${
                                                selectedDate?.toDateString() === date.toDateString()
                                                    ? 'border-blue-600 bg-blue-50'
                                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {date.toLocaleDateString('en-US', { 
                                                            weekday: 'long',
                                                            month: 'long', 
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {date.getDate() === new Date().getDate() ? 'Today' : 
                                                         date.getDate() === new Date().getDate() + 1 ? 'Tomorrow' :
                                                         date.toLocaleDateString('en-US', { year: 'numeric' })}
                                                    </p>
                                                </div>
                                                <span className="text-sm text-gray-600">
                                                    {getAvailableTimeSlots(date).length} available
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Available Times */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    {selectedDate ? 'Available Times' : 'Select a date first'}
                                </h3>
                                {selectedDate ? (
                                    <div>
                                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                            <p className="text-gray-700 font-medium">
                                                {selectedDate.toLocaleDateString('en-US', { 
                                                    weekday: 'long', 
                                                    year: 'numeric', 
                                                    month: 'long', 
                                                    day: 'numeric' 
                                                })}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                                            {availableTimeSlots.map((time) => (
                                                <button
                                                    key={time}
                                                    onClick={() => setSelectedTime(time)}
                                                    className={`p-3 rounded-lg border transition-colors font-medium ${
                                                        selectedTime === time
                                                            ? 'border-blue-600 bg-blue-600 text-white'
                                                            : 'border-gray-200 hover:border-gray-300 text-gray-900 bg-white'
                                                    }`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-400">
                                        <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                        <p>Choose a date to see available times</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Confirmation */}
                {currentStep === 3 && (
                    <div>
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">Confirm Your Booking</h2>
                            <p className="text-gray-600">Review your appointment details and confirm</p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Booking Summary */}
                            <div className="lg:col-span-2">
                                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                    <h3 className="font-semibold text-gray-900 text-lg mb-4">Booking Summary</h3>
                                    
                                    {/* Service Details */}
                                    <div className="bg-white rounded-lg p-4 mb-3">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="font-medium text-gray-900">{selectedService}</h4>
                                                <p className="text-gray-600 text-sm mt-1">{service?.description}</p>
                                                <div className="flex items-center gap-3 text-sm text-gray-500 mt-2">
                                                    <span>{service?.duration}</span>
                                                </div>
                                            </div>
                                            <span className="font-semibold text-gray-900">
                                                ${service?.variations ? service.variations[0].price : service?.price}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Date & Time */}
                                    <div className="bg-white rounded-lg p-4 mb-3">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium text-gray-900">
                                                    {selectedDate?.toLocaleDateString('en-US', { 
                                                        weekday: 'long', 
                                                        year: 'numeric', 
                                                        month: 'long', 
                                                        day: 'numeric' 
                                                    })}
                                                </h4>
                                                <p className="text-gray-600 text-sm">{selectedTime}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Customer Info */}
                                    <div className="bg-white rounded-lg p-4">
                                        <h4 className="font-medium text-gray-900">{customerInfo.name}</h4>
                                        <p className="text-gray-600 text-sm">{customerInfo.email}</p>
                                        <p className="text-gray-600 text-sm">{customerInfo.phone}</p>
                                        {customerInfo.notes && (
                                            <div className="mt-3 p-3 bg-gray-50 rounded">
                                                <p className="text-sm text-gray-700">
                                                    <strong>Special requests:</strong> {customerInfo.notes}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Special Requests */}
                                <div className="bg-white rounded-lg border border-gray-200 p-4">
                                    <h4 className="font-medium text-gray-900 mb-3">Special Requests (Optional)</h4>
                                    <textarea
                                        value={customerInfo.notes}
                                        onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                                        className="w-full px-3 py-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        rows={3}
                                        placeholder="Any special requests, allergies, or preferences..."
                                    />
                                </div>
                            </div>

                            {/* Payment & Policies */}
                            <div>
                                <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                                    <h4 className="font-medium text-gray-900 mb-3">Payment Summary</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Service</span>
                                            <span>${service?.variations ? service.variations[0].price : service?.price}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Taxes & Fees</span>
                                            <span>$0</span>
                                        </div>
                                        <div className="border-t pt-2 flex justify-between">
                                            <span className="font-medium text-gray-900">Total</span>
                                            <span className="font-semibold text-gray-900">${service?.variations ? service.variations[0].price : service?.price}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-medium text-gray-900 mb-3">Important Information</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• Confirmation email sent to {customerInfo.email}</li>
                                        <li>• Arrive 10 minutes early</li>
                                        <li>• 24-hour cancellation policy</li>
                                        <li>• Payment due at appointment</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                    <button
                        onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                        disabled={currentStep === 1}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Previous
                    </button>

                    {currentStep < 3 ? (
                        <button
                            onClick={() => setCurrentStep(currentStep + 1)}
                            disabled={!canProceed(currentStep)}
                            className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-md transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Continue
                        </button>
                    ) : (
                        <button
                            onClick={handleBooking}
                            className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Confirm Booking
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}