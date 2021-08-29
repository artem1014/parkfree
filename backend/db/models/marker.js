"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Marker extends Model {
    static associate(models) {
      Marker.hasMany(models.Image, { foreignKey: "markerID" });
    }
  }
  Marker.init(
    {
      address: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      width: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      longitude: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      comment: {
        type: DataTypes.TEXT,
      },
      parkingPlaces: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Marker",
    }
  );
  return Marker;
};