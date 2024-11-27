const { event } = require('../db_connection');

const createEventController = async ({ event_name, description, event_date, location }) => {
    try {
        const newEvent = await event.create({ event_name, description, event_date, location });
        return newEvent || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al Crear el evento", data: error });
        return false;
    }
};

const updateEventController = async (id, { event_name, description, event_date, location }) => {
    try {
        const response = await getEventController(id);
        if (response) {
            await response.update({ event_name, description, event_date, location });
        }
        return response || null;
    } catch (error) {
        console.error({ message: "Error al modificar el evento", data: error });
        return false;
    }
};

const getEventController = async (id) => {
    try {
        const response = await event.findByPk(id);
        return response || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al traer un evento", data: error });
        return false;
    }
};

const getAllEventController = async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    try {
        const response = await event.findAndCountAll({
            limit,
            offset,
            order: [['id', 'ASC']],
        });
        return { totalCount: response.count, data: response.rows, currentPage: page } || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al traer todos los eventos", data: error });
        return false;
    }
};

module.exports = {
    createEventController,
    getEventController,
    getAllEventController,
    updateEventController
};
