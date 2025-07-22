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
    task_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id:{
      type: DataTypes.INTEGER,

    },
    title:{
      type: DataTypes.STRING,
      
    },
    description: DataTypes.TEXT,
    logged_time: DataTypes.FLOAT ,
    status: DataTypes.ENUM('To Do', 'In Progress', 'Done'),
    estimated_time: DataTypes.FLOAT ,
    priority: DataTypes.ENUM('High', 'Medium', 'Low'),
    due_date: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'task',
    timestamps: true ,
  });
  return task;
};