const { Diet } = require("../db");

async function getTypes(req, res, next) {
  try {
    let muestra = await Diet.findAll();
    muestra = muestra.map((dieta) => {
      return { name: dieta.name, id: dieta.id };
    });
    res.json(muestra);
  } catch (error) {
    next(error);
  }
}

module.exports = { getTypes };
