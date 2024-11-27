const {
    createEventController,
    getEventController,
    getAllEventController,
    updateEventController,
} = require('../controllers/eventController');

const createEventHandler = async (req, res) => {
    const { event_name, description, event_date, location } = req.body;
    const errores = [];

    if (!event_name) errores.push('El campo event_name es requerido');
    if (event_name && typeof event_name !== 'string') errores.push('El nombre del evento debe ser una cadena de texto');
    if (!description) errores.push('El campo description es requerido');
    if (description && typeof description !== 'string') errores.push('La descripción debe ser una cadena de texto');
    if (!event_date) errores.push('El campo event_date es requerido');
    if (event_date && isNaN(new Date(event_date))) errores.push('El campo event_date debe ser una fecha válida');
    if (!location) errores.push('El campo location es requerido');
    if (location && typeof location !== 'string') errores.push('El campo location debe ser una cadena de texto');

    if (errores.length > 0) {
        return res.status(400).json({ message: 'Se encontraron los siguientes errores', data: errores });
    }

    try {
        const response = await createEventController({ event_name, description, event_date, location });
        if (!response) {
            return res.status(201).json({ message: 'Error al crear el evento', data: [] });
        }
        return res.status(200).json({ message: 'Evento creado correctamente', data: response });
    } catch (error) {
        console.error({ message: "Error en el Handler", data: error });
        return res.status(500).json({ message: "Error interno del servidor al crear un evento" });
    }
};

const updateEventHandler = async (req, res) => {
    const { id } = req.params;
    const { event_name, description, event_date, location } = req.body;
    const errores = [];

    if (!event_name) errores.push('El campo event_name es requerido');
    if (event_name && typeof event_name !== 'string') errores.push('El nombre del evento debe ser una cadena de texto');
    if (!description) errores.push('El campo description es requerido');
    if (description && typeof description !== 'string') errores.push('La descripción debe ser una cadena de texto');
    if (!event_date) errores.push('El campo event_date es requerido');
    if (event_date && isNaN(new Date(event_date))) errores.push('El campo event_date debe ser una fecha válida');
    if (!location) errores.push('El campo location es requerido');
    if (location && typeof location !== 'string') errores.push('El campo location debe ser una cadena de texto');

    if (errores.length > 0) {
        return res.status(400).json({ message: 'Se encontraron los siguientes errores', data: errores });
    }

    try {
        const response = await updateEventController(id, { event_name, description, event_date, location });
        if (!response) {
            return res.status(404).json({ message: 'Error al modificar el evento', data: [] });
        }
        return res.status(200).json({ message: 'Evento modificado con éxito', data: response });
    } catch (error) {
        console.error({ message: "Error en el Handler al modificar", data: error });
        return res.status(500).json({ message: "Error interno del servidor al modificar un evento" });
    }
};

const getAllEventHandler = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const errores = [];

    if (isNaN(page)) errores.push("El page debe ser un número");
    if (page <= 0) errores.push("El page debe ser mayor a 0");
    if (isNaN(limit)) errores.push("El limit debe ser un número");
    if (limit <= 0) errores.push("El limit debe ser mayor a 0");

    if (errores.length > 0) {
        return res.status(400).json({ errores });
    }

    try {
        const response = await getAllEventController(Number(page), Number(limit));
        if (response.data.length === 0) {
            return res.status(200).json({
                message: 'No hay más eventos',
                data: {
                    data: [],
                    totalPage: response.currentPage,
                    totalCount: response.totalCount
                }
            });
        }

        return res.status(200).json({
            message: "Eventos obtenidos correctamente",
            data: response,
        });
    } catch (error) {
        console.error("Error en el Handler:", error);
        return res.status(500).json({ error: "Error interno del servidor al obtener los eventos" });
    }
};

const getEventHandler = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "ID inválido" });
    }

    try {
        const event = await getEventController(id);
        if (!event) {
            return res.status(404).json({ message: "Evento no encontrado" });
        }

        return res.status(200).json({ message: 'Evento obtenido', data: event });
    } catch (error) {
        console.error("Error al obtener el evento:", error);
        return res.status(500).json({ error: "Error interno del servidor al obtener el evento." });
    }
};

module.exports = {
    createEventHandler,
    updateEventHandler,
    getAllEventHandler,
    getEventHandler
};
