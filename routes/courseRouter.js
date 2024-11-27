const {Router} = require ('express');
const router = Router();
const {
    createCourseHandler,
    updateCourseHandler,
    getAllCoursesHandler,
    getCourseHandler,
    
}= require('../handlers/courseHandler')

router.get('/',getAllCoursesHandler);
router.get('/:id',getCourseHandler);
router.post('/',createCourseHandler);
//router.delete('/:id',deleteEstadoMCHandler);
router.patch('/:id',updateCourseHandler);

module.exports = router;