const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Comment, Likes, Dislikes } = require('../../Models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'body',
            [sequelize.literal('(SELECT username FROM user WHERE user.id = post.user_id)'), 'username'],
            [sequelize.literal('(SELECT COUNT(*) FROM likes_model WHERE post.id = likes_model.post_id)'),
            'likes_model_count'],
            [sequelize.literal('(SELECT COUNT(*) FROM disikes_model WHERE post.id = dislikes_model.post_id)'),
            'dislikes_model_count'],
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
            },
          ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.get('/:id', (req,res) => {
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
            [sequelize.literal('(SELECT COUNT(*) FROM likes_model WHERE post.id = likes_model.post_id)'),
            'likes_model_count'],
            [sequelize.literal('(SELECT COUNT(*) FROM disikes_model WHERE post.id = dislikes_model.post_id)'),
            'dislikes_model_count'],
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
        if(!dbPostData){
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res)=> {
    Post.create({
        title: req.body.title,
        body: req.body.body,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT /api/posts/upvote
router.put('/like', (req, res) => {
    // custom static method created in models/Post.js
    Post.like({ ...req.body, user_id: req.session.user_id }, { Likes })
    .then(updatedVoteData => res.json(updatedVoteData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT /api/posts/upvote
router.put('/dislike', (req, res) => {
  // custom static method created in models/Post.js
  Post.dislike({ ...req.body, user_id: req.session.user_id }, { Dislikes })
  .then(updatedVoteData => res.json(updatedVoteData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

  

// router.put('/:id', (req, res)=> {
//     Post.update(
//         {
//             title: req.body.title
//         },
//         {
//             where: {
//                 id: req.params.id
//             }
//         }
//     )
//     .then(dbPostData => {
//         if(!dbPostData) {
//             res.status(404).json({ message: 'No post found with this id' });
//             return;
//         }
//         res.json(dbPostData);
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     })
// });

router.delete('/:id', withAuth, (req,res)=> {
    console.log('id', req.params.id);
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;