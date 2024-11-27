const {
    createStudentController,
    updateStudentController,
    getStudentController,
    getAllStudentsController,
} = require('../controllers/studentController');

const createStudentHandler = async (req, res) => {
    const { first_name, last_name, email, phone_number, enrollment_year, program_id } = req.body;
    const errores = [];

    if (!first_name) errores.push("El campo first_name es requerido.");
    if (first_name && typeof first_name !== 'string') errores.push("El campo first_name debe ser un string.");
    if (!last_name) errores.push("El campo last_name es requerido.");
    if (last_name && typeof last_name !== 'string') errores.push("El campo last_name debe ser un string.");
    if (email && typeof email !== 'string') errores.push("El campo email debe ser un string.");
    if (phone_number && typeof phone_number !== 'string') errores.push("El campo phone_number debe ser un string.");
    if (enrollment_year && typeof enrollment_year !== 'number') errores.push("El campo enrollment_year debe ser un número.");
    if (program_id && typeof program_id !== 'string') errores.push("El campo program_id debe ser un UUID.");

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores en la validación de datos", data: errores });
    }

    try {
        const response = await createStudentController({ first_name, last_name, email, phone_number, enrollment_year, program_id });
        if (!response) {
            return res.status(500).json({ message: "No se pudo crear el estudiante" });
        }
        return res.status(201).json({ message: "Estudiante creado exitosamente", data: response });
    } catch (error) {
        console.error("Error en el Handler al crear un estudiante:", error);
        return res.status(500).json({ message: "Error interno del servidor al crear un estudiante." });
    }
};

const updateStudentHandler = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, phone_number, enrollment_year, program_id } = req.body;
    const errores = [];

    if (first_name && typeof first_name !== 'string') errores.push("El campo first_name debe ser un string.");
    if (last_name && typeof last_name !== 'string') errores.push("El campo last_name debe ser un string.");
    if (email && typeof email !== 'string') errores.push("El campo email debe ser un string.");
    if (phone_number && typeof phone_number !== 'string') errores.push("El campo phone_number debe ser un string.");
    if (enrollment_year && typeof enrollment_year !== 'number') errores.push("El campo enrollment_year debe ser un número.");
    if (program_id && typeof program_id !== 'string') errores.push("El campo program_id debe ser un UUID.");

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores en la validación de datos", data: errores });
    }

    try {
        const response = await updateStudentController(id, { first_name, last_name, email, phone_number, enrollment_year, program_id });
        if (!response) {
            return res.status(404).json({ message: "Estudiante no encontrado o no se pudo actualizar" });
        }
        return res.status(200).json({ message: "Estudiante actualizado exitosamente", data: response });
    } catch (error) {
        console.error("Error en el Handler al actualizar un estudiante:", error);
        return res.status(500).json({ message: "Error interno del servidor al actualizar un estudiante." });
    }
};

const getAllStudentsHandler = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;

    try {
        const response = await getAllStudentsController(Number(page), Number(limit));
        if (!response || response.data.length === 0) {
            return res.status(200).json({ message: "No hay estudiantes registrados", data: [] });
        }
        return res.status(200).json({ message: "Estudiantes obtenidos correctamente", data: response });
    } catch (error) {
        console.error("Error en el Handler al obtener estudiantes:", error);
        return res.status(500).json({ message: "Error interno del servidor al obtener estudiantes." });
    }
};

const getStudentHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await getStudentController(id);
        if (!response) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }
        return res.status(200).json({ message: "Estudiante obtenido correctamente", data: response });
    } catch (error) {
        console.error("Error en el Handler al obtener un estudiante:", error);
        return res.status(500).json({ message: "Error interno del servidor al obtener un estudiante." });
    }
};

module.exports = {
    createStudentHandler,
    updateStudentHandler,
    getAllStudentsHandler,
    getStudentHandler,
};
