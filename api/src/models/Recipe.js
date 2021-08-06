const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Recipe", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "The recipe must be completed" },
        isAlpha: { args: true, msg: "The recipe can only contains letters" },
      },
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notNull: { msg: "The summary must be completed" } },
    },
    spoonacularScore: {
      type: DataTypes.INTEGER,
    },
    healthScore: { type: DataTypes.INTEGER },
    analyzedInstructions: {
      type: DataTypes.ARRAY(DataTypes.JSON),
    },
    image: { type: DataTypes.STRING },
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    diets: { type: DataTypes.ARRAY(DataTypes.STRING) },
  });
};
