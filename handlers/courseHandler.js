const {
    createCourseController,
    updateCourseController,
    getCourseController,
    getAllCoursesController,
} = require('../controllers/courseController');

const createCourseHandler = async (req, res) => {
    const { course_name, credits, semester, program_id, area_id } = req.body;
    const errores = [];

    if (!course_name) errores.push("El campo course_name es requerido.");
    if (course_name && typeof course_name !== 'string') errores.push("El campo course_name debe ser una cadena.");
    if (!credits) errores.push("El campo credits es requerido.");
    if (credits && typeof credits !== 'number') errores.push("El campo credits debe ser un número.");
    if (!semester) errores.push("El campo semester es requerido.");
    if (semester && !['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'].includes(semester)) {
        errores.push("El campo semester debe ser uno de los valores permitidos.");
    }
    if (!program_id) errores.push("El campo program_id es requerido.");
    if (program_id && typeof program_id !== 'string') errores.push("El campo program_id debe ser un UUID.");
    if (!area_id) errores.push("El campo area_id es requerido.");
    if (area_id && typeof area_id !== 'string') errores.push("El campo area_id debe ser un UUID.");

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores en la validación de datos", data: errores });
    }

    try {
        const response = await createCourseController({ course_name, credits, semester, program_id, area_id });
        if (!response) {
            return res.status(500).json({ message: "No se pudo crear el curso" });
        }
        return res.status(201).json({ message: "Curso creado exitosamente", data: response });
    } catch (error) {
        console.error("Error en el Handler al crear curso:", error);
        return res.status(500).json({ message: "Error interno del servidor al crear un curso." });
    }
};

const updateCourseHandler = async (req, res) => {
    const { id } = req.params;
    const { course_name, credits, semester, program_id, area_id } = req.body;
    const errores = [];

    if (!course_name) errores.push("El campo course_name es requerido.");
    if (course_name && typeof course_name !== 'string') errores.push("El campo course_name debe ser una cadena.");
    if (!credits) errores.push("El campo credits es requerido.");
    if (credits && typeof credits !== 'number') errores.push("El campo credits debe ser un número.");
    if (!semester) errores.push("El campo semester es requerido.");
    if (semester && !['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'].includes(semester)) {
        errores.push("El campo semester debe ser uno de los valores permitidos.");
    }
    if (!program_id) errores.push("El campo program_id es requerido.");
    if (program_id && typeof program_id !== 'string') errores.push("El campo program_id debe ser un UUID.");
    if (!area_id) errores.push("El campo area_id es requerido.");
    if (area_id && typeof area_id !== 'string') errores.push("El campo area_id debe ser un UUID.");

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores en la validación de datos", data: errores });
    }

    try {
        const response = await updateCourseController(id, { course_name, credits, semester, program_id, area_id });
        if (!response) {
            return res.status(404).json({ message: "Curso no encontrado o no se pudo actualizar" });
        }
        return res.status(200).json({ message: "Curso actualizado exitosamente", data: response });
    } catch (error) {
        console.error("Error en el Handler al actualizar curso:", error);
        return res.status(500).json({ message: "Error interno del servidor al actualizar un curso." });
    }
};

const getAllCoursesHandler = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;

    try {
        const response = await getAllCoursesController(Number(page), Number(limit));
        if (!response || response.data.length === 0) {
            return res.status(200).json({ message: "No hay cursos registrados", data: [] });
        }
        return res.status(200).json({ message: "Cursos obtenidos correctamente", data: response });
    } catch (error) {
        console.error("Error en el Handler al obtener cursos:", error);
        return res.status(500).json({ message: "Error interno del servidor al obtener cursos." });
    }
};

const getCourseHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await getCourseController(id);
        if (!response) {
            return res.status(404).json({ message: "Curso no encontrado" });
        }
        return res.status(200).json({ message: "Curso obtenido correctamente", data: response });
    } catch (error) {
        console.error("Error en el Handler al obtener curso:", error);
        return res.status(500).json({ message: "Error interno del servidor al obtener un curso." });
    }
};

module.exports = {
    createCourseHandler,
    updateCourseHandler,
    getAllCoursesHandler,
    getCourseHandler,
};
