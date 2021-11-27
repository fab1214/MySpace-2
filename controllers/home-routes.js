const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../Models')
// //login route on homepage
router.get('/', (req, res) => {
  Post.findAll()
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));

      res.render('profilePage', { posts });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});
//you have to have a res.render in order to 
//call it in the res.redirect
router.get('/feed', (req, res) => {
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


// couldn't get this route working right. need another set of eyes on it, or a break lol
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render('post-view', { post });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
