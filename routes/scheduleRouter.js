const {Router} = require ('express');
const router = Router();
const {
    createScheduleHandler,
    updateScheduleHandler,
    getScheduleHandler,
    getAllSchedulesHandler,
    
}= require('../handlers/scheduleHandler')

router.get('/',getAllSchedulesHandler);
router.get('/:id',getScheduleHandler);
router.post('/',createScheduleHandler);
//router.delete('/:id',deleteEstadoMCHandler);
router.patch('/:id',updateScheduleHandler);

module.exports = router;