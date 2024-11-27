const {
    createEnrollmentController,
    updateEnrollmentController,
    getEnrollmentController,
    getAllEnrollmentsController,
} = require('../controllers/enrollmentController');

const createEnrollmentHandler = async (req, res) => {
    const { student_id, course_id, enrollment_date } = req.body;
    const errores = [];

    if (!student_id) errores.push("El campo student_id es obligatorio.");
    if (!course_id) errores.push("El campo course_id es obligatorio.");
    if (enrollment_date && isNaN(Date.parse(enrollment_date))) errores.push("El campo enrollment_date debe ser una fecha válida.");

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores en la validación de datos", data: errores });
    }

    try {
        const response = await createEnrollmentController({ student_id, course_id, enrollment_date });
        return res.status(201).json({ message: "Matrícula creada exitosamente", data: response });
    } catch (error) {
        console.error("Error en el handler al crear una matrícula:", error);
        return res.status(500).json({ message: "Error interno del servidor al crear una matrícula." });
    }
};

const updateEnrollmentHandler = async (req, res) => {
    const { id } = req.params;
    const { student_id, course_id, enrollment_date } = req.body;
    const errores = [];

    if (!student_id) errores.push("El campo student_id es obligatorio.");
    if (!course_id) errores.push("El campo course_id es obligatorio.");
    if (enrollment_date && isNaN(Date.parse(enrollment_date))) errores.push("El campo enrollment_date debe ser una fecha válida.");

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores en la validación de datos", data: errores });
    }

    try {
        const response = await updateEnrollmentController(id, { student_id, course_id, enrollment_date });
        if (!response) {
            return res.status(404).json({ message: "Matrícula no encontrada o no se pudo actualizar" });
        }
        return res.status(200).json({ message: "Matrícula actualizada exitosamente", data: response });
    } catch (error) {
        console.error("Error en el handler al actualizar una matrícula:", error);
        return res.status(500).json({ message: "Error interno del servidor al actualizar una matrícula." });
    }
};

const getEnrollmentHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await getEnrollmentController(id);
        if (!response) {
            return res.status(404).json({ message: "Matrícula no encontrada" });
        }
        return res.status(200).json({ message: "Matrícula obtenida correctamente", data: response });
    } catch (error) {
        console.error("Error en el handler al obtener una matrícula:", error);
        return res.status(500).json({ message: "Error interno del servidor al obtener una matrícula." });
    }
};

const getAllEnrollmentsHandler = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;

    try {
        const response = await getAllEnrollmentsController(Number(page), Number(limit));
        if (!response || response.data.length === 0) {
            return res.status(200).json({ message: "No hay matrículas registradas", data: [] });
        }
        return res.status(200).json({ message: "Matrículas obtenidas correctamente", data: response });
    } catch (error) {
        console.error("Error en el handler al obtener las matrículas:", error);
        return res.status(500).json({ message: "Error interno del servidor al obtener las matrículas." });
    }
};

module.exports = {
    createEnrollmentHandler,
    updateEnrollmentHandler,
    getEnrollmentHandler,
    getAllEnrollmentsHandler,
};
