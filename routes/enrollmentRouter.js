const {Router} = require ('express');
const router = Router();
const {
    createEnrollmentHandler,
    updateEnrollmentHandler,
    getEnrollmentHandler,
    getAllEnrollmentsHandler,
    
}= require('../handlers/enrollmentHandler')

router.get('/',getAllEnrollmentsHandler);
router.get('/:id',getEnrollmentHandler);
router.post('/',createEnrollmentHandler);
//router.delete('/:id',deleteEstadoMCHandler);
router.patch('/:id',updateEnrollmentHandler);

module.exports = router;
