const {Router} = require ('express');
const router = Router();
const {
    createMaintenanceRequestHandler,
    updateMaintenanceRequestHandler,
    getMaintenanceRequestHandler,
    getAllMaintenanceRequestsHandler,
    
}= require('../handlers/maintenance_requestHandler')

router.get('/',getAllMaintenanceRequestsHandler);
router.get('/:id',getMaintenanceRequestHandler);
router.post('/',createMaintenanceRequestHandler);
//router.delete('/:id',deleteEstadoMCHandler);
router.patch('/:id',updateMaintenanceRequestHandler);

module.exports = router;