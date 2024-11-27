const {
    createMaintenanceRequestController,
    updateMaintenanceRequestController,
    getMaintenanceRequestController,
    getAllMaintenanceRequestsController,
} = require('../controllers/maintenanceRequestController');

const createMaintenanceRequestHandler = async (req, res) => {
    const { description, request_date, state, assigned_to } = req.body;
    const errores = [];

    if (!description) errores.push("El campo description es obligatorio.");
    if (!request_date || isNaN(Date.parse(request_date))) errores.push("El campo request_date debe ser una fecha válida.");
    if (state === undefined) errores.push("El campo state es obligatorio.");
    if (assigned_to && !/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/.test(assigned_to)) 
        errores.push("El campo assigned_to debe ser un UUID válido.");

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores en la validación de datos", data: errores });
    }

    try {
        const response = await createMaintenanceRequestController({ description, request_date, state, assigned_to });
        return res.status(201).json({ message: "Solicitud de mantenimiento creada exitosamente", data: response });
    } catch (error) {
        console.error("Error en el handler al crear la solicitud de mantenimiento:", error);
        return res.status(500).json({ message: "Error interno del servidor al crear la solicitud de mantenimiento." });
    }
};

const updateMaintenanceRequestHandler = async (req, res) => {
    const { id } = req.params;
    const { description, request_date, state, assigned_to } = req.body;
    const errores = [];

    if (!description) errores.push("El campo description es obligatorio.");
    if (!request_date || isNaN(Date.parse(request_date))) errores.push("El campo request_date debe ser una fecha válida.");
    if (state === undefined) errores.push("El campo state es obligatorio.");
    if (assigned_to && !/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/.test(assigned_to)) 
        errores.push("El campo assigned_to debe ser un UUID válido.");

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores en la validación de datos", data: errores });
    }

    try {
        const response = await updateMaintenanceRequestController(id, { description, request_date, state, assigned_to });
        if (!response) {
            return res.status(404).json({ message: "Solicitud de mantenimiento no encontrada o no se pudo actualizar" });
        }
        return res.status(200).json({ message: "Solicitud de mantenimiento actualizada exitosamente", data: response });
    } catch (error) {
        console.error("Error en el handler al actualizar la solicitud de mantenimiento:", error);
        return res.status(500).json({ message: "Error interno del servidor al actualizar la solicitud de mantenimiento." });
    }
};

const getMaintenanceRequestHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await getMaintenanceRequestController(id);
        if (!response) {
            return res.status(404).json({ message: "Solicitud de mantenimiento no encontrada" });
        }
        return res.status(200).json({ message: "Solicitud de mantenimiento obtenida correctamente", data: response });
    } catch (error) {
        console.error("Error en el handler al obtener la solicitud de mantenimiento:", error);
        return res.status(500).json({ message: "Error interno del servidor al obtener la solicitud de mantenimiento." });
    }
};

const getAllMaintenanceRequestsHandler = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;

    try {
        const response = await getAllMaintenanceRequestsController(Number(page), Number(limit));
        if (!response || response.data.length === 0) {
            return res.status(200).json({ message: "No hay solicitudes de mantenimiento registradas", data: [] });
        }
        return res.status(200).json({ message: "Solicitudes de mantenimiento obtenidas correctamente", data: response });
    } catch (error) {
        console.error("Error en el handler al obtener las solicitudes de mantenimiento:", error);
        return res.status(500).json({ message: "Error interno del servidor al obtener las solicitudes de mantenimiento." });
    }
};

module.exports = {
    createMaintenanceRequestHandler,
    updateMaintenanceRequestHandler,
    getMaintenanceRequestHandler,
    getAllMaintenanceRequestsHandler,
};
