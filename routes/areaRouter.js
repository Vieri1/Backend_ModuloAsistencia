const {Router} = require ('express');
const router = Router();
const {
    createAreaHandler,
    updateAreaHandler,
    getAllAreaHandler,
    getAreaHandler
    
}= require('../handlers/areaHandler')

router.get('/',getAllAreaHandler);
router.get('/:id',getAreaHandler);
router.post('/',createAreaHandler);
// router.delete('/:id',deleteEstadoMCHandler);
router.patch('/:id',updateAreaHandler);

module.exports = router;