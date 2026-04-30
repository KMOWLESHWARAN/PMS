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
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category_id: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending'
    },
    merchant_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
