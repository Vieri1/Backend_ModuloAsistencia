const { course } = require('../db_connection');

const createCourseController = async ({ course_name, credits, semester, program_id, area_id }) => {
    try {
        const newCourse = await course.create({ course_name, credits, semester, program_id, area_id });
        return newCourse || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al crear el curso", data: error });
        return false;
    }
};

const updateCourseController = async (id, { course_name, credits, semester, program_id, area_id }) => {
    try {
        const existingCourse = await getCourseController(id);
        if (existingCourse) {
            await existingCourse.update({ course_name, credits, semester, program_id, area_id });
        }
        return existingCourse || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al actualizar el curso", data: error });
        return false;
    }
};

const getCourseController = async (id) => {
    try {
        const response = await course.findByPk(id);
        return response || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al obtener el curso", data: error });
        return false;
    }
};

const getAllCoursesController = async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    try {
        const response = await course.findAndCountAll({
            limit,
            offset,
            order: [['id', 'ASC']],
        });
        return { totalCount: response.count, data: response.rows, currentPage: page } || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al obtener los cursos", data: error });
        return false;
    }
};

module.exports = {
    createCourseController,
    updateCourseController,
    getCourseController,
    getAllCoursesController,
};
