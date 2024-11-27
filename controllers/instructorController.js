const { instructor } = require('../db_connection');

const createInstructorController = async ({ first_name, last_name, email, phone_number, department_id }) => {
    try {
        const newInstructor = await instructor.create({ first_name, last_name, email, phone_number, department_id });
        return newInstructor || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al crear el instructor", data: error });
        return false;
    }
};

const updateInstructorController = async (id, { first_name, last_name, email, phone_number, department_id }) => {
    try {
        const existingInstructor = await getInstructorController(id);
        if (existingInstructor) {
            await existingInstructor.update({ first_name, last_name, email, phone_number, department_id });
        }
        return existingInstructor || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al actualizar el instructor", data: error });
        return false;
    }
};

const getInstructorController = async (id) => {
    try {
        const response = await instructor.findByPk(id);
        return response || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al obtener el instructor", data: error });
        return false;
    }
};

const getAllInstructorsController = async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    try {
        const response = await instructor.findAndCountAll({
            limit,
            offset,
            order: [['id', 'ASC']],
        });
        return { totalCount: response.count, data: response.rows, currentPage: page } || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al obtener los instructores", data: error });
        return false;
    }
};

module.exports = {
    createInstructorController,
    updateInstructorController,
    getInstructorController,
    getAllInstructorsController
};
