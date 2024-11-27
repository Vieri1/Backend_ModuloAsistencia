const { staff } = require('../db_connection');

const createStaffController = async ({ first_name, last_name, email, phone_number, position }) => {
    try {
        const newStaff = await staff.create({ first_name, last_name, email, phone_number, position });
        return newStaff || null;
    } catch (error) {
        console.error("Error en el controlador al crear un miembro del personal:", error);
        throw error;
    }
};

const updateStaffController = async (id, { first_name, last_name, email, phone_number, position }) => {
    try {
        const existingStaff = await getStaffController(id);
        if (existingStaff) {
            await existingStaff.update({ first_name, last_name, email, phone_number, position });
        }
        return existingStaff || null;
    } catch (error) {
        console.error("Error en el controlador al actualizar un miembro del personal:", error);
        throw error;
    }
};

const getStaffController = async (id) => {
    try {
        const foundStaff = await staff.findByPk(id);
        return foundStaff || null;
    } catch (error) {
        console.error("Error en el controlador al obtener un miembro del personal:", error);
        throw error;
    }
};

const getAllStaffController = async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    try {
        const result = await staff.findAndCountAll({
            limit,
            offset,
            order: [['last_name', 'ASC']],
        });
        return { totalCount: result.count, data: result.rows, currentPage: page } || null;
    } catch (error) {
        console.error("Error en el controlador al obtener los miembros del personal:", error);
        throw error;
    }
};

module.exports = {
    createStaffController,
    updateStaffController,
    getStaffController,
    getAllStaffController,
};
