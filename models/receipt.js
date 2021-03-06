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
      // define association here
      Receipt.belongsTo(models.Tag)
    }
  };
  Receipt.init({
    UserID: DataTypes.INTEGER,
    TagID: DataTypes.INTEGER,
    merchant: DataTypes.STRING,
    date: DataTypes.DATE,
    item: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    payment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Receipt',
  });
  return Receipt;
};