const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Recipe", {
    name: {
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
    punctuation: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: {
          args: true,
          msg: "Punctuation must be a number like this XX.XX",
        },
      },
    },
    healthiness: { type: DataTypes.FLOAT },
    stepbystep: { type: DataTypes.TEXT },
    image: { type: DataTypes.STRING },
    id: { type: DataTypes.UUID },
  });
};
