const { Router } = require("express");
const { getTypes } = require("../Functions/typesFunctions.js");
const router = Router();

router.get("/", getTypes);

module.exports = router;
