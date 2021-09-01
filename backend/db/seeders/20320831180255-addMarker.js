"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Markers",
      [
        {
          address: " Россия, Москва, Нахимовский проспект",
          latitude: "55.66419157333905",
          longitude: "37.607673444335944",
          parkingPlaces: "55",
          isAccepted: true,
          isChecked: true,
          pics: "1077063.png",
          userID: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Markers", null, {});
  },
};
