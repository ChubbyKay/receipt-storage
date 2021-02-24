'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Receipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Receipt.belongsTo(models.User)
      // define association here
    }
  };
  Receipt.init({
    UserID: DataTypes.INTEGER,
    merchant: DataTypes.STRING,
    date: DataTypes.DATE,
    item: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    payment: DataTypes.STRING,
    tag: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Receipt',
  });
  return Receipt;
};