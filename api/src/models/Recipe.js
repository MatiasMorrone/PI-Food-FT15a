const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Recipe",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "The recipe must be completed" },
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
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      image: { type: DataTypes.TEXT },
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      diets: { type: DataTypes.ARRAY(DataTypes.STRING) },
      dishTypes: { type: DataTypes.ARRAY(DataTypes.STRING) },
    },
    { timestamps: false }
  );
};
