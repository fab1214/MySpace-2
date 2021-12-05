const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Friend_request extends Model {}

Friend_request.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      reciever_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      friend: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'friend_request'
    }
  );

  module.exports = Friend_request;