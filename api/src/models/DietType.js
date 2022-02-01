const { DataTypes, Sequelize } = require("sequelize");

module.exports = (Sequelize) => {
  Sequelize.define("dietType", {
    name: {
      type: DataTypes.STRING,
      allowNull:false,
    },
  });
};
