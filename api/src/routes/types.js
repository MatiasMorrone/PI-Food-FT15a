const { Router } = require("express");
const { getTypes } = require("../Controllers/typesFunctions");
const router = Router();

router.get("/types", getTypes);

module.exports = router;
