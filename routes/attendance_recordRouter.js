const {Router} = require ('express');
const router = Router();
const {
    createAttendanceRecordHandler,
    updateAttendanceRecordHandler,
    getAllAttendanceRecordsHandler,
    getAttendanceRecordHandler,
}= require('../handlers/attendance_recordHandler')

router.get('/',getAllAttendanceRecordsHandler);
router.get('/:id',getAttendanceRecordHandler);
router.post('/',createAttendanceRecordHandler);
//router.delete('/:id',deleteEstadoMCHandler);
router.patch('/:id',updateAttendanceRecordHandler);

module.exports = router;