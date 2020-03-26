'use strict';
module.exports = (sequelize, DataTypes) => {
  class Patient extends sequelize.Sequelize.Model {}
  Patient.init
  (
    {
      username :
      {
        type: DataTypes.STRING,
        validate :
        {
          isAlphanumeric: {msg : "Only Alphanumeric"},
          notContains : {msg : "cannot contains space"}
        }
      },
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      email: 
      {
        type : DataTypes.STRING,
        unique: true,
        isEmail: {msg : "Only email format"}
      },
      phone: 
      {
        type : DataTypes.STRING,
        isNumeric: {msg : "Only Number"}
      },
      money: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName : "Patient",
      hooks:
      {
        beforeCreate: (data, option) =>
        {
          data.money = 0;
        }
      },
      validate:
      {
        notNull(value) 
        {
          if(value == null || value == "")
            throw new Error("Must be filled")
        }
      }
    }
  )
  Patient.associate = function(models) {
    // associations can be defined here
    Patient.belongsToMany(models.Medicine, {through : "Order"});
  };
  return Patient;
};