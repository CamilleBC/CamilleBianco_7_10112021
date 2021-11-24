'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId : {
        type : Sequelize.INTEGER,
        allowNull : false
      },
      titre:{
        type : Sequelize.STRING,
        allowNull : false      
      },
      description : {
        type : Sequelize.STRING,
        allowNull : false
      },
      imageUrl : {
        type : Sequelize.STRING,
        allowNull : false
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
    await queryInterface.dropTable('Posts');
  }
};