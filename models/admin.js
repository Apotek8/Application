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
          isAlphanumeric: {args : true, msg : "Only Alphanumeric"}
        }
      },
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      email: 
      {
        type : DataTypes.STRING,
        unique: true,
        validate :
        {
          isEmail: true,
          isLowercase: {args : true, msg : "Only Lower Case"}
        }
      },
      phone: 
      {
        type : DataTypes.STRING,
        unique : true,
        validate :
        {
          isNumeric : {msg : "Must numeric"}
        }
      },
      income: DataTypes.NUMBER,
    },
    {
      validate:
      {
        notNull() 
        {
          if(this.username == "" || this.name == "" || this.password == "" || this.address == "" || this.email == "" || this.phone == "")
            throw new Error("All data must be filled")
        }
      },
      sequelize,
      modelName : "Admin",
      hooks:
      {
        beforeCreate: (data, option) =>
        {
          data.income = 0;
        }
      }
    }
  )
  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};