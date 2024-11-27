const { Router } = require("express");
const router = Router();

const area = require('./areaRouter');



router.use('/area',area);


module.exports = router;