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
          isExist(value, next)
          {
            Patient.findOne({where : {username : value}})
            .then(data => 
              {
                if(data)
                {
                  const error = new Error("Username already exist");
                  next(error);
                }
                else
                  next();
              })
          }
        }
      },
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      email: 
      {
        type : DataTypes.STRING,
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
      }
    }
  );
  Patient.associate = function(models) {
    // associations can be defined here
    Patient.belongsToMany(models.Medicine, {through : "Order"});
  };
  return Patient;
};