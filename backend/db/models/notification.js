"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      // Notification.belongsTo(models.User, { foreignKey: "userID" });
    }
  }
  Notification.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userID: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
