//user routes (get, post, put, delete)
const router = require("express").Router();
const { User, Post , Friend_request } = require("../../Models/");
const sequelize = require('../../config/connection');


//GET route - All users
router.get("/", (req, res) => {
  
  User.findAll({
    //exlcude showing password when retriving user data
    attributes: { exclude: ["password"] },
    // include the Post id, title, url, and create data
    include: [
      {
        model: Post,
        attributes: ["id", "title", "body", "created_at"],
      },
      {
        model: Friend_request,
        attributes: [
          'id',
          'sender_id',
          [sequelize.literal('(SELECT username FROM user WHERE user.id = friend_requests.sender_id)'), 'username'],
          [sequelize.literal('(SELECT first_name FROM user WHERE user.id = friend_requests.sender_id)'), 'first_name'],
          [sequelize.literal('(SELECT last_name FROM user WHERE user.id = friend_requests.sender_id)'), 'last_name']
        ]
      }
    ]
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      
      res.status(500).json(err);
    });
});

//GET route - single user
router.get("/:id", (req, res) => {
  User.findOne({
    //exlcude showing password when retriving user data
    attributes: { exclude: ["password"] },
    // include the Post id, title, url, and create data
    include: [
      {
        model: Post,
        attributes: ["id", "title", "body", "created_at"],
      },
    ],
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      //if user id doesnt exist
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST route
router.post("/", (req, res) => {
  User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//User login route (POST)
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "No user exists with this email address" });
      return;
    }
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log("logged in")
      res.status(400).json({ message: "Incorrect password entered" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put("/:id", (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead

  console.log(req.body)
  User.update(
    {
      about_me: req.body.about_me,
      interests: req.body.interests,
      meet: req.body.meet,
      general: req.body.general,
      music: req.body.music,
      tv: req.body.tv,
      books: req.body.books,
      heroes: req.body.heroes,
      song_title: req.body.song_title,
      song_link: req.body.song_link,
      background_image: req.body.background_image
    },
    {
      where: {
        id: req.session.user_id,
      },
    }
  )
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//DELETE /api/users/1
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
