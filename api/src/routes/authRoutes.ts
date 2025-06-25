import { FastifyPluginAsync } from 'fastify';
import { login, register, getAuthUser, updateUser } from '../controllers/authControllers';
import auth from '../middlewares/authenticate';

const authRoutes: FastifyPluginAsync = async (app) => {
    // Handle OPTIONS preflight requests
    app.options('/login', async (request, reply) => {
        reply.code(204).send();
    });
    
    app.post('/login', login);
    app.post('/register', register);
    app.get('/me', { preHandler: [auth] }, getAuthUser);
    app.put('/me', { preHandler: [auth] }, updateUser);
};

export default authRoutes; 