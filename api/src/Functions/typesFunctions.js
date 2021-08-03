const { Diet } = require("../db");

async function getTypes(req, res) {
  try {
    let muestra = await Diet.findAll();
    muestra = muestra.map((dieta) => {
      return { name: dieta.name, id: dieta.id };
    });
    res.json(muestra);
  } catch (error) {
    console.log(error);
    // return next(error);
  }
}

module.exports = { getTypes };
