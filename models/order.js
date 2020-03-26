'use strict';
module.exports = (sequelize, DataTypes) => {
  class Order extends sequelize.Sequelize.Model {}
  Order.init
  (
    {
      MedicineId: DataTypes.INTEGER,
      PatientId: DataTypes.INTEGER,
      date: DataTypes.DATE,
      information: DataTypes.STRING
    },
    {
      sequelize,
      modelName : "Order"
    }
  )
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};