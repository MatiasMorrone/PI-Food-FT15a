const axios = require("axios");
const { Recipe } = require("../db");
const { YOUR_API_KEY } = process.env;
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

async function getRecipesbyName(req, res, next) {
  const { title } = req.query;
  if (title) {
    try {
      let recetasbasededatos = await Recipe.findAll({
        where: { title: { [Op.like]: `%${title}%` } },
      });

      const recetas = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true`
      );

      let encontrado = recetas.data.results.filter((el) =>
        el.title.toUpperCase().includes(title.toUpperCase())
      );
      encontrado = encontrado.map((e) => {
        return {
          title: e.title,
          summary: e.summary,
          spoonacularScore: e.spoonacularScore,
          healthScore: e.healthScore,
          analyzedInstructions: e.analyzedInstructions,
          image: e.image,
          diets: e.diets,
        };
      });

      return res.json(encontrado.concat(recetasbasededatos));
    } catch (error) {
      next(error);
    }
  } else {
    res.sendStatus(400);
  }
}

async function getRecipesbyId(req, res, next) {
  const { id } = req.params;
  if (id) {
    try {
      if (id.length >= 10 && typeof id === "string") {
        const recetaidbase = await Recipe.findByPk(id);
        res.json(recetaidbase);
      } else {
        let recetaapi = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}`
        );
        recetaapi = {
          title: recetaapi.data.title,
          summary: recetaapi.data.summary,
          spoonacularScore: recetaapi.data.spoonacularScore,
          healthScore: recetaapi.data.healthScore,
          analyzedInstructions: recetaapi.data.analyzedInstructions,
          image: recetaapi.data.image,
          diets: recetaapi.data.diets,
        };
        res.json(recetaapi);
      }
    } catch (err) {
      next(err);
    }
  } else {
    res.json("You need to enter an ID to search by ID");
  }
}

async function postRecipe(req, res, next) {
  const {
    title,
    summary,
    spoonacularScore,
    healthScore,
    analyzedInstructions,
    image,
    diets,
  } = req.body;
  try {
    if (!title || !summary) {
      return res.json(
        "You must enter a title and a summary to create a recipe"
      );
    }
    await Recipe.create({
      title: title,
      summary: summary,
      spoonacularScore: parseFloat(spoonacularScore),
      healthScore: parseFloat(healthScore),
      analyzedInstructions: analyzedInstructions,
      image: image,
      diets,
      id: uuidv4(),
    });
    res.json("Recipe uploaded");
  } catch (error) {
    next(error);
  }
}

module.exports = { getRecipesbyId, getRecipesbyName, postRecipe };
