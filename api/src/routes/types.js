const { Router } = require("express");
const { getTypes } = require("../Functions/typesFunctions");
const router = Router();

router.get("/", getTypes);

module.exports = router;
