'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      task.belongsTo(models.user, {
        foreignKey: 'user_id',
        targetKey: 'user_id',
        as: 'user'
      });
    }
  }
  task.init({
    user_id:DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    logged_time: DataTypes.FLOAT ,
    status: DataTypes.ENUM('To Do', 'In Progress', 'Done'),
    estimated_time: DataTypes.FLOAT ,
    priority: DataTypes.ENUM('High', 'Medium', 'Low'),
    due_date: DataTypes.DATE,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'task',
  });
  return task;
};