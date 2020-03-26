'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;
const fs = require("fs");

const data = JSON.parse(fs.readFileSync("./seed-data/admin.json", "utf8"));
data.forEach(element => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(element.password, salt);
  element.password = hash;
  element.createdAt = new Date();
  element.updatedAt = new Date();
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Admins', data, {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Admins', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
