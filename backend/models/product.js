'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: "category_id" });
      Product.hasMany(models.Variant, { foreignKey: "product_id" });
    }
  }
  Product.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    brand: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
