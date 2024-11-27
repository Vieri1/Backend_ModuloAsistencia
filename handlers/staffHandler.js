const {
    createStaffController,
    updateStaffController,
    getStaffController,
    getAllStaffController,
} = require('../controllers/staffController');

const createStaffHandler = async (req, res) => {
    const { first_name, last_name, email, phone_number, position } = req.body;
    const errores = [];

    if (first_name && typeof first_name !== 'string') errores.push("El campo first_name debe ser un string.");
    if (last_name && typeof last_name !== 'string') errores.push("El campo last_name debe ser un string.");
    if (email && !/\S+@\S+\.\S+/.test(email)) errores.push("El campo email debe ser un correo electrónico válido.");
    if (phone_number && typeof phone_number !== 'string') errores.push("El campo phone_number debe ser un string.");
    if (position && typeof position !== 'string') errores.push("El campo position debe ser un string.");

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores en la validación de datos", data: errores });
    }

    try {
        const response = await createStaffController({ first_name, last_name, email, phone_number, position });
        return res.status(201).json({ message: "Miembro del personal creado exitosamente", data: response });
    } catch (error) {
        console.error("Error en el handler al crear un miembro del personal:", error);
        return res.status(500).json({ message: "Error interno del servidor al crear un miembro del personal." });
    }
};

const updateStaffHandler = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, phone_number, position } = req.body;
    const errores = [];

    if (first_name && typeof first_name !== 'string') errores.push("El campo first_name debe ser un string.");
    if (last_name && typeof last_name !== 'string') errores.push("El campo last_name debe ser un string.");
    if (email && !/\S+@\S+\.\S+/.test(email)) errores.push("El campo email debe ser un correo electrónico válido.");
    if (phone_number && typeof phone_number !== 'string') errores.push("El campo phone_number debe ser un string.");
    if (position && typeof position !== 'string') errores.push("El campo position debe ser un string.");

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores en la validación de datos", data: errores });
    }

    try {
        const response = await updateStaffController(id, { first_name, last_name, email, phone_number, position });
        if (!response) {
            return res.status(404).json({ message: "Miembro del personal no encontrado o no se pudo actualizar" });
        }
        return res.status(200).json({ message: "Miembro del personal actualizado exitosamente", data: response });
    } catch (error) {
        console.error("Error en el handler al actualizar un miembro del personal:", error);
        return res.status(500).json({ message: "Error interno del servidor al actualizar un miembro del personal." });
    }
};

const getStaffHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await getStaffController(id);
        if (!response) {
            return res.status(404).json({ message: "Miembro del personal no encontrado" });
        }
        return res.status(200).json({ message: "Miembro del personal obtenido correctamente", data: response });
    } catch (error) {
        console.error("Error en el handler al obtener un miembro del personal:", error);
        return res.status(500).json({ message: "Error interno del servidor al obtener un miembro del personal." });
    }
};

const getAllStaffHandler = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;

    try {
        const response = await getAllStaffController(Number(page), Number(limit));
        if (!response || response.data.length === 0) {
            return res.status(200).json({ message: "No hay miembros del personal registrados", data: [] });
        }
        return res.status(200).json({ message: "Miembros del personal obtenidos correctamente", data: response });
    } catch (error) {
        console.error("Error en el handler al obtener los miembros del personal:", error);
        return res.status(500).json({ message: "Error interno del servidor al obtener los miembros del personal." });
    }
};

module.exports = {
    createStaffHandler,
    updateStaffHandler,
    getStaffHandler,
    getAllStaffHandler,
};
