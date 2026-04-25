'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VariantAttribute extends Model {
    static associate(models) {
      // define association here
    }
  }
  VariantAttribute.init({
    variant_id: DataTypes.INTEGER,
    attribute_name: DataTypes.STRING,
    attribute_value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'VariantAttribute',
  });
  return VariantAttribute;
};