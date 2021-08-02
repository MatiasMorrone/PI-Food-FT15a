const Types = require("../models/Diet");
const DietTypes = require("../Utils/DietTypesArray/DietTypes");

async function getTypes(req, res) {
  DietTypes.map((dieta) => {
    return Types.findOrCreate({ where: { name: dieta } });
  });

  let muestra = await Types.findAll();
  res.json(muestra);
}

module.exports = { getTypes };
