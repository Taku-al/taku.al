import React from "react";
import { useServices } from "../context/ServiceContext";
import { Link } from "react-router-dom";

const ListProviders = () => {
    const { services, loading } = useServices();

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading providers...</p>
                </div>
            </div>
        );
    }

    if (!services || services.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">No Providers Available</h2>
                    <p className="text-gray-600">There are currently no service providers available.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Available Service Providers</h1>
                    <p className="text-lg text-gray-600">Choose from our trusted service providers</p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((provider) => (
                        <div key={provider.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">{provider.name}</h2>
                                
                                {provider.services && provider.services.length > 0 ? (
                                    <div className="space-y-4">
                                        {provider.services.map((service) => (
                                            <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-lg font-medium text-gray-900">{service.title}</h3>
                                                    <Link 
                                                        to={`/services/${service.id}`}
                                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                    >
                                                        View Details
                                                    </Link>
                                                </div>
                                                <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                                                <Link 
                                                    to={`/services/${service.id}`}
                                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                                                >
                                                    Book Appointment
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500">No services available from this provider.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListProviders;
