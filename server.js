const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const fileUpload = require("express-fileupload");
const mysql = require('mysql2');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const helpers = require('./utils/helper');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "latenightdan",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

//IMAGE UPLOAD CODE
//default option
app.use(fileUpload());

// Connection Pool
//may have to connect JAWS_DB for heroku

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'jtb9ia3h1pgevwb1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  // host: 'google.com',
  user: 'zd2o68if2s429ttu',
  password: 'gcpc0379wnu4y4kw',
  database: 'pg6zw58fi16i6mx6'
});

const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, 'upload')));
app.use(session(sess));
app.use((req, res, next) => {
  res.locals = { ...res.locals, ...req.session };
  next();
});
app.use(require("./controllers/"));


pool.getConnection((err, connection) => {
  if (err) throw err; // not connected
  console.log('Connected!');
});

app.get('/homePage', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log('Connected!');

    connection.query('SELECT SESSION_USER()', (err, rows) => {
      // Once done, release connection
      connection.release();
      if (!err) {
        res.render('homePage', { rows });
      }
    });

  });
});
app.post("/", (req, res) => {
  let file;
  let uploadPath;
  let myuuid = uuidv4();

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded");
  }

  //name of the input is file
  file = req.files.file;
  uploadPath = __dirname + "/upload/" + myuuid;
  console.log(file);

  //use mv() to place the file on the server
  //put an if here...but if(WHAT)
  file.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    pool.getConnection((err, connection) => {
      if (err) throw err; // not connected
      console.log('Connected!');

      connection.query('UPDATE user SET profile_image = ? WHERE id = ?', [myuuid, req.session.user_id], (err, rows) => {
        // Once done, release connection
        connection.release();

        if (!err) {
          res.redirect('/');
        } else {
          console.log(err);
        }

      });
    });
  });
});

app.post("/backgroundImage", (req, res) => {
  let file;
  let uploadPath;
  let myuuid = uuidv4();

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded");
  }

  //name of the input is file
  file = req.files.file;
  uploadPath = __dirname + "/upload/" + myuuid;
  console.log(file);

  //use mv() to place the file on the server
  //put an if here...but if(WHAT)
  file.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    pool.getConnection((err, connection) => {
      if (err) throw err; // not connected
      console.log('Connected!');

      connection.query('UPDATE user SET background_image = ? WHERE id = ?', [myuuid, req.session.user_id], (err, rows) => {
        // Once done, release connection
        connection.release();

        if (!err) {
          res.redirect('/');
        } else {
          console.log(err);
        }

      });
    });
  });
});





sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});