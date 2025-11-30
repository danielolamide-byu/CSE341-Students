
// // // // // const express = require('express');
// // // // // const app = express();
 
// // // // // app.get('/', (req, res) => {
// // // // //   res.send("Hello");
// // // // // });

const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
// const cor = require('cors')

const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStratgy = require('passport-github2').Strategy
const port = process.env.PORT || 5001; 

const app = express();
app.use(bodyParser.json())
  .use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  }))
  .use(passport.initialize())
  .use(passport.session()) 

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Z-Key');
  res.setHeader('Access-Control-Allow-Methods', 'GET , POST, PUT, DELETE, OPTIONS');
  next();
})
  
  .use(cors({ methods: ['GET', 'POST', 'UPDATE', 'DELETE', 'PUT', 'PATCH'] }))
  .use(cors({ origin: '*' }))

passport.use(new GitHubStratgy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GIT_HUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
},
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
))

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => {
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out");
})

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false
}), (req, res) => {
  req.session.user = req.user;
  res.redirect('/');
})


app.use('/', require('./routes'))
 
mongodb.initdb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log('Web Server is listening at port ' + (port));
    })
  }
});

    app.listen(port, () => {
      console.log("Database listening...")
    });

// app.listen(process.env.PORT || 3000, () => {
//   console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
// });





// // // const express = require("express")
// // // const app = express()
// // // const router = express.Router();

// // // router.use((req, res, next) => {
// // //   console.log(Date.now());
// // //   next();
// // // })

// // // router.get('/home', (req, res) => {
// // //   res.send("Homepage.")
// // // });

// // // router.get('/profile', (req, res) => {
// // //   res.send("This is the profile.")
// // // });


// // // app.use('/', router);
// // // app.use((err, req, res, next) => {
// // //   res.status(500).send('Something broke!')
// // // });




// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const app = express();
// // const router = express.Router();
 
// // router.get('/home', (req, res) => {
// //   res.send('Hello World, This is home router');
// // });
 
// // router.get('/profile', (req, res) => {
// //   res.send('Hello World, This is profile router');
// // });
 
// // router.get('/login', (req, res) => {
// //   res.send('Hello World, This is login router');
// // });
 
// // router.get('/logout', (req, res) => {
// //   res.send('Hello World, This is logout router');
// // });
 
// // // Add middleware before routes
// // app.use(bodyParser.json());
// // app.use('/', router);
 
// // app.listen(process.env.PORT || 3000, () => {
// //   console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
// // });



// var express = require("express");
// var bodyParser = require("body-parser");
// var multer = require('multer');
 
// var app = express();
// app.use(bodyParser.json());
 
// var storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, './uploads');
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.fieldname + '-' + Date.now());
//   }
// });
 
// var upload = multer({ storage: storage }).array('userPhoto', 2);
 
// app.post('/api/photo', function (req, res) {
//   upload(req, res, function (err) {
//     if (err) {
//       return res.end("Error uploading file.");
//     }
//     res.end("File is uploaded");
//   });
// });
 
// app.listen(3000, function () {
//   console.log("Working on port 3000");
// });

// const mysql = require('mysql');
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'user',
//     password: 'password',
//     database: 'express'
// });
 
// connection.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to MySQL Server!');
// });

// const { createServer } = require('node:http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
