const {
    createDepartmentController,
    updateDepartmentController,
    getDepartmentController,
    getAllDepartmentsController,
} = require('../controllers/departmentController');

const createDepartmentHandler = async (req, res) => {
    const { department_name, head_of_department } = req.body;
    const errores = [];

    if (!department_name) errores.push("El campo department_name es requerido.");
    if (department_name && typeof department_name !== 'string') errores.push("El campo department_name debe ser un string.");
    if (head_of_department && typeof head_of_department !== 'string') errores.push("El campo head_of_department debe ser un UUID.");

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores en la validación de datos", data: errores });
    }

    try {
        const response = await createDepartmentController({ department_name, head_of_department });
        if (!response) {
            return res.status(500).json({ message: "No se pudo crear el departamento" });
        }
        return res.status(201).json({ message: "Departamento creado exitosamente", data: response });
    } catch (error) {
        console.error("Error en el Handler al crear un departamento:", error);
        return res.status(500).json({ message: "Error interno del servidor al crear un departamento." });
    }
};

const updateDepartmentHandler = async (req, res) => {
    const { id } = req.params;
    const { department_name, head_of_department } = req.body;
    const errores = [];

    if (!department_name) errores.push("El campo department_name es requerido.");
    if (department_name && typeof department_name !== 'string') errores.push("El campo department_name debe ser un string.");
    if (head_of_department && typeof head_of_department !== 'string') errores.push("El campo head_of_department debe ser un UUID.");

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores en la validación de datos", data: errores });
    }

    try {
        const response = await updateDepartmentController(id, { department_name, head_of_department });
        if (!response) {
            return res.status(404).json({ message: "Departamento no encontrado o no se pudo actualizar" });
        }
        return res.status(200).json({ message: "Departamento actualizado exitosamente", data: response });
    } catch (error) {
        console.error("Error en el Handler al actualizar un departamento:", error);
        return res.status(500).json({ message: "Error interno del servidor al actualizar un departamento." });
    }
};

const getAllDepartmentsHandler = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;

    try {
        const response = await getAllDepartmentsController(Number(page), Number(limit));
        if (!response || response.data.length === 0) {
            return res.status(200).json({ message: "No hay departamentos registrados", data: [] });
        }
        return res.status(200).json({ message: "Departamentos obtenidos correctamente", data: response });
    } catch (error) {
        console.error("Error en el Handler al obtener departamentos:", error);
        return res.status(500).json({ message: "Error interno del servidor al obtener departamentos." });
    }
};

const getDepartmentHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await getDepartmentController(id);
        if (!response) {
            return res.status(404).json({ message: "Departamento no encontrado" });
        }
        return res.status(200).json({ message: "Departamento obtenido correctamente", data: response });
    } catch (error) {
        console.error("Error en el Handler al obtener un departamento:", error);
        return res.status(500).json({ message: "Error interno del servidor al obtener un departamento." });
    }
};

module.exports = {
    createDepartmentHandler,
    updateDepartmentHandler,
    getAllDepartmentsHandler,
    getDepartmentHandler
};
