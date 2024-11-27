const { department } = require('../db_connection');

const createDepartmentController = async ({ department_name, head_of_department }) => {
    try {
        const newDepartment = await department.create({ department_name, head_of_department });
        return newDepartment || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al crear un departamento", data: error });
        return false;
    }
};

const updateDepartmentController = async (id, { department_name, head_of_department }) => {
    try {
        const existingDepartment = await getDepartmentController(id);
        if (existingDepartment) {
            await existingDepartment.update({ department_name, head_of_department });
        }
        return existingDepartment || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al actualizar un departamento", data: error });
        return false;
    }
};

const getDepartmentController = async (id) => {
    try {
        const response = await department.findByPk(id);
        return response || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al obtener un departamento", data: error });
        return false;
    }
};

const getAllDepartmentsController = async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    try {
        const response = await department.findAndCountAll({
            limit,
            offset,
            order: [['id', 'ASC']],
        });
        return { totalCount: response.count, data: response.rows, currentPage: page } || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al obtener los departamentos", data: error });
        return false;
    }
};

module.exports = {
    createDepartmentController,
    updateDepartmentController,
    getDepartmentController,
    getAllDepartmentsController,
};
