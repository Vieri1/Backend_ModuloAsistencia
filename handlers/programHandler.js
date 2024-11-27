const {
    createProgramController,
    updateProgramController,
    getProgramController,
    getAllProgramsController,
} = require('../controllers/programController');

const createProgramHandler = async (req, res) => {
    const { program_name, department_id, degree_level } = req.body;
    const errores = [];

    if (!program_name) errores.push("El campo program_name es requerido.");
    if (program_name && typeof program_name !== 'string') errores.push("El campo program_name debe ser un string.");
    if (department_id && typeof department_id !== 'string') errores.push("El campo department_id debe ser un UUID.");
    if (degree_level && typeof degree_level !== 'number') errores.push("El campo degree_level debe ser un número.");

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores en la validación de datos", data: errores });
    }

    try {
        const response = await createProgramController({ program_name, department_id, degree_level });
        if (!response) {
            return res.status(500).json({ message: "No se pudo crear el programa" });
        }
        return res.status(201).json({ message: "Programa creado exitosamente", data: response });
    } catch (error) {
        console.error("Error en el Handler al crear un programa:", error);
        return res.status(500).json({ message: "Error interno del servidor al crear un programa." });
    }
};

const updateProgramHandler = async (req, res) => {
    const { id } = req.params;
    const { program_name, department_id, degree_level } = req.body;
    const errores = [];

    if (program_name && typeof program_name !== 'string') errores.push("El campo program_name debe ser un string.");
    if (department_id && typeof department_id !== 'string') errores.push("El campo department_id debe ser un UUID.");
    if (degree_level && typeof degree_level !== 'number') errores.push("El campo degree_level debe ser un número.");

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores en la validación de datos", data: errores });
    }

    try {
        const response = await updateProgramController(id, { program_name, department_id, degree_level });
        if (!response) {
            return res.status(404).json({ message: "Programa no encontrado o no se pudo actualizar" });
        }
        return res.status(200).json({ message: "Programa actualizado exitosamente", data: response });
    } catch (error) {
        console.error("Error en el Handler al actualizar un programa:", error);
        return res.status(500).json({ message: "Error interno del servidor al actualizar un programa." });
    }
};

const getAllProgramsHandler = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;

    try {
        const response = await getAllProgramsController(Number(page), Number(limit));
        if (!response || response.data.length === 0) {
            return res.status(200).json({ message: "No hay programas registrados", data: [] });
        }
        return res.status(200).json({ message: "Programas obtenidos correctamente", data: response });
    } catch (error) {
        console.error("Error en el Handler al obtener programas:", error);
        return res.status(500).json({ message: "Error interno del servidor al obtener programas." });
    }
};

const getProgramHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await getProgramController(id);
        if (!response) {
            return res.status(404).json({ message: "Programa no encontrado" });
        }
        return res.status(200).json({ message: "Programa obtenido correctamente", data: response });
    } catch (error) {
        console.error("Error en el Handler al obtener un programa:", error);
        return res.status(500).json({ message: "Error interno del servidor al obtener un programa." });
    }
};

module.exports = {
    createProgramHandler,
    updateProgramHandler,
    getAllProgramsHandler,
    getProgramHandler,
};
