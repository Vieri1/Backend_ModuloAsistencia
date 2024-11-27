const { maintenance_request } = require('../db_connection');

const createMaintenanceRequestController = async ({ description, request_date, state, assigned_to }) => {
    try {
        const newRequest = await maintenance_request.create({ description, request_date, state, assigned_to });
        return newRequest || null;
    } catch (error) {
        console.error("Error en el controlador al crear la solicitud de mantenimiento:", error);
        throw error;
    }
};

const updateMaintenanceRequestController = async (id, { description, request_date, state, assigned_to }) => {
    try {
        const existingRequest = await getMaintenanceRequestController(id);
        if (existingRequest) {
            await existingRequest.update({ description, request_date, state, assigned_to });
        }
        return existingRequest || null;
    } catch (error) {
        console.error("Error en el controlador al actualizar la solicitud de mantenimiento:", error);
        throw error;
    }
};

const getMaintenanceRequestController = async (id) => {
    try {
        const foundRequest = await maintenance_request.findByPk(id);
        return foundRequest || null;
    } catch (error) {
        console.error("Error en el controlador al obtener la solicitud de mantenimiento:", error);
        throw error;
    }
};

const getAllMaintenanceRequestsController = async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    try {
        const result = await maintenance_request.findAndCountAll({
            limit,
            offset,
            order: [['request_date', 'ASC']],
        });
        return { totalCount: result.count, data: result.rows, currentPage: page } || null;
    } catch (error) {
        console.error("Error en el controlador al obtener las solicitudes de mantenimiento:", error);
        throw error;
    }
};

module.exports = {
    createMaintenanceRequestController,
    updateMaintenanceRequestController,
    getMaintenanceRequestController,
    getAllMaintenanceRequestsController,
};
