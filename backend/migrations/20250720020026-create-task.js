'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      task_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      logged_time: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      status: {
        type: Sequelize.ENUM('toDo', 'inProgress', 'done'),
        defaultValue: 'toDo'
      },
      estimated_time: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      priority: {
        type: Sequelize.ENUM('high', 'medium', 'low'),
        defaultValue: 'medium'
      },
      due_date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
      {
        indexes: [
          {
            fields: ['user_id']
          }
        ]
      }
    );
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};