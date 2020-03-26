'use strict';
module.exports = (sequelize, DataTypes) => {
  class Admin extends sequelize.Sequelize.Model {}
  Admin.init
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
        isLowercase: {msg : "Only Lower Case"}
      },
      phone: DataTypes.STRING,
      income: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName : "Admin",
      hooks:
      {
        beforeCreate: (data, option) =>
        {
          data.income = 0;
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
  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};