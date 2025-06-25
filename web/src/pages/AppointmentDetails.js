import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAppointmentById } from "../utils/appointmentApi";
import { useBanner } from '../context/BannerContext';
import GoBackButton from '../components/GoBackButton';

const AppointmentDetails = () => {
    const { id } = useParams();
    const { token } = useAuth();
    const { showMessage } = useBanner();
    const navigate = useNavigate();
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                const response = await getAppointmentById(token, id);
                setAppointment(response.data);
            } catch (error) {
                console.log('Error fetching appointment', error);
                showMessage(error.response.data.error, 'error');
                navigate('/appointments');
            } finally {
                setLoading(false);
            }
        };

        if (token && id) {
            fetchAppointment();
        }
    }, [token, id, navigate, showMessage]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Booked':
                return 'bg-blue-50 text-blue-700 ring-blue-600/20';
            case 'Completed':
                return 'bg-green-50 text-green-700 ring-green-600/20';
            case 'Canceled':
                return 'bg-red-50 text-red-700 ring-red-600/20';
            default:
                return 'bg-gray-50 text-gray-700 ring-gray-600/20';
        }
    };

    const formatDateTime = (dateTime) => {
        return new Date(dateTime).toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading appointment details...</p>
                </div>
            </div>
        );
    }

    if (!appointment) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Not Found</h2>
                    <p className="text-gray-600 mb-6">The appointment you're looking for doesn't exist.</p>
                    <GoBackButton />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 backdrop-blur-lg backdrop-filter">
                    <div className="px-8 py-10">
                        <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Appointment Details</h2>
                                <p className="text-gray-500">Reference ID: {appointment.id}</p>
                            </div>
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ring-1 ring-inset ${getStatusColor(appointment.status)}`}>
                                {appointment.status}
                            </span>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Information</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Service</p>
                                            <p className="text-gray-900">{appointment.service?.title || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Description</p>
                                            <p className="text-gray-900">{appointment.service?.description || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Details</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Date & Time</p>
                                            <p className="text-gray-900">{formatDateTime(appointment.date_time)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Status</p>
                                            <p className="text-gray-900">{appointment.status}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Provider Information</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Name</p>
                                            <p className="text-gray-900">{appointment.provider?.name || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Email</p>
                                            <p className="text-gray-900">{appointment.provider?.email || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Name</p>
                                            <p className="text-gray-900">{appointment.customer?.name || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Email</p>
                                            <p className="text-gray-900">{appointment.customer?.email || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <GoBackButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentDetails;