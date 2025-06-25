import { FastifyRequest, FastifyReply } from 'fastify';
import db from '../config/db';

export const createService = async (req: FastifyRequest, reply: FastifyReply) => {
    const user = (req as any).user;
    if (!user?.id) return reply.code(401).send({ message: 'Unauthorized' });

    const { title, description } = req.body as any;

    const [service] = await db
        .insertInto('services')
        .values({ title, description, provider_id: user.id })
        .returningAll()
        .execute();

    reply.code(201).send(service);
};

export const getAllProvidersAndServices = async (_req: FastifyRequest, reply: FastifyReply) => {
    const result = await db
        .selectFrom('users')
        .select(['name', 'id'])
        .where('role', '=', 'provider')
        .execute();

    const providers = await Promise.all(
        result.map(async (provider) => {
            const services = await db
                .selectFrom('services')
                .select(['id', 'title', 'description'])
                .where('provider_id', '=', provider.id)
                .execute();
            return { name: provider.name, services };
        })
    );

    if (!providers.length) return reply.code(404).send({ message: 'No providers found!' });
    reply.code(200).send(providers);
};

export const getServiceById = async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as any;

    const service = await db
        .selectFrom('services')
        .selectAll()
        .where('id', '=', id)
        .executeTakeFirst();

    if (!service) return reply.code(404).send({ message: 'Service not found!' });

    const slots = await db
        .selectFrom('slots')
        .selectAll()
        .where('service_id', '=', id)
        .execute();

    reply.code(200).send({ ...service, availableSlots: slots });
};

export const getServices = async (req: FastifyRequest, reply: FastifyReply) => {
    const user = (req as any).user;
    if (!user?.id) return reply.code(401).send({ message: 'Unauthorized' });

    const provider = await db
        .selectFrom('users')
        .select(['id', 'name'])
        .where('id', '=', user.id)
        .executeTakeFirst();

    if (!provider) return reply.code(404).send({ message: 'Provider not found!' });

    const services = await db
        .selectFrom('services')
        .selectAll()
        .where('provider_id', '=', user.id)
        .execute();

    reply.code(200).send({ ...provider, services });
};

export const editService = async (req: FastifyRequest, reply: FastifyReply) => {
    const user = (req as any).user;
    const { id } = req.params as any;
    const { title, description } = req.body as any;

    if (!user?.id) return reply.code(401).send({ message: 'Unauthorized' });

    const existing = await db
        .selectFrom('services')
        .select(['provider_id'])
        .where('id', '=', id)
        .executeTakeFirst();

    if (!existing || existing.provider_id !== user.id) {
        return reply.code(404).send({ message: 'Service not found or not authorized' });
    }

    const updated = await db
        .updateTable('services')
        .set({ title, description })
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();

    reply.code(200).send({ message: 'Service updated successfully', service: updated });
};

export const deleteService = async (req: FastifyRequest, reply: FastifyReply) => {
    const user = (req as any).user;
    const { id } = req.params as any;
    if (!user?.id) return reply.code(401).send({ message: 'Unauthorized' });

    const service = await db
        .selectFrom('services')
        .select(['id'])
        .where('id', '=', id)
        .where('provider_id', '=', user.id)
        .executeTakeFirst();

    if (!service) return reply.code(404).send({ message: 'Service not found or not authorized' });

    await db.deleteFrom('services').where('id', '=', id).execute();

    await db
        .updateTable('appointments')
        .set({ status: 'Canceled' })
        .where('service_id', '=', id)
        .execute();

    reply.code(200).send({ message: 'Service deleted successfully' });
};

export const createSlot = async (req: FastifyRequest, reply: FastifyReply) => {
    const user = (req as any).user;
    const { id } = req.params as any;
    const { date_time } = req.body as any;
    if (!user?.id) return reply.code(401).send({ message: 'Unauthorized' });

    const service = await db
        .selectFrom('services')
        .select(['id'])
        .where('id', '=', id)
        .where('provider_id', '=', user.id)
        .executeTakeFirst();

    if (!service) return reply.code(404).send({ message: 'Service not found!' });

    const normalizedDateTime = new Date(date_time);

    const existingSlot = await db
        .selectFrom('slots')
        .select(['id'])
        .where('service_id', '=', service.id)
        .where('date_time', '=', normalizedDateTime)
        .executeTakeFirst();

    if (existingSlot) return reply.code(400).send({ message: 'Slot already exists at this time!' });

    await db
        .insertInto('slots')
        .values({ date_time: new Date(normalizedDateTime), service_id: service.id, is_booked: false })
        .execute();

    reply.code(201).send({ message: 'Slot created!' });
};

export const editSlot = async (req: FastifyRequest, reply: FastifyReply) => {
    const user = (req as any).user;
    const { serviceId, slotId } = req.params as any;
    const { date_time } = req.body as any;

    if (!user?.id) return reply.code(401).send({ message: 'Unauthorized' });

    const service = await db
        .selectFrom('services')
        .select(['id'])
        .where('id', '=', serviceId)
        .where('provider_id', '=', user.id)
        .executeTakeFirst();

    if (!service) return reply.code(404).send({ message: 'Service not found or not authorized' });

    await db
        .updateTable('slots')
        .set({ date_time: new Date(`${date_time}Z`) })
        .where('id', '=', slotId)
        .execute();

    reply.code(200).send({ message: 'Slot updated successfully!' });
};

export const deleteSlot = async (req: FastifyRequest, reply: FastifyReply) => {
    const user = (req as any).user;
    const { serviceId, slotId } = req.params as any;

    if (!user?.id) return reply.code(401).send({ message: 'Unauthorized' });

    const service = await db
        .selectFrom('services')
        .select(['id'])
        .where('id', '=', serviceId)
        .where('provider_id', '=', user.id)
        .executeTakeFirst();

    if (!service) return reply.code(404).send({ message: 'Service not found or not authorized' });

    await db.deleteFrom('slots').where('id', '=', slotId).execute();

    reply.code(200).send({ message: 'Slot deleted successfully!' });
};
