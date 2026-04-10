'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VariantImage extends Model {
    static associate(models) {
      // define association here
    }
  }
  VariantImage.init({
    variant_id: DataTypes.INTEGER,
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'VariantImage',
  });
  return VariantImage;
};