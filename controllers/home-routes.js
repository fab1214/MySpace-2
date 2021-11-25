const router = require('express').Router();
const sequelize = require('../config/connection');
const { User } = require('../Models')
// //login route on homepage
router.get('/', (req, res) => {
    res.render('login');
});
module.exports = router;
