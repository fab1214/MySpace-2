const router = require('express').Router();
const sequelize = require('../config/connection');
const { User } = require('../Models')
// //login route on homepage
router.get('/', (req, res) => {
    res.render('profilePage');
});
//you have to have a res.render in order to 
//call it in the res.redirect
router.get('/feed', (req,res) => {
    res.render('feed')
})
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('feed');
      return;
    }
  
    res.render('login');
  });
module.exports = router;
