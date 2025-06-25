import { FastifyPluginAsync } from 'fastify';
import { 
    getAllUsers, 
    deleteUserById 
} from '../controllers/appointmentControllers';

const adminRoutes: FastifyPluginAsync = async (app) => {
    app.get('/users', getAllUsers);
    app.delete('/users/:id', deleteUserById);
};

export default adminRoutes; 