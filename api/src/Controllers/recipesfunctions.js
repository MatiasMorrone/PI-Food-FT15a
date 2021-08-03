const axios = require("axios");
const { Recipe } = require("../db");
const { YOUR_API_KEY } = process.env;
const { Op } = require("sequelize");

// async function getRecipesbyName(req, res) {
//   const { name } = req.query;
//   if (name) {
//     var recetasbasededatos = await Recipe.findAll({
//       where: { name: { [Op.like]: `%${name}%` } },
//     });

//     axios
//       .get(
//         `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true`
//       )
//       .then((response) => {
//         var muestra = response.data.results.map((receta) => {
//           if (receta.title.includes(name)) {
//             return receta;
//           }
//         });
//         return res.json(muestra.concat(recetasbasededatos));
//       })
//       .catch(res.status(400).json("Error"));
//   }
// }

async function getRecipesbyName(req, res) {
  const { name } = req.query;
  if (name) {
    let recetasbasededatos = await Recipe.findAll({
      where: { name: { [Op.like]: `%${name}%` } },
    });

    const recetas = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true`
    );

    let encontrado = recetas.data.results.filter((el) =>
      el.title.toUpperCase().includes(name.toUpperCase())
    );

    return res.json(encontrado.concat(recetasbasededatos));
  }
}

function getRecipesbyId(req, res) {}
function postRecipe(req, res) {}

module.exports = { getRecipesbyId, getRecipesbyName, postRecipe };
