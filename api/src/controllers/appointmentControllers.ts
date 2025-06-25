import { FastifyRequest, FastifyReply } from 'fastify';
import db from '../config/db';
import { randomUUID } from 'crypto';

const now = new Date();
import { sql } from 'kysely';

export const getAllUsers = async (_req: FastifyRequest, reply: FastifyReply) => {
    try {
        const users = await db.selectFrom('users').selectAll().execute();
        reply.code(200).send(users);
    } catch (error) {
        reply.code(400).send({ message: (error as Error).message });
    }
};

export const getAllAppointments = async (_req: FastifyRequest, reply: FastifyReply) => {
    try {
        const appointments = await db
            .selectFrom('appointments')
            .selectAll()
            .orderBy('date_time', 'asc')
            .execute();
        reply.code(200).send(appointments);
    } catch (error) {
        reply.code(400).send({ message: (error as Error).message });
    }
};

export const getAllServices = async (_req: FastifyRequest, reply: FastifyReply) => {
    try {
        const services = await db.selectFrom('services').selectAll().execute();
        reply.code(200).send(services);
    } catch (error) {
        reply.code(400).send({ message: (error as Error).message });
    }
};

export const deleteUserById = async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) => {
    try {
        const user = await db
            .deleteFrom('users')
            .where('id', '=', req.params.id)
            .returning(['id', 'role'])
            .executeTakeFirst();

        if (!user) {
            return reply.code(404).send({ message: 'User not found' });
        }

        const update = db.updateTable('appointments').set({ status: 'Canceled' });

        if (user.role === 'provider') {
            await update.where('provider_id', '=', req.params.id).execute();
        }
        if (user.role === 'customer') {
            await update.where('customer_id', '=', req.params.id).execute();
        }

        reply.code(200).send({ message: `User with ID ${req.params.id} is deleted successfully` });
    } catch (error) {
        reply.code(400).send({ message: (error as Error).message });
    }
};

export const deleteAppointmentById = async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) => {
    try {
        const result = await db
            .deleteFrom('appointments')
            .where('id', '=', req.params.id)
            .executeTakeFirst();

        if (!result) {
            return reply.code(404).send({ message: 'Appointment not found' });
        }

        reply.code(200).send({ message: `Appointment with ID ${req.params.id} is deleted successfully` });
    } catch (error) {
        reply.code(400).send({ message: (error as Error).message });
    }
};

export const deleteServiceById = async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) => {
    try {
        const result = await db
            .deleteFrom('services')
            .where('id', '=', req.params.id)
            .executeTakeFirst();

        if (!result) {
            return reply.code(404).send({ message: 'Service not found' });
        }

        await db
            .updateTable('appointments')
            .set({ status: 'Canceled' })
            .where('service_id', '=', req.params.id)
            .execute();

        reply.code(200).send({ message: `Service with ID ${req.params.id} is deleted successfully` });
    } catch (error) {
        reply.code(400).send({ message: (error as Error).message });
    }
};

export const bookAppointment = async (
    req: FastifyRequest<{ Params: { serviceId: string; slotId: string } }>,
    reply: FastifyReply
) => {
    try {
        const user = (req as any).user;
        if (!user?.id) return reply.code(401).send({ message: 'Unauthorized' });

        const { serviceId, slotId } = req.params;

        const slot = await db
            .selectFrom('slots')
            .innerJoin('services', 'services.id', 'slots.service_id')
            .select(['slots.date_time', 'services.provider_id'])
            .where('slots.id', '=', slotId)
            .where('slots.service_id', '=', serviceId)
            .where('slots.is_booked', '=', false)
            .executeTakeFirst();

        if (!slot) {
            return reply.code(404).send({ message: 'Service or available slot not found!' });
        }

        const [appointment] = await db
            .insertInto('appointments')
            .values({
                id: randomUUID(),
                service_id: serviceId,
                customer_id: user.id,
                provider_id: slot.provider_id,
                date_time: slot.date_time,
                status: 'Booked',
                created_at: now,
                updated_at: now
            })
            .returningAll()
            .execute();
        await db
            .updateTable('slots')
            .set({ is_booked: true })
            .where('id', '=', slotId)
            .execute();

        reply.code(200).send({ message: 'Appointment booked successfully', appointment });
    } catch (error: any) {
        reply.code(400).send({ error: error.message });
    }
};

export const getAppointment = async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) => {
    try {
        const { id } = req.params;

        const appointment = await db
            .selectFrom('appointments')
            .selectAll()
            .where('id', '=', id)
            .executeTakeFirst();

        if (!appointment) {
            return reply.code(404).send({ message: 'Appointment not found!' });
        }

        reply.code(200).send(appointment);
    } catch (error: any) {
        reply.code(400).send({ error: error.message });
    }
};

export const getAllUserAppointments = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const user = (req as any).user;
        if (!user?.id) return reply.code(401).send({ message: 'Unauthorized' });

        let query = db.selectFrom('appointments').selectAll();

        if (user.role === 'customer') {
            query = query.where('customer_id', '=', user.id);
        } else if (user.role === 'provider') {
            query = query.where('provider_id', '=', user.id);
        } else {
            return reply.code(403).send({ message: 'Access denied' });
        }

        const appointments = await query.orderBy('date_time', 'asc').execute();
        reply.code(200).send(appointments);
    } catch (error: any) {
        reply.code(400).send({ error: error.message });
    }
};

export const changeAppointmentStatus = async (
    req: FastifyRequest<{ Params: { appointmentId: string }; Body: { status: string } }>,
    reply: FastifyReply
) => {
    try {
        const user = (req as any).user;
        if (!user?.id) return reply.code(401).send({ message: 'Unauthorized' });

        const { appointmentId } = req.params;
        const { status } = req.body;

        const appointment = await db
            .selectFrom('appointments')
            .selectAll()
            .where('id', '=', appointmentId)
            .executeTakeFirst();

        if (!appointment) {
            return reply.code(404).send({ message: 'Appointment not found!' });
        }

        if (user.role === 'customer' && appointment.customer_id !== user.id) {
            return reply.code(403).send({ message: 'You are not authorized to cancel this appointment!' });
        }

        if (user.role === 'provider' && appointment.provider_id !== user.id) {
            return reply.code(403).send({ message: 'You are not authorized to cancel this appointment!' });
        }

        const validStatus = ['Booked', 'Completed', 'Canceled'] as const;

        type AppointmentStatus = (typeof validStatus)[number];

        function isValidStatus(s: any): s is AppointmentStatus {
            return validStatus.includes(s);
        }

        if (!isValidStatus(status)) {
            return reply.code(400).send({ message: 'Invalid status' });
        }

        if (user.role === 'customer' && status !== 'Canceled') {
            return reply.code(400).send({ message: 'Customers can only cancel their appointment.' });
        }

        if (user.role === 'provider' && status === 'Booked') {
            return reply.code(400).send({ message: 'Cannot revert an appointment back to booked.' });
        }

        await db
            .updateTable('appointments')
            .set({ status })
            .where('id', '=', appointmentId)
            .execute();

        if (status === 'Canceled' || status === 'Completed') {
            await db
                .updateTable('slots')
                .set({ is_booked: false })
                .where('service_id', '=', appointment.service_id)
                .where('date_time', '=', appointment.date_time)
                .execute();
        }

        reply.code(200).send({ message: `Appointment status updated to ${status}` });
    } catch (error: any) {
        reply.code(400).send({ error: error.message });
    }
};
