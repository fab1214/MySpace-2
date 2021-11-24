//import the Sequelize constructor from the library
const Sequelize = require ('sequelize');
require('dotenv').config();

//create connection to our database , pass in your MySQL information for username and password as parameters
const sequelize = new Sequelize('myspace_2_db', 'root', 'Tw@tson100', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;


// process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW