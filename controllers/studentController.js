const { student } = require('../db_connection');

const createStudentController = async ({ first_name, last_name, email, phone_number, enrollment_year, program_id }) => {
    try {
        const newStudent = await student.create({ first_name, last_name, email, phone_number, enrollment_year, program_id });
        return newStudent || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al crear un estudiante", data: error });
        return false;
    }
};

const updateStudentController = async (id, { first_name, last_name, email, phone_number, enrollment_year, program_id }) => {
    try {
        const existingStudent = await getStudentController(id);
        if (existingStudent) {
            await existingStudent.update({ first_name, last_name, email, phone_number, enrollment_year, program_id });
        }
        return existingStudent || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al actualizar un estudiante", data: error });
        return false;
    }
};

const getStudentController = async (id) => {
    try {
        const response = await student.findByPk(id);
        return response || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al obtener un estudiante", data: error });
        return false;
    }
};

const getAllStudentsController = async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    try {
        const response = await student.findAndCountAll({
            limit,
            offset,
            order: [['first_name', 'ASC']],
        });
        return { totalCount: response.count, data: response.rows, currentPage: page } || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al obtener estudiantes", data: error });
        return false;
    }
};

module.exports = {
    createStudentController,
    updateStudentController,
    getStudentController,
    getAllStudentsController,
};
