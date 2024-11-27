const {Router} = require ('express');
const router = Router();
const {
    createDepartmentHandler,
    updateDepartmentHandler,
    getAllDepartmentsHandler,
    getDepartmentHandler
    
}= require('../handlers/departmentHandler')

router.get('/',getAllDepartmentsHandler);
router.get('/:id',getDepartmentHandler);
router.post('/',createDepartmentHandler);
//router.delete('/:id',deleteEstadoMCHandler);
router.patch('/:id',updateDepartmentHandler);

module.exports = router;