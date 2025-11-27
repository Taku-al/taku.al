'use client';

import { Clock, Calendar, Save, Plus, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { getStaffSchedule } from '@/lib/mockData';
import type { StaffSchedule } from '@/lib/mockData';
import { useState } from 'react';

const timeSlots = [
    "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM",
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
    "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM",
    "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM"
];

export default function StaffSchedule() {
    const [schedule, setSchedule] = useState<StaffSchedule[]>(getStaffSchedule());
    const [hasChanges, setHasChanges] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleToggleDay = (dayOfWeek: string) => {
        setSchedule(schedule.map(day => 
            day.dayOfWeek === dayOfWeek 
                ? { ...day, isOpen: !day.isOpen }
                : day
        ));
        setHasChanges(true);
    };

    const handleTimeChange = (dayOfWeek: string, field: 'startTime' | 'endTime', value: string) => {
        setSchedule(schedule.map(day => 
            day.dayOfWeek === dayOfWeek 
                ? { ...day, [field]: value }
                : day
        ));
        setHasChanges(true);
    };

    const handleAddBreak = (dayOfWeek: string) => {
        setSchedule(schedule.map(day => 
            day.dayOfWeek === dayOfWeek 
                ? { 
                    ...day, 
                    breaks: [...day.breaks, { startTime: "12:00 PM", endTime: "1:00 PM" }]
                  }
                : day
        ));
        setHasChanges(true);
    };

    const handleRemoveBreak = (dayOfWeek: string, breakIndex: number) => {
        setSchedule(schedule.map(day => 
            day.dayOfWeek === dayOfWeek 
                ? { 
                    ...day, 
                    breaks: day.breaks.filter((_, idx) => idx !== breakIndex)
                  }
                : day
        ));
        setHasChanges(true);
    };

    const handleBreakTimeChange = (dayOfWeek: string, breakIndex: number, field: 'startTime' | 'endTime', value: string) => {
        setSchedule(schedule.map(day => 
            day.dayOfWeek === dayOfWeek 
                ? { 
                    ...day, 
                    breaks: day.breaks.map((brk, idx) => 
                        idx === breakIndex ? { ...brk, [field]: value } : brk
                    )
                  }
                : day
        ));
        setHasChanges(true);
    };

    const handleSave = () => {
        // In a real app, this would save to the backend
        console.log('Saving schedule:', schedule);
        setHasChanges(false);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
    };

    const handleCopyToAll = (sourceDay: string) => {
        const source = schedule.find(day => day.dayOfWeek === sourceDay);
        if (source) {
            setSchedule(schedule.map(day => ({
                ...day,
                isOpen: source.isOpen,
                startTime: source.startTime,
                endTime: source.endTime,
                breaks: [...source.breaks]
            })));
            setHasChanges(true);
        }
    };

    const totalHoursPerWeek = schedule.reduce((total, day) => {
        if (!day.isOpen) return total;
        
        const start = day.startTime;
        const end = day.endTime;
        
        // Simple calculation (would need proper time parsing in production)
        const startHour = parseInt(start.split(':')[0]) + (start.includes('PM') && !start.startsWith('12') ? 12 : 0);
        const endHour = parseInt(end.split(':')[0]) + (end.includes('PM') && !end.startsWith('12') ? 12 : 0);
        const dayHours = endHour - startHour;
        
        // Subtract break time
        const breakHours = day.breaks.reduce((breakTotal, brk) => {
            const bStart = parseInt(brk.startTime.split(':')[0]) + (brk.startTime.includes('PM') && !brk.startTime.startsWith('12') ? 12 : 0);
            const bEnd = parseInt(brk.endTime.split(':')[0]) + (brk.endTime.includes('PM') && !brk.endTime.startsWith('12') ? 12 : 0);
            return breakTotal + (bEnd - bStart);
        }, 0);
        
        return total + (dayHours - breakHours);
    }, 0);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">Schedule & Availability</h1>
                    <p className="text-lg text-gray-600">Set your working hours and manage your availability</p>
                </div>

                {/* Success Message */}
                {showSuccessMessage && (
                    <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <p className="text-green-800 font-medium">Schedule saved successfully!</p>
                    </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Clock className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Total Hours/Week</h3>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{totalHoursPerWeek} hours</p>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Calendar className="w-5 h-5 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Working Days</h3>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">
                            {schedule.filter(day => day.isOpen).length} days
                        </p>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <AlertCircle className="w-5 h-5 text-purple-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Status</h3>
                        </div>
                        <p className="text-lg font-semibold text-gray-900">
                            {hasChanges ? (
                                <span className="text-orange-600">Unsaved Changes</span>
                            ) : (
                                <span className="text-green-600">Up to Date</span>
                            )}
                        </p>
                    </div>
                </div>

                {/* Save Button - Sticky at top */}
                {hasChanges && (
                    <div className="mb-6">
                        <button
                            onClick={handleSave}
                            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg"
                        >
                            <Save className="w-5 h-5" />
                            Save Schedule
                        </button>
                    </div>
                )}

                {/* Weekly Schedule */}
                <div className="space-y-4">
                    {schedule.map((day) => (
                        <div key={day.dayOfWeek} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                {/* Day Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-xl font-bold text-gray-900">{day.dayOfWeek}</h3>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={day.isOpen}
                                                onChange={() => handleToggleDay(day.dayOfWeek)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            <span className="ml-3 text-sm font-medium text-gray-700">
                                                {day.isOpen ? 'Open' : 'Closed'}
                                            </span>
                                        </label>
                                    </div>
                                    {day.isOpen && (
                                        <button
                                            onClick={() => handleCopyToAll(day.dayOfWeek)}
                                            className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                        >
                                            Copy to all days
                                        </button>
                                    )}
                                </div>

                                {/* Working Hours */}
                                {day.isOpen && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Start Time
                                                </label>
                                                <select
                                                    value={day.startTime}
                                                    onChange={(e) => handleTimeChange(day.dayOfWeek, 'startTime', e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                >
                                                    {timeSlots.map(time => (
                                                        <option key={time} value={time}>{time}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    End Time
                                                </label>
                                                <select
                                                    value={day.endTime}
                                                    onChange={(e) => handleTimeChange(day.dayOfWeek, 'endTime', e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                >
                                                    {timeSlots.map(time => (
                                                        <option key={time} value={time}>{time}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Breaks */}
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Breaks
                                                </label>
                                                <button
                                                    onClick={() => handleAddBreak(day.dayOfWeek)}
                                                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                    Add Break
                                                </button>
                                            </div>

                                            {day.breaks.length > 0 ? (
                                                <div className="space-y-3">
                                                    {day.breaks.map((brk, idx) => (
                                                        <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                            <div className="flex-1 grid grid-cols-2 gap-3">
                                                                <select
                                                                    value={brk.startTime}
                                                                    onChange={(e) => handleBreakTimeChange(day.dayOfWeek, idx, 'startTime', e.target.value)}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                                                >
                                                                    {timeSlots.map(time => (
                                                                        <option key={time} value={time}>{time}</option>
                                                                    ))}
                                                                </select>
                                                                <select
                                                                    value={brk.endTime}
                                                                    onChange={(e) => handleBreakTimeChange(day.dayOfWeek, idx, 'endTime', e.target.value)}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                                                >
                                                                    {timeSlots.map(time => (
                                                                        <option key={time} value={time}>{time}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <button
                                                                onClick={() => handleRemoveBreak(day.dayOfWeek, idx)}
                                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-500 italic">No breaks scheduled</p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {!day.isOpen && (
                                    <div className="text-center py-4">
                                        <p className="text-gray-500">Closed on this day</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Save Button - Bottom */}
                {hasChanges && (
                    <div className="mt-8">
                        <button
                            onClick={handleSave}
                            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg"
                        >
                            <Save className="w-5 h-5" />
                            Save Schedule
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}


