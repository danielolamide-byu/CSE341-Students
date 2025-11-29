const passport = require("passport");

const router = require("express").Router();

router.use('/', require('./swagger'));

// router.get('/', (req, res) => {
//     res.send('Hello World Right Now!!');
// });

router.use('/course', require('./courses'));
router.use('/info', require('./personalnfo'))

router.get('/login',
  passport.authenticate('github'), (req, res) => {
    // // This callback only runs if authentication is successful
    // res.send("Logged innnnn"); // Redirect to a protected route after successful login
  }
);

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/')
    });
});

module.exports = router;

// const  mongodb = require(`../data/database`);
// const app = express();

// const port = process.env.PORT || 3000;
