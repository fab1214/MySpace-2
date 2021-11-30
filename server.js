const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const fileUpload = require("express-fileupload");
const mysql = require('mysql2');
// const helpers = require('./utils/helper');

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
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'hey',
  database: 'myspace_2_db'
});

pool.getConnection((err, connection) => {
  if (err) throw err; // not connected
  console.log('Connected!');
});

app.get('/pictures', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log('Connected!');

    connection.query('SELECT SESSION_USER()', (err, rows) => {
      // Once done, release connection
      connection.release();
      if (!err) {
        res.render('pictures', { rows });
      }
    });

  });
});

app.post("", (req, res) => {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded");
  }

  //name of the input is sampleFile
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + "/upload/" + sampleFile.name;
  console.log(sampleFile);

  //use mv() to place the file on the server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    pool.getConnection((err, connection) => {
      if (err) throw err; // not connected
      console.log('Connected!');

      connection.query('UPDATE SESSION_USER() SET profile_image = ? WHERE id = "1"', [sampleFile.name], (err, rows) => {
        // Once done, release connection
        connection.release();

        if (!err) {
          res.redirect('/');
        } else {
          console.log(err);
        }

      });
    });

    // res.send('File uploaded!');
  });
});

const hbs = exphbs.create({});

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

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
