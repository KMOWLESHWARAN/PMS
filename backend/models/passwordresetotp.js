'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PasswordResetOtp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PasswordResetOtp.init({
    email: DataTypes.STRING,
    otp: DataTypes.STRING,
    expires_at: DataTypes.DATE,
    is_used: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'PasswordResetOtp',
  });
  return PasswordResetOtp;
};