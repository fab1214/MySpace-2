const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Comment, Post, User } = require('../../Models');
const withAuth = require('../../utils/auth');


//these also aren't working for some reason. anyone want to take a swing?
router.get('/', (req, res) => {
    Comment.findAll()
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', withAuth,(req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    })
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})
module.exports = router;