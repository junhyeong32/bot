'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class galaxydata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  galaxydata.init({
    optionCode: DataTypes.STRING,
    expireTime: DataTypes.BIGINT,
    orderedAmount: DataTypes.INTEGER,
    currency: DataTypes.INTEGER,
    callPut: DataTypes.INTEGER,
    result: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'galaxydata',
  });
  return galaxydata;
};