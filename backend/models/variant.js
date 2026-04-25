'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Variant extends Model {
    static associate(models) {
      Variant.associate = (models) => {
        Variant.belongsTo(models.Product, { foreignKey: "product_id" });
        Variant.hasMany(models.VariantAttribute, { foreignKey: "variant_id" });
        Variant.hasMany(models.VariantImage, { foreignKey: "variant_id" });
      };
    }
  }
  Variant.init({
    product_id: DataTypes.INTEGER,
    sku: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    discount_price: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Variant',
  });
  return Variant;
};