'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('galaxies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      setMinute: {
        type: Sequelize.STRING
      },
      setCount: {
        type: Sequelize.INTEGER
      },
      firstCharge: {
        type: Sequelize.INTEGER
      },
      secondCharge: {
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
    await queryInterface.dropTable('galaxies');
  }
};