const router = require('express').Router();
const { Post, User } = require('../../models');

router.get('/', (req, res) => {
    Post.findAll()
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        }
    })
        .then((dbPostData) => {
            if(!dbPostData) {
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
})

router.post('/', (req, res) => {
    console.log(req.body.post_text)
    Post.create({
        post_text: req.body.post_text,
        //user_id: req.body.user_id
    })
        .then((dbPostData) => {
            res.json(dbPostData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

module.exports = router;