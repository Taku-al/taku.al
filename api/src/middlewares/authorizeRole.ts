import { FastifyRequest, FastifyReply } from 'fastify';

export default function authorizeRole(allowedRoles: string[]) {
    return async function (req: FastifyRequest, reply: FastifyReply) {
        const user = (req as any).user;

        if (!user || !allowedRoles.includes(user.role)) {
            return reply.status(403).send({ message: 'Forbidden: You do not have the required role' });
        }
    };
}
