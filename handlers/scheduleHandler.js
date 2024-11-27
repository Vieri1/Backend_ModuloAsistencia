const {
    createScheduleController,
    updateScheduleController,
    getScheduleController,
    getAllSchedulesController,
} = require('../controllers/scheduleController');

const createScheduleHandler = async (req, res) => {
    const { course_id, instructor_id, day_of_week, start_time, end_time } = req.body;
    const errores = [];

    if (course_id && typeof course_id !== 'string') errores.push("El campo course_id debe ser un UUID.");
    if (instructor_id && typeof instructor_id !== 'string') errores.push("El campo instructor_id debe ser un UUID.");
    if (day_of_week && typeof day_of_week !== 'string') errores.push("El campo day_of_week debe ser un string.");
    if (start_time && typeof start_time !== 'string') errores.push("El campo start_time debe ser una hora válida.");
    if (end_time && typeof end_time !== 'string') errores.push("El campo end_time debe ser una hora válida.");

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores en la validación de datos", data: errores });
    }

    try {
        const response = await createScheduleController({ course_id, instructor_id, day_of_week, start_time, end_time });
        return res.status(201).json({ message: "Horario creado exitosamente", data: response });
    } catch (error) {
        console.error("Error en el handler al crear un horario:", error);
        return res.status(500).json({ message: "Error interno del servidor al crear un horario." });
    }
};

const updateScheduleHandler = async (req, res) => {
    const { id } = req.params;
    const { course_id, instructor_id, day_of_week, start_time, end_time } = req.body;
    const errores = [];

    if (course_id && typeof course_id !== 'string') errores.push("El campo course_id debe ser un UUID.");
    if (instructor_id && typeof instructor_id !== 'string') errores.push("El campo instructor_id debe ser un UUID.");
    if (day_of_week && typeof day_of_week !== 'string') errores.push("El campo day_of_week debe ser un string.");
    if (start_time && typeof start_time !== 'string') errores.push("El campo start_time debe ser una hora válida.");
    if (end_time && typeof end_time !== 'string') errores.push("El campo end_time debe ser una hora válida.");

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores en la validación de datos", data: errores });
    }

    try {
        const response = await updateScheduleController(id, { course_id, instructor_id, day_of_week, start_time, end_time });
        if (!response) {
            return res.status(404).json({ message: "Horario no encontrado o no se pudo actualizar" });
        }
        return res.status(200).json({ message: "Horario actualizado exitosamente", data: response });
    } catch (error) {
        console.error("Error en el handler al actualizar un horario:", error);
        return res.status(500).json({ message: "Error interno del servidor al actualizar un horario." });
    }
};

const getScheduleHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await getScheduleController(id);
        if (!response) {
            return res.status(404).json({ message: "Horario no encontrado" });
        }
        return res.status(200).json({ message: "Horario obtenido correctamente", data: response });
    } catch (error) {
        console.error("Error en el handler al obtener un horario:", error);
        return res.status(500).json({ message: "Error interno del servidor al obtener un horario." });
    }
};

const getAllSchedulesHandler = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;

    try {
        const response = await getAllSchedulesController(Number(page), Number(limit));
        if (!response || response.data.length === 0) {
            return res.status(200).json({ message: "No hay horarios registrados", data: [] });
        }
        return res.status(200).json({ message: "Horarios obtenidos correctamente", data: response });
    } catch (error) {
        console.error("Error en el handler al obtener los horarios:", error);
        return res.status(500).json({ message: "Error interno del servidor al obtener los horarios." });
    }
};

module.exports = {
    createScheduleHandler,
    updateScheduleHandler,
    getScheduleHandler,
    getAllSchedulesHandler,
};
 