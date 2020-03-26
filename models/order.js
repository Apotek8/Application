'use strict';
module.exports = (sequelize, DataTypes) => {
  class Order extends sequelize.Sequelize.Model {}
  Order.init
  (
    {
      MedicineId: DataTypes.INTEGER,
      PatientId: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      date: DataTypes.DATE,
      information: DataTypes.STRING
    },
    {
      sequelize,
      modelName : "Order",
      hooks :
      {
        beforeCreate : (data, option) =>
        {
          data.information = "Pending"
        }
      }
    }
  )
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsTo(models.Medicine);
    Order.belongsTo(models.Patient);
  };
  return Order;
};