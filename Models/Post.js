const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//create user model
class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `post_text` and not `postText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: "post",
    }
);

module.exports = Post;
