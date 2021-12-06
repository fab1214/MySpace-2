// //import the Sequelize constructor from the library
// const Sequelize = require ('sequelize');
// require('dotenv').config();

// let sequelize
// //create connection to our database , pass in your MySQL information for username and password as parameters
// if (process.env.JAWSDB_URL) {
//     sequelize = new Sequelize(process.env.JAWSDB_URL);
//   } else {
//     sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
//       host: 'us-cdbr-east-04.cleardb.com',
//       dialect: 'mysql',
//       port: 3306
//     });
//   }

// module.exports = sequelize;

module.exports = {
  HOST: "us-cdbr-east-04.cleardb.com",
  USER: "bc8e4a7bb28f53",
  PASSWORD: "374d01b9",
  DB: "heroku_80ea592cd69a1d0"
};