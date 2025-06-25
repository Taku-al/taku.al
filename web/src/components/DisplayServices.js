import React from "react";
import { useServices } from "../context/ServiceContext";
import { Link } from "react-router-dom";
import EditServiceModal from "./EditServiceModal";
import CreateServiceModal from "./CreateServiceModal";

const DisplayServices = () => {
    const { services, deleteService, updateService, createNewService } = useServices();
    const listServices = services.services || [];

    const handleSave = async (updatedService) => {
        await updateService(updatedService.id, updatedService.title, updatedService.description);
    }

    const handleCreate = async (newService) => {
        await createNewService(newService.title, newService.description);
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Your Services
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Manage and organize your professional services
                    </p>
                    <div className="mt-8">
                        <CreateServiceModal onSave={handleCreate} />
                    </div>
                </div>

                {listServices.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No services yet</h3>
                        <p className="text-gray-500 mb-6">Create your first service to get started</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {listServices.map((service) => (
                            <div key={service.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                                <div className="p-6 flex flex-col h-full">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                                        <p className="text-gray-600 mb-4">{service.description}</p>
                                    </div>

                                    <div className="flex gap-4 pt-4 border-t border-gray-100 mt-auto">
                                        <EditServiceModal 
                                            service={service} 
                                            onSave={handleSave}
                                        />
                                        <button 
                                            onClick={() => deleteService(service.id)}
                                            className="flex-1 bg-white border border-rose-500 text-rose-500 py-2 px-4 rounded-lg hover:bg-rose-500 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-200 active:bg-rose-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DisplayServices;