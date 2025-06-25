// src/server.ts

import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
// import db from './config/db';
import allRoutes from './routes';

dotenv.config();

const app = Fastify();

app.register(cors, {
    origin: process.env.CORS_ORIGIN || ["http://localhost:3000", "http://localhost:3001", "http://localhost"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token', 'Accept'],
    exposedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 86400 // 24 hours
});

// Register routes with /api prefix
app.register(allRoutes, { prefix: '/api' });

const start = async () => {
    try {
        await app.listen({ port: Number(process.env.PORT) || 5000, host: '0.0.0.0' });
        console.log(`Server started on port ${process.env.PORT || 5000}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();
