const { schedule } = require('../db_connection');

const createScheduleController = async ({ course_id, instructor_id, day_of_week, start_time, end_time }) => {
    try {
        const newSchedule = await schedule.create({ course_id, instructor_id, day_of_week, start_time, end_time });
        return newSchedule || null;
    } catch (error) {
        console.error("Error en el controlador al crear un horario:", error);
        throw error;
    }
};

const updateScheduleController = async (id, { course_id, instructor_id, day_of_week, start_time, end_time }) => {
    try {
        const existingSchedule = await getScheduleController(id);
        if (existingSchedule) {
            await existingSchedule.update({ course_id, instructor_id, day_of_week, start_time, end_time });
        }
        return existingSchedule || null;
    } catch (error) {
        console.error("Error en el controlador al actualizar un horario:", error);
        throw error;
    }
};

const getScheduleController = async (id) => {
    try {
        const foundSchedule = await schedule.findByPk(id);
        return foundSchedule || null;
    } catch (error) {
        console.error("Error en el controlador al obtener un horario:", error);
        throw error;
    }
};

const getAllSchedulesController = async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    try {
        const result = await schedule.findAndCountAll({
            limit,
            offset,
            order: [['day_of_week', 'ASC']],
        });
        return { totalCount: result.count, data: result.rows, currentPage: page } || null;
    } catch (error) {
        console.error("Error en el controlador al obtener los horarios:", error);
        throw error;
    }
};

module.exports = {
    createScheduleController,
    updateScheduleController,
    getScheduleController,
    getAllSchedulesController,
};
