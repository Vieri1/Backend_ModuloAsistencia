const {Router} = require ('express');
const router = Router();
const {
    createEventHandler,
    updateEventHandler,
    getAllEventHandler,
    getEventHandler
    
}= require('../handlers/eventHandler')

router.get('/',getAllEventHandler);
router.get('/:id',getEventHandler);
router.post('/',createEventHandler);
//router.delete('/:id',deleteEstadoMCHandler);
router.patch('/:id',updateEventHandler);

module.exports = router;