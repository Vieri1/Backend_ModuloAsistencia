const {Router} = require ('express');
const router = Router();
const {
    createInstructorHandler,
    updateInstructorHandler,
    getAllInstructorsHandler,
    getInstructorHandler
    
}= require('../handlers/instructorHandler')

router.get('/',getAllInstructorsHandler);
router.get('/:id',getInstructorHandler);
router.post('/',createInstructorHandler);
//router.delete('/:id',deleteEstadoMCHandler);
router.patch('/:id',updateInstructorHandler);

module.exports = router;