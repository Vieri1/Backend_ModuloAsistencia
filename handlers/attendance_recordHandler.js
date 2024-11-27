const {
    createAttendanceRecordController,
    updateAttendanceRecordController,
    getAttendanceRecordController,
    getAllAttendanceRecordsController,
} = require('../controllers/attendance_recordController');

const createAttendanceRecordHandler = async (req, res) => {
    const { student_id, course_id, schedule_id, date, status } = req.body;
    const errores = [];

    if (!student_id) errores.push("El campo student_id es requerido.");
    if (student_id && typeof student_id !== 'string') errores.push("El campo student_id debe ser un UUID.");
    if (!course_id) errores.push("El campo course_id es requerido.");
    if (course_id && typeof course_id !== 'string') errores.push("El campo course_id debe ser un UUID.");
    if (!schedule_id) errores.push("El campo schedule_id es requerido.");
    if (schedule_id && typeof schedule_id !== 'string') errores.push("El campo schedule_id debe ser un UUID.");
    if (!date) errores.push("El campo date es requerido.");
    if (date && isNaN(Date.parse(date))) errores.push("El campo date debe ser una fecha válida.");
    if (status === undefined || status === null) errores.push("El campo status es requerido.");
    if (status !== undefined && typeof status !== 'boolean') errores.push("El campo status debe ser un valor booleano.");

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores en la validación de datos", data: errores });
    }

    try {
        const response = await createAttendanceRecordController({ student_id, course_id, schedule_id, date, status });
        if (!response) {
            return res.status(500).json({ message: "No se pudo crear el registro de asistencia" });
        }
        return res.status(201).json({ message: "Registro de asistencia creado exitosamente", data: response });
    } catch (error) {
        console.error("Error en el Handler al crear registro de asistencia:", error);
        return res.status(500).json({ message: "Error interno del servidor al crear un registro de asistencia." });
    }
};

const updateAttendanceRecordHandler = async (req, res) => {
    const { id } = req.params;
    const { student_id, course_id, schedule_id, date, status } = req.body;
    const errores = [];

    if (!student_id) errores.push("El campo student_id es requerido.");
    if (student_id && typeof student_id !== 'string') errores.push("El campo student_id debe ser un UUID.");
    if (!course_id) errores.push("El campo course_id es requerido.");
    if (course_id && typeof course_id !== 'string') errores.push("El campo course_id debe ser un UUID.");
    if (!schedule_id) errores.push("El campo schedule_id es requerido.");
    if (schedule_id && typeof schedule_id !== 'string') errores.push("El campo schedule_id debe ser un UUID.");
    if (!date) errores.push("El campo date es requerido.");
    if (date && isNaN(Date.parse(date))) errores.push("El campo date debe ser una fecha válida.");
    if (status === undefined || status === null) errores.push("El campo status es requerido.");
    if (status !== undefined && typeof status !== 'boolean') errores.push("El campo status debe ser un valor booleano.");

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores en la validación de datos", data: errores });
    }

    try {
        const response = await updateAttendanceRecordController(id, { student_id, course_id, schedule_id, date, status });
        if (!response) {
            return res.status(404).json({ message: "Registro de asistencia no encontrado o no se pudo actualizar" });
        }
        return res.status(200).json({ message: "Registro de asistencia actualizado exitosamente", data: response });
    } catch (error) {
        console.error("Error en el Handler al actualizar registro de asistencia:", error);
        return res.status(500).json({ message: "Error interno del servidor al actualizar un registro de asistencia." });
    }
};

const getAllAttendanceRecordsHandler = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;

    try {
        const response = await getAllAttendanceRecordsController(Number(page), Number(limit));
        if (!response || response.data.length === 0) {
            return res.status(200).json({ message: "No hay registros de asistencia registrados", data: [] });
        }
        return res.status(200).json({ message: "Registros de asistencia obtenidos correctamente", data: response });
    } catch (error) {
        console.error("Error en el Handler al obtener registros de asistencia:", error);
        return res.status(500).json({ message: "Error interno del servidor al obtener registros de asistencia." });
    }
};

const getAttendanceRecordHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await getAttendanceRecordController(id);
        if (!response) {
            return res.status(404).json({ message: "Registro de asistencia no encontrado" });
        }
        return res.status(200).json({ message: "Registro de asistencia obtenido correctamente", data: response });
    } catch (error) {
        console.error("Error en el Handler al obtener registro de asistencia:", error);
        return res.status(500).json({ message: "Error interno del servidor al obtener un registro de asistencia." });
    }
};

module.exports = {
    createAttendanceRecordHandler,
    updateAttendanceRecordHandler,
    getAllAttendanceRecordsHandler,
    getAttendanceRecordHandler,
};
