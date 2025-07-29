'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A user has many tasks
      user.hasMany(models.task, {
        foreignKey: 'user_id',
        sourceKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'tasks'
      });
    }
  }
  user.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'user',
    timestamps: true, // set to true if you want Sequelize to manage createdAt/updatedAt
    hooks: {
      beforeCreate: async (userObj) => {
        userObj.password = await bcrypt.hash(userObj.password, 10)
      },
      beforeUpdate: async (userObj) => {
        if (userObj.changed('password'))
          userObj.password = await bcrypt.hash(userObj.password, 10)

      }
    }

  });
  return user;
};