const {Router} = require ('express');
const router = Router();
const {
    createProgramHandler,
    updateProgramHandler,
    getAllProgramsHandler,
    getProgramHandler,
    
}= require('../handlers/programHandler')

router.get('/',getAllProgramsHandler);
router.get('/:id',getProgramHandler);
router.post('/',createProgramHandler);
//router.delete('/:id',deleteEstadoMCHandler);
router.patch('/:id',updateProgramHandler);

module.exports = router;