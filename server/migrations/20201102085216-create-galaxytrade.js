'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('galaxytrades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      optionCode: {
        type: Sequelize.STRING
      },
      expireTime: {
        type: Sequelize.BIGINT
      },
      orderedAmount: {
        type: Sequelize.INTEGER
      },
      currency: {
        type: Sequelize.INTEGER,
        default: 840
      },
      callPut: {
        type: Sequelize.INTEGER
      },
      result: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('galaxytrades');
  }
};