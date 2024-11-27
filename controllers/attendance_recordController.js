const { attendance_record } = require('../db_connection');

const createAttendanceRecordController = async ({ student_id, course_id, schedule_id, date, status }) => {
    try {
        const newRecord = await attendance_record.create({ student_id, course_id, schedule_id, date, status });
        return newRecord || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al crear un registro de asistencia", data: error });
        return false;
    }
};

const updateAttendanceRecordController = async (id, { student_id, course_id, schedule_id, date, status }) => {
    try {
        const existingRecord = await getAttendanceRecordController(id);
        if (existingRecord) {
            await existingRecord.update({ student_id, course_id, schedule_id, date, status });
        }
        return existingRecord || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al actualizar el registro de asistencia", data: error });
        return false;
    }
};

const getAttendanceRecordController = async (id) => {
    try {
        const response = await attendance_record.findByPk(id);
        return response || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al obtener un registro de asistencia", data: error });
        return false;
    }
};

const getAllAttendanceRecordsController = async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    try {
        const response = await attendance_record.findAndCountAll({
            limit,
            offset,
            order: [['id', 'ASC']],
        });
        return { totalCount: response.count, data: response.rows, currentPage: page } || null;
    } catch (error) {
        console.error({ message: "Error en el Controlador al obtener los registros de asistencia", data: error });
        return false;
    }
};

module.exports = {
    createAttendanceRecordController,
    updateAttendanceRecordController,
    getAttendanceRecordController,
    getAllAttendanceRecordsController,
};
