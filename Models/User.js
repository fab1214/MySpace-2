const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

//create user model
class User extends Model {
  //set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 20],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4],
      },
    },
    // friends: {
    //   type: DataTypes.ARRAY(DataTypes.DECIMAL)
    // },
    about_me: {
      type: DataTypes.STRING
    },
    interests: {
      type: DataTypes.STRING
    },
    meet: {
      type: DataTypes.STRING
    },
    general: {
      type: DataTypes.STRING
    },
    music: {
      type: DataTypes.STRING
    },
    
    tv: {
      type: DataTypes.STRING
    },
    books: {
      type: DataTypes.STRING
    },
    heroes: {
      type: DataTypes.STRING
    },
    profile_image: {
      type: DataTypes.STRING(100),
      defaultValue: 'default.png'
    },
    song_title: {
      type: DataTypes.STRING
    },
    song_link: {
      type: DataTypes.STRING
    },
    background_image: {
      type: DataTypes.STRING,
      defaultValue: 'default.jpg'
    }
  },
  {
    hooks: {
      //bcrypt password BEFORE creating new user
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      //bcrypt password BEFORE updating existing user
      async beforeUpdate(updatedUserData) {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          return updatedUserData
      }
    },
    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `post_text` and not `postText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: "user",
    }
);

module.exports = User;
