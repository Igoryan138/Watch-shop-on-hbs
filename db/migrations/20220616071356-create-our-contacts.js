'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ourContacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      adress: {
        type: Sequelize.STRING
      },
      tel: {
        type: Sequelize.STRING
      },
      wa: {
        type: Sequelize.STRING
      },
      tlg: {
        type: Sequelize.STRING
      },
      inst: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ourContacts');
  }
};