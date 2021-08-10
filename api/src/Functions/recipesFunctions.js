const axios = require("axios");
const { Recipe } = require("../db");
const { YOUR_API_KEY } = process.env;
const { v4: uuidv4 } = require("uuid");

async function getRecipesbyName(req, res, next) {
  const { name } = req.query;
  let recipes = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&number=100&addRecipeInformation=true`
  );
  let dbrecipes = await Recipe.findAll();
  let dietswithvg = [];

  recipes = recipes.data.results.map((e) => {
    if (e.vegetarian) {
      dietswithvg = e.diets.concat(["vegetarian"]);
    } else {
      dietswithvg = e.diets;
    }
    return {
      title: e.title,
      summary: e.summary.replace(/<[^>]*>/g, ""),
      spoonacularScore: e.spoonacularScore,
      healthScore: e.healthScore,
      analyzedInstructions: e.analyzedInstructions,
      image: e.image,
      diets: dietswithvg,
      dishTypes: e.dishTypes,
    };
  });

  if (name) {
    try {
      dbrecipes = dbrecipes.filter((e) => {
        console.log(e.title);
        return e.title.toUpperCase().includes(name.toUpperCase());
      });

      let finded = recipes.filter((el) =>
        el.title.toUpperCase().includes(name.toUpperCase())
      );

      if (finded.length === 0 && dbrecipes.length === 0) {
        return res.status(400).json("Recipe not found");
      }
      return res.status(200).json(finded.concat(dbrecipes));
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(200).json(recipes.concat(dbrecipes));
  }
}

async function getRecipesbyId(req, res, next) {
  const { id } = req.params;
  if (id) {
    try {
      if (id.length >= 10 && typeof id === "string") {
        const recetaidbase = await Recipe.findByPk(id);
        return res.json(recetaidbase);
      } else {
        let recetaapi = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}`
        );
        let dietswithVg = [];
        if (recetaapi.data.vegetarian) {
          dietswithVg = recetaapi.data.diets.concat(["vegetarian"]);
        } else {
          dietswithVg = recetaapi.data.diets;
        }
        recetaapi = {
          title: recetaapi.data.title,
          summary: recetaapi.data.summary.replace(/<[^>]*>/g, ""),
          spoonacularScore: recetaapi.data.spoonacularScore,
          healthScore: recetaapi.data.healthScore,
          analyzedInstructions: recetaapi.data.analyzedInstructions,
          image: recetaapi.data.image,
          diets: dietswithVg,
          dishTypes: recetaapi.data.dishTypes,
          vegetarian: recetaapi.data.vegetarian,
        };
        return res.json(recetaapi);
      }
    } catch (err) {
      next((err.message = "Recipe not found"));
    }
  } else {
    res.status(400).json("You need to enter an ID to search by ID");
  }
}

async function postRecipe(req, res, next) {
  try {
    const {
      title,
      summary,
      spoonacularScore,
      healthScore,
      analyzedInstructions,
      image,
      diets,
      dishTypes,
      vegetarian,
    } = req.body;

    if (!title || !summary) {
      return res.json(
        "You must enter a title and a summary to create a recipe"
      );
    }
    await Recipe.create({
      title,
      summary,
      spoonacularScore: parseInt(spoonacularScore) || 0,
      healthScore: parseInt(healthScore) || 0,
      analyzedInstructions,
      image,
      diets,
      dishTypes,
      vegetarian,
      id: uuidv4(),
    });
    res.json("Recipe uploaded");
  } catch (error) {
    next(error);
  }
}

module.exports = { getRecipesbyId, getRecipesbyName, postRecipe };
