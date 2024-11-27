const {Router} = require ('express');
const router = Router();
const {
    createStudentHandler,
    updateStudentHandler,
    getAllStudentsHandler,
    getStudentHandler,
    
}= require('../handlers/studentHandler')

router.get('/',getAllStudentsHandler);
router.get('/:id',getStudentHandler);
router.post('/',createStudentHandler);
//router.delete('/:id',deleteEstadoMCHandler);
router.patch('/:id',updateStudentHandler);

module.exports = router;