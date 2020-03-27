'use strict';
module.exports = (sequelize, DataTypes) => {
  class Medicine extends sequelize.Sequelize.Model {}
  Medicine.init
  (
    {
      name: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      price: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName : "Medicine"
    }
  )
  Medicine.associate = function(models) {
    // associations can be defined here
    Medicine.belongsToMany(models.Patient, {through : "Orders"});
  };
  return Medicine;
};