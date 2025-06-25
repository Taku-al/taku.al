import { FastifyRequest, FastifyReply } from 'fastify';
import db from '../config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Insertable } from 'kysely';
import type { DB } from '../config/db';

dotenv.config();

type RegisterBody = {
    name: string;
    email: string;
    password: string;
    role: 'customer' | 'provider' | 'admin';
};

type LoginBody = {
    email: string;
    password: string;
};

type UpdateUserBody = {
    name: string;
};

export const register = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<void> => {
    const { name, email, password, role } = req.body as RegisterBody;
    try {
        const email_lowercase = email.toLowerCase();

        const existing = await db
            .selectFrom('users')
            .select('id')
            .where('email', '=', email_lowercase)
            .executeTakeFirst();

        if (existing) {
            return reply.code(409).send({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = {
            name,
            email: email_lowercase,
            password: hashedPassword,
            role
        } satisfies Insertable<DB['users']>;

        const [user] = await db
            .insertInto('users')
            .values(newUser)
            .returning(['id', 'name', 'email', 'role'])
            .execute();

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '3h' }
        );

        reply.code(201).send({
            message: 'User created successfully',
            token,
            user
        });
    } catch (error) {
        console.error('Error during register', error);
        reply.code(500).send({ errors: [(error as Error).message] });
    }
};

export const login = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<void> => {
    const { email, password } = req.body as LoginBody;
    try {
        const email_lowercase = email.toLowerCase();
        const user = await db
            .selectFrom('users')
            .selectAll()
            .where('email', '=', email_lowercase)
            .executeTakeFirst();

        if (!user) {
            return reply.code(404).send({ message: 'User not found!' });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return reply.code(401).send({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '3h' }
        );

        reply.code(200).send({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Error during login', error);
        reply.code(500).send({ errors: [(error as Error).message] });
    }
};

export const getAuthUser = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<void> => {
    const user = (req as any).user;
    if (!user?.id) return reply.code(401).send({ message: 'Unauthorized' });

    try {
        const found = await db
            .selectFrom('users')
            .selectAll()
            .where('id', '=', user.id)
            .executeTakeFirst();

        if (!found) return reply.code(404).send({ message: 'User not found!' });

        reply.code(200).send(found);
    } catch (error) {
        console.error('Error during getAuthUser', error);
        reply.code(500).send({ errors: [(error as Error).message] });
    }
};

export const updateUser = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<void> => {
    const user = (req as any).user;
    if (!user?.id) return reply.code(401).send({ message: 'Unauthorized' });

    const { name } = req.body as UpdateUserBody;

    try {
        const updated = await db
            .updateTable('users')
            .set({ name })
            .where('id', '=', user.id)
            .returningAll()
            .executeTakeFirst();

        reply.code(200).send({ message: 'User updated successfully', user: updated });
    } catch (error) {
        console.error('Error during updateUser', error);
        reply.code(500).send({ errors: [(error as Error).message] });
    }
};
