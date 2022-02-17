const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("recipe", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
    },
    puntuation: {
      type: DataTypes.INTEGER,
    },
    healthyFoodLevel: {
      type: DataTypes.INTEGER,
    },
    stebByStep: {
      type: DataTypes.TEXT,
    },
    // dietType: {
    //   type: DataTypes.STRING,
    // },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdByDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
