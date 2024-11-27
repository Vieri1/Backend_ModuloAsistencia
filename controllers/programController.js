const { program } = require('../db_connection');

const createProgramController = async ({ program_name, department_id, degree_level }) => {
    try {
        const newProgram = await program.create({ program_name, department_id, degree_level });
        return newProgram || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al crear un programa", data: error });
        return false;
    }
};

const updateProgramController = async (id, { program_name, department_id, degree_level }) => {
    try {
        const existingProgram = await getProgramController(id);
        if (existingProgram) {
            await existingProgram.update({ program_name, department_id, degree_level });
        }
        return existingProgram || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al actualizar un programa", data: error });
        return false;
    }
};

const getProgramController = async (id) => {
    try {
        const response = await program.findByPk(id);
        return response || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al obtener un programa", data: error });
        return false;
    }
};

const getAllProgramsController = async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    try {
        const response = await program.findAndCountAll({
            limit,
            offset,
            order: [['program_name', 'ASC']],
        });
        return { totalCount: response.count, data: response.rows, currentPage: page } || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al obtener programas", data: error });
        return false;
    }
};

module.exports = {
    createProgramController,
    updateProgramController,
    getProgramController,
    getAllProgramsController,
};
