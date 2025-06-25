import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { bookAppointment, changeAppointmentStatus, getAllAppointments } from "../utils/appointmentApi";
import { useBanner } from "./BannerContext";
import { useServices } from "./ServiceContext";

const AppointmentContext = createContext();

export const AppointmentProvider = ({children}) => {
    const { token, user } = useAuth();
    const { showMessage } = useBanner();
    const { setServices } = useServices();
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (token && user?.role !== 'admin') {
            getAppointments()
        }
    }, [token, user?.role])

    const getAppointments = async () => {
        if (!token) {
            showMessage('Token is not available. Please log in again.', 'error');
            return;
        }
        try {
            const response = await getAllAppointments(token);
            setAppointments(response.data);
        } catch (error) {
            console.log('Error fetching appointments', error);
            showMessage(error.response.data.message, 'error');
        }
    };

    const bookNewAppointment = async (serviceId, slotId) => {
        try {
            const response = await bookAppointment(token, serviceId, slotId);
            setAppointments((prevState) => [...prevState, response.data.appointment]);
            setServices((prevServices) =>
                prevServices.map((service) =>
                    service.id === serviceId
                        ? {
                            ...service,
                            availableSlots: service.availableSlots.map((slot) =>
                                slot.id === slotId ? { ...slot, isBooked: true } : slot
                            )
                        }
                        : service
                )
            );
            showMessage(response.data.message, 'success');
        } catch (error) {
            console.log('Error booking an appointment', error);
            showMessage(error.response.data.message, 'error');
        }
    }

    const updateAppointment = async (appointmentId, status) => {
        try {
            const response = await changeAppointmentStatus(token, appointmentId, status);
            console.log(response);
            showMessage(response.data.message, 'success');
        } catch (error) {
            console.log('Error updating status of appointment', error);
            showMessage(error.response.data.message, 'error');
        }
    }

    return (
        <AppointmentContext.Provider value={{ appointments, bookNewAppointment, getAppointments, updateAppointment }}>
            {children}
        </AppointmentContext.Provider>
    )
}

export const useAppointments = () => {
    const context = useContext(AppointmentContext);
    if (!context) {
        throw new Error('useAppointments must be used within an AppointmentProvider');
    }
    return context;
};