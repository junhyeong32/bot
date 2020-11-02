'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class galaxy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  galaxy.init({
    setMinute: DataTypes.STRING,
    setCount: DataTypes.INTEGER,
    firstCharge: DataTypes.INTEGER,
    secondCharge: DataTypes.INTEGER,
    optionCode: DataTypes.STRING,
    expireTime: DataTypes.BIGINT,
    orderedAmount: DataTypes.INTEGER,
    currency: DataTypes.INTEGER,
    callPut: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'galaxy',
  });
  return galaxy;
};