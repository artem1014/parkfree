"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          login: "user",
          email: "user@gmail.com",
          password: "user",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: "admin",
          email: "admin@gmail.com",
          password: "admin",
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
