const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Recipe", {
    name: { type: DataTypes.STRING, allowNull: false },
    summary: { type: DataTypes.STRING, allowNull: false },
    punctuation: { type: DataTypes.FLOAT },
    healthiness: { type: DataTypes.FLOAT },
    stepbystep: { type: DataTypes.TEXT },
    image: { type: DataTypes.STRING },
    id: { type: DataTypes.UUID },
  });
};
