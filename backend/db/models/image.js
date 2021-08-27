"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.Marker, { foreignKey: "markerID" });
    }
  }
  Image.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      markerID: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
