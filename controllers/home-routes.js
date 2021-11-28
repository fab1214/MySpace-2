const router = require('express').Router();
const { UniqueConstraintError } = require('sequelize/dist');
const { underscoredIf } = require('sequelize/dist/lib/utils');
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../Models')
// //login route on homepage
router.get('/', (req, res) => {
  User.findOne({
    where: {
      id: req.session.user_id,
    },
    //exlcude showing password when retriving user data
    attributes: { exclude: ["password"] },
    // include the Post id, title, url, and create data
    include: [
      {
        model: Post,
        attributes: ["id", "title", "body", "created_at"],
      },
    ]
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }

    // serialize the data
    const user = dbUserData.get({ plain: true });

    // pass data to template
    res.render('homePage', { user,
    loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
//you have to have a res.render in order to 
//call it in the res.redirect
router.get('/feed', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'user_id',
      'title',
      'body',
      'createdAt',
      [sequelize.literal('(SELECT username FROM user WHERE user.id = post.user_id)'), 'username']
    ],
    include: [
      {
        model: Comment,
        attributes: [
          'id', 
          'comment_text', 
          'user_id',
          [sequelize.literal('(SELECT username FROM user WHERE user.id = comments.user_id)'), 'comment_username'],
          'createdAt'
        ]
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));

      res.render('feed', { posts })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
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
    attributes: [
      'id',
      'user_id',
      'title',
      'body',
      [sequelize.literal('(SELECT username FROM user WHERE user.id = post.user_id)'), 'username'],
      'createdAt'
    ],
    include: [
      {
        model: Comment,
        attributes: [
          'id', 
          'comment_text', 
          'user_id',
          [sequelize.literal('(SELECT username FROM user WHERE user.id = comments.user_id)'), 'username'],
          'createdAt'
        ]
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
      res.render('post-view', { post,
      loggedIn: req.session.loggedIn });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/profile/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },

    attributes: { exclude: ["password"] },

    include: [
      {
        model: Post,
        attributes: ["id", "title", "body", "created_at"],
        include: [
          {
            model: Comment,
          }
        ]
      },
    ],
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }

      // serialize the data
      const user = dbUserData.get({ plain: true });

      // pass data to template
      res.render('profilePage', { user,
      loggedIn: req.session.loggedIn });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;