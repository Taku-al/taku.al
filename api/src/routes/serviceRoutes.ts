import { FastifyPluginAsync } from 'fastify';
import { 
    getServices, 
    deleteService,
    createService,
    getServiceById,
    editService,
    getAllProvidersAndServices,
    createSlot,
    editSlot,
    deleteSlot
} from '../controllers/serviceControllers';
import auth from '../middlewares/authenticate';

const serviceRoutes: FastifyPluginAsync = async (app) => {
    // Apply authentication to all routes except the public ones
    app.addHook('preHandler', async (request, reply) => {
        const url = request.url;
        // Skip authentication for public endpoints
        if (url.includes('/v1/service/providers/all') || (url.includes('/v1/service/') && request.method === 'GET' && !url.endsWith('/v1/service'))) {
            return;
        }
        await auth(request, reply);
    });
    
    app.get('/', getServices);
    app.get('/providers/all', getAllProvidersAndServices);
    app.get('/:id', getServiceById);
    app.post('/', createService);
    app.put('/:id', editService);
    app.delete('/:id', deleteService);
    app.post('/:id/slot', createSlot);
    app.put('/:serviceId/slot/:slotId', editSlot);
    app.delete('/:serviceId/slot/:slotId', deleteSlot);
};

export default serviceRoutes; 