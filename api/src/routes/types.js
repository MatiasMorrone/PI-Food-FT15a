const { Router } = require("express");
const { getTypes } = require("../Controllers/typesfunctions");
const router = Router();

router.get("/types", getTypes);

module.exports = router;
