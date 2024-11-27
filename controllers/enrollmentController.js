const { enrollment } = require('../db_connection');

const createEnrollmentController = async ({ student_id, course_id, enrollment_date }) => {
    try {
        const newEnrollment = await enrollment.create({ student_id, course_id, enrollment_date });
        return newEnrollment || null;
    } catch (error) {
        console.error("Error en el controlador al crear una matrícula:", error);
        throw error;
    }
};

const updateEnrollmentController = async (id, { student_id, course_id, enrollment_date }) => {
    try {
        const existingEnrollment = await getEnrollmentController(id);
        if (existingEnrollment) {
            await existingEnrollment.update({ student_id, course_id, enrollment_date });
        }
        return existingEnrollment || null;
    } catch (error) {
        console.error("Error en el controlador al actualizar una matrícula:", error);
        throw error;
    }
};

const getEnrollmentController = async (id) => {
    try {
        const foundEnrollment = await enrollment.findByPk(id);
        return foundEnrollment || null;
    } catch (error) {
        console.error("Error en el controlador al obtener una matrícula:", error);
        throw error;
    }
};

const getAllEnrollmentsController = async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    try {
        const result = await enrollment.findAndCountAll({
            limit,
            offset,
            order: [['enrollment_date', 'ASC']],
        });
        return { totalCount: result.count, data: result.rows, currentPage: page } || null;
    } catch (error) {
        console.error("Error en el controlador al obtener las matrículas:", error);
        throw error;
    }
};

module.exports = {
    createEnrollmentController,
    updateEnrollmentController,
    getEnrollmentController,
    getAllEnrollmentsController,
};
