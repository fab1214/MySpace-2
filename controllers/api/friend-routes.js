const router = require('express').Router();
const { Friend_request } = require('../../Models');

router.get('/request', (req, res) => {
    Friend_request.findAll()
    .then(dbFriendData => res.json(dbFriendData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.post('/request', (req, res) => {
    if (req.body.reciever_id != req.session.user_id) {
        Friend_request.create({
            reciever_id: req.body.reciever_id,
            sender_id: req.session.user_id
        })
        .then(dbFriendData => res.json(dbFriendData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});

router.put('/request/:id', (req, res) => {
    Friend_request.update(
        {
            friend: req.body.friend
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then((dbFriendData) => {
        if (!dbFriendData) {
            res.status(404).json({ message: "No user found with this id" });
            return;
          }
          res.json(dbFriendData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
})

// router.delete('/request/:id', (req, res) => {
//     Friend_request.destroy({
//         where: {
//             id: req.params.id
//         }
//     })
//     .then(dbFriendData => {
//         if(!dbFriendData){
//             res.status(404).json({ message: 'No friend request found with this id' });
//             return;
//         }
//         res.json(dbFriendData);
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// })
module.exports = router;