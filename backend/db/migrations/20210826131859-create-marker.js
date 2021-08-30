"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Markers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      address: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      latitude: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      longitude: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      pics: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      comment: {
        type: Sequelize.TEXT,
      },
      isAccepted: {
        type: Sequelize.TEXT,
        defaultValue: false,
      },
      isChecked: {
        type: Sequelize.TEXT,
        defaultValue: false,
      },
      parkingPlaces: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Markers");
  },
};
