const router = require('express').Router();
const sequelize = require('../config/connection');

// //login route on homepage
router.get('/', (req, res) => {
    res.render('login');
  });
module.exports = router;
