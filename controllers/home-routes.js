const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post } = require('../Models')
// //login route on homepage
router.get('/', (req, res) => {
    Post.findAll()
      .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true}));

        res.render('profilePage', { posts });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
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

  router.get('/create', (req, res) => {
    res.render('create');
});
module.exports = router;
