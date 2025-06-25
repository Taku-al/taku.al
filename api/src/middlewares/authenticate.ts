import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
    id: string;
    role: string;
}

export default async function auth(req: FastifyRequest, reply: FastifyReply) {
    try {
        const token = req.headers['x-auth-token'] as string | undefined;

        if (!token) {
            return reply.status(401).send({ msg: 'No token authorization. Denied!' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        // Attach user to request
        (req as any).user = decoded;
    } catch (err) {
        return reply.status(401).send({ msg: 'Token is not valid!' });
    }
}
