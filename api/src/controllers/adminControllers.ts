import { FastifyRequest, FastifyReply } from 'fastify';
import db from '../config/db';

// Shared param type for routes that expect an `id` in the URL
interface IdParams {
    Params: {
        id: string;
    };
}

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
    req: FastifyRequest<IdParams>,
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
    req: FastifyRequest<IdParams>,
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
    req: FastifyRequest<IdParams>,
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
