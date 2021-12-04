const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Likes = require('./Likes');
const Dislikes = require('./Dislikes');

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
})

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});
  
Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'set null'
});

User.belongsToMany(Post, {
  through: Likes,
  as: 'liked_posts',
  foreignKey: 'user_id'
});

Post.belongsToMany(User, {
  through: Likes,
  as: 'liked_posts',
  foreignKey: 'post_id'
});

Likes.belongsTo(User, {
  foreignKey: 'user_id'
});

Likes.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Likes, {
  foreignKey: 'user_id'
});

Post.hasMany(Likes, {
  foreignKey: 'post_id'
});

User.belongsToMany(Post, {
  through: Dislikes,
  as: 'disliked_posts',
  foreignKey: 'user_id'
});

Post.belongsToMany(User, {
  through: Dislikes,
  as: 'disliked_posts',
  foreignKey: 'post_id'
});

Dislikes.belongsTo(User, {
  foreignKey: 'user_id'
});

Dislikes.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Dislikes, {
  foreignKey: 'user_id'
});

Post.hasMany(Dislikes, {
  foreignKey: 'post_id'
});


module.exports = { User , Post, Likes, Dislikes, Comment };
