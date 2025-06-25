import { FastifyPluginAsync } from 'fastify';
import { 
    getAllAppointments, 
    getAppointment, 
    bookAppointment, 
    deleteAppointmentById,
    getAllUserAppointments,
    changeAppointmentStatus
} from '../controllers/appointmentControllers';
import auth from '../middlewares/authenticate';

const appointmentRoutes: FastifyPluginAsync = async (app) => {
    // Apply authentication to all routes except the root route
    app.addHook('preHandler', async (request, reply) => {
        // Skip authentication for the root route (getAllAppointments)
        const url = request.url;
        if (url.endsWith('/v1/appointment') || url.endsWith('/v1/appointment/')) {
            return;
        }
        await auth(request, reply);
    });
    
    app.get('/', getAllAppointments);
    app.get('/user', getAllUserAppointments);
    app.get('/:id', getAppointment);
    app.post('/book/:serviceId/:slotId', bookAppointment);
    app.delete('/:id', deleteAppointmentById);
    app.put('/:appointmentId/status', changeAppointmentStatus);
};

export default appointmentRoutes; 