'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
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
        type: Sequelize.STRING
      },
      logged_time: {
        type: Sequelize.FLOAT ,
        defaultValue: 0
      },
      status: {
        type: Sequelize.ENUM('To Do', 'In Progress', 'Done'),
        defaultValue: 'To Do'
      },
      estimated_time: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      priority: {
        type: Sequelize.ENUM('High', 'Medium', 'Low'),
        defaultValue: 'Medium'
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
    });
    // Add composite primary key (user_id, title)
    await queryInterface.addConstraint('tasks', {
      fields: ['user_id', 'title'],
      type: 'primary key',
      name: 'tasks_pkey'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};