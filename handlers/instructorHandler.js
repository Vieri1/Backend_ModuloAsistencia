const {
    createInstructorController,
    updateInstructorController,
    getInstructorController,
    getAllInstructorsController,
} = require('../controllers/instructorController');

const createInstructorHandler = async (req, res) => {
    const { first_name, last_name, email, phone_number, department_id } = req.body;
    const errores = [];

    if (!first_name) errores.push("El campo first_name es requerido.");
    if (first_name && typeof first_name !== 'string') errores.push("El campo first_name debe ser una cadena.");
    if (!last_name) errores.push("El campo last_name es requerido.");
    if (last_name && typeof last_name !== 'string') errores.push("El campo last_name debe ser una cadena.");
    if (!email) errores.push("El campo email es requerido.");
    if (email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) errores.push("El campo email debe tener un formato válido.");
    if (!phone_number) errores.push("El campo phone_number es requerido.");
    if (phone_number && typeof phone_number !== 'string') errores.push("El campo phone_number debe ser una cadena.");
    if (!department_id) errores.push("El campo department_id es requerido.");
    if (department_id && typeof department_id !== 'string') errores.push("El campo department_id debe ser un UUID.");

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores en la validación de datos", data: errores });
    }

    try {
        const response = await createInstructorController({ first_name, last_name, email, phone_number, department_id });
        if (!response) {
            return res.status(500).json({ message: "No se pudo crear el instructor" });
        }
        return res.status(201).json({ message: "Instructor creado exitosamente", data: response });
    } catch (error) {
        console.error("Error en el Handler al crear instructor:", error);
        return res.status(500).json({ message: "Error interno del servidor al crear un instructor." });
    }
};

const updateInstructorHandler = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, phone_number, department_id } = req.body;
    const errores = [];

    if (!first_name) errores.push("El campo first_name es requerido.");
    if (first_name && typeof first_name !== 'string') errores.push("El campo first_name debe ser una cadena.");
    if (!last_name) errores.push("El campo last_name es requerido.");
    if (last_name && typeof last_name !== 'string') errores.push("El campo last_name debe ser una cadena.");
    if (!email) errores.push("El campo email es requerido.");
    if (email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) errores.push("El campo email debe tener un formato válido.");
    if (!phone_number) errores.push("El campo phone_number es requerido.");
    if (phone_number && typeof phone_number !== 'string') errores.push("El campo phone_number debe ser una cadena.");
    if (!department_id) errores.push("El campo department_id es requerido.");
    if (department_id && typeof department_id !== 'string') errores.push("El campo department_id debe ser un UUID.");

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores en la validación de datos", data: errores });
    }

    try {
        const response = await updateInstructorController(id, { first_name, last_name, email, phone_number, department_id });
        if (!response) {
            return res.status(404).json({ message: "Instructor no encontrado o no se pudo actualizar" });
        }
        return res.status(200).json({ message: "Instructor actualizado exitosamente", data: response });
    } catch (error) {
        console.error("Error en el Handler al actualizar instructor:", error);
        return res.status(500).json({ message: "Error interno del servidor al actualizar un instructor." });
    }
};

const getAllInstructorsHandler = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;

    try {
        const response = await getAllInstructorsController(Number(page), Number(limit));
        if (!response || response.data.length === 0) {
            return res.status(200).json({ message: "No hay instructores registrados", data: [] });
        }
        return res.status(200).json({ message: "Instructores obtenidos correctamente", data: response });
    } catch (error) {
        console.error("Error en el Handler al obtener instructores:", error);
        return res.status(500).json({ message: "Error interno del servidor al obtener instructores." });
    }
};

const getInstructorHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await getInstructorController(id);
        if (!response) {
            return res.status(404).json({ message: "Instructor no encontrado" });
        }
        return res.status(200).json({ message: "Instructor obtenido correctamente", data: response });
    } catch (error) {
        console.error("Error en el Handler al obtener instructor:", error);
        return res.status(500).json({ message: "Error interno del servidor al obtener un instructor." });
    }
};

module.exports = {
    createInstructorHandler,
    updateInstructorHandler,
    getAllInstructorsHandler,
    getInstructorHandler
};
