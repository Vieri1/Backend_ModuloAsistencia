const { Router } = require("express");
const router = Router();

const area = require('./areaRoutere');



router.use('/area',area);


module.exports = router;