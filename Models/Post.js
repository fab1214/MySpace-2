const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {
  static like(body, models) {
    return models.Likes.create({
      user_id: body.user_id,
      post_id: body.post_id
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id
        },
        attributes: [
          'id',
          'title',
          'created_at',
          [
            sequelize.literal('(SELECT COUNT(*) FROM likes_model WHERE post.id = likes_model.post_id)'),
            'likes_model_count',
          ]
        ]
      });
    });
  }
  static dislike(body, models) {
    return models.Dislikes.create({
      user_id: body.user_id,
      post_id: body.post_id
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id
        },
        attributes: [
          'id',
          'title',
          'created_at',
          [
            sequelize.literal('(SELECT COUNT(*) FROM dislikes_model WHERE post.id = dislikes_model.post_id)'),
            'disikes_model_count',
          ]
        ]
      });
    });
  }

}

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
