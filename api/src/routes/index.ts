import { FastifyPluginAsync } from 'fastify';
import adminRoutes from './adminRoutes';
import appointmentRoutes from './appointmentRoutes';
import authRoutes from './authRoutes';
import serviceRoutes from './serviceRoutes';

const routes: FastifyPluginAsync = async (app) => {
    // Health check
    app.get('/health', async () => {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development'
        };
    });

    // API info
    app.get('/api', async () => {
        return {
            name: 'Taku API',
            version: 'v1',
            status: 'active'
        };
    });

    // Register all routes with /v1 prefix (server adds /api prefix)
    app.register(authRoutes, { prefix: '/v1/auth' });
    app.register(adminRoutes, { prefix: '/v1/admin' });
    app.register(appointmentRoutes, { prefix: '/v1/appointment' });
    app.register(serviceRoutes, { prefix: '/v1/service' });

    // Version info
    app.get('/v1/version', async () => {
        return {
            version: 'v1',
            status: 'active'
        };
    });
};

export default routes; 