const { Router } = require("express");
const {
  getRecipesbyName,
  getRecipesbyId,
  postRecipe,
} = require("../Controllers/recipesFunctions");
const router = Router();

router.get("/", getRecipesbyName);
router.get("/:id", getRecipesbyId);
router.post("/", postRecipe);

module.exports = router;
