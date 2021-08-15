const axios = require("axios");
const { Recipe } = require("../db");
const { YOUR_API_KEY } = process.env;
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

async function getRecipesbyName(req, res, next) {
  const { name } = req.query;

  if (name) {
    try {
      let recipes = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&number=100&addRecipeInformation=true&query=${name}`
      );
      let dbrecipes = await Recipe.findAll({
        where: { title: { [Op.like]: `%${name}%` } },
      });
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
          analyzedInstructions: e.analyzedInstructions[0],
          image: e.image,
          diets: dietswithvg,
          dishTypes: e.dishTypes,
          id: e.id,
        };
      });
      if (recipes.length === 0 && dbrecipes.length === 0) {
        return res.status(400).json("Recipe not found");
      }
      return res.status(200).json(recipes.concat(dbrecipes));
    } catch (error) {
      next(error);
    }
  } else {
    try {
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
          analyzedInstructions: e.analyzedInstructions[0],
          image: e.image,
          diets: dietswithvg,
          dishTypes: e.dishTypes,
          id: e.id,
        };
      });

      return res.status(200).json(dbrecipes.concat(recipes));
    } catch (error) {
      next(error);
    }
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
          analyzedInstructions: recetaapi.data.analyzedInstructions[0],
          image: recetaapi.data.image,
          diets: dietswithVg,
          dishTypes: recetaapi.data.dishTypes,
          vegetarian: recetaapi.data.vegetarian,
          id: recetaapi.data.id,
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
      id: uuidv4(),
    });
    res.json("Recipe uploaded");
  } catch (error) {
    next(error);
  }
}

module.exports = { getRecipesbyId, getRecipesbyName, postRecipe };
